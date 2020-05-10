import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class WeatheBox extends Component {
  
  renderWeatherIcon(weather) {
    switch(weather) {
      case 'Sunny':
        return (
          <View style={styles.weatherIcon}>
            <Ionicons name="ios-sunny" color="#FFFFFF" size={80}/>
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Image
          source={require('./WeatherBox.png')}
          style={styles.weatherBox}
        />
        <Image
          source={{uri: this.props.weatherIcon}}
          style={styles.weatherIcon}
        />
        {this.renderWeatherIcon(this.props.weather)}
        <Text style={styles.temperatureText}>
          {this.props.temperature}🌡
        </Text>
        <Text style={styles.weatherText}>
          {this.props.weather}
        </Text>
        <Text style={styles.locationText}>
          {this.props.location}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureText: {
    position: 'absolute',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    right: 30,
  },
  weatherText: {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 70,
    right: 30,
  },
  locationText: {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 90,
    right: 30,
  },
  weatherIcon: {
    position: 'absolute',
    marginTop: 20,
    left: 10,
    width: 80,
    height: 60,
  },
});
