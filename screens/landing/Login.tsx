import {Text, View} from 'react-native'
import * as React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { loginUser as loginUserAction } from '../../redux/reducers/userSlice'
import {useForm} from 'react-hook-form'
import RNRestart from 'react-native-restart'
import InputController from '../../components/inputs/InputController'
import { Navigate } from 'react-router-dom'
import LogInOut from '../../components/button/LogInOutButton'
import { loginUser } from '../../api-helpers/user-requests'
// import { Navigate } from 'react-router-dom'

interface ILoginProps{
navigation: any
}

const Login: React.FunctionComponent<ILoginProps> = ({navigation}) => {
    
    const dispatch = useDispatch()
    const { control, handleSubmit, setError, formState: {errors}} = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    React.useEffect(() => {
      navigation.setOptions({
        headerTitle: "Login"
      })
    }, [])

    const onSubmit = async(data:any) =>
        await loginUser(data).then(res => {
            try{
                console.log(res.data)
                dispatch(loginUserAction(res.data))
                RNRestart.Restart()
                
            } catch(err){
                err ?
                    setError('username', { type: 'required', message: "Username not found"}, { shouldFocus: true})
                    :
                    setError('password', { type: 'required', message: "Incorrect Passowrd"}, { shouldFocus: true})
            }

            
            

        })

        const onError = (errors: any) => {
            if(errors.username) {
                setError('username', {type: 'required', message:"Username is required"}, {shouldFocus: true} )
            }
            if(errors.password){
                setError('password', {type: 'required', message:"Password is required"}, {shouldFocus: true} )
            }
        }

    return(
        <View style={styles.container}>
            <InputController
                label="Username"
                name='username'
                control={control}
                inputStyle={styles.input}
                type='username'
            />
                {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
            <InputController
                label="Password"
                name='password'
                control={control}
                inputStyle={styles.input}
                type='password'
            />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            <LogInOut 
                name='submit'
                buttonFunction={handleSubmit(onSubmit, onError)}
            />
            <LogInOut 
                name='Back'
                buttonFunction={() => navigation.goBack()}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 3,
      padding: 24,
      alignItems: 'stretch',
    },
    button: {
      marginVertical: 10,
      justifySelf: 'flex-end',
    },
    title: {
    //   color: props.text
    },
    input: {
    //   color: props.text,
    //   backgroundColor: props.secondary,
      borderColor: 'black',
      fontSize: 30,
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 4,
      marginVertical: 10,
    },
    errorText: {
      color: 'orange'
    }
  })