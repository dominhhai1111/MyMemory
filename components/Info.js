import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Info extends React.Component {
    render() {
        const { level, currentCheckedNumber, stepsNumber, highestLevel } = this.props;

        return (
            <View style = { styles.score_area_bound }>
                <View style = { styles.score_area }>
                    <Text style = { styles.level }>Level: { level }</Text>
                    <Text style = { styles.step }>Step: { currentCheckedNumber }/{ stepsNumber }</Text>
                </View>
                <View style = {styles.highest_level_area}>
                    <Text style = { styles.highest_level }>Highest: { highestLevel }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    score_area_bound: {
    	alignItems: 'center',
    	justifyContent: 'center',
    	// height: '20%',
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
    },
    score_area: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
    },
    level: {
    	fontSize: 20,
    	fontWeight: 'bold',
    },
    step: {
    	fontSize: 20,
    	fontWeight: 'bold',
    },
    highest_level_area: {
        flexDirection: 'row',
    	justifyContent: 'flex-start',
    	width: '90%',
    },
    highest_level: {
        fontSize: 20,
    	fontWeight: 'bold',
    },
});