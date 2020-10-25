import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Back from './../Back'
export default class Sale extends Component {
    handleChoosePhoto = () => {
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
                let image = { uri: response.uri };
                var hinhanh = response.data
                var mk = this.props.item.MaKhach
                Actions.addsale({ image, hinhanh, MaKhach: mk });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Back />
                    <Text style={{paddingVertical:10,marginLeft:-10,fontSize:18,fontWeight:'bold',color:'rgba(128,0,0,1)'}}>Bắt đầu bán hàng</Text>
                    <Text></Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'rgba(128,0,0,1)', padding: 10 }} onPress={this.handleChoosePhoto}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>Thêm sản phẩm</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    // container: {
    //     justifyContent: 'center',
    //     margin: 5,
    //     shadowOffset: { width: 0, height: 5 },
    //     shadowColor: '#000',
    //     shadowOpacity: 0.7,
    //     shadowRadius: 5,
    //     elevation: 1,
    // },

})