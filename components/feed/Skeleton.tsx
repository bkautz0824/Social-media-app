import { Skeleton } from '@rneui/themed'
import { View, Text, StyleSheet} from 'react-native'
import * as React from 'react';
interface ISkeletonProps {
  
}
const FeedSkeleton: React.FunctionComponent<ISkeletonProps> = (props) => {
  return (
    <View style={styles.container}>
      {
        [1,2].map(ele=><View key={ele} style={styles.itemContainer}>
          <View style={styles.header} >
          <Skeleton animation='pulse' circle width={40} height={40} />
            <Skeleton animation='pulse' style={styles.headerText}  width={250} height={30} />
          </View>
          <Skeleton style={styles.imageBody} animation='pulse' height={250} width={350} />
        </View>)
    }
    </View>
  );
};
export default FeedSkeleton;
const styles = StyleSheet.create({
  container: {
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 8,
  },
  headerText: {
    borderRadius: 5,
    marginLeft: 5,
  },
  imageBody: {
    borderRadius: 6
  }
})