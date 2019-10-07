import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default class Guide extends React.Component {
    render() {
        return (
            <View style={styles.guide_bound}>
                <Image source={require("../assets/images/finger.png" )}
                style={styles.guide_finger}/>
                <Text style={styles.text}>You can use finger{"\n"}to move over squares</Text>
            </View>
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
    },
    text: {
        color: 'white',
        textAlign: 'center',
    }
});