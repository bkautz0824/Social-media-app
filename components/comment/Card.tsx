import { View, Text, Pressable, StyleSheet } from 'react-native'
import * as React from 'react';
import { makeStyles } from '@rneui/themed'
interface ICardProps {
  commentData: any,
  colors?: any,
  navigation: any,
}
const Card: React.FunctionComponent<ICardProps> = ({colors, commentData, navigation}) => {
  // const styles = useStyles(colors)
  return (
    <View style={styles.container}>
      <Text
      onPress={() => {
        navigation.push('Account', { user_id: commentData.author._id })
      }}
      >
          <Text style={styles.username}>{commentData.user.username}: </Text>
        <Text style={styles.content}>
        {commentData.content}
        </Text>
      </Text>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    // backgroundColor: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 5,
    // minHeight: 30,
    maxHeight: 200,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  content: {
    // color: props.text,
    // fontSize: 14,
    borderWidth: 1,
    borderColor: 'black',
  },
  username: {
    // color: props.text,
    fontWeight: 'bold',
    // padding: 2,
  }
})