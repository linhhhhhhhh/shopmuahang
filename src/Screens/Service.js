import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
export default class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tukhoa: '',
            data: [],
            ketqua: false
        }
    }
    async Search() {
        this.setState({
            ketqua: false,
        });
        try {
            let kh = await AsyncStorage.getItem('@KH');

            let a = JSON.parse(kh);
            if (a != null) {
                for (let i = 0; i < a.length; i++) {
                    this.setState({
                        MK: a[i].MaKhach
                    })
                }
            }


        } catch (e) {
            console.log(e);
        }
        fetch('https://whis1997.000webhostapp.com/Shopping/TimKiem.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaKhach: this.state.MK,
                tukhoa: this.state.tukhoa
            }),
        }).then(response => response.json())
            .then(res => {
                if (res === 'Không tìm thấy sản phẩm nào') {
                    alert(res)
                } else {
                    this.setState({
                        data: res,
                        ketqua: true
                    });
                }

            })
            .catch(error => {
                console.error(error);
            });
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
        this.Search();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TextInput onChangeText={tukhoa => this.setState({ tukhoa: tukhoa })} style={{ borderRadius: 5, borderWidth: 1, flex: 5, borderColor: '#000', flexDirection: 'row', marginLeft: 5, height: 35 }}></TextInput>
                    <TouchableOpacity onPress={() => this.Search()} style={{ marginRight: 5 }} >
                        <View style={{ borderRadius: 50 }}>
                            <Image style={{ width: 30, height: 30, tintColor: '#000', margin: 5 }} source={require('../../Logo/search2.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => Actions.chitietsanpham({ reset: true, item })}>
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
                                        {this.convert(item.DonGia) + '₫'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
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
