import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  AsyncStorage,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
var gioitinh = [{label: 'Nam', value: 'Nam'}, {label: 'Nữ', value: 'Nữ'}];

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      tk: '',
      dc: '',
      gt: '',
      ns: '',
      dt: '',
      em: '',
      mk: '',
      ImageSource: null,
      data: null,
      show: false,
    };
  }
  handleChoosePhoto = () => {
    const options = {
      title: 'Thêm sản phẩm từ',
      takePhotoButtonTitle: 'Máy ảnh',
      chooseFromLibraryButtonTitle: 'Hình ảnh',
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        this.setState({
          ImageSource: source,
          data: response.data,
        });
      }
    });
  };
  showPass = () => {
    if (this.state.press == false) {
      this.setState({
        showPass: false,
        press: true,
      });
    } else {
      this.setState({
        showPass: true,
        press: false,
      });
    }
  };
  functionLogin = () => {
    this.setState({
      show: true,
    });
    if (
      this.state.tk != '' &&
      this.state.dc != '' &&
      this.state.gt != '' &&
      this.state.ns != '' &&
      this.state.dt != '' &&
      this.state.em != '' &&
      this.state.mk != '' &&
      this.state.data != null
    ) {
      RNFetchBlob.fetch(
        'POST',
        'https://whis1997.000webhostapp.com/Shopping/Register.php',
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
            data: this.state.data,
          },
          {name: 'TenKhach', data: this.state.tk},
          {name: 'DiaChi', data: this.state.dc},
          {name: 'GioiTinh', data: this.state.gt},
          {name: 'NgaySinh', data: this.state.ns},
          {name: 'DienThoai', data: this.state.dt},
          {name: 'Email', data: this.state.em},
          {name: 'MatKhau', data: this.state.mk},
        ],
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === 'Đăng ký thành công!') {
            this.setState({
              show: false,
            });
            alert(responseJson);
            Actions.login();
          } else {
            alert(responseJson);
            this.setState({
              show: false,
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      if (this.state.tk === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập tên');
      }
      if (this.state.dc === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập địa chỉ');
      }
      if (this.state.gt === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập giới tính');
      }
      if (this.state.ns === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập vào ngày sinh');
      }
      if (this.state.dt === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập số điện thoại');
      }
      if (this.state.em === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập email');
      }
      if (this.state.mk === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập mật khẩu');
      }
      if (this.state.data === null) {
        this.setState({
          show: false,
        });
        return Alert.alert('Chọn ảnh');
      }
    }
  };
  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        {this.state.show ? (
          <ActivityIndicator style={{height: height / 1,backgroundColor: 'rgba(52, 52, 52, 0.5)'}} />
        ) : null}
        <ScrollView>
          <SafeAreaView>
            <KeyboardAvoidingView>
              <Image
                style={{
                  width: width / 1,
                  height: height / 4,
                  resizeMode: 'stretch',
                  alignContent: 'center',
                }}
                source={require('../../../Logo/nen1.jpg')}
              />
              <View style={{flex: 1, backgroundColor: '#fff', margin: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 90,
                      height: 90,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}
                    source={this.state.ImageSource}
                  />
                  <TouchableOpacity onPress={this.handleChoosePhoto}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        fontSize: 12,
                        marginHorizontal: 5,
                      }}>
                      Chọn ảnh
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Họ tên"
                  placeholderTextColor="#ccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  style={styles.txtInput}
                  onChangeText={TenKhach => this.setState({tk: TenKhach})}
                />
                <TextInput
                  placeholder="Địa chỉ"
                  placeholderTextColor="#ccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  style={styles.txtInput}
                  onChangeText={DiaChi => this.setState({dc: DiaChi})}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text
                    style={{fontSize: 10, color: '#ccc', marginVertical: 15}}>
                    Giới tính
                  </Text>
                  <RadioForm
                    style={{flexDirection: 'row', marginVertical: 15}}
                    radio_props={gioitinh}
                    initial={0}
                    selectedButtonColor={'green'}
                    selectedLabelColor={'green'}
                    labelStyle={{
                      fontSize: 10,
                      marginVertical: -10,
                      marginHorizontal: 2,
                    }}
                    onPress={value => this.setState({gt: value})}
                    buttonSize={5}
                  />
                </View>
                <View
                  style={{
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text
                    style={{fontSize: 10, color: '#ccc', marginVertical: 10}}>
                    Ngày sinh
                  </Text>
                  <DatePicker
                    style={{
                      width: 150,
                      color: 'red',
                      fontSize: 10,
                      textAlign: 'center',
                      paddingBottom: 5,
                    }}
                    date={this.state.ns}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1990-05-01"
                    maxDate="2020-03-03"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        marginLeft: 0,
                      },
                    }}
                    onDateChange={NgaySinh => {
                      this.setState({ns: NgaySinh});
                    }}
                  />
                </View>
                <TextInput
                  placeholder="Số điện thoại"
                  placeholderTextColor="#ccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  style={styles.txtInput}
                  onChangeText={DienThoai => this.setState({dt: DienThoai})}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#ccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  style={styles.txtInput}
                  onChangeText={Email => this.setState({em: Email})}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    borderColor: '#ccc',
                  }}>
                  <TextInput
                    placeholder="Mật khẩu"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#ccc"
                    secureTextEntry={this.state.showPass}
                    returnKeyType="next"
                    autoCorrect={false}
                    style={{width: width / 1.15, color: '#000', fontSize: 10}}
                    onChangeText={MatKhau => this.setState({mk: MatKhau})}
                  />
                  <TouchableOpacity
                    style={{padding: 10}}
                    activeOpacity={0.7}
                    onPress={this.showPass}>
                    <Image
                      source={require('../../../Logo/eye_black.png')}
                      style={{
                        width: 20,
                        marginVertical: 5,
                        height: 20,
                        tintColor: 'rgba(0,0,0,0.2)',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={this.functionLogin}
                  style={styles.btnLogin}>
                  <Text style={styles.txtLogin}> ĐĂNG KÝ </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.login()}
                  style={{
                    backgroundColor: '#fff',
                    marginVertical: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text
                    style={{textAlign: 'center', color: '#000', fontSize: 10}}>
                    ĐĂNG NHẬP
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  txtInput: {
    color: '#000',
    fontSize: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  btnLogin: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 10,
  },
  txtLogin: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  },
  txtRegister: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
