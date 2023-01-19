import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed'
// import Login from './screens/Login.tsx'
import * as React from 'react'
import axios from 'axios';
import { Provider } from 'react-redux';
import { RootState, store } from './redux/store';
import Login from './screens/landing/Login';
import Landing from './screens/landing/LandingNavigator';
import Feed from './screens/Feed';
import Account from './screens/Account';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { verifyUser } from './redux/actions/userActions';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


const AppNavigator = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(verifyUser())
    console.log(user, 'app')
  }, [])

  React.useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !user.isLoading && !user.authenticated && 
          <Stack.Screen name={'Landing'} component={Landing} />
          }       
          <Stack.Screen name={'Homepage'} >
            {
              ({navigation}) => 
              <Tab.Navigator
              screenOptions = {{headerTitle:'Home', headerShown: false}}
              >
                <Tab.Screen 
                  name="Feed"
                  component={Feed}
                  options={() => ({
                    
                    tabBarIcon: () => <Icon name='home' type='material-icons' />
                  })}

                />
                <Tab.Screen
                  name="Account"
                  component={Account}
                />

              </Tab.Navigator>

            }
            
          </Stack.Screen>
          
        </Stack.Navigator>

      </NavigationContainer>
      {/* <Text>My Apppppppp</Text>
      <StatusBar style="auto" /> */}
    </SafeAreaProvider>
  );
}

const App = () => {

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
