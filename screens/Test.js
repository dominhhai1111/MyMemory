import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import mymemory_bg from '../assets/images/mymemory_bg.png';

export default class Test extends React.Component {
    render() {
        return (
            <ImageBackground source={mymemory_bg} style={{ width: '100%', height: '100%' }}>
                <Text>Inside</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 500,
        height: 500,
        flex: 1,
        backgroundColor: 'black',
        marginTop: 50,
    },
    child: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
    }
});