import React from 'react';
import {
	StyleSheet,
	View,
	Animated
} from 'react-native';
import constants from 'expo-constants';
import _ from 'lodash';

import * as config from '../constants/config';

import GridGroup from '../components/GridGroup';
import Info from '../components/Info';
import ControlButton from '../components/ControlButton';
import Notice from '../components/Notice';

const GRIDGROUP = 1;
const NOTICE = 2;

export default class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			level: 1,
			stepDuration: 100,
			numbers: 9,
			stepsNumber: 16,
			currentNumber: 1,
			currentCheckedNumber: 0,
			steps: {
				1: 1,
				2: 2,
				3: 3,
				4: 6,
				5: 9,
				6: 8,
				7: 7,
				8: 4,
				9: 5,
				10: 4,
				11: 7,
				12: 8,
				13: 9,
				14: 6,
				15: 3,
				16: 2,
			},
			status: config.STATUS_SHOWING,
			btnControlText: '',
			changeColorGridsTime: '',
			showedNotice: false,
			animatedBorderColor: new Animated.Value(config.ANIMATE_BORDER_ONE),
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

	componentDidMount() {
		this.setStatus(config.STATUS_START);
	}

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
		this.animateBorder();
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
			x: _.random(0, 2),
			y: _.random(0, 2)
		};
		moves.push(firstMove);

		for (let i = 2; i <= stepsNumber; i++) {
			let tmpMoves = [];
			currentMove = _.last(moves);
			exception = (moves.length >= 2) ? _.nth(moves, -2) : null;
			possibilities = [];

			tmpMoves.push({x: currentMove.x-1, y: currentMove.y});
			tmpMoves.push({x: currentMove.x+1, y: currentMove.y});
			tmpMoves.push({x: currentMove.x, y: currentMove.y-1});
			tmpMoves.push({x: currentMove.x, y: currentMove.y+1});

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
				this.setStatus(config.STATUS_WAITING);
			}
		}
	}

	continue = async () => {
		await this.setUpLevel();
		await this.setStatus(config.STATUS_SHOWING);
	}

	render() {
		const {
			status,
			level,
			currentNumber,
			currentCheckedNumber,
			stepsNumber,
			numbers,
			btnControlText
		} = this.state;

		return (
			<View style={styles.container}>
				<Notice
					ref={this.refsName[NOTICE]}
					continue={this.continue}
				/>
				<Info
					level={level}
					currentCheckedNumber={currentCheckedNumber}
					stepsNumber={stepsNumber}
				/>
				<GridGroup 
					ref={this.refsName[GRIDGROUP]}
					numbers={numbers} 
					status={status}
					currentNumber={currentNumber}
					onUpdate={this.checkCorrection}
				/>
				<ControlButton
					onPressBtnControl={this.onPressBtnControl}
					btnControlText={btnControlText}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: constants.statusBarHeight,
		height: '100%',
		position: 'relative',
	},
});