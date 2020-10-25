import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import Back from './../Back'
export default class Shopinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    convert(tien) {
        let dem = 0;
        let result = '';
        for (let i = tien.length - 1; i >= 0; i--) {

            dem++;
            if (dem == 3 && i != 0) {
                result = '.' + tien[i] + result;
                dem = 0;
            } else {
                result = tien[i] + result;
            }
        }
        return result;
    }
    componentDidMount() {
        fetch('https://whis1997.000webhostapp.com/Shopping/xemdonhang.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaKhach: this.props.MaKhach
            }),
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    data: res,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Back />
                            <Text style={{ color: 'rgba(128,0,0,1)', paddingVertical: 10 }}>Đơn hàng đã đặt</Text>
                            <View style={{ margin: 10 }}>
                                <Text></Text>
                            </View>
                        </View>
                        {this.state.data.length > 0 ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'peru',
                                            elevation: 5,
                                            margin: 5,
                                            shadowColor: 'grey',
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: '#fff',
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                style={{
                                                    resizeMode: 'contain',
                                                    width: 70,
                                                    height: 70,
                                                    margin: 5,
                                                }}
                                                source={{ uri: item.HinhAnh }}
                                            />
                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginHorizontal: 5,
                                                    marginVertical: 5,
                                                }}>
                                                <Text
                                                    style={{ color: 'rgba(black,0,0,1)', fontSize: 10 }}>
                                                    {item.TenHang}
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: 'rgba(128,0,0,1)',
                                                            fontSize: 10,
                                                            fontWeight: 'bold',
                                                            marginVertical: 5,
                                                        }}>
                                                        {'₫ ' + this.convert(item.DonGia)}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            paddingVertical: 2,
                                                            marginTop: 20,
                                                            fontSize: 8,
                                                        }}>
                                                        X{item.SoLuong}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => item.toString()}
                            />
                            : <View style={{ flex: 1, height: height / 1.1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center' }}>Bạn chưa có đơn hàng nào</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: width / 2.04,
        height: height / 3,
        backgroundColor: 'white',
        shadowColor: 'gray',

        elevation: 2,
        margin: 2,
    },
    text: {
        marginTop: 5,
        fontSize: 10,
        marginHorizontal: 5,
        textAlign: 'left',
    },
});
