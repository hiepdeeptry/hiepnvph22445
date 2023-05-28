// khung nhét toàn bộ màn hình bọc để điều hướng
// Khai báo navigationContainer
// stack.navigator tạo thanh điều hướng inittialRouteName : Màn hình đầu khi bật || props
// Khai báo cosnst Stack

// B1 định nghĩa trong thẻ <StackActionHelpers.screen>
// B2 khai báo prop name (duy nhất)
// B3 khai báo component (tên màn muốn import)
// B4 ẩn dùng thuộc tính options headerShown
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.png'



const HomeScreen = ({ navigation }) => {

  const [listUsers, setListUsers] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch('http://192.168.2.104:3000/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  }

  async function getData() {
    setListUsers(await fetchData());
  }

  getData();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomButton title={"Go to Login Screen"} onPress={navigateToLogin} />
        <Text style={styles.txtHome}>Home</Text>
      </View>
      <ScrollView contentContainerStyle={{
        padding: 20,
        backgroundColor: 'white',
      }}>
        <View >
          {listUsers.map((item, index) => {
            return (
              <View style={styles.itemList} key={index}>
                <View >
                  <Image style={styles.icon} source={Logo}></Image>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text style = {{fontWeight:'bold' , fontSize:20}}>{item.lastName + " " + item.firtName} </Text>
                  <Text>{item.gender} </Text>
                  <Text>{item.email} </Text>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e1e1'
  },

  listContainer :{
    flexDirection:'row',
    marginBottom:20
    
  },


  txtHome: {
    padding: 10,
    backgroundColor: "#e1e1e1",
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',

  },

  itemList: {
    paddingVertical: 15,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 0.5,
    flexDirection:'row',
  },

  icon:{
    width:100,
    height:100,
    borderRadius:100,
    backgroundColor:'#e6e6e6',
    marginRight:20
  }

})

