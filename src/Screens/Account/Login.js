import React, { Component } from 'react';
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
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      dt: '',
      mk: '',
      show: false,
    };
  }
  functionLogin = async () => {
    this.setState({
      show: true,
    });
    const { dt, mk } = this.state;
    if (dt != '' && mk != '') {
      fetch('https://whis1997.000webhostapp.com/Shopping/Login.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DienThoai: dt,
          MatKhau: mk,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === 'Tài khoản hoặc mật khẩu không chính xác!') {
            this.setState({
              show: false,
            });
            alert(responseJson)
          } else {
            this.setState({
              show: false, 
            });
            try {
              AsyncStorage.setItem('@KH', JSON.stringify(responseJson));
              //Actions.home();
              Actions.root();
              
            } catch (e) {
              console.log(e);
            }
          }

        })
        .catch(error => {
          console.error(error);
        });
    } else {
      if (dt === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập số điện thoại');
      }
      if (mk === '') {
        this.setState({
          show: false,
        });
        return Alert.alert('Nhập mật khẩu');
      }
    }
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
  render() {
    return (
      <View style={{ flex: 1 }}>
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
        <ScrollView>
          <SafeAreaView>
            <KeyboardAvoidingView>
              <ImageBackground
                style={{
                  width: width / 1,
                  height: 200,
                  justifyContent: 'space-between',
                }}
                source={require('../../../Logo/nen3.jpg')}>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => Actions.pop()}>
                  <Image
                    style={{ width: 25, height: 25, tintColor: '#fff' }}
                    source={require('../../../Logo/back.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
              <View
                style={{ flex: 1, backgroundColor: '#fff', marginHorizontal: 5 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#000',
                    marginVertical: 2,
                  }}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      alignContent: 'center',
                      marginVertical: 15,
                      tintColor: 'rgba(0,0,0,0.2)',
                    }}
                    source={require('../../../Logo/phone.png')}
                  />
                  <TextInput
                    placeholder="Số điện thoại"
                    placeholderTextColor="#ccc"
                    returnKeyType="next"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    style={{ color: '#000', fontSize: 12, width: width / 1 }}
                    onChangeText={DienThoai => this.setState({ dt: DienThoai })}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#000',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        alignContent: 'center',
                        marginVertical: 15,
                        tintColor: 'rgba(0,0,0,0.2)',
                      }}
                      source={require('../../../Logo/password.png')}
                    />
                    <TextInput
                      placeholder="Nhập mật khẩu đăng nhập"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ccc"
                      secureTextEntry={this.state.showPass}
                      returnKeyType="next"
                      autoCorrect={false}
                      style={{ color: '#000', fontSize: 12, width: width / 1 }}
                      onChangeText={MatKhau => this.setState({ mk: MatKhau })}
                    />
                  </View>
                  <TouchableOpacity activeOpacity={0.7} onPress={this.showPass}>
                    <Image
                      source={require('../../../Logo/eye_black.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: 'rgba(0,0,0,0.2)',
                        marginVertical: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={this.functionLogin}
                  style={styles.btnLogin}>
                  <Text style={styles.txtLogin}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                  <Text style={{ fontSize: 10, color: '#000' }}>
                    Bạn chưa có tài khoản?
                  </Text>
                  <TouchableOpacity onPress={() => Actions.register()}>
                    <Text style={styles.txtRegister}>ĐĂNG KÝ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: 'rgba(128,0,0,1)',
    padding: 15,
    marginVertical: 15,
  },
  txtLogin: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
  txtRegister: {
    fontSize: 10,
    color: '#008b8b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
