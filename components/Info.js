import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as config from '../constants/config';
import { styles } from '../styles/main';

export default class Info extends React.Component {
    render() {
        const { level, currentCheckedNumber, stepsNumber, highestLevel } = this.props;

        return (
            <View style={styles.score_area_bound}>
                <View style={styles.score_area}>
                    <Text style={[styles.font_text]}>Level: {level}</Text>
                    <Text style={[styles.font_text]}>Step: {currentCheckedNumber}/{stepsNumber}</Text>
                </View>
                <View style={styles.highest_level_area}>
                    <Text style={[styles.font_text]}>Highest: {highestLevel}</Text>
                </View>
            </View>
        );
    }
}
