import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

import * as config from '../constants/config';
import { FONT_TEXT_REGULAR } from '../constants/fonts';

export default class Info extends React.Component {
    state = {
        fontLoaded: false,
    };

    componentDidMount() {
        Font.loadAsync({
            'berlin-regular': FONT_TEXT_REGULAR,
        }).then(() => this.setState({ 'fontLoaded': true }));
    }

    render() {
        const { level, currentCheckedNumber, stepsNumber, highestLevel } = this.props;

        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View style={styles.score_area_bound}>
                            <View style={styles.score_area}>
                                <Text style={[styles.font_text]}>Level: {level}</Text>
                                <Text style={[styles.font_text]}>Step: {currentCheckedNumber}/{stepsNumber}</Text>
                            </View>
                            <View style={styles.highest_level_area}>
                                <Text style={[styles.font_text]}>Highest: {highestLevel}</Text>
                            </View>
                        </View>
                    ) : null
                }
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
    highest_level_area: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
    },
    font_text: {
        fontFamily: 'berlin-regular',
        fontSize: 24,
        color: config.STYLE_TEXT_COLOR,
    },
});