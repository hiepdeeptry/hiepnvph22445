import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Logo from '../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SignInScreen = () => {
  const navigation = useNavigation();

  // Khai báo các thông tin input
  const [users, setUsers] = useState([]);
  //Username
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  //Password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Hàm điều hướng màn hình
  const navigateHome = () => {
    navigation.navigate('Home')
  };

  // Function lấy dữ liệu từ API sử dụng fetch
  async function getUsers() {
    try {
      const response = await fetch('http://192.168.2.104:3000/users');
      const data = await response.json();
      //Gán dữ liệu cho users
      setUsers(data)
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  }

  // Funtion validate dữ liệu
  const validateAuthInfo = (authInfo) => {
    // Kiểm tra dữ liệu trên form gồm username và password

    if (authInfo.username === '') {
      setUsernameError('Username Không được để trống');
      return false;
    } else if (authInfo.password === '') {
      setUsernameError('');
      setPasswordError('Password không được để trống');
      return false;
    }
    return true;
  };


  // Funtion clear message lỗi

  const clearError = (usernameError, passwordError) => {
    if (usernameError) setUsernameError('');
    if (passwordError) setPasswordError('');
  };


      // Funtion lưu thông tin authentication vào AsyncStorage
  const storeAuthInfo = async (value) => {
    try {
      const authInfo = JSON.stringify(value);
      await AsyncStorage.setItem('authInfo', authInfo);
      console.log(authInfo)
    } catch (error) {
      console.log(error);
    }
  };
    // Funtion thực hiện đăng nhập
  const onPressSignIn = () => {
    let request = { username: username, password: password };
    console.log('authInfo: ' + JSON.stringify(request));

    if (users) {
      console.log(users);
      const validateResult = validateAuthInfo(request);

      if (validateResult === true) {
        const authInfo = users.find((user) => request.username === user.username);
        if (!authInfo) {  
          clearError(usernameError, passwordError);
          setUsernameError("Không tìm thấy tài khoản!")
        } else {
          if (!(authInfo.password === request.password)) {
            clearError(usernameError, passwordError);
            setPasswordError('Mật khẩu không chính xác');
            return;
          } else {
            clearError(usernameError, passwordError);
            storeAuthInfo(authInfo);
            Alert.alert('Thông báo', 'Đăng nhập thành công! ' + request.username, [
              { text: 'OK', onPress: () => navigateHome() },
              { text: 'Cancel', onPress: () => console.log('Press Cancel') }
            ]);
          }
        }
      }

    }

  };

  //Nạp dữ liệu
  useEffect(() => {
    getUsers();

  }, []);


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Logo} />
      <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
      <Text style={styles.errorTxt}>{usernameError}</Text>

      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
      <Text style={styles.errorTxt}>{passwordError}</Text>

      <CustomButton title='Sign in' onPress={onPressSignIn} />


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

  },
  errorTxt: {
    color: 'red',
    marginVertical: 10
  }





})