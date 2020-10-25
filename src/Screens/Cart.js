import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    FlatList,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { connect } from 'react-redux'
import { removeItem, tang, giam } from '../redux/actions/cartActions';

import Back from './Back'
import { Actions } from 'react-native-router-flux';
class GioHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KH: []
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
    async getKH() {
        try {
            let kh = await AsyncStorage.getItem("@KH")
            this.setState({
                KH:JSON.parse(kh)
            })
            if (JSON.parse(kh) === null) {
                Actions.login()
            }
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {
        this.getKH();
    }
    RemoveItemToCart(item) {
        Alert.alert(
            '',
            'Bạn có chắc chắn muốn bỏ sản phẩm này?',
            [
                { text: 'Không', onPress: () => 'cancel' },
                { text: 'Đồng ý', onPress: () => { this.props.removeItem(item.id) } },
            ],
            { cancelable: true }
        )
    }
    functionTang(item) {
        this.props.tang(item.id);
    }
    functionGiam(item) {
        this.props.giam(item.id);
    }
    getTotal() {
        const { items } = this.props;
        const { KH } = this.state;
        if (items.length > 0 && KH!==null) {
            let tongtien = 0;
            for (let i = 0; i < items.length; i++) {
                tongtien += items[i].product.DonGia * items[i].quantity
            }
            return <View style={{ paddingVertical: 15, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderTopColor: '#ccc', borderTopWidth: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }} >
                    <Text style={{ fontSize: 10, marginHorizontal: 5, marginVertical: 2, textAlign: 'center' }}>Thành tiền:</Text>
                    <Text style={{ fontSize: 12, marginLeft: 10, color: 'rgba(128,0,0,1)', textAlign: 'center', fontWeight: 'bold' }}>{this.convert(tongtien.toString())}₫</Text>
                </View>
                <TouchableOpacity onPress={() => Actions.order()} style={{ paddingHorizontal: 35, borderRadius: 10, marginHorizontal: 5, paddingVertical: 10, backgroundColor: 'rgba(128,0,0,1)' }}>
                    <Text style={{ color: '#fff', fontSize: 10 }}>Mua hàng</Text>
                </TouchableOpacity>
            </View>
        }
    }
    render() {
        const { items } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Back />
                    <Text style={{ color: 'rgba(128,0,0,1)', paddingVertical: 10, marginLeft: -10 }}>Giỏ hàng</Text>
                    <Text></Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {items.length > 0 ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={items}
                            renderItem={({ item }) =>
                                (
                                    <View style={{ flex: 1, marginVertical: 5, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', elevation: 2, shadowColor: "gray", shadowOpacity: 0.4, borderRadius: 5, shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, borderRadius: 5 }}>
                                        <Image style={{ width: 80, height: 80, resizeMode: 'contain', margin: 5 }} source={{ uri: item.product.HinhAnh }} />
                                        <View style={{ flex: 1, marginHorizontal: 2 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text numberOfLines={2} style={{ color: 'rgba(black,0,0,1)', fontSize: 10, margin: 2 }}>{item.product.TenHang}</Text>
                                            </View>
                                            <Text style={{ color: 'rgba(128,0,0,1)', fontSize: 10, fontWeight: 'bold', marginVertical: 2 }}>{this.convert((item.product.DonGia * item.quantity).toString()) + "₫"}</Text>
                                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10, alignItems: 'flex-end' }}>
                                                <TouchableOpacity onPress={() => this.functionGiam(item)} style={{ paddingHorizontal: 15, paddingVertical: 3, borderRadius: 2, backgroundColor: '#000', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 10, textAlign: 'center', color: '#fff' }}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={{ paddingVertical: 3, paddingHorizontal: 15, color: '#000', fontSize: 12 }}>{item.quantity}</Text>
                                                <TouchableOpacity onPress={() => this.functionTang(item)} style={{ paddingHorizontal: 15, paddingVertical: 3, borderRadius: 2, backgroundColor: '#000', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 10, textAlign: 'center', color: '#fff' }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => this.RemoveItemToCart(item)}>
                                            <Image style={{ alignContent: 'flex-end', width: 15, height: 15, tintColor: 'red' }} source={require('../../Logo/delete.png')} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            keyExtractor={(item, index) => item.toString()}
                        />
                        : <View style={{ flex: 1, height: height / 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>Không có sản phẩm nào trong giỏ hàng</Text>
                        </View>
                    }
                </ScrollView>
                {this.getTotal()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.cartItem,
        total: state.cart.total
    }
}
export default connect(mapStateToProps, { removeItem, tang, giam })(GioHang);