import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Info extends React.Component {
    render() {
        const { level, currentCheckedNumber, stepsNumber } = this.props;

        return (
            <View style = { styles.score_area_bound }>
                <View style = { styles.score_area }>
                    <Text style = { styles.level }>Level: { level }</Text>
                    <Text style = { styles.step }>Step: { currentCheckedNumber }/{ stepsNumber }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    score_area_bound: {
    	alignItems: 'center',
    	justifyContent: 'center',
    	height: '10%',
    	width: '100%',
    },
    score_area: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	width: '90%',
    },
    level: {
    	fontSize: 20,
    	fontWeight: 'bold',
    },
    step: {
    	fontSize: 20,
    	fontWeight: 'bold',
    },
});