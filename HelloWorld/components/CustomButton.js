import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({title,onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{

    },
    button:{
        padding:10,
        borderWidth:1,
        borderRadius:10,
        justifyContent:'center',
        backgroundColor:'red',
        borderColor:'white',
        alignItems:'center',
        marginTop:10,
        
    },
    title:{
        color:'white',
        fontWeight:'bold'

    }
})