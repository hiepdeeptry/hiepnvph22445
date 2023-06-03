import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomStudent = (
    {
        student
    }) => {
    return (
        <View style={styles.itemList} >
            <View >
                {student.gender === 'Male' ? (
                    <Image style={styles.icon} source={require('../assets/images//male.png')} resizeMode='contain' />
                ) : (
                    <Image style={styles.icon} source={require('../assets/images/female.png')} resizeMode='contain' />
                )}
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text>{"Mã sinh viên: " + student.studentID}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{student.lastName + " " + student.firtName} </Text>
                <Text>{student.gender} </Text>
                <Text>{student.email} </Text>
                <Text>{student.birthDay} </Text>

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
})