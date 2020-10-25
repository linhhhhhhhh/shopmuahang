import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=ThaiNguyen&key=171.236.124.88')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
})
      }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            </View>
        )
    }
}
