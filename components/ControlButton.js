import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../styles/main';

export default class ControlButton extends React.Component {
    state = {
        fontLoaded: false,
    };

    render() {
        const { onPressBtnControl, btnControlText } = this.props;

        return (
            <View style={styles.btn_area_bound} >
                <TouchableOpacity
                    style={styles.btn_control}
                    onPress={onPressBtnControl}
                >
                    <Text style={styles.btn_control_text}>{btnControlText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
