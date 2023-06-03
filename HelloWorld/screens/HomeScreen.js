// khung nhét toàn bộ màn hình bọc để điều hướng
// Khai báo navigationContainer
// stack.navigator tạo thanh điều hướng inittialRouteName : Màn hình đầu khi bật || props
// Khai báo cosnst Stack

// B1 định nghĩa trong thẻ <StackActionHelpers.screen>
// B2 khai báo prop name (duy nhất)
// B3 khai báo component (tên màn muốn import)
// B4 ẩn dùng thuộc tính options headerShown
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.png'
import CustomStudent from '../components/CustomStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

  const navigation = useNavigation()
  const [listStudents, setListStudents] = useState([]);
  const [authInfo, setAuthInfo] = useState();


  // Hàm điều hướng
  const navigateToLogin = () => {
    navigation.navigate('Login');
  }

  //  
  const retrieveData = async () => {
    try {
      const authInfo = await AsyncStorage.getItem('authInfo');
      if (authInfo !== null) {
        console.log('====> authInfo from AsyncStorage', authInfo);
        setAuthInfo(JSON.parse(authInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Logout
  const doLogout = () => {
    AsyncStorage.removeItem('authInfo');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };


  // Function lấy dữ liệu từ API sử dụng fetch
  async function getStudents() {
    try {
      const response = await fetch('http://192.168.2.104:3000/students');
      const data = await response.json();
      setListStudents(data);
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  }

  //Tìm nạp data
  useEffect(() => {
    retrieveData();
    getStudents();

  }, [])


  const renderStudents = () => {
    return (
      <ScrollView contentContainerStyle={{
        padding: 20,
        backgroundColor: 'white',
      }}>
        <View >
          {listStudents.map((item, index) => {
            return (
              <View key={index}>
                <CustomStudent
                  student={item} />

              </View>
            )
          })}
        </View>
      </ScrollView>
    )

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {authInfo ? <CustomButton onPress={doLogout} title={"Logout"} /> : <CustomButton onPress={navigateToLogin} title={"Go to login screen"} />}
        <Text style={styles.txtHome}>Home</Text>
        {authInfo?.role === 'ADMIN' ? renderStudents() : null}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e1e1'
  },

  listContainer: {
    flexDirection: 'row',
    marginBottom: 20

  },


  txtHome: {
    padding: 10,
    backgroundColor: "#e1e1e1",
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',

  },





})


/*
 component lifecycle  vòng đời của một component
 3 trạng thái
 mounting :khi component được gọi thì chạy mounting đầu tiêu ||  khởi tạo trạng thái ban đầu của component
      DOM là các thẻ
      contractor : định nghĩa thuộc tính || cấu trúc của component;
      componentDidmount : gọi ngay sau quá trình đầu tiên xảy ra khi class đc gọi đến
  unmounting : chỉ chạy khi gọi componentwillUnmount

*/

//useEffect chạy một lần khi mounting