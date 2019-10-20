import { StyleSheet, Platform } from 'react-native';
// import constants from 'expo-constants';

import * as helper from '../utils/styleHelper';

export const styles = StyleSheet.create({
    container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
        // paddingTop: constants.statusBarHeight,
        paddingTop: 40,
        position: 'relative',
        zIndex: 1,
    },

    grid_area_bound: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        aspectRatio: 1 / 1,
        // marginBottom: 30,
    },
    grid_area: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        width: '90%',
        aspectRatio: 1 / 1,
    },
    grid: {
		width: '24%',
		height: '24%',
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
	},
	animated_grid: {
		flex: 1,
		backgroundColor: '#17a2b8',
    },
    
    score_area_bound: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '100%',
        // marginTop: 20,
        // marginBottom: 30,
    },
    score_area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
    },
    highest_level_area: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
    },
    font_text: {
        // fontFamily: 'berlin-regular',
        fontSize: 24,
    },

    btn_area_bound: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
    },
    btn_control: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'yellow',
        borderColor: 'red',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    btn_control_text: {
        fontSize: 24,
        // fontFamily: 'berlin-bold',
    },

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
		// fontFamily: 'berlin-bold',
    },
    
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
    guide_text: {
        // fontFamily: 'berlin-regular',
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
});