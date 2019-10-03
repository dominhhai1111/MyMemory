import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Guide extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.guide_bound}>
                    <Text style={styles.text}>Guide</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    guide_bound: {
        width: '80%',
        height: '70%',
        backgroundColor: '#ccc'
    },
    text: {
        color: 'white',
    }
});