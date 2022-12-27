import React from 'react'
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native'
import { makeStyles, Divider } from '@rneui/themed'
import { useTheme } from '@react-navigation/native'
import Header from '../components/post-info/Header'
import MainImage from '../components/post-info/MainImage'
import Body from '../components/post-info/Body'
import Card from '../components/comment/Card'
import Input from '../components/comment/Input'
import { getPostById } from '../api-helpers/post-requests'

interface IPostProps {
  route: any,
  navigation?: any
}

const Post: React.FunctionComponent<IPostProps> = ({route, navigation}) => {
  const {postId} = route.params
  const { colors } = useTheme()
  const [postData, setPostdata] = React.useState<any>()
  const [addedComment, setAddedComment] = React.useState<any>()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    console.log(postId, 'postID')
    getPostById(postId)
    .then((res) =>{ 
    // console.log(res.data, 'ressss')
    setPostdata(res.data)
    console.log(res.data)
    }
    )
    .catch((err) => console.log(err))
  }, [postId])

  const addedCommentIndicator = () => {
    setAddedComment((prev:any) => prev + 1)
  }

  React.useEffect(() => {
    console.log(route.params, 'route params')
    console.log(postData, 'post data')
  }, [postData])

  const UpperBodyComponents = postData && <>
  <Header
          navigation={navigation}
          // colors={colors}
          postData={postData}
        />
        <MainImage imageUrl={postData.images[0]}/>
    <View style={{padding: 10}}>
      <Body
          // colors={colors}
        postData={postData}
        navigation={navigation}
        />
        <Divider
        style={styles.divider}
          width={1}
    />
          <Text style={styles.title}>{postData.comments.length} Comment(s)</Text>
    <Input addedCommentIndicator={addedCommentIndicator} postId={postId} />
        </View>
  </>
  return postData ?
    (<FlatList
      refreshing={isRefreshing}
      onRefresh={() => {
        console.log('Refreshed page!', addedComment)
        setIsRefreshing(true)
        setIsRefreshing(false)
      }}
      style={styles.container}
          data={postData.comments}
          renderItem={({ item }) => <Card navigation={navigation} key={item.key} commentData={item} />}
          ListHeaderComponent={UpperBodyComponents}
        />)
        :
        <View>
          <Text>Can't load post data</Text>
        </View>
    }
    // </ScrollView>
  

export default Post

const styles = StyleSheet.create({
  title:{
    marginVertical: 5,
  },
  container: {
    paddingVertical: 5
  },
  divider:{
    width: '90%',
    marginVertical: 5,
    alignSelf: 'center'
  }
})