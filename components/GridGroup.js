import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Grid from '../components/Grid';
import _ from 'lodash';

export default class GridGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: props.numbers
        };
    }

    renderGrids = () => {
        let grids = [];

        let range = _.range(1, this.state.numbers + 1);
        grids = range.map(number => {
            return (
                <Grid key={number} />
            );
        });

        return grids;
    }

    render() {
        const grids = this.renderGrids();

        return (
            <View style={styles.grid_area_bound}>
                {/* <Animated.View style={ [styles.grid_area, animatedBorderStyle] }> */}
                <Animated.View style={[styles.grid_area]}>
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