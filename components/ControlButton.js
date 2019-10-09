import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';

import * as config from '../constants/config';
import { styles } from '../styles/main';

export default class ControlButton extends React.Component {
    constructor(props) {
        super(props);

        this.state  = {
            enableAnimation: false,
            animatedColor: new Animated.Value(config.ANIMATE_CONTROL_BUTTON_BEGIN),
        };
    }

    turnOnAnimation = () => {
        this.setState({ enableAnimation: true }, () => {
            this.animateControlBtn();
        });
    };

    turnOffAnimation = () => {
        this.setState({ enableAnimation: false });
    };

    animateControlBtn = async () => {
        const { enableAnimation } = this.state;

        await this.state.animatedColor.setValue(config.ANIMATE_CONTROL_BUTTON_BEGIN);

        if (enableAnimation) {
            await Animated.timing(this.state.animatedColor, {
                toValue: config.ANIMATE_CONTROL_BUTTON_END,
                duration: config.ANIMATE_CONTROL_BUTON_TIMEOUT,
            }).start(() => {
                this.animateControlBtn();
            });
        }
    };

    render() {
        const { onPressBtnControl, btnControlText } = this.props;
        const { enableAnimation } = this.state;

        const interpolatedColor = this.state.animatedColor.interpolate({
            inputRange: [
                config.ANIMATE_CONTROL_BUTTON_BEGIN,
                config.ANIMATE_CONTROL_BUTTON_END,
            ],
            outputRange: [
                config.ANIMATE_CONTROL_COLOR_BEGIN,
                config.ANIMATE_CONTROL_COLOR_END,
            ],
        });

        const animatedStyle = enableAnimation ? {
            backgroundColor: interpolatedColor,
        } : null;

        return (
            <Animated.View style={[styles.btn_area_bound]} >
                <TouchableOpacity
                    onPress={onPressBtnControl}
                >
                    <Animated.View style={ [styles.btn_control, animatedStyle] }>
                        <Text style={styles.btn_control_text}>{btnControlText}</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
