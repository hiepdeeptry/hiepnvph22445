
// __________________________________________________________________

// khung nhét toàn bộ màn hình bọc để điều hướng
// Khai báo navigationContainer
// stack.navigator tạo thanh điều hướng inittialRouteName : Màn hình đầu khi bật || props
// Khai báo cosnst Stack

// B1 định nghĩa trong thẻ <StackActionHelpers.screen>
// B2 khai báo prop name (duy nhất)
// B3 khai báo component (tên màn muốn import)
// B4 ẩn dùng thuộc tính options headerShown
import { Button, Image, SafeAreaView, Picker, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.png'
import CustomStudent from '../components/CustomStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { SelectList } from 'react-native-dropdown-select-list';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import User from '../assets/avatar.png'



const HomeScreen = () => {

  const navigation = useNavigation()
  const [listStudents, setListStudents] = useState([]);
  const [authInfo, setAuthInfo] = useState({});

  // const [id,setId] = useState();

  const [avatar, setAvatar] = useState('');

  const [studentID, setStudentID] = useState('');
  const [studentIDError, setStudentIDError] = useState('');


  const [studentName, setStudentName] = useState('');
  const [studentNameError, setStudentNameError] = useState('');


  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');


  const [birthDay, setBirthDay] = useState('');
  const [birthDayError, setBirthDayError] = useState('');

  const [id, setId] = useState();

  const [open, setOpen] = useState(false)












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
      await setListStudents(data);
    } catch (error) {
      console.log('Lỗi lấy dữ liệu! ' + error);
      return null;
    }
  }
  // Function update user theo id

  // const updateUser = (id) => {
  //   fetch('http://192.168.2.104:3000/users/' + id, {
  //     method: 'PATCH',
  //     body: JSON.stringify({ firtName: firtName, lastName: lastName, email: email, gender: gender, birthDay: birthDay }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }

  //Save
  const insert = (students) => {
    fetch('http://192.168.2.104:3000/students', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(students),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('response object:', responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
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
      console.log('Delete data failed ' + error);
    }
  };

  //Tìm nạp data
  useEffect(() => {
    retrieveData();
    getStudents();


  }, [])


  const checkRequired = (id) => {
    for (const student of listStudents) {
      if (student.studentID === id) {
        return false
      }
    }
    return true

  }

  const validateUpdate = (authInfo) => {
    if (authInfo.studentID === '') {
      setStudentNameError('')
      setEmailError('')
      setGenderError('')
      setBirthDayError('');
      setStudentIDError('Mã sinh viên không được để trống!')
      return false
    } else if (authInfo.studentName === '') {
      console.log(authInfo.studentID)

      setStudentIDError('');
      setEmailError('')
      setGenderError('')
      setBirthDayError('');
      setStudentNameError('Họ tên không được để trống!')
      return false;
    } else if (authInfo.email === '') {
      setStudentIDError('');
      setStudentNameError('')
      setGenderError('')
      setBirthDayError('');
      setEmailError('Mail không được để trống')
      return false;
    } else if (authInfo.gender === '') {
      setStudentIDError('');
      setStudentNameError('')
      setEmailError('')
      setBirthDayError('');
      setGenderError('Giới tính không được để trống')
      return false;

    } else if (authInfo.birthDay === '') {
      setStudentIDError('');
      setStudentNameError('')
      setEmailError('')
      setGenderError('')
      setBirthDayError('Ngày sinh không được để trống')
      return false;
    }
    if (!checkRequired(authInfo.studentID)) {
      setStudentNameError('')
      setEmailError('')
      setGenderError('')
      setBirthDayError('');
      setStudentIDError('Mã sinh viên đã tồn tại!')
      return false
    }

    setStudentIDError('');
    setStudentNameError('')
    setEmailError('')
    setGenderError('')
    setBirthDayError('');
    return true;

  }

  const handInsert = () => {
    let request = {avatar:avatar, studentID: studentID, studentName: studentName, email: email, gender: gender, birthDay: birthDay }
    const validateResult = validateUpdate(request);
    if (validateResult) {
      try {
        insert(request);
        getStudents();
        ToastAndroid.show("Update thành công!", ToastAndroid.SHORT);
      } catch (error) {

      }
    }
  }

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false)

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setBirthDay(fDate);

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
                  student={item} onRefresh={getStudents} onDelete={deleteStudent} />
              </View>

            )
          })}

        </View>
      </ScrollView>
    )

  }




  const formStaffs = () => {

    return (
      <View style={{ backgroundColor: 'white', padding: 10, justifyContent: 'center' }}>

        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.image} />
            ) : (
              <Image source={User} style={styles.image} />
            )}
          </TouchableOpacity>
        </View>

        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10
        }} placeholder='Mã sinh viên' onChangeText={(studentID) => {
          setStudentID(studentID);
        }}></TextInput>

        <Text style={styles.errorTxt}>{studentIDError}</Text>

        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10
        }} placeholder='Họ và tên' onChangeText={(studentName) => {
          setStudentName(studentName);
        }}></TextInput>
        <Text style={styles.errorTxt}>{studentNameError}</Text>


        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10,

        }} value={email} placeholder='Email' onChangeText={(email) => {
          setEmail(email);
        }}></TextInput>
        <Text style={styles.errorTxt}>{emailError}</Text>

        <SelectList
          boxStyles={{ marginRight: 10 }}
          dropdownStyles={{
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
        <Text style={styles.errorTxt}>{genderError}</Text>

        <TextInput style={{
          borderWidth: 1,
          padding: 10,
          marginRight: 10,
          borderRadius: 10,
          marginBottom: 10

        }} onFocus={() => { setOpen(true) }} value={birthDay} placeholder='Birthday' ></TextInput>

        {open && (<RNDateTimePicker
          mode='date'
          display='calendar'
          value={new Date()}
          maximumDate={new Date(2023, 10, 20)}
          minimumDate={new Date(1900, 0, 1)}
          onChange={onChange}

        />)}

        <Text style={styles.errorTxt}>{birthDayError}</Text>


        <CustomButton onPress={() => {
          handInsert()
          getStudents();
        }} title={'save'} />
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      {authInfo?.role === 'ADMIN' ? renderStudents() : formStaffs(authInfo)}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
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
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
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