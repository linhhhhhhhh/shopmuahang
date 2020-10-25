import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
export default class Back extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={{paddingVertical:10,marginLeft:10}} onPress={() => Actions.pop()}>
                    <Image style={{ width: 25, height: 25,tintColor:'rgba(128,0,0,1)' }} source={require('../../Logo/back.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}