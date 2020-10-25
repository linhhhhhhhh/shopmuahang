import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
const { height } = Dimensions.get('window');
console.disableYellowBox = true;


import { Router, Scene } from 'react-native-router-flux'
import Home from './Screens/Home';
import Service from './Screens/Service';
import Account from './Screens/Account';
import Infor from './Screens/Account/Infor'
import EditPhoto from './Screens/Account/EditPhoto'
import Login from './Screens/Account/Login'
import Register from './Screens/Account/Register'
import Cart from './Screens/Cart'
import Categories from './Screens/Home/Categories'
import Sale from './Screens/Account/Sale'
import AddSale from './Screens/Account/AddSale'
import Product from './Screens/Home/Product'
import ProductDetails from './Screens/Home/ProductDetails'
import ShopInfor from './Screens/Home/ShopInfor'
import Order from './Screens/Home/Order'
import CategoriesDetail from './Screens/Home/CategoriesDetail'
import Address from './Screens/Home/Address'
import XemDonHang from './Screens/Account/XemDonHang'

export default class Shop extends Component {

    HomeTab = (props) => {
        const settingImageFocused = require("../Logo/home1.png")
        const settingImageUnfocused = require("../Logo/home2.png")
        let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={settingImage} style={{ width: 20, height: 20 }} />
            </View>
        );
    }
    ServiceTab = (props) => {
        const settingImageFocused = require("../Logo/tk1.png")
        const settingImageUnfocused = require("../Logo/tk2.png")
        let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={settingImage} style={{ width: 25, height: 25 }} />
            </View>
        );
    }
    AccountTab = (props) => {
        const settingImageFocused = require("../Logo/person1.png")
        const settingImageUnfocused = require("../Logo/person2.png")
        let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={settingImage} style={{ width: 30, height: 30 }} />
            </View>
        );
    }
    render() {
        return (
            <Router >
                <Scene hideNavBar={true} >
                    <Scene
                        tabs
                        key="root"
                        tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                        labelStyle={{ fontSize: 8 }}
                    >
                        <Scene key="home" hideNavBar={true} tabBarLabel="Home" icon={this.HomeTab} >
                            <Scene
                                titleStyle={{ color: '#000', }}
                                title='Home'
                                key="home"
                                hideNavBar={true}
                                component={Home}
                            />
                        </Scene>
                        <Scene key="service" hideNavBar tabBarLabel="Search" icon={this.ServiceTab}>
                            <Scene
                                key="service"
                                component={Service}
                            />
                        </Scene>
                        <Scene key="account" hideNavBar tabBarLabel="Account" icon={this.AccountTab}>
                            <Scene
                                key="account"
                                component={Account}
                            />
                        </Scene>
                    </Scene>
                    <Scene
                        key="theloai"
                        hideNavBar={true}
                        component={Categories}
                    />
                    <Scene
                        key="sanpham"
                        hideNavBar={false}
                        component={Product}
                        hideTabBar={true}
                    />
                    <Scene
                        key="chitietsanpham"
                        hideNavBar={true}
                        component={ProductDetails}
                        hideTabBar={true}
                    />
                    <Scene
                        key="cart"
                        hideNavBar={true}
                        component={Cart}
                        hideTabBar={true}
                    />
                    <Scene
                        key="address"
                        hideNavBar={true}
                        component={Address}
                        hideTabBar={true}
                    />

                    <Scene
                        key="order"
                        hideNavBar={true}
                        component={Order}
                        hideTabBar={true}
                    />
                    <Scene
                        key="categoriesdetail"
                        hideNavBar={true}
                        component={CategoriesDetail}
                        hideTabBar={true}
                    />
                    <Scene
                        key="infor"
                        component={Infor}
                        hideNavBar={true}
                        hideTabBar={true}
                    />
                    <Scene
                        key="editphoto"
                        component={EditPhoto}
                        hideNavBar={true}
                        hideTabBar={true}
                    />

                    <Scene
                        key="sale"
                        component={Sale}
                        hideNavBar={true}
                        hideTabBar={true}

                    />
                    <Scene
                        key="cart"
                        hideNavBar={false}
                        component={Cart}
                        hideTabBar={true}
                    />
                    <Scene
                        key="addsale"
                        component={AddSale}
                        hideNavBar={true}
                        hideTabBar={true}
                    />
                    <Scene
                        key="shopinfor"
                        hideNavBar={true}
                        component={ShopInfor}
                        hideTabBar={true}
                    />
                    <Scene
                        key="login"
                        hideNavBar={true}
                        component={Login}
                        hideTabBar={true}
                    />
                    <Scene
                        key="register"
                        hideNavBar={true}
                        component={Register}
                        hideTabBar={true}
                    />
                     <Scene
                        key="xemdonhang"
                        hideNavBar={true}
                        component={XemDonHang}
                        hideTabBar={true}
                    />
                </Scene>
            </Router>
        )
    }
}
