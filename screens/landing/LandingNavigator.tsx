import {Text, View} from 'react-native'
import * as React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackActions } from '@react-navigation/native'
import Main from './Main'
import Login from './Login'
import Register from './Register'

// import { Navigate } from 'react-router-dom'

interface IRegisterProps{
    navigation: any
}

const LandingStack = createNativeStackNavigator()

const Landing: React.FunctionComponent<IRegisterProps> = ({navigation}) => {


    return(
        <LandingStack.Navigator>
            <LandingStack.Screen
                name="Main"
                component={Main}
            />
            <LandingStack.Screen 
                name="Login"
                component={Login}
            />
            <LandingStack.Screen 
                name="Register"
                component={Register}
            />
        </LandingStack.Navigator>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})