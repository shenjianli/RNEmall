/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} = React;

var TimerMixin = require('react-timer-mixin');

//var ShenSplashScreen = require('./SplashScreen');

var WelcomePage = require('./WelcomePage')

var AwesomeProject = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      splashed: false,
    };
  },

  componentDidMount: function() {
    this.setTimeout(
      () => {
        this.setState({splashed: true});
      },
      2000,
    );
  },

  render: function() {
    if (this.state.splashed) {
      return (
        <View
          style={styles.container}
        >
        <Text>
        	Home
        </Text>
        </View>
      );
    } else {
      return (
        <WelcomePage />
      );
    }
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
