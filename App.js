import React from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';

import Main from './screens/Main';
import Test from './screens/Test';
import * as fontText from './constants/fonts';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    Font.loadAsync({
      'berlin-regular': fontText.FONT_TEXT_REGULAR,
      'berlin-bold': fontText.FONT_TEXT_BOLD,
      'ballo-chettan': fontText.FONT_TEXT_BALLO_CHETTAN,
    }).then(() => this.setState({ 'fontLoaded': true }));
  }

  render() {
    const { fontLoaded } = this.state;

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {
          fontLoaded ? (
            <Main />
          ) : null
        }
      </View>
      //<Test></Test>
    );
  }
}
