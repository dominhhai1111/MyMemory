import React from 'react';
import {
	View,
	Animated,
	AsyncStorage,
	Modal,
} from 'react-native';
import _ from 'lodash';

import * as config from '../constants/config';
import { styles } from '../styles/main';

import GridGroup from '../components/GridGroup';
import Info from '../components/Info';
import ControlButton from '../components/ControlButton';
import Notice from '../components/Notice';
import Guide from '../components/Guide';

const GRIDGROUP = 1;
const NOTICE = 2;
const CONTROL_BUTTON = 3;

export default class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			level: 0,
			stepDuration: 100,
			numbers: 16,
			stepsNumber: 16,
			currentNumber: 1,
			currentCheckedNumber: 0,
			steps: {},
			status: config.STATUS_SHOWING,
			btnControlText: '',
			changeColorGridsTime: '',
			showedNotice: false,
			animatedBorderColor: new Animated.Value(config.ANIMATE_BORDER_ONE),
			touchingColor: config.COLOR_TOUCHING,
			highestLevel: 0,
			showModal: false,
		};

		this.btnControlText = {
			[config.STATUS_START]: 'Start',
			[config.STATUS_SHOWING]: 'Showing',
			[config.STATUS_ANSWERING]: 'Answering',
			[config.STATUS_WAITING]: 'Continue',
			[config.STATUS_FINISH]: 'Restart',
		};

		this.refsName = {
			[GRIDGROUP]: 'GRID_GROUP',
			[NOTICE]: 'NOTICE',
			[CONTROL_BUTTON]: 'CONTROL_BUTTON',
		};

		this.map = {
			0: {
				0: 1,
				1: 4,
				2: 7,
			},
			1: {
				0: 2,
				1: 5,
				2: 8,
			},
			2: {
				0: 3,
				1: 6,
				2: 9,
			},
		}
	}

	componentDidMount = async () => {
		await this.setMap();
		await this.setStatus(config.STATUS_START);
	}

	setMap = async () => {
		let map = {};

		for (i = 0; i < config.ROW; i++) {
			map[i] = {};
			for (j = 0; j < config.COLUMN; j++) {
				map[i][j] = i + j * config.ROW + 1;
			}
		}

		this.map = map;
		console.log(map);
	};

	setStatus = async (status) => {
		console.log(`Set status: ${status}`);
		await this.setState({
			status: status,
		});

		for (let i = 1; i <= this.state.numbers; i++) {
			this.refs[this.refsName[GRIDGROUP]].refs[i].setStatus(status);
		}

		this.setBtnControl(status);

		if (status == config.STATUS_START) {
			this.setStartStatus();
		}

		if (status == config.STATUS_SHOWING) {
			this.setShowingStatus();
		}

		if (status == config.STATUS_ANSWERING) {
			this.setAnsweringStatus();
		}

		if (status == config.STATUS_WAITING) {
			this.setWaitingStatus();
		}

		if (status == config.STATUS_FINISH) {
			this.setFinishStatus();
		}
	}

	setStartStatus = () => {
		this.setUpLevel();
	}

	setShowingStatus = async () => {
		console.log('Showing');
		this.refs[this.refsName[GRIDGROUP]].animateBorder();

		await clearInterval(this.state.changeColorGridsTime);
		let changeColorGridsTime = setInterval(() => {
			if (this.state.status == config.STATUS_SHOWING) {
				if (this.state.currentNumber > this.state.stepsNumber) {
					this.setStatus(config.STATUS_ANSWERING);
				} else {
					this.refs[this.refsName[GRIDGROUP]].refs[this.state.steps[this.state.currentNumber]].animateGrid();
					this.setState(previousState => ({
						currentNumber: previousState.currentNumber + 1,
					}))
				}
			}
		}, this.state.stepDuration);

		await this.setState({
			changeColorGridsTime: changeColorGridsTime,
		});
	}

	setAnsweringStatus = () => {
		this.refs[this.refsName[GRIDGROUP]].animateBorder();
	}

	setWaitingStatus = () => {
		this.showNotice(config.NOTICE_WIN);
	}

	setFinishStatus = () => {
		this.showNotice(config.NOTICE_LOSE);
	}

	setUpLevel = async () => {
		console.log(`Set up level`);
		const { status, level } = this.state;
		let currentLevel = 0;

		this.setHighestLevel();

		if (status != config.STATUS_FINISH && status != config.STATUS_START) {
			currentLevel = level + 1;
		} else {
			currentLevel = 1;
		}

		await this.setState({
			'level': currentLevel,
			'currentNumber': 1,
			'currentCheckedNumber': 0,
		});

		this.setStepDuration();
		this.setStepsNumber();
		this.setSteps();
		this.setTouchingColor();
	}

	setStepDuration = () => {
		console.log(`Set step duration`);
		const { level } = this.state;
		let stepDuration = config.MAX_STEP_DURATION - config.RATE_STEP_DURATION * level;
		stepDuration = stepDuration > config.MIN_STEP_DURATION ? stepDuration : config.MIN_STEP_DURATION;

		this.setState({ stepDuration });
	}

	setStepsNumber = () => {
		console.log(`Set step numbers`);
		const { level, stepsNumber } = this.state;
		let currentStepsNumber = config.MIN_STEPS_NUMBER;

		if (level != 1) {
			currentStepsNumber = stepsNumber + 1;
		}

		this.setState({
			stepsNumber: currentStepsNumber,
		});
	}

	setSteps = () => {
		console.log(`Set steps`);
		let steps = {};
		let moves = this.getMoves();
		let index = 1;

		moves.map(move => {
			steps[index] = (this.map[move.x][move.y]);
			index++;
		});
		console.log(steps);
		this.setState({ steps });
	}

	getMoves = () => {
		const { stepsNumber } = this.state;
		let moves = [];
		let possibilities = [];
		let exception = {};
		let firstMove = {
			x: _.random(0, config.ROW - 1),
			y: _.random(0, config.COLUMN - 1)
		};
		moves.push(firstMove);

		for (let i = 2; i <= stepsNumber; i++) {
			let tmpMoves = [];
			currentMove = _.last(moves);
			exception = (moves.length >= 2) ? _.nth(moves, -2) : null;
			possibilities = [];

			tmpMoves.push({ x: currentMove.x - 1, y: currentMove.y });
			tmpMoves.push({ x: currentMove.x + 1, y: currentMove.y });
			tmpMoves.push({ x: currentMove.x, y: currentMove.y - 1 });
			tmpMoves.push({ x: currentMove.x, y: currentMove.y + 1 });

			tmpMoves.map(tmpMove => {
				if (
					tmpMove.x >= 0
					&& tmpMove.x <= config.COLUMN - 1
					&& tmpMove.y >= 0
					&& tmpMove.y <= config.ROW - 1
				) {
					if (
						(exception && tmpMove.x != exception.x && tmpMove.y != exception.y)
						|| !exception
					) {
						possibilities.push(tmpMove);
					}
				}
			});

			moves.push(_.sample(possibilities));
		}

		return moves;
	}

	setTouchingColor = () => {
		let touchingColor = _.sample(config.COLOR_TOUCHING_ARR);
		this.setState({ touchingColor });
	};

	showNotice = (notice) => {
		this.refs[this.refsName[NOTICE]].showNotice(notice);
	}

	onPressBtnControl = async () => {
		console.log('Press-control');
		if (this.state.status == config.STATUS_START) {
			this.setStatus(config.STATUS_SHOWING);
		}

		if (this.state.status == config.STATUS_WAITING) {
			this.continue();
		}

		if (this.state.status == config.STATUS_FINISH) {
			console.log(`Restart`);
			this.continue();
		}
	}

	setBtnControl = (status) => {
		this.setState({
			btnControlText: this.btnControlText[status],
		});

		if (status == config.STATUS_START ||
			status == config.STATUS_WAITING ||
			status == config.STATUS_FINISH) {
			this.refs[this.refsName[CONTROL_BUTTON]].turnOnAnimation();
		} else {
			this.refs[this.refsName[CONTROL_BUTTON]].turnOffAnimation();
		}
	}

	setHighestLevel = async () => {
		let highestLevel = 0;

		try {
			highestLevel = await AsyncStorage.getItem(config.ASYNC_STORAGE_HIGHEST_LEVEL_KEY);
			await this.setState({ highestLevel });
		} catch (e) {
			console.log(e);
		}
	}

	updateHighestLevel = async () => {
		const { level } = this.state;
		let highestLevel = 0;

		try {
			highestLevel = await AsyncStorage.getItem(config.ASYNC_STORAGE_HIGHEST_LEVEL_KEY);
			if (level > highestLevel) {
				await AsyncStorage.setItem(config.ASYNC_STORAGE_HIGHEST_LEVEL_KEY, level.toString());
			}
		} catch (e) {
			console.log(e);
		}
	}

	checkCorrection = async (gridId) => {
		console.log('Check correction');
		await this.setState(previousState => ({
			'currentCheckedNumber': previousState.currentCheckedNumber + 1,
		}));

		if (gridId != this.state.steps[this.state.currentCheckedNumber]) {
			await this.refs[this.refsName[GRIDGROUP]].removeGestureGrid();
			await this.refs[this.refsName[GRIDGROUP]].refs[gridId].setColor(config.ANIMATE_VALUE_INCORRECT);
			this.setStatus(config.STATUS_FINISH);

		} else {
			if (this.state.currentCheckedNumber == this.state.stepsNumber) {
				this.refs[this.refsName[GRIDGROUP]].removeGestureGrid();
				this.updateHighestLevel();
				this.setStatus(config.STATUS_WAITING);
			}
		}
	}

	continue = async () => {
		await this.setUpLevel();
		await this.setStatus(config.STATUS_SHOWING);
	}

	openModal = () => {
		this.setState({ showModal: true });
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	render() {
		const {
			status,
			level,
			currentNumber,
			currentCheckedNumber,
			stepsNumber,
			numbers,
			btnControlText,
			touchingColor,
			highestLevel,
			showModal,
		} = this.state;

		return (
			<View style={styles.container}>
				<Guide/>
				<Notice
					ref={this.refsName[NOTICE]}
					continue={this.continue}
				/>
				<Info
					level={level}
					highestLevel={highestLevel}
					currentCheckedNumber={currentCheckedNumber}
					stepsNumber={stepsNumber}
				/>
				<GridGroup
					ref={this.refsName[GRIDGROUP]}
					numbers={numbers}
					status={status}
					currentNumber={currentNumber}
					onUpdate={this.checkCorrection}
					touchingColor={touchingColor}
				/>
				<ControlButton
					ref={this.refsName[CONTROL_BUTTON]}
					onPressBtnControl={this.onPressBtnControl}
					btnControlText={btnControlText}
				/>
				{/* <Modal
					visible={showModal}
					transparent
					animationType="slide"
					onRequestClose={this.closeModal}
				>
					<Guide
						style={styles.guide}
						onClose={this.closeModal}
					/>
				</Modal> */}
			</View>
		);
	}
}
