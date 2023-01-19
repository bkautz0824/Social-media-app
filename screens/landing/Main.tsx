import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@rneui/themed'
import React from 'react'
import LottieView from 'lottie-react-native'


interface IMainProps{
    navigation:any
}
const Main: React.FunctionComponent<IMainProps> = ({navigation}) => {
  return (

    <View style={styles.container}>
    <View style={styles.header}>
       <Text style={styles.title}>Bennett Book</Text>
        {/* <Text>{someParam}</Text> */}
      <Text style={styles.intro}>{'Made with the love for React'}</Text>
         <LottieView
          style={{
            flex: 1,
            position: 'relative',
            // maxWidth: '100%',
          maxHeight: 300,
            alignSelf: 'center',
            }}
            source={require('../../resources/lottie-animations-files/astronaut.json')}
            autoPlay
            loop={true}
            />
    </View>
    <View style={styles.buttonGroup}>
       <Button
        title="Log in"
        type='outline'
        onPress={() =>
        navigation.navigate('Login')}
        buttonStyle={styles.button}
      />
  <Button
    title="Register"
    type='outline'
    onPress={() =>
    navigation.navigate('Register')}
    buttonStyle={styles.button}
  />
  <Button
      title="Skip for now"
        type='outline'
        // color={'error'}
      onPress={() =>
      navigation.reset({
        index: 0,
        routes: [{name: 'Homepage'}]
      })}
      buttonStyle={styles.button}
/>
    </View>
  </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    header: {
    },
    title: {
      color: '#4A8DD4',
      fontSize: 30,
      textAlign: 'center',
      paddingVertical: 10,
    },
    intro: {
    //   color: props.text,
      textAlign: 'center',
      maxWidth: '95%',
      height: 40,
    },
    buttonGroup: {
      alignSelf: 'center',
    },
    button: {
      marginVertical: 10,
      minWidth: '70%',
      borderWidth: 1,
    }
  })