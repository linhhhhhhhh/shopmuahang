import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { connect } from 'react-redux';
import Back from './../Back';
import { emptyCart } from './../../redux/actions/cartActions';
import { Actions } from 'react-native-router-flux';
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      show:false
    };
  }
  async functioninfor() {
    try {
      let kh = await AsyncStorage.getItem('@KH');
      this.setState({
        dataUser: JSON.parse(kh),
      });
    } catch (e) {
      console.log(e);
    }
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
  getTotal() {
    const { items } = this.props;
    if (items.length > 0) {
      let tongtien = 0;

      for (let i = 0; i < items.length; i++) {
        tongtien += items[i].product.DonGia * items[i].quantity;
      }
      return (
        <View
          style={{
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderTopColor: '#8b000',
            borderTopWidth: 2
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 10,
                marginHorizontal: 5,
                textAlign: 'center',
                marginVertical: 2,
              }}>
              Tổng thanh toán:
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: 5,
                color: 'rgba(128,0,0,1)',
                textAlign: 'center',
              }}>
              {this.convert(tongtien.toString())}₫
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.orderButton}
            style={{
              paddingHorizontal: 30,
              marginHorizontal: 5,
              paddingVertical: 10,
              backgroundColor: 'rgba(128,0,0,1)',
            }}>
            <Text style={{ color: '#fff', fontSize: 10 }}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  orderButton = () => {
    const { items, emptyCart } = this.props;
    const { dataUser } = this.state;
    this.setState({
      show: true,
    });
    for (let i = 0; i < dataUser.length; i++) {
      for (let j = 0; j < items.length; j++) {
        fetch('https://whis1997.000webhostapp.com/Shopping/dondathang.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SoLuong: items[j].quantity,
            MaHang: items[j].id,
            MaKhach: dataUser[i].MaKhach
          }),
        }).then(response => response.json())
          .then(responseJson => {
            if (responseJson === 'Success!') {
              this.setState({
                show: false,
              });
              Alert.alert(
                '',
                'Đặt hàng thành công, mời bạn tiếp tục mua hàng!',
                [
                  {
                    text: 'OK', onPress: () => {
                      emptyCart();
                      Actions.root()
                    }
                  },
                ],
                { cancelable: true }
              )

            }
          })
          .catch(error => {
            console.error(error);
          });
      }

    }
  }
  componentDidMount() {
    this.functioninfor();
  }
  render() {
    const { items } = this.props;
    return (
      
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Back />
          <Text
            style={{
              color: 'rgba(128,0,0,1)',
              paddingVertical: 10,
              marginLeft: -10,
            }}>
            Thanh toán
          </Text>
          <Text />
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
              <View
                style={{
                  flex: 1,
                  marginVertical: 2,
                  justifyContent: 'space-between',
                  backgroundColor: '#ffdead',
                  elevation: 1,
                  marginHorizontal: 2,
                }}>
                <TouchableOpacity onPress={() => Actions.address()}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.dataUser}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: '#region',
                          marginBottom: 1,
                          paddingVertical: 5,
                          elevation: 2,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                        <View>
                          <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
                            <Image
                              style={{ width: 15, height: 15, padding: 2, marginHorizontal: 5 }}
                              source={require('../../../Logo/location.png')}
                            />
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                              }}>
                              Địa chỉ nhận hàng
                      </Text>
                          </View>
                          <Text style={{ marginHorizontal: 20, fontSize: 9 }}>
                            {item.TenKhach + ' | ' + item.DienThoai}
                          </Text>
                          <Text style={{ marginHorizontal: 20, fontSize: 9 }}>
                            {item.Email}
                          </Text>
                          <Text style={{ marginHorizontal: 20, fontSize: 9 }}>
                            Thành phố Thái Nguyên, Xã Quyết Thắng, {item.DiaChi}
                          </Text>
                        </View>
                        <Image style={{ width: 10, height: 10, margin: 5, tintColor: 'black' }} source={require('../../../Logo/morethan2.png')} />
                      </View>
                    )}
                    keyExtractor={(item, index) => item.toString()}
                  />
                </TouchableOpacity>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={items}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'peru',
                        elevation: 5,
                        margin: 5,
                        shadowColor: 'grey',
                      }}>
                      <View style={{ flexDirection: 'row', margin: 5, marginVertical: 10 }}>
                        <Image
                          style={{ width: 15, height: 15, padding: 2, marginHorizontal: 5 }}
                          source={require('../../../Logo/iconshop.png')}
                        />
                        <Text
                          style={{
                            color: 'rgba(black,0,0,1)',
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}>
                          {item.product.TenKhach}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            resizeMode: 'contain',
                            width: 70,
                            height: 70,
                            margin: 5,
                          }}
                          source={{ uri: item.product.HinhAnh }}
                        />
                        <View
                          style={{
                            flex: 1,
                            marginHorizontal: 5,
                            marginVertical: 5,
                          }}>
                          <Text
                            style={{ color: 'rgba(black,0,0,1)', fontSize: 10 }}>
                            {item.product.TenHang}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                color: 'rgba(128,0,0,1)',
                                fontSize: 10,
                                fontWeight: 'bold',
                                marginVertical: 5,
                              }}>
                              {'₫ ' + this.convert((item.product.DonGia * item.quantity).toString())}
                            </Text>
                            <Text
                              style={{
                                paddingVertical: 2,
                                marginTop: 20,
                                fontSize: 8,
                              }}>
                              X{item.quantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => item.toString()}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {this.getTotal()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.cart.cartItem,
  };
};
export default connect(mapStateToProps, { emptyCart })(Order);
