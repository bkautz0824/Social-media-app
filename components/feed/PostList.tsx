import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native'
import PostCard from './PostCard'
import {getPopularPosts} from '../../api-helpers/post-requests'
import Skeleton from './Skeleton'
// import { RootState } from '../../redux/store'
import {useSelector} from 'react-redux'
import { makeStyles } from '@rneui/themed'
import {useTheme,useFocusEffect} from '@react-navigation/native'
import { isTemplateExpression } from 'typescript';
interface IListProps {
  route?: any,
  navigation: any,
}
const PostList: React.FunctionComponent<IListProps> = ({ route, navigation }) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
//   const user = useSelector((state: RootState) => state.user)
  const [postsArray, setpostsArray] = useState<Array<any>>();
  useEffect(() => {
    getPopularPosts().then(res => {
      // console.log(res)
      setpostsArray(res.data)
      // console.log("Fetching posts data")
    }, err => {
      console.log(err)
    })
  }, []);
  return postsArray ?  (
  <View>
    <FlatList
      contentContainerStyle={styles.container}
      data={postsArray.reverse()}
      keyExtractor={(item) => item._id}
      renderItem={(item:any) => {
        // console.log('username213123')
        // console.log(item.user, 'username')
        return <PostCard navigation={navigation} postData={item.item} />}}
    />
  </View>
  ) : <Skeleton />
};
export default PostList;
const useStyles = makeStyles((theme, props:any) => ({
  container: {
    paddingVertical: 5,
    // backgroundColor: 'grey',
  }
}
))















