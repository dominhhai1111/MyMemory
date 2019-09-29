import React from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now
                console.log(evt.nativeEvent);
                console.log(gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                //   console.log(`Move: ${this.props.gridId}`);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                //   console.log(`Release: ${this.props.gridId}`);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    render() {
        return (
            <View 
                style={styles.container} 
                {...this._panResponder.panHandlers}
                onLayout={(object) => {
                        console.log(object.nativeEvent.layout);
                }}
            >
                <View 
                    style={styles.child} 
                    onLayout={(object) => {
                        console.log(object.nativeEvent.layout);
                }}
                >

                </View>
            </View>
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