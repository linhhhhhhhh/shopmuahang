import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            MK: '',
            tien: ''
        };
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
    async  componentDidMount() {
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
        fetch('https://whis1997.000webhostapp.com/Shopping/Product.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaKhach: this.state.MK
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
            <View style={{ flex: 1 }}>
                <Text style={{ paddingVertical: 20, marginHorizontal: 5, fontSize: 12, color: 'red', }}> GỢI Ý HÔM NAY</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => Actions.chitietsanpham({ item })}>
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
        );
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
