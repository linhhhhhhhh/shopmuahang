import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {height} = Dimensions.get ('window');
const {width} = Dimensions.get ('window');
import RNFetchBlob from 'rn-fetch-blob';
import {Actions} from 'react-native-router-flux';
import Back from './../Back';
export default class EditPhoto extends Component {
  functionEditPhoto () {
    RNFetchBlob.fetch (
      'POST',
      'https://whis1997.000webhostapp.com/Shopping/EditPhoto.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
          data: this.props.data,
        },
        {name: 'DienThoai', data: this.props.dienthoai},
      ]
    )
      .then (response => response.json ())
      .then (responseJson => {
        if (responseJson === 'Success') {
          Actions.account ();
        } else {
          alert (responseJson);
        }
      })
      .catch (error => {
        console.error (error);
      });
  }
  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Back />
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => this.functionEditPhoto ()}
          >
            <Text style={{color: '#E74C3C', fontSize: 12}}> Lưu </Text>
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: '100%',
            height: 400,
            borderWidth: 1,
            borderColor: '#000',
          }}
          source={this.props.image}
        />
      </View>
    );
  }
}
