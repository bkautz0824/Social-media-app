import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios'
import { Text, ScrollView, Button, View } from 'react-native'
import { StyleSheet } from 'react-native';
// import Card from '../../components/posts/Card'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Popular from './Popular';
// import SubscribedPosts from './SubscribedPosts'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Post from './Post'
import Account from './Account'
import PostList from '../components/feed/PostList';
// import FollowingList from '../../components/account/follow-list/FollowList';
// import MainMessagesOverview from '../messages/MessagesDashboard'
// import Conversation from '../messages/Conversation';
// import { RootState } from '../../redux/store'
// import { useSelector } from 'react-redux'
interface IFeedProps {
  navigate?: any,
  route?:any
  }
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Feed:React.FunctionComponent<IFeedProps> = () => {


  return (
   <Stack.Navigator>
    <Stack.Screen name={'Main'}>
      {() => 
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={PostList}/>
        <Tab.Screen name={'Popular'} component={PostList}/>
      </Tab.Navigator>}
    </Stack.Screen>
    <Stack.Screen name={'Post Info'} component={Post}/>
    <Stack.Screen name={'Account'} component={Account}/>


   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})


export default Feed
