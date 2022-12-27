import * as React from 'react';
import { View, StyleSheet, } from 'react-native'
import InputController from '../../components/inputs/InputController'
import {useForm } from "react-hook-form"
// import {createComment } from '../../api-helpers/posts'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../redux/store'
interface IInputProps {
  postId: number,
  addedCommentIndicator: Function,
}
const Input: React.FunctionComponent<IInputProps> = ({postId, addedCommentIndicator}) => {
//   const user = useSelector((state: RootState) => state.user.data)
  const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm({
    defaultValues: {
      userComment: '',
    }
  })
  const onSubmit = async (data: any) => {
    console.log(data)
    // await createComment({ content: data.userComment }, postId).then(res => {
    //   console.log(res.data)
    //   setValue('userComment', '')
    //   addedCommentIndicator()
    // }, err => {
    //   console.log(err)
    // })
  }
  const onError = async () => {
  }
  return (
    <View style={styles.container}>
      <InputController
        label='Comment'
        name='userComment'
        inputStyle={styles.input}
        control={control}
        inputProps={{
          onSubmitEditing: handleSubmit(onSubmit, onError)
        }}
      />
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    color: 'black',
  },
  input: {
    backgroundColor: 'darkgrey',
    padding: 5,
    borderRadius: 3,
    color: 'black',
    minHeight: 32,
  },
})