import React from 'react';
import { StyleSheet, Animated, TouchableHighlight } from 'react-native';

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

    animateGrid() {
		this.setState({
			animatedColor: new Animated.Value(config.ANIMATE_VALUE_NORMAL_BEGIN),
		});
		Animated.timing(this.state.animatedColor, {
			toValue: config.ANIMATE_VALUE_NORMAL_END,
			duration: config.ANIMATE_GRID_DURATION,
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
    
    addMeasurement = (layout) => {
        const { gridId, addMeasurement } = this.props;

        let measurement = {
            gridId: gridId,
            x1: layout.x,
            x2: layout.x + layout.width,
            y1: layout.y,
            y2: layout.y + layout.height,
        };

        addMeasurement(measurement);
    }

    render() {
        const { gridId, onUpdate } = this.props;
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
				config.COLOR_TOUCHING, 
				config.COLOR_TOUCHING, 
				config.COLOR_TOUCHING,
				config.COLOR_NORMAL],
		});
		const animatedStyle = {
			backgroundColor: interpolatedColor,
		};

        return(
            <TouchableHighlight 
				onPress={ () => onUpdate(gridId) } 
				disabled={ !this.state.enableTouchGrid }
				onShowUnderlay={ () => this.setColor(config.ANIMATE_VALUE_TOUCHING) }
                onHideUnderlay={ () => this.setColor(config.ANIMATE_VALUE_NORMAL_BEGIN) } 
                onLayout={(object) => {
                    this.addMeasurement(object.nativeEvent.layout);
                }}
			>
                <Animated.View 
                    style={[styles.grid, animatedStyle]} 
                >
                </Animated.View>
			</TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
    	width: '30%',
    	aspectRatio: 1 / 1,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#17a2b8',
    },
});