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
export default class Shopinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch('https://whis1997.000webhostapp.com/Shopping/SanPhamShop.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaKhach: this.props.item.MaKhach
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
                        <ImageBackground style={{ width: width / 1, height: 180, justifyContent: 'space-between' }} source={require('../../../Logo/nen4.jpg')} >
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => Actions.pop()}>
                                <Image style={{ width: 25, height: 25, tintColor: '#fff' }} source={require('../../../Logo/back.png')} />
                            </TouchableOpacity>
                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 45, height: 45, borderRadius: 50 }} source={{ uri: this.props.item.Avatar }} />
                                        <View style={{ marginHorizontal: 5, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 10, color: '#fff' }}>{this.props.item.TenKhach}</Text>
                                            <Text style={{ fontSize: 10, color: '#fff' }}>Người theo dõi 250</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => alert('Theo dõi')} style={{ borderWidth: 1, height: 25, borderColor: '#fff', paddingHorizontal: 10, borderRadius: 5, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 10, color: '#fff' }}>+ Theo dõi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ paddingVertical: 20, marginHorizontal: 5, fontSize: 12, color: 'red', }}> CÁC SẢN PHẨM</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => Actions.chitietsanpham({item })}>
                                    <View style={styles.item}>
                                        <Image
                                            style={{
                                                width: width / 2,
                                                height: height / 5,
                                                resizeMode: 'contain',
                                                marginTop: 5,
                                            }}
                                            source={{ uri: item.HinhAnh }}
                                        />
                                        <Text style={styles.text} numberOfLines={2}>
                                            {item.TenHang}
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'rgba(128,0,0,1)',
                                                textAlign: 'left',
                                                fontSize: 12,
                                                marginHorizontal: 5,
                                            }}>
                                            {item.DonGia + '₫'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
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
