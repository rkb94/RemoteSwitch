/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import WeatherBox from './components/WeatherBox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = firestore().collection('user');
    this.state = {
      isSwitchTurnOn: true,
      user: null,
      weatherIcon: "",
      weatherText: "",
      temperature: null,
      location: null,
    };
  }

  handleWeatherBox = () => {
    Geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let key = '566c8ac22ec683434e5210d3436f6cf9';

      let URL = 'http://api.weatherstack.com/current?access_key=' + key + '&query=' + lat + ',' +  lng;

      fetch(URL)
      .then(res => res.json())
      .then((data) => this.setState({
        weatherIcon: data.current.weather_icons[0],
        weatherText: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        location: data.location.name,
      }));
    });
  }

  componentDidMount() {
    const user = auth().currentUser;
    if (user) {
      this.setState({ user: user._user.email });
    } else {
      console.log('no user');
    }
  }

  onTouchSwitch = () => {
    this.setState({ isSwitchTurnOn: !this.state.isSwitchTurnOn })
    this.ref.doc(this.state.user).collection('switch-status').add({
      isSwitchTurnOn: this.state.isSwitchTurnOn,
      time: firestore.FieldValue.serverTimestamp(),
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <AntDesign name="bells" color="#916FF2" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}
          >
            <AntDesign name="setting" color="#916FF2" size={30}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.handleWeatherBox}
        >
          <WeatherBox
            weatherIcon={this.state.weatherIcon}
            temperature={this.state.temperature}
            weather={this.state.weatherText}
            location={this.state.location}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onTouchSwitch}
        >
          <Image
            source={
              this.state.isSwitchTurnOn
              ? require('./on.png')
              : require('./off.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
  },
  icon: {
    width: 185,
    height: 300,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#5B5A5A',
    textAlign: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    position: "absolute",
    right: 20,
    top: 60,
  },
});
