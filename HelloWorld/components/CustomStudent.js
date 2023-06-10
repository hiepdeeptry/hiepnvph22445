import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import CustomInput from './CustomInput';
import { SelectList } from 'react-native-dropdown-select-list';

const CustomStudent = (
    {
        student,
        onDelete,
        onRefresh
    }) => {


    const [visible, setVisible] = useState(false);
    
    const [studentName, setStudentName] = useState(student.studentName);
    const [studentID, setStudentID] = useState(student.studentID);
    const [email, setEmail] = useState(student.email);
    const [gender, setGender] = useState(student.gender);
    const [birthDay, setBirthDay] = useState(student.birthDay);

    const updateStudent = (id) => {
        fetch('http://172.20.10.2:3000/students/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ studentID: studentID, studentName: studentName, email: email, gender: gender, birthDay: birthDay }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    return (
        <View>
            <View style={styles.itemList}>
                <TouchableOpacity style={{ flex: 10 }} onPress={() => { setVisible(!visible) }} >
                    <View style={styles.imageAndInfo}>
                        <View >
                            {student.gender === 'Nam' ? (
                                <Image style={styles.icon} source={require('../assets/images//male.png')} resizeMode='contain' />
                            ) : (
                                <Image style={styles.icon} source={require('../assets/images/female.png')} resizeMode='contain' />
                            )}
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{"Mã sinh viên: " + student.studentID}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{student.studentName} </Text>
                            <Text>{student.gender} </Text>
                            <Text>{student.email} </Text>
                            <Text>{student.birthDay} </Text>

                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(student)}>
                    <FontAwesome5 name='trash-alt' size={25} color='red' />
                </TouchableOpacity>

            </View>
            <View>
                <Dialog.Container visible={visible} >
                    <Dialog.Title style={{
                        fontSize: 24,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>Sửa lớp</Dialog.Title>
                    <Dialog.Title style={{
                        textAlign: 'center',
                    }}>________________________</Dialog.Title>
                    <View>
                        <Text>Mã sinh viên</Text>
                        <CustomInput placeholder={'Mã sinh viên'} value={studentID} setValue={setStudentID} />
                        <Text>Tên sinh viên</Text>
                        <CustomInput placeholder={'Tên sinh viên'} value={studentName} setValue={setStudentName} />
                        <Text>Email</Text>
                        <CustomInput placeholder={'Email'} value={email} setValue={setEmail} />
                        <Text>Giới tính</Text>
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
                            defaultOption={gender}
                        />
                        <Text>Ngày sinh</Text>
                        <CustomInput placeholder={'Ngày sinh'} value={birthDay} setValue={setBirthDay} />


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
                                    onRefresh(()=>{onRefresh()});
                                    setVisible(!visible);
                                    ToastAndroid.show("Sửa thành công!",ToastAndroid.SHORT)
                                } catch (error) {
                                    ToastAndroid.show("Sửa không thành công!" + error,ToastAndroid.SHORT)
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
        flex:10,
        flexDirection: 'row',

    }
})