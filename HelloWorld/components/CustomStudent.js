import { Alert, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import CustomInput from './CustomInput';
import { SelectList } from 'react-native-dropdown-select-list';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';


const CustomStudent = (
    {
        student,
        onDelete,
        onRefresh
    }) => {

    const [open, setOpen] = useState(false)

    const [visible, setVisible] = useState(false);

    const [avatar, setAvatar] = useState(student.avatar);
    const [newAvatar, setNewAvatar] = useState(avatar);

    const [studentName, setStudentName] = useState(student.studentName);
    const [studentID, setStudentID] = useState(student.studentID);
    const [email, setEmail] = useState(student.email);
    const [gender, setGender] = useState(student.gender);
    const [birthDay, setBirthDay] = useState(student.birthDay);

    const updateStudent = (id) => {
        fetch('http://192.168.2.104:3000/students/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: newAvatar, studentID: studentID, studentName: studentName, email: email, gender: gender, birthDay: birthDay }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        onRefresh(() => { onRefresh() });

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false)

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setBirthDay(fDate);

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
            setNewAvatar(result.assets[0].uri);
        }
    };

    const confirmDeleteStudent = () => {
        Alert.alert(
            'Delete!',
            'Xóa sinh viên?',
            [
                {
                    text: 'Yes',
                    onPress: () => onDelete(student),
                    style: 'default',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },

            ],
            { cancelable: false }
        );
    };

    return (
        <View>
            <View style={styles.itemList}>
                <TouchableOpacity style={{ flex: 10 }} onPress={() => { setVisible(!visible) }} >
                    <View style={styles.imageAndInfo}>
                        <View >
                            {
                                student.avatar === '' ? (
                                    student.gender === 'Nam' ? (
                                        <Image style={styles.icon} source={require('../assets/images//male.png')} resizeMode='contain' />
                                    ) : (
                                        <Image style={styles.icon} source={require('../assets/images/female.png')} resizeMode='contain' />
                                    )
                                ) : (
                                    <Image style={styles.icon} source={{ uri: avatar }} resizeMode='contain' />
                                )
                            }
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{"Mã sinh viên: " + student.studentID}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{student.studentName} </Text>
                            <Text>Giới tính: {student.gender} </Text>
                            <Text>{student.email} </Text>
                            <Text>{student.birthDay} </Text>

                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteStudent}>
                    <FontAwesome5 name='trash-alt' size={25} color='red' />
                </TouchableOpacity>

            </View>
            <View>
                <Dialog.Container visible={visible} >
                    <Dialog.Title style={{
                        fontSize: 24,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>Sửa</Dialog.Title>
                    <Dialog.Title style={{
                        textAlign: 'center',
                    }}>________________________</Dialog.Title>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>

                                {
                                    newAvatar === '' ? (
                                        student.gender === 'Nam' ? (
                                            <Image style={styles.icon} source={require('../assets/images//male.png')} resizeMode='contain' />
                                        ) : (
                                            <Image style={styles.icon} source={require('../assets/images/female.png')} resizeMode='contain' />
                                        )
                                    ) : (
                                        <Image source={{ uri: newAvatar }} style={styles.image} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                        <Text>Mã sinh viên</Text>
                        <CustomInput placeholder={'Mã sinh viên'} value={studentID} setValue={setStudentID} />
                        <Text>Tên sinh viên</Text>
                        <CustomInput placeholder={'Tên sinh viên'} value={studentName} setValue={setStudentName} />
                        <Text>Email</Text>
                        <CustomInput placeholder={'Email'} value={email} setValue={setEmail} />
                        <Text>Giới tính</Text>
                        <SelectList
                            boxStyles={{
                                borderRadius: 10,
                                borderWidth: 4,
                                borderColor: '#a7a7d7',
                            }}
                            dropdownStyles={{
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 20,
                                borderRadius: 10,
                                borderWidth: 4,
                                borderColor: '#a7a7d7',
                            }}
                            data={[
                                { key: 'Nam', value: 'Nam' },
                                { key: 'Nữ', value: 'Nữ' }
                            ]}
                            setSelected={setGender}
                            defaultOption={gender}
                        />
                        <Text>Ngày sinh</Text>
                        <TextInput style={{
                            borderRadius: 10,
                            borderWidth: 4,
                            borderColor: '#a7a7d7',
                            padding: 10,
                            backgroundColor: 'white',
                        }} value={birthDay} onFocus={() => { setOpen(true) }} />
                        {open && (<RNDateTimePicker
                            mode='date'
                            display='calendar'
                            value={new Date()}
                            maximumDate={new Date(2023, 10, 20)}
                            minimumDate={new Date(1900, 0, 1)}
                            onChange={onChange}

                        />)}


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                        <Dialog.Button label="Save" style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginRight: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'green',
                            width: 100
                        }}
                            onPress={() => {
                                try {
                                    updateStudent(student.id);
                                    setVisible(!visible);
                                    setAvatar(newAvatar);
                                    ToastAndroid.show("Sửa thành công!", ToastAndroid.SHORT)
                                } catch (error) {
                                    ToastAndroid.show("Sửa không thành công!" + error, ToastAndroid.SHORT)
                                }
                            }}

                        />

                        <Dialog.Button label="Cancel" style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'green',
                            width: 100
                        }} onPress={() => {
                            setVisible(!visible);
                        }} />
                    </View>
                </Dialog.Container>
            </View>
        </View>
    )
}

export default CustomStudent

const styles = StyleSheet.create({

    icon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#e6e6e6',
        marginRight: 20
    },
    itemList: {
        paddingVertical: 15,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 0.5,
        flexDirection: 'row',

    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageAndInfo: {
        flex: 10,
        flexDirection: 'row',

    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 16,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})