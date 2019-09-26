import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import constants from 'expo-constants';
import * as config from '../constants/config';

import GridGroup from '../components/GridGroup';
import Info from '../components/Info';
import ControlButton from '../components/ControlButton';

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
    }
    
    componentDidMount() {
        this.setStatus(config.STATUS_START);
    }

    onPressBtnControl = async () => {
        if (this.state.status == config.STATUS_START) {
			this.setStatus(STATUS_SHOWING);
		}

		if (this.state.status == config.STATUS_WAITING) {
			this.continue();
		}

		if (this.state.status == config.STATUS_FINISH) {
			this.continue();
		}
	}

	setBtnControl = (status) => {
		this.setState({
			btnControlText: this.btnControlText[status],
		});
	}

    setStatus = async (status) => {
		await this.setState({
				status: status,
			});

		for (let i = 1; i <= this.state.numbers; i++) {
			this.refs[i].setStatus(status);
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
		this.animateBorder();

		let changeColorGridsTime = setInterval(()=>{
			if (this.state.status == config.STATUS_SHOWING) {
				if (this.state.currentNumber > this.state.stepsNumber) {
					this.setStatus(config.STATUS_ANSWERING);
				} else {
					this.refs[this.state.steps[this.state.currentNumber]].animateGrid();
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
		clearInterval(this.state.changeColorGridsTime);
	}

	setWaitingStatus = () => {
		this.showNotice(config.NOTICE_WIN);
	}

	setFinishStatus = () => {
		this.showNotice(config.NOTICE_LOSE);
	}

    render() {
        const { level, currentCheckedNumber, stepsNumber, numbers, btnControlText } = this.state;

        return (
            <View style={styles.container}>
                <Info level={level} currentCheckedNumber={currentCheckedNumber} stepsNumber={stepsNumber} />
                <GridGroup numbers={numbers}/>
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