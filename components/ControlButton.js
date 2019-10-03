import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class ControlButton extends React.Component {
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
            </View >
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