// khung nhét toàn bộ màn hình bọc để điều hướng
// Khai báo navigationContainer
// stack.navigator tạo thanh điều hướng inittialRouteName : Màn hình đầu khi bật || props
// Khai báo cosnst Stack

// B1 định nghĩa trong thẻ <StackActionHelpers.screen>
// B2 khai báo prop name (duy nhất)
// B3 khai báo component (tên màn muốn import)
// B4 ẩn dùng thuộc tính options headerShown
 import { Button, StyleSheet, Text, View } from 'react-native'
 import React from 'react'
import styles from '../styles/mainStyle';
import { useState } from 'react';


 
 const HomeScreen = ({navigation}) => {
     const navigateToLogin = () => {
        navigation.navigate('Login');
     }

     return (
     <View>
      <Button title='Go to Login Screen' onPress={navigateToLogin}/>
     </View>
   )
 }
 
 export default HomeScreen
 
