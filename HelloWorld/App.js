import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
// import styles from './styles/mainStyle'
import { useState } from 'react';
import styles from './styles/mainStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Test from './screens/Test';

const Stack = createNativeStackNavigator();

const App = () => {

  const doLogout = (navigation) => {
    AsyncStorage.removeItem('authInfo');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          options={(props) => ({
            gestureEnabled: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerRight: () =>
              <TouchableOpacity onPress={() => { doLogout(props.navigation) }}>
                <Text style={{ color: 'blue', fontSize: 18 }}>Logout</Text>
              </TouchableOpacity>
          })} name='Home' component={HomeScreen} />


        <Stack.Screen name='Login' component={SignInScreen}
          options={{ headerTitleAlign: 'center', gestureEnabled: false }} />

        <Stack.Screen name='Test' component={Test}
          options={{ headerTitleAlign: 'center', gestureEnabled: false }} />

      </Stack.Navigator>
    </NavigationContainer>


  )
}

export default App;
