
// __________________________________________________________________

// khung nhét toàn bộ màn hình bọc để điều hướng
// Khai báo navigationContainer
// stack.navigator tạo thanh điều hướng inittialRouteName : Màn hình đầu khi bật || props
// Khai báo cosnst Stack

// B1 định nghĩa trong thẻ <StackActionHelpers.screen>
// B2 khai báo prop name (duy nhất)
// B3 khai báo component (tên màn muốn import)
// B4 ẩn dùng thuộc tính options headerShown
import { Button, Image, SafeAreaView, Picker, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.png'
import CustomStudent from '../components/CustomStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { SelectList } from 'react-native-dropdown-select-list';


const HomeScreen = () => {

  const navigation = useNavigation()
  const [listStudents, setListStudents] = useState([]);
  const [authInfo, setAuthInfo] = useState({});

  // const [id,setId] = useState();

  const [firtName, setFirtName] = useState('');
  const [firtNameError, setFirtNameError] = useState('');

  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');


  const [birthDay, setBirthDay] = useState('');
  const [birthDayError, setBirthDayError] = useState('');

  const [id, setId] = useState();









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

        setFirtName(JSON.parse(authInfo).firtName);
        setLastName(JSON.parse(authInfo).lastName);
        setEmail(JSON.parse(authInfo).email);
        setGender(JSON.parse(authInfo).gender);
        setBirthDay(JSON.parse(authInfo).birthDay);

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
  // Function update theo id

  const update = (id) => {
    fetch('http://192.168.2.104:3000/users/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ firtName: firtName, lastName: lastName, email: email, gender: gender, birthDay: birthDay }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  // Xoá dữ liệu
  const deleteStudent = async (item) => {
    try {
      const studentId = item.id;
      const API_URL = 'http://192.168.2.104:3000/students/' + studentId;
      const response = await fetch(API_URL, { method: 'DELETE' });
      if (response && response.status === 200) {
        getStudents();
      }
    } catch (error) {
      log.error('Delete data failed ' + error);
    }
  };

  //Tìm nạp data
  useEffect(() => {
    retrieveData();
    getStudents();


  }, [])


  const validateUpdate = (authInfo) => {
    if (authInfo.firtName === '' || authInfo.lastName === '') {
      setFirtNameError('Họ tên không được để trống!')
      return false;
    } else if (authInfo.email === '') {
      setFirtNameError('')
      setEmailError('Mail không được để trống')
      return false;
    } else if (authInfo.gender === '') {
      setEmailError('')
      setGenderError('Giới tính không được để trống')
      return false;

    } else if (authInfo.birthDay === '') {
      setGenderError('')
      setBirthDayError('Ngày sinh không được để trống')
      return false;
    }
    setFirtNameError('')
    setEmailError('')
    setGenderError('')
    setBirthDayError('');
    return true;

  }

  const handUpdate = (id) => {
    let request = { firtName: firtName, lastName: lastName, email: email, gender: gender, birthDay: birthDay }
    const validateResult = validateUpdate(request);
    if (validateResult) {
      try {
        update(id)
        ToastAndroid.show("Update thành công!", ToastAndroid.SHORT);
      } catch (error) {

      }
    }
  }
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
                  student={item} onDelete={deleteStudent} />

              </View>
            )
          })}
        </View>
      </ScrollView>
    )

  }




  const formStaffs = (authInfo) => {

    return (
      <View style={{ backgroundColor: 'white', padding: 10, justifyContent: 'center' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TextInput style={{
            flex: 6,
            borderWidth: 1,
            padding: 10,
            marginRight: 10,
            borderRadius: 10
          }} value={firtName} placeholder='Tên' onChangeText={(firtName) => {
            setFirtName(firtName);
          }}  ></TextInput>

          <TextInput style={{
            flex: 6,
            borderWidth: 1,
            padding: 10,
            marginRight: 10,
            borderRadius: 10


          }} value={lastName} placeholder='Họ' onChangeText={(lastName) => {
            setLastName(lastName);
          }}></TextInput>
        </View>
        <Text style={styles.errorTxt}>{firtNameError}</Text>


        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10,
          marginTop: 20

        }} value={email} placeholder='Email' onChangeText={(email) => {
          setEmail(email);
        }}></TextInput>
        <Text style={styles.errorTxt}>{emailError}</Text>

        <SelectList
          dropdownStyles={{
            padding: 10,
            marginRight: 10,
            borderRadius: 10,
            marginTop: 20
          }}
          data={[
            { key: 'Nam', value: 'Nam' },
            { key: 'Nữ', value: 'Nữ' }
          ]}
          setSelected={setGender}

        />
        {/* <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10,
          marginTop: 20

        }} value={gender} placeholder='Gender' onChangeText={(gender) => {
          setGender(gender);
        }}></TextInput>
        <Text style={styles.errorTxt}>{genderError}</Text> */}

        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 10

        }} value={birthDay} placeholder='Birthday' onChangeText={(birthDay) => {
          setBirthDay(birthDay);
        }}></TextInput>
        <Text style={styles.errorTxt}>{birthDayError}</Text>


        <CustomButton onPress={() => {
          handUpdate(authInfo.id)
        }} title={'save'} />
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <View>
        {authInfo?.role === 'ADMIN' ? renderStudents() : formStaffs(authInfo)}
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

  errorTxt: {
    color: 'red',
    marginVertical: 10
  }





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