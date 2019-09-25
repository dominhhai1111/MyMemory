import React from 'react';

export default class Notice extends React.Component {
    state = {
        message: '',
        fontLoaded: false,
        animateFontSizeValue: new Animated.Value(ANIMATE_NOTICE_MIN_VALUE),
        isShowed: false,
        noticeColor: '',
    };

    noticeText = {
        [NOTICE_WIN]: 'Correct',
        [NOTICE_LOSE]: 'Incorrect',
    }

    noticeColor = {
        [NOTICE_WIN]: 'yellow',
        [NOTICE_LOSE]: 'red',
    }

    constructor() {
        super();
        this.hideNotice = this.hideNotice.bind(this);
    }

    componentDidMount() {
        Font.loadAsync({
            'ballo-chettan': require('../assets/fonts/BalooChettan-Regular.ttf'),
            'bree-serif': require('../assets/fonts/BalooChettan-Regular.ttf'),
        }).then(() => this.setState({ 'fontLoaded': true }));
    }

    animateNotice(notice) {
        Animated.timing(this.state.animateFontSizeValue, {
            'toValue': ANIMATE_NOTICE_MAX_VALUE,
            'duration': ANIMATE_NOTICE_DURATION,
        }).start(() => setTimeout(() => this.hideNotice(notice), ANIMATE_NOTICE_OFF_TIMEOUT));
    }

    showNotice(notice) {
        this.setState({
            isShowed: true,
            message: this.noticeText[notice],
            noticeColor: this.noticeColor[notice],
        });

        this.animateNotice(notice);
    }

    hideNotice(notice) {
        this.setState({
            isShowed: false,
            animateFontSizeValue: new Animated.Value(ANIMATE_NOTICE_MIN_VALUE),
        });

        if (notice == NOTICE_WIN) {
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