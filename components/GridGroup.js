import React from 'react';
import { View, Animated, PanResponder } from 'react-native';
import _ from 'lodash';

import * as config from '../constants/config';
import { styles } from '../styles/main';

import Grid from '../components/Grid';

export default class GridGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: props.numbers,
            animatedBorderColor: new Animated.Value(config.ANIMATE_BORDER_ONE),
            currentGesturedGridId: '',
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
                this.gestureGrid(evt, config.EVENT_GRANT);
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                this.gestureGrid(evt, config.EVENT_MOVE);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                this.gestureGrid(evt, config.EVENT_RELEASE);
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
        const { onUpdate, touchingColor } = this.props;
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
                    touchingColor={touchingColor}
                />
            );
        });

        return grids;
    }

    setPosition = () => {
        this.gridGroup.measure( (fx, fy, width, height, px, py) => {
            this.position = { 
                x: px,
                y: py,
            }
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

    gestureGrid = async (evt, type) => {
        const { pageX, pageY } = evt.nativeEvent;
        const { onUpdate, status } = this.props;
        let isUpdated = false;

        if (status == config.STATUS_ANSWERING || status == config.STATUS_START) {
            this.measurements.map(async measurement => {
                if (
                    pageX >= measurement.x1
                    && pageX <= measurement.x2
                    && pageY >= measurement.y1
                    && pageY <= measurement.y2
                ) {
                    if (
                        type == config.EVENT_GRANT ||
                        (type == config.EVENT_MOVE && measurement.gridId != this.state.currentGesturedGridId)
                    ) {
                        if (this.state.currentGesturedGridId != '') {
                            await this.refs[this.state.currentGesturedGridId].onDropGrid();
                        }
                        
                        await this.setState({ currentGesturedGridId: measurement.gridId });
                        await this.refs[measurement.gridId].onPressGrid();

                        if (status == config.STATUS_ANSWERING) {
                            await onUpdate(measurement.gridId);
                        }
                            
                        isUpdated = true;
                        
                    } else if ( type == config.EVENT_RELEASE ) {
                        this.removeGestureGrid();
    
                        isUpdated = true;
                    }
                }
            })
    
            if (type == config.EVENT_RELEASE && !isUpdated) {
                this.removeGestureGrid();
            }
        }
    }

    removeGestureGrid = async () => {
        await this.refs[this.state.currentGesturedGridId].onDropGrid();
        await this.setState({ currentGesturedGridId: '' });
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
