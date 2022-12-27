import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { makeStyles, } from '@rneui/themed'
interface IAppProps {
  name: string,
  control: any,
  inputStyle: any,
  type?: any,
  controllerProps?: any,
  inputProps?: any,
  extraRules?: any,
}
const ImageInput: React.FunctionComponent<IAppProps> = ({ name, control, inputStyle, type, inputProps, controllerProps, extraRules }) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{name}:</Text>
      <Controller
        name={name.toLowerCase()}
        control={control}
        render={({ field: { onChange, onBlur, value } }) =>
        (<TextInput
          style={inputStyle}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value.uri ? value.uri : 'Image url'}
          placeholder={name}
          textContentType={type}
          {...inputProps}
        />)}
      />
    </View>
  );
};
export default ImageInput;
const useStyles = makeStyles((theme, props: any) => ({
  container: {
    marginVertical: 5,
  },
  label: {
    color: props.text
  }
}))
// '#44C77A',