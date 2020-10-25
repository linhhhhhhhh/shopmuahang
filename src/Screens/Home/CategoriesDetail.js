import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Back from './../Back';
import { Actions } from 'react-native-router-flux';
export default class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            khongcosanpham: false,
            MK: ''
        };
    }
    async componentDidMount() {
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaLoai: this.props.item.MaLoai,
                MaKhach: this.state.MK,
            })

        }).then(response => response.json())
            .then(res => {
                if (res === 'Không tìm thấy sản phẩm nào') {
                    this.setState({
                        khongcosanpham: true,
                    });
                } else {
                    this.setState({
                        data: res,
                        khongcosanpham: false,
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' }}>
                    <Back />
                    <Text style={{ color: 'rgba(128,0,0,1)', paddingVertical: 10 }}>
                        {this.props.item.TenLoai}
                    </Text>
                    <Text />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
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
                                            {item.DonGia + '₫'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>
                {this.state.khongcosanpham ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <Text >Không tìm thấy sản phẩm nào</Text>
                    </View>
                    : null}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        width: width / 2.04,
        height: height / 3,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 },
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