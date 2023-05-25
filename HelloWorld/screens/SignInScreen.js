import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Logo from '../assets/images/logo.png'

const SignInScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let users = [];


  const onPressSignIn = () => {
    // let request = { username: username, password: password };
    // // ToastAndroid.show('Xin chào '+request.username,ToastAndroid.SHORT);
    // Alert.alert('Thông báo!', 'Xin chào ' + request.username, [
    //   { text: 'Cancel', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
    //   { text: 'Ok', onPress: () => { console.log('OK Pressed') } }
    // ])

    if (username.length == 0) {
      alert('Tài khoản trống!');
      return;
    }

    if (password.length == 0) {
      alert('Mật khẩu trống!');
      return;

    }

    let request = { username: username, password: password };

    if (users) {
      const authInfo = users.find((user) => user.userName === request.username);

      if (!authInfo) {
          Alert.alert('Thông báo!', 'Không tìm thấy tài khoản', [{ text: 'Cancel', onPress: () => console.log('Không tìm thấy user:  ' + request.username) }]);
      } else {
          if (!(authInfo.password === request.password)) {
              Alert.alert('Thông báo', 'Mật khẩu không chính xác!', [{ text: 'Cancel', onPress: () => console.log('Mật khẩu sai với user:  ' + request.username) }]);
          } else {
              Alert.alert('Thông báo', 'Đăng nhập thành công! ' + request.username, [
                  { text: 'OK', onPress: () => navigateToHome() },
                  { text: 'Cancel', onPress: () => console.log('Press Cancel') }
              ]);
          }
      }
  }



  };



  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  }

  async function getData() {
    users = await fetchData();
  }

 getData();

  const navigateHome = () => {
    navigation.navigate('Home')

  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Logo} />
      <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />

      <CustomButton title='Sign in' onPress={onPressSignIn} />
      <CustomButton title='Back to home' onPress={navigateHome} />


    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,

  },
  image: {
    width: '100%',

  }





})