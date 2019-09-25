import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GridGroup from '../components/GridGroup';

export default class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <GridGroup />
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