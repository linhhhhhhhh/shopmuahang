import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import CartIcon from './../CartIcon'
export default class Header extends Component {
    render() {
        return (
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row',justifyContent:'space-between' }}>
                <Text style={{ fontSize: 20, textAlign: 'left', marginLeft: -10, fontWeight: 'bold' }}>Discover</Text>
                <View style={{ flexDirection: 'row', marginVertical: 5,marginHorizontal:5 }}>
                    <CartIcon />
                </View>
            </View>
        )
    }
}