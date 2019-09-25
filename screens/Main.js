import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import GridGroup from '../components/GridGroup';
import * as config from '../constants/config';

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

    render() {
        return (
            <View style={styles.container}>
                <GridGroup numbers={10}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
});