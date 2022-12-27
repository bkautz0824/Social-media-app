import * as React from 'react';
// import { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native'
import {Avatar } from '@rneui/themed'
import { makeStyles } from '@rneui/themed';
import { StackActions } from '@react-navigation/native'
interface IHeaderProps {
  postData: any,
  colors?: any,
  navigation: any,
 }
  const styles = StyleSheet.create({
  title: {
    //  color: props.text,
     overflow: 'hidden',
      fontSize: 16,
   },
   container: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 8,
     paddingLeft: 8,
   }
})
//  Avatar + name
const Header: React.FunctionComponent<IHeaderProps> = ({ postData, colors, navigation}) => {
  console.log(postData, 'header')
  // const styles = useStyles(colors)
   return (
     <Pressable
       onPress={() => navigation.dispatch(StackActions.push('Account', { user_id: postData.author._id }))}
       style={styles.container}>
       <Avatar
        icon={{name:'account-circle', type:'material-icons'}}
         size={32}
         source={{uri: postData.author.profile_picture_url}}
         rounded
         containerStyle={{ backgroundColor: "#3D4DB7"}}
       />
       <Text style={styles.title}> {postData.author.username}</Text>
        </Pressable>
   );
 };
 export default Header;