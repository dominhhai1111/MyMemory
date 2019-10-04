import React from 'react';
import { StyleSheet, Animated, View, TouchableHighlight } from 'react-native';

import * as config from '../constants/config';

export default class Grid extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			duration: 20,
			enableTouchGrid: false,
			status: config.STATUS_START,
			animatedColor: new Animated.Value(config.ANIMATE_VALUE_NORMAL_BEGIN),
		}
	}

	animateGrid = async () => {
		await this.setState({
			animatedColor: new Animated.Value(config.ANIMATE_VALUE_NORMAL_BEGIN),
		});
		await Animated.timing(this.state.animatedColor, {
			toValue: config.ANIMATE_VALUE_NORMAL_END,
			duration: config.ANIMATE_GRID_DURATION,
		}).start();
	}

	onPressGrid = async () => {
		await this.setState({
			animatedColor: new Animated.Value(config.ANIMATE_VALUE_NORMAL_BEGIN),
		});
		await Animated.timing(this.state.animatedColor, {
			toValue: config.ANIMATE_VALUE_TOUCHING,
			duration: config.ANIMATE_GRID_DURATION / 2,
		}).start();
	}

	onDropGrid = async () => {
		await this.setState({
			animatedColor: new Animated.Value(config.ANIMATE_VALUE_TOUCHING),
		});
		await Animated.timing(this.state.animatedColor, {
			toValue: config.ANIMATE_VALUE_NORMAL_END,
			duration: config.ANIMATE_GRID_DURATION / 2,
		}).start();
	}

	enableTouchGrid(enableTouchGrid) {
		this.setState(
			{
				'enableTouchGrid': enableTouchGrid
			}
		);
	}

	setColor(color) {
		if (this.state.status != config.STATUS_FINISH || color == config.ANIMATE_VALUE_INCORRECT) {
			this.setState({
				animatedColor: new Animated.Value(color),
			});
		}
	}

	async setStatus(status) {
		await this.setState({
			'status': status
		});

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

	setStartStatus() {
		this.setColor(config.ANIMATE_VALUE_NORMAL_BEGIN);
		this.enableTouchGrid(false);
	}

	async setShowingStatus() {
		this.setColor(config.ANIMATE_VALUE_NORMAL_BEGIN);
		this.enableTouchGrid(false);
	}

	setAnsweringStatus() {
		this.setColor(config.ANIMATE_VALUE_NORMAL_BEGIN);
		this.enableTouchGrid(true);
	}

	setWaitingStatus() {
		this.enableTouchGrid(false);
	}

	setFinishStatus() {
		this.enableTouchGrid(false);
	}

	addMeasurement = () => {
		const { gridId, addMeasurement } = this.props;
		this.grid.measure((fx, fy, width, height, px, py) => {
			let measurement = {
				gridId: gridId,
				x1: px,
				x2: px + width,
				y1: py,
				y2: py + height,
			};

			addMeasurement(measurement);
		});
	}

	render() {
		const { touchingColor } = this.props;

		const interpolatedColor = this.state.animatedColor.interpolate({
			inputRange: [
				config.ANIMATE_VALUE_INCORRECT,
				config.ANIMATE_VALUE_NORMAL_BEGIN,
				(config.ANIMATE_VALUE_NORMAL_BEGIN + config.ANIMATE_VALUE_TOUCHING) / 2,
				config.ANIMATE_VALUE_TOUCHING,
				(config.ANIMATE_VALUE_TOUCHING + config.ANIMATE_VALUE_NORMAL_END) / 2,
				config.ANIMATE_VALUE_NORMAL_END
			],
			outputRange: [
				config.COLOR_INCORRECT,
				config.COLOR_NORMAL,
				touchingColor,
				touchingColor,
				touchingColor,
				config.COLOR_NORMAL],
		});
		const animatedStyle = {
			backgroundColor: interpolatedColor,
		};

		return (
			<View
				ref={view => { this.grid = view }}
				onLayout={() => {
					this.addMeasurement();
				}}
			>
				<Animated.View
					style={[styles.grid, animatedStyle]}
				>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
		width: '32%',
		aspectRatio: 1 / 1,
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
		backgroundColor: '#17a2b8',
	},
});