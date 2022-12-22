import { Avatar, makeStyles, } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native'
import { useTheme } from '@react-navigation/native'
interface ICardFooterProps {
  postInfo: any,
  navigation: any,
}
const CardBody: React.FunctionComponent<ICardFooterProps> = ({ navigation, postInfo }) => {
//   const styles = useStyles(colors)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.likedByRow}>
          <Avatar
          avatarStyle={styles.avatar}
         
        rounded
        size={20}
        // source={{ uri: postInfo.user.profile_picture_url}}
        />
          Liked By </Text>
      </View>
      <Text style={styles.bodyText}>
        {/* <Text onPress={()=>navigation.push('Account', {user_id: postInfo.user.id})} style={styles.username}>{postInfo.user.username}: </Text> */}
        <Text style={styles.description}>{postInfo.text}</Text>
      </Text>
    </View>
  );
};
export default CardBody;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    maxHeight: 120,
  },
  avatar: {
  },
  likedByRow: {
    // color: props.text,
    paddingLeft: 5,
  },
  username: {
    marginLeft: 6,
    fontSize: 16,
    // color: props.text,
    fontWeight: 'bold',
    // lineHeight: 60,
  },
  bodyText: {
    flexDirection: 'row',
    padding: 3,
    // lineHeight: 60,
  },
  description: {
    // color: props.text,
    fontSize: 13,
    // lineHeight: 60,
  },
})