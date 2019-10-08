import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';

import * as styleHelper from '../utils/styleHelper';

export default class Guide extends React.Component {
    position = { x: 0, y: 0 };
    translation = new Animated.ValueXY({ x: 0, y: 0 });

    componentDidMount = async () => {
        await this.setInitialPosition();
        await this.animate();
    }

    animate = () => {
        console.log('animate');
        this.translation.setValue({ x: 0, y: 0 });
        Animated.timing(this.translation, {
            toValue: { x: 0, y: 250 },
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(this.translation, {
                toValue: { x: 250, y: 250 },
                duration: 2000,
                useNativeDriver: true,
            }).start(() => {
                this.animate();
            });
        });
    };

    setInitialPosition = () => {
        this.position = { x: '15%', y: '35%' };
    };

    render() {
        const { hiddenGuide } = this.props;

        const animateStyle = {
            transform: [
                { translateX: this.translation.x },
                { translateY: this.translation.y }
            ]
        };

        const fingerStyle = {
            top: this.position.y,
            left: this.position.x,
        }

        return (
            <TouchableWithoutFeedback
                onPress={hiddenGuide}
            >
                <View style={styles.guide_bound}>
                    <Animated.Image source={require("../assets/images/finger.png")}
                        style={[styles.guide_finger, fingerStyle, animateStyle]} />
                    <Text style={styles.text}>You can use finger{"\n"}to move over squares</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    guide_bound: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        zIndex: 99,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(204, 204, 204, 0.3)",
    },
    guide_finger: {
        height: 60,
        width: 35,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});