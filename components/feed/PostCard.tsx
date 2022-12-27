import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native'
import ImageContainer from './ImageContainer'
import PostCardHeader from './PostCardHeader'
import Body from './Body'
interface IFeedCardProps {
  postData: any,
  navigation: any,
}
const PostCard: React.FunctionComponent<IFeedCardProps> = ({ postData, navigation }) => {
  console.log(postData, 'postcard')
  return (
    <View style={styles.container}>
      <PostCardHeader navigation={navigation} postData={postData} />
      <Pressable onPress={() => {
        // navigation.setOptions({title: 'UPDATED!'})
        navigation.push('Post Info', { postId: postData._id })
      }}>
        <ImageContainer
        imageUrl={postData.images[0]}
      />
      </Pressable>
      <Body navigation={navigation} postInfo={postData}/>
    </View>
  );
};
export default PostCard;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 8,
    minHeight: 450,
  }
})