import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import Back from './../Back'
import CartIcon from './../CartIcon'
import { connect } from 'react-redux'
import { addToCart } from '../../redux/actions/cartActions';

import Product from './Product'
class ProductDetails extends Component {
    constructor(props) {
        super(props);
        Actions.refresh()
        this.state = {
            xemthem: 5,
            xt: true,
            thugon: false
        }
    }
    functionXemThem() {
        this.setState({
            xemthem: null,
            xt: false,
            thugon: true
        })
    }
    functionThugon() {
        this.setState({
            xemthem: 5,
            xt: true,
            thugon: false
        })

    }
    shopinfor() {
        var item = this.props.item;
        Actions.shopinfor({ item });
    }
    async muangay() {
        var id = this.props.item.MaHang;
        var TenKhach = this.props.item.TenKhach;
        var TenHang = this.props.item.TenHang;
        var DonGia = this.props.item.DonGia;
        var HinhAnh = this.props.item.HinhAnh;
        let product = { TenKhach, TenHang, DonGia, HinhAnh }

        try {
            let kh = await AsyncStorage.getItem("@KH")
            if ( JSON.parse(kh)=== null) {
                Actions.login()
            } else {
                this.props.addToCart(product, id);
                Actions.cart();
            }

        } catch (e) {
            console.log(e)
        }
    }
    convert(tien) {
        let dem = 0;
        let result = '';
        for (let i = tien.length - 1; i >= 0; i--) {

            dem++;
            if (dem == 3 && i != 0) {
                result = '.'+tien[i]+result;
                dem = 0;
            } else {
                result = tien[i]+result;
            }
        }
        return result;
    }
    async addItemsToCart() {
        var id = this.props.item.MaHang;
        var TenKhach = this.props.item.TenKhach;
        var TenHang = this.props.item.TenHang;
        var DonGia = this.props.item.DonGia;
        var HinhAnh = this.props.item.HinhAnh;
        let product = { TenKhach, TenHang, DonGia, HinhAnh }
        try {
            let kh = await AsyncStorage.getItem("@KH")
            if ( JSON.parse(kh) === null) {
                Actions.login()
            } else {
                this.props.addToCart(product, id);
            }

        } catch (e) {
            console.log(e)
        }

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Back />
                    <Text style={{ color: 'rgba(128,0,0,1)', paddingVertical: 10 }}>Chi tiết sản phẩm</Text>
                    <View style={{ margin: 10 }}>
                        <CartIcon />
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={{ width: width / 1, height: 250, resizeMode: 'contain' }} source={{ uri: this.props.item.HinhAnh }} />
                    <View style={{ flex: 1, backgroundColor: '#eee', paddingBottom: 2 }}>
                        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 20 }}>
                            <Text style={{ fontSize: 12, textAlign: 'left' }} numberOfLines={2}>{this.props.item.TenHang}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, textAlign: 'left', color: 'rgba(128,0,0,1)' }}>{this.convert(this.props.item.DonGia) + "₫"}</Text>
                                <Image style={{ width: 20, height: 20, tintColor: '#000', marginHorizontal: 5 }} source={require('../../../Logo/love.png')} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.shopinfor()}>
                            <View style={{ alignItems: 'center', flex: 1, shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2, backgroundColor: '#fff', marginTop: 2, flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 20, justifyContent: 'space-between' }} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{ uri: this.props.item.Avatar }} />
                                    <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{this.props.item.TenKhach}</Text>
                                        <Text style={{ fontSize: 8, color: 'grey' }}>{this.props.item.DiaChi}</Text>
                                    </View>
                                </View>
                                <Text style={{ color: 'red', borderRadius: 25, borderWidth: 1, borderColor: 'red', paddingHorizontal: 10, paddingVertical: 5, fontSize: 10 }}>Xem Shop</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 2, shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingVertical: 15, marginHorizontal: 5 }}>Chi tiết sản phẩm</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#fff', marginVertical: 2, shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                            <Text style={{ fontSize: 10, textAlign: 'left', paddingVertical: 10, marginHorizontal: 5 }}>Gửi từ: {this.props.item.DiaChi}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#fff', shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }} >
                            <Text numberOfLines={this.state.xemthem} style={{ fontSize: 10, textAlign: 'left', paddingVertical: 10, marginHorizontal: 5 }}>{this.props.item.MoTa}</Text>
                        </View>
                        {this.state.xt ?
                            <TouchableOpacity onPress={() => this.functionXemThem()}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center', paddingVertical: 10 }} >
                                    <Text style={{ fontSize: 10, color: 'red' }}>Xem thêm</Text>
                                    <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('../../../Logo/xuong.png')} />
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                        {this.state.thugon ?
                            <TouchableOpacity onPress={() => this.functionThugon()}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center', paddingVertical: 10 }} >
                                    <Text style={{ fontSize: 10, color: 'red' }}>Thu gọn</Text>
                                    <Image style={{ width: 15, height: 15, marginLeft: 5, tintColor: '#E74C3C' }} source={require('../../../Logo/len.png')} />
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
                    <Product />
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <TouchableOpacity onPress={() => this.addItemsToCart()} style={{ padding: 5, paddingHorizontal: 40 }} >
                        <Image style={{ width: 25, height: 25, tintColor: 'rgba(128,0,0,1)' }} source={require('../../../Logo/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.muangay()} style={{ backgroundColor: 'rgba(128,0,0,1)', padding: 5, paddingHorizontal: 50, justifyContent: 'center' }} >
                        <Text style={{ color: '#fff', fontSize: 10 }}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
export default connect(null, { addToCart })(ProductDetails)