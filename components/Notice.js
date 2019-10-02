import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Font } from 'expo-font';

import * as config from '../constants/config';

export default class Notice extends React.Component {
    state = {
        message: '',
        fontLoaded: false,
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

    componentDidMount() {
        Font.loadAsync({
            'ballo-chettan': require('../assets/fonts/BalooChettan-Regular.ttf'),
            'bree-serif': require('../assets/fonts/BalooChettan-Regular.ttf'),
        }).then(() => this.setState({ 'fontLoaded': true }));
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
                    {
                        this.state.fontLoaded ? (
                            <Animated.Text style={[styles.notice_text, animateFontSizeStyle, noticeColorStyle]}>{this.state.message}</Animated.Text>
                        ) : null
                    }
                </View>
            ) : null
        );
    }
}

const styles = StyleSheet.create({
    notice: {
		zIndex: 2,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	notice_text: {
		fontFamily: 'ballo-chettan',
	}
});