import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface IAccountPropTypes {
  navigate?:any
}

const Account:React.FunctionComponent<IAccountPropTypes> = () =>{
  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}

const styles = StyleSheet.create({})


export default Account