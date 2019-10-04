import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

import * as config from '../constants/config';
import { FONT_TEXT_BOLD } from '../constants/fonts';

export default class ControlButton extends React.Component {
    state = {
        fontLoaded: false,
    };

    componentDidMount() {
        Font.loadAsync({
            'berlin-bold': FONT_TEXT_BOLD,
        }).then(() => this.setState({ 'fontLoaded': true }));
    }

    render() {
        const { onPressBtnControl, btnControlText } = this.props;

        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View style={styles.btn_area_bound} >
                            <TouchableOpacity
                                style={styles.btn_control}
                                onPress={onPressBtnControl}
                            >
                                <Text style={styles.btn_control_text}>{btnControlText}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn_area_bound: {
        alignItems: 'center',
        justifyContent: 'center',
        // height: '20%',
    },
    btn_control: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'yellow',
        borderColor: 'red',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    btn_control_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});