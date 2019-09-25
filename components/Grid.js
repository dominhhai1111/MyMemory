import React from 'react';
import { StyleSheet, Animated, TouchableHighlight } from 'react-native';

export default class Grid extends React.Component {
    render() {
        return(
            <TouchableHighlight 
				// onPress={ () => this.props.onUpdate(this.props.gridId) } 
				// disabled={ !this.state.enableTouchGrid }
				// onShowUnderlay={ () => this.setColor(ANIMATE_VALUE_TOUCHING) }
				// onHideUnderlay={ () => this.setColor(ANIMATE_VALUE_NORMAL_BEGIN) } 
			>
				{/* <Animated.View style={[styles.grid, animatedStyle]}></Animated.View> */}
				<Animated.View style={[styles.grid]}></Animated.View>
			</TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
    	width: '30%',
    	aspectRatio: 1 / 1,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#17a2b8',
    },
});