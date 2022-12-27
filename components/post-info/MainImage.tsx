import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native'
interface IMainImageProps {
  imageUrl: string,
}
const MainImage: React.FunctionComponent<IMainImageProps> = ({imageUrl}) => {
  return (<View style={styles.container}>
    <Image
      source={{ uri: imageUrl}}
      style={styles.image}
    />
  </View>);
};
export default MainImage;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    minHeight: 300,
    maxHeight: 340,
    width: '100%',
    // maxWidth: '99%',
  }
})













