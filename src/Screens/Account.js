import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    ImageBackground,
    Alert
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import CartIcon from './../Screens/CartIcon'
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: "",
            show: false,
            button: true,
            hl: '',
            mk: ''

        }
    }
    async functionLogout() {
        var kh = await AsyncStorage.clear();
        Alert.alert(
            '',
            'Bạn có muốn đăng xuất tài khoản không?',
            [
                { text: 'Không', onPress: () => 'cancel' },
                {
                    text: 'Đồng ý', onPress: () => {
                        this.setState({
                            show: false,
                            button: true,
                            dataUser: JSON.parse(kh)
                        })
                        Actions.root();
                    }
                },
            ],
            { cancelable: true }
        )

    }
    async functioninfor() {
        try {
            let kh = await AsyncStorage.getItem("@KH")
            if (JSON.parse(kh) != null) {
                Actions.infor();
            }
        } catch (e) {
            console.log(e)
        }
    }
    async functionGetUser() {
        try {
            let kh = await AsyncStorage.getItem("@KH")
            this.setState({
                dataUser: JSON.parse(kh)
            })

            if (JSON.parse(kh) === null) {
                this.setState({
                    show: false,
                    button: true
                })
            } else {
                let a = JSON.parse(kh);
                for (let i = 0; i < a.length; i++) {
                    this.setState({
                        hl: a[i].DienThoai,
                        mk: a[i].MaKhach
                    })
                }
                this.setState({
                    show: true,
                    button: false,
                })
            }
            this.setState({
                dataUser: JSON.parse(kh),
            })
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {
        this.functionGetUser();

    }
    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#eee' }}>
                    <ImageBackground style={{ width: width / 1, height: 170, justifyContent: 'space-between' }} source={require('../../Logo/nen2.jpg')}>
                        <View style={{ flexDirection: 'row' }}>
                            <FlatList
                                data={this.state.dataUser}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                                        {this.state.show ? (
                                            <TouchableOpacity onPress={() => Actions.sale({ item })} >
                                                <View style={{ backgroundColor: 'rgba(128,0,0,1)', flexDirection: 'row', width: width / 4, justifyContent: 'space-between', marginVertical: 2, borderTopRightRadius: 50, borderBottomRightRadius: 50, paddingVertical: 5 }}>
                                                    <Text style={{ fontSize: 10, color: '#fff', textAlign: 'left', marginVertical: 2 }}>Bắt đầu bán</Text>
                                                    <Image style={{ width: 15, height: 15, marginVertical: 2 }} source={require('../../Logo/morethan2.png')} />
                                                </View>
                                            </TouchableOpacity>
                                        ) : null}
                                        <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                                            {this.state.show ? (
                                                <CartIcon />
                                            ) : null}
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.functioninfor()} >
                                <FlatList
                                    data={this.state.dataUser}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 45, height: 45, borderRadius: 50 }} source={{ uri: item.Avatar }} />
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ fontSize: 13, color: '#fff' }}>{item.TenKhach}</Text>
                                                <Text style={{ fontSize: 10, color: '#fff' }}>{item.Email}</Text>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </TouchableOpacity>
                            {this.state.button ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => Actions.login()} style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 50, paddingHorizontal: 15, paddingVertical: 5 }}>
                                        <Text style={{ color: '#fff' }}>Đăng nhập/Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                    </ImageBackground>
                    <View style={{ marginVertical: 1, backgroundColor: '#fff', shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                        <TouchableOpacity onPress={() => Actions.xemdonhang({ MaKhach: this.state.mk })} style={{ marginHorizontal: 5, marginVertical: 2 }}>
                            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 10 }} >Đơn đặt hàng</Text>
                                <Image style={{ width: 20, height: 20, padding: 5 }} source={require('../../Logo/morethan.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 2 }}>
                            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 10 }} >Đơn hàng đang chờ vận chuyển</Text>
                                <Image style={{ width: 20, height: 20, padding: 5 }} source={require('../../Logo/morethan.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 2 }}>
                            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 10 }} >Đơn hàng đã hủy</Text>
                                <Image style={{ width: 20, height: 20, padding: 5 }} source={require('../../Logo/morethan.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 1, backgroundColor: "#fff", shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 12, height: 12, padding: 10, marginVertical: 5 }} source={require('../../Logo/love.png')} />
                                    <Text style={{ fontSize: 10, marginVertical: 5 }} >Sản phẩm yêu thích</Text>
                                </View>
                                <Image style={{ width: 15, height: 15, padding: 10, marginVertical: 5 }} source={require('../../Logo/morethan.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 12, height: 12, padding: 10, marginVertical: 5 }} source={require('../../Logo/followshop.png')} />
                                    <Text style={{ fontSize: 10, marginVertical: 5 }} >Cửa hàng theo dõi</Text>
                                </View>
                                <Image style={{ width: 15, height: 15, padding: 10, marginVertical: 5 }} source={require('../../Logo/morethan.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "#fff", shadowColor: "gray", shadowOpacity: 0.4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 12, height: 12, padding: 10, marginVertical: 5 }} source={require('../../Logo/call.png')} />
                                <Text style={{ fontSize: 8, color: 'green', marginVertical: 5 }} >HOT LINE: {this.state.hl}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.show ? (
                            <TouchableOpacity onPress={() => this.functionLogout()} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 12, height: 12, padding: 10, marginVertical: 5 }} source={require('../../Logo/logout.png')} />
                                    <Text style={{ fontSize: 10, color: '#34495E', marginVertical: 5 }} >Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({


})