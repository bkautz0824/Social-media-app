import {Text, View} from 'react-native'
import * as React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet } from 'react-native'
// import { Navigate } from 'react-router-dom'


const Login = ({navigation}) => {


    return(
        <View style={styles.container}>
            <Text>
                This is the login
            </Text>
            <Button title='Login' onPress={() => {navigation.navigate('Homepage')}}/>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})