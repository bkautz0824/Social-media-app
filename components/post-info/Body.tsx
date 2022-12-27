import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from '@rneui/themed';
import { useTheme } from '@react-navigation/native'
import { makeStyles } from '@rneui/themed'
interface IBodyProps {
  postData: any,
  colors?: any,
  navigation: any,
}
const Body: React.FunctionComponent<IBodyProps> = ({ navigation, postData, colors }) => {
  const postInfo = postData
  // console.log(postData)
  const styles = useStyles(colors)
  return (
    <View style={styles.container}>
      <View style={styles.likedByRowContainer}>
        <Text style={styles.likedByRow}>
         
          Liked By </Text>
      </View>
      <Text style={styles.bodyText}>
      <Avatar
          avatarStyle={styles.avatar}
          icon={{name:'account-circle', type:'material-icons'}}
        rounded
            size={20}
            containerStyle={{ backgroundColor: "#3D4DB7"}}
        source={{ uri: postInfo.author.profile_picture_url}}
        />
        <Text onPress={()=>navigation.push('Account', {user_id: postData.author._id})} style={styles.username}>{postInfo.author.username}: </Text>
        <Text style={styles.description}>{postInfo.content}</Text>
      </Text>
    </View>
  );
};
export default Body
const useStyles = makeStyles((theme, props: any) => ({
  container: {
    // padding: 5,
    maxHeight: 120,
    marginBottom: 15,
  },
  avatar: {
  },
  likedByRow: {
    color: props.text,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedByRowContainer: {
    justifyContent: 'center'
  },
  username: {
    marginLeft: 6,
    fontSize: 16,
    color: props.text,
    fontWeight: 'bold',
    // lineHeight: 60,
  },
  bodyText: {
    flexDirection: 'row',
    padding: 3,
    // lineHeight: 60,
  },
  description: {
    color: props.text,
    fontSize: 13,
    // lineHeight: 60,
  },
}))