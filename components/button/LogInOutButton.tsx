import { Button } from '@rneui/base';
import * as React from 'react';
import { useTheme } from '@react-navigation/native'
import { makeStyles, } from '@rneui/themed'
interface ILogInOutProps {
  name: string,
  color?: string,
  buttonFunction: Function,
  buttonProps?: any,
}
const LogInOut: React.FunctionComponent<ILogInOutProps> = ({ name, color, buttonFunction, buttonProps}) => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  return (
    <Button
      title={name}
      buttonStyle={styles.button}
      color={color}
      onPress={() => buttonFunction()}
      radius='md'
      loading={false}
      size='lg'
      {...buttonProps}
    />
  );
};
export default LogInOut;
const useStyles = makeStyles((theme, props: any) => ({
  button: {
    width: '60%',
    alignSelf: 'center',
    marginVertical: 6 ,
  }
}))