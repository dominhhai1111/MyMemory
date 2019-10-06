import React from 'react';
import { View, Animated } from 'react-native';

import * as config from '../constants/config';
import { styles } from '../styles/main';

export default class Notice extends React.Component {
    state = {
        message: '',
        animateFontSizeValue: new Animated.Value(config.ANIMATE_NOTICE_MIN_VALUE),
        isShowed: false,
        noticeColor: '',
    };

    noticeText = {
        [config.NOTICE_WIN]: 'Correct',
        [config.NOTICE_LOSE]: 'Incorrect',
    }

    noticeColor = {
        [config.NOTICE_WIN]: 'yellow',
        [config.NOTICE_LOSE]: 'red',
    }

    animateNotice = (notice) => {
        Animated.timing(this.state.animateFontSizeValue, {
            'toValue': config.ANIMATE_NOTICE_MAX_VALUE,
            'duration': config.ANIMATE_NOTICE_DURATION,
        }).start(() => setTimeout(() => this.hideNotice(notice), config.ANIMATE_NOTICE_OFF_TIMEOUT));
    }

    showNotice = (notice) => {
        this.setState({
            isShowed: true,
            message: this.noticeText[notice],
            noticeColor: this.noticeColor[notice],
        });

        this.animateNotice(notice);
    }

    hideNotice = (notice) => {
        this.setState({
            isShowed: false,
            animateFontSizeValue: new Animated.Value(config.ANIMATE_NOTICE_MIN_VALUE),
        });

        if (notice == config.NOTICE_WIN) {
            this.props.continue();
        }
    }

    render() {
        const animateFontSizeStyle = {
            'fontSize': this.state.animateFontSizeValue,
        };

        const noticeColorStyle = {
            'color': this.state.noticeColor,
        }

        return (
            this.state.isShowed ? (
                <View style={styles.notice}>
                    <Animated.Text style={[styles.notice_text, animateFontSizeStyle, noticeColorStyle]}>{this.state.message}</Animated.Text>
                </View>
            ) : null
        );
    }
}
