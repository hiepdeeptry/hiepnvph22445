import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomInput = (
        {    placeholder,
            secureTextEntry,
            value, 
            setValue 
        }) => {

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                value={value}
                onChangeText={setValue}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {

    },


    input: {
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#a7a7d7',
        padding: 10,
        backgroundColor: 'white',

    },
})

// username: {
//     borderRadius: 10,
//     marginBottom: 10,
//     borderWidth: 4,
//     borderColor: '#d7d7d7',
//     padding: 10,
//     backgroundColor: 'white',

// },

// passwordContainer: {
//     backgroundColor: 'white',
//     width: '100%',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: '#d7d7d7',

// },

// password: {
//     padding: 10,
//     width: '90%'
// },

// image:{
//     width:30,
//     height:30
// }

{/* {props.placeholder.toLocaleLowerCase() == 'password' ?
                (
                    <View style={styles.passwordContainer}>
                        <TextInput placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} style={styles.password} />
                        <TouchableOpacity >
                            <Image style = {styles.image} source={require('../assets/images/eye.png')}></Image>
                        </TouchableOpacity>
                    </View>
                )
                : (<TextInput  placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} style={styles.username} 
                    />
                )} */}