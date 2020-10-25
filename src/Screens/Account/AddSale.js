import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'rn-fetch-blob';
import { Dropdown } from 'react-native-material-dropdown';
export default class AddSale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenhang: "",
            dongia: "",
            soluong: "",
            mota: "",
            tinhtrang: "",
            maloai: "",
            show:false,
            data: [{
                value: '1',
                label: 'Điện thoại - Máy tính bảng'
            }, {
                value: '2',
                label: 'Máy tính - Laptop'
            }, {
                value: '3',
                label: 'Sách - Vở'
            },
            {
                value: '4',
                label: 'Đồng hồ'
            },
            {
                value: '5',
                label: 'Giày - Dép'
            },
            {
                value: '6',
                label: 'Trang sức'
            },
            {
                value: '7',
                label: 'Ví'
            },
            {
                value: '8',
                label: 'Quần áo'
            },
            {
                value: '9',
                label: 'Điện tử - Điện lanh'
            },
            {
                value: '10',
                label: 'Máy ảnh - Máy quay'
            },
            {
                value: '11',
                label: 'Phụ kiện'
            },
            {
                value: '12',
                label: 'Thẻ cào - Thẻ 3G/4G'
            },
            {
                value: '13',
                label: 'Thẻ Game'
            },
            {
                value: '14',
                label: 'Làm đẹp - Sức khỏe'
            },
            {
                value: '15',
                label: 'Thời trang'
            },
            {
                value: '16',
                label: 'Thế giới thiết bị số'
            },
            {
                value: '17',
                label: 'Ô tô - Xe máy - Xe đạp'
            },
            {
                value: '18',
                label: 'Thể thao'
            },
            {
                value: '19',
                label: 'Điện gia dụng'
            },]
        }
    }
    functionAddSale() {
        this.setState({
            show: true,
          });
        RNFetchBlob.fetch('POST', 'https://whis1997.000webhostapp.com/Shopping/Sale.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'image', filename: 'image.png', type: 'image/png', data: this.props.hinhanh },
            { name: 'TenHang', data: this.state.tenhang },
            { name: 'DonGia', data: this.state.dongia },
            { name: 'MoTa', data: this.state.mota },
            { name: 'MaLoai', data: this.state.maloai },
            { name: 'MaKhach', data: this.props.MaKhach },

        ]).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'Thêm thành công!') {
                    this.setState({
                        show: false,
                      });
                    if (responseJson) {
                        alert(responseJson);
                        Actions.root();
                    }

                } else {
                    alert(responseJson);
                    this.setState({
                        show: false,
                      });
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <ScrollView>
                {this.state.show ? (
                    <ActivityIndicator
                        style={{
                            height: height / 1,
                            alignItems: 'center',
                            backgroundColor: 'rgba(52, 52, 52, 0.5)',
                            justifyContent: 'center',
                        }}
                    />
                ) : null}
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../Logo/back.png')} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12 }}>Thêm sản phẩm</Text>
                        <TouchableOpacity onPress={() => this.functionAddSale()}>
                            <Text style={{ color: '#E74C3C', fontSize: 10 }}>HOÀN THÀNH</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <Image style={{ width: 80, height: 80 }} source={this.props.image} />
                        <TextInput placeholder="Tên sản phẩm"
                            placeholderTextColor="#ccc"
                            returnKeyType='next'
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={styles.txtInput} onChangeText={(TenHang) => this.setState({ tenhang: TenHang })} />
                        <TextInput placeholder="Giá"
                            placeholderTextColor="#ccc"
                            returnKeyType='next'
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={styles.txtInput} onChangeText={(DonGia) => this.setState({ dongia: DonGia })} />
                        <TextInput placeholder="Mô tả"
                            placeholderTextColor="#ccc"
                            returnKeyType='next'
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={styles.txtInput} onChangeText={(MoTa) => this.setState({ mota: MoTa })} />
                        <Dropdown value={this.state.label}
                            label='Danh mục'
                            labelFontSize={12}
                            fontSize={12}
                            data={this.state.data}
                            pickerStyle={{ marginVertical: 75 }}
                            dropdownOffset={{ 'top': 15, }}
                            onChangeText={(value) => {
                                this.setState({
                                    maloai: value
                                });
                            }}
                        />
                    </View>
                </View>
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    txtInput: {
        padding: 5,
        fontSize: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 2

    },

})