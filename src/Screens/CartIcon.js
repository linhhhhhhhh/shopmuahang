import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,AsyncStorage } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
class CartIcon extends Component {
    
    getTotal() {
        const { items } = this.props;
        let sl = 0
        for (let i = 0; i < items.length; i++) {
            sl += items[i].quantity
        }
        return <Text style={{ color: '#fff', fontSize: 8, textAlign: 'center', textAlignVertical: 'center', width: 20, height: 20 }}>{sl}</Text>
    }
    render() {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <TouchableOpacity onPress={() => Actions.cart()}>
                    <View style={{ alignItems: 'center', backgroundColor: 'rgba(128,0,0,1)', borderRadius: 50, flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20, tintColor: '#fff', margin: 5 }} source={require('../../Logo/cart.png')} />
                    </View>
                    <View style={{ borderRadius: 50, borderWidth: 1, marginLeft: 20, backgroundColor: 'rgba(128,0,0,1)', position: 'absolute', borderColor: '#fff' }}>
                        {this.getTotal()}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        items: state.cart.cartItem,
    }
}

export default connect(mapStateToProps)(CartIcon);