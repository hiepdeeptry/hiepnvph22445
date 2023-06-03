import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
// import styles from './styles/mainStyle'
import { useState } from 'react';
import styles from './styles/mainStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name='Login' component={SignInScreen} />

      </Stack.Navigator>
    </NavigationContainer>


  )
}

export default App;
