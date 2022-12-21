import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Image } from '@rneui/themed'
interface IImageContainerProps {
  imageUrl: string,
}
const ImageContainer: React.FunctionComponent<IImageContainerProps> = ({ imageUrl }) => {
  return (<View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: imageUrl }}
      PlaceholderContent={<Text>Can't load image</Text>}
    />
  </View>);
};
export default ImageContainer;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    minHeight: 250,
    maxHeight: 400,
  },
  image: {
    height: '100%',
    width: '100%',
  }
})