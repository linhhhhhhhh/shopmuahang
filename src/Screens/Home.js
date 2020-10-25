import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Header from '../Screens/Home/Header';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Categories from './Home/Categories'
import Product from './Home/Product'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, backgroundColor: '#eee' }}>
                        <View style={{ marginTop: 5,paddingBottom:50, backgroundColor: '#fff', shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                            <Categories />
                        </View>
                        <View style={{ marginTop: 5,paddingBottom:50, backgroundColor: '#fff', shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                            <Product />
                        </View>
                    </View>
                </ScrollView>

            </View>

        )
    }
}
const styles = StyleSheet.create({

})