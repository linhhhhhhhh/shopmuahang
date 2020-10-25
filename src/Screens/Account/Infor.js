import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    FlatList,
    ScrollView
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Back from './../Back'
import ImagePicker from 'react-native-image-picker';
export default class Infor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: "",
            tk: '',
            dc: '',
        }
    }
    handleChoosePhoto(item) {
        const options = {
            title: 'Thêm sản phẩm từ',
            takePhotoButtonTitle: 'Máy ảnh',
            chooseFromLibraryButtonTitle: 'Hình ảnh',
        }
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
                var image = source
                var data = response.data
                let dienthoai = item.DienThoai
                Actions.editphoto({ image, data, dienthoai });
            }
        });

    }
    async functionGetUserEdit() {
        try {
            let kh = await AsyncStorage.getItem("@KH")
            this.setState({
                dataUser:  JSON.parse(kh),
            })

        } catch (e) {
            console.log(e)
        }
    }
    async functionEdit() {
        try {
            let dienthoai = await AsyncStorage.getItem("@DienThoai")
            const { tk, dc } = this.state;
            if (tk != "" && dc != "") {
                fetch('https://whis1997.000webhostapp.com/Shopping/Edit.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TenKhach: tk,
                        DiaChi: dc,
                        DienThoai: dienthoai
                    })

                }).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson === 'Success') {
                            Actions.account();
                        } else {
                            alert(responseJson);
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                ToastAndroid.show("Vui lòng nhập thông tin hợp lệ", ToastAndroid.SHORT);

            }
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {
        this.functionGetUserEdit();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Back />
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.functionEdit()}>
                        <Text style={{ color: '#E74C3C', fontSize: 10 }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView >
                    <KeyboardAvoidingView>
                        <FlatList
                            data={this.state.dataUser}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: width / 1.02, margin: 10, alignItems: 'center' }}>
                                        <Image style={{ width: 80, height: 80, borderWidth: 1, borderColor: '#000' }} source={{ uri: item.Avatar }} />
                                        <TouchableOpacity onPress={() => this.handleChoosePhoto(item)}>
                                            <Text style={{ padding: 10, justifyContent: 'center', fontSize: 10 }}>Sửa hình ảnh</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                        <Text style={{ fontSize: 10, marginVertical: 10 }} >Họ tên</Text>
                                        <TextInput placeholder={item.TenKhach}
                                            placeholderTextColor="#ccc"
                                            returnKeyType='next'
                                            autoCorrect={false}
                                            underlineColorAndroid="transparent"
                                            style={styles.txtInput} onChangeText={(TenKhach) => this.setState({ tk: TenKhach })} />
                                    </View>

                                    <View style={{ flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                        <Text style={{ fontSize: 10, marginVertical: 10 }} >Địa chỉ</Text>
                                        <TextInput placeholder={item.DiaChi}
                                            placeholderTextColor="#ccc"
                                            returnKeyType='next'
                                            autoCorrect={false}
                                            underlineColorAndroid="transparent"
                                            style={styles.txtInput} onChangeText={(DiaChi) => this.setState({ dc: DiaChi })} />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                        <Text style={styles.txtText} >Giới tính</Text>
                                        <Text style={{ color: "red", textAlign: 'right', width: width / 1.05, padding: 10, fontSize: 10 }}>{item.GioiTinh}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                        <Text style={styles.txtText} >Điện thoại</Text>
                                        <Text style={{ color: "red", textAlign: 'right', width: width / 1.05, padding: 10, fontSize: 10 }}>{item.DienThoai}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                        <Text style={styles.txtText} >Email</Text>
                                        <Text style={{ color: "red", textAlign: 'right', width: width / 1.05, padding: 10, fontSize: 10 }}>{item.Email}</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', width: width / 1.05, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                            <Text style={{ fontSize: 10 }} >Thay đổi mật khẩu</Text>
                                            <Image style={{ width: 15, height: 15, padding: 10 }} source={require('../../../Logo/morethan.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    txtText: {
        fontSize: 10,
        paddingVertical: 10,
        textAlign: 'left',
        position: 'absolute'
    },
    txtInput: {
        paddingVertical: -10,
        fontSize: 9,
        textAlign: 'right',
    },

})