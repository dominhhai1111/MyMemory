import React from 'react';
import {
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';

import { styles } from '../styles/main';
import * as styleHelper from '../utils/styleHelper';

export default class Guide extends React.Component {
    position = { x: 0, y: 0 };
    translation = new Animated.ValueXY({ x: 0, y: 0 });

    componentDidMount = async () => {
        await this.setInitialPosition();
        await this.animate();
    }

    animate = () => {
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
                    <Text style={styles.guide_text}>You can use finger{"\n"}to move over squares</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
