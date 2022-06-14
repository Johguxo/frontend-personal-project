import React, { useContext } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Button } from 'react-native'

import { Formik, useField } from 'formik';

import Logo from '../../../assets/logo.png'
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import CustomText from '../CustomText';

import * as yup from "yup";
import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../hooks/auth/ApiCalls';

const LogIn = ({ navigation }) => {

    const { state, dispatch } = useContext(AuthContext)

    const validationSchema = yup.object({
        email: yup
          .string('Ingrese su correo electronico')
          .email('Ingrese un correo electronico correcto')
          .required('El correo electronico es requerido'),
        password: yup
          .string('Ingrese su  contraseña')
          .min(5, 'La contraseña debería tener como mínimo 5 caracteres')
          .required('La contraseña es requerida'),
    });

    const initialValues = {
      email: '',
      password: ''
    }

    const singIn = (values) => {
      setTimeout(() => {
        const { email, password } = values
        login({email, password}, dispatch)
      }, 10);
    }

    const {height} = useWindowDimensions();

    const FormikInputValue = ({name, ...props}) => {
      const [field, meta, helpers] = useField(name)
      return (
          <>
              <CustomInput
                  error={meta.error}
                  value={field.value}
                  id={name}
                  onChangeText={value=> helpers.setValue(value)}
                  {...props}
              />
              {meta.error && 
                  <CustomText style={styles.error}>
                      {meta.error}
                  </CustomText>
              }
          </>
      )
    }

    const ErrorText = () => {
      return (
        state.error? (
          <CustomText style={styles.error}>
                Email or Password are invalid 
              </CustomText>
        ): (
          <></>
        )
      );
    };
    const stylesLogo = [
      styles.logo, 
      {height: height*0.3}
    ]

    return (
        <View style={styles.container}>
            <Image 
              source={Logo} 
              style={stylesLogo} 
              resizeMode="contain"/>
            <ErrorText/>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values)=>singIn(values)}
              >
                  {(formik) => (
                    <View style={styles.form}>
                      <FormikInputValue  
                        icon='mail'
                        placeholder="Email"
                        name="email"
                      />
                      <FormikInputValue 
                        icon='key'
                        placeholder="Password"
                        name="password"
                        type="password"
                        secureTextEntry={true}
                      />
                      <CustomButton
                        text='Sign In'
                        type='PRIMARY'
                        onPress={formik.handleSubmit}
                      />
                    </View>
                  )}
            </Formik>
            <CustomButton
                text="Don't have an account? Create one"
                type='TERTIARY'
                onPress={()=>{
                    navigation.navigate('SignUp')
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FBFC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      width: '80%'
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
    error: {
      color:'red',
      fontSize: 12,
      marginBottom: 20,
      marginTop:-5,
    },
});

export default LogIn