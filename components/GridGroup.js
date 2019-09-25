import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Grid from '../components/Grid';

export default class GridGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: props.numbers
        };
    }

    renderGrids = () => {
        let grids = [];

        for (let i = 1; i <= this.state.numbers; i++) {
            grids.push(
                <Grid key={i}
                    // ref={i}
                    // gridId={i}
                    // onUpdate={this.checkCorrection.bind(this)}
                />
            );
        }

        return (grids);
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