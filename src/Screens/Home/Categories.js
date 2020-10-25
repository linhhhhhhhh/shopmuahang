import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
export default class Categories extends Component {
  state = {
    datacategories: [],
    page: 6,
    xemtatca: true
  }
  functionXemTatCa() {
    if (this.state.page = 20) {
      this.requestCategories();
      this.setState({
        xemtatca: false
      })
    }
  }
  requestCategories() {
    fetch("https://whis1997.000webhostapp.com/Shopping/Categories.php?page=" + this.state.page)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          dataCategories: res,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.requestCategories()
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ paddingVertical: 20, marginHorizontal: 5, fontSize: 12, color: 'red' }}>DANH MỤC</Text>
          {this.state.xemtatca ?
            <TouchableOpacity onPress={() => this.functionXemTatCa()}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center', paddingVertical: 10 }} >
                <Text style={{ fontSize: 10, color: 'red' }}>Xem tất cả</Text>
                <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('../../../Logo/xuong.png')} />
              </View>
            </TouchableOpacity>
            : null
          }
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          data={this.state.dataCategories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Actions.categoriesdetail({ item })} >
              <View style={styles.item}>
                <Image style={{ width: width / 4, height: height / 9, resizeMode: 'contain' }} source={{ uri: item.HinhAnh }} />
                <Text style={styles.text} numberOfLines={2}>{item.TenLoai}</Text>
              </View>

            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  item: {
    flex: 1,
    width: width / 3,
    height: height / 5.3,
    backgroundColor: "white",

    shadowColor: "gray",
    shadowOpacity: 0.4,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    margin: 1,
    justifyContent: 'flex-start',
    alignItems: "center",


  },
  text: {
    fontSize: 10,
    position: 'absolute',
    marginTop: height / 8,
    marginHorizontal: 3,
    textAlign: 'center'
  },

});
