import React from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import _ from 'lodash';

import * as config from '../constants/config';
import Grid from '../components/Grid';

export default class GridGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: props.status,
            numbers: props.numbers,
            animatedBorderColor: new Animated.Value(config.ANIMATE_BORDER_ONE),
        };

        this.position = {};

        this.measurements = [];

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
                this.gestureGrid(evt, 1);
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

    renderGrids = () => {
        const { numbers } = this.state;
        const { onUpdate } = this.props;
        let grids = [];

        let range = _.range(1, numbers + 1);
        grids = range.map(number => {
            return (
                <Grid
                    key={number}
                    ref={number}
                    gridId={number}
                    onUpdate={onUpdate}
                    addMeasurement={this.addMeasurement}
                />
            );
        });

        return grids;
    }

    setPosition = () => {
        this.gridGroup.measure( (fx, fy, width, height, px, py) => {
            // console.log('Component width is: ' + width)
            // console.log('Component height is: ' + height)
            // console.log('X offset to frame: ' + fx)
            // console.log('Y offset to frame: ' + fy)
            // console.log('X offset to page: ' + px)
            // console.log('Y offset to page: ' + py)
            this.position = { 
                x: px,
                y: py,
            }

            console.log(this.position);
        })        
    }

    animateBorder = () => {
        Animated.timing(this.state.animatedBorderColor, {
            toValue: config.ANIMATE_BORDER_THREE,
            duration: config.ANIMATE_BORDER_DURATION,
        }).start(() => { this.setState({ animatedBorderColor: new Animated.Value(config.ANIMATE_BORDER_ONE) }) });
    }

    addMeasurement = (measurement) => {
        this.measurements.push(measurement);
    }

    gestureGrid = (evt, type) => {
        const { pageX, pageY } = evt.nativeEvent;
        console.log(evt.nativeEvent);
        // console.log(this.measurements);
        this.measurements.map(measurement => {
            if (
                pageX >= measurement.x1
                && pageX <= measurement.x2
                && pageY >= measurement.y1
                && pageY <= measurement.y2
            ) {
                console.log(measurement.gridId);
            }
        })
    }

    render() {
        const grids = this.renderGrids();
        const interpolatedBorderColor = this.state.animatedBorderColor.interpolate({
            inputRange: [config.ANIMATE_BORDER_ONE, config.ANIMATE_BORDER_TWO, config.ANIMATE_BORDER_THREE],
            outputRange: [config.COLOR_GRAY, config.COLOR_TOUCHING, config.COLOR_GRAY],
        });
        const animatedBorderStyle = {
            backgroundColor: interpolatedBorderColor,
        };

        return (
            <View 
                ref={view => { this.gridGroup = view; }}
                style={styles.grid_area_bound} 
                {...this._panResponder.panHandlers}
                onLayout={() => this.setPosition()}
            >
                <Animated.View style={[styles.grid_area, animatedBorderStyle]}>
                    {grids}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid_area_bound: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70%',
    },
    grid_area: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        width: '90%',
        aspectRatio: 1 / 1,
        margin: 'auto',
    },
});