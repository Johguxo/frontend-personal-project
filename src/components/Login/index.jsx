import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, StyleSheet, useWindowDimensions, Button } from 'react-native'
import * as yup from "yup";

import { Formik, useField } from 'formik';

import Logo from '../../../assets/logo.png'

import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import CustomText from '../CustomText';

import defaultStyles from '../../styles/defaultStyles'

import { loadUser, login, logout } from '../../redux/actions/authActions'

const LogIn = ({ navigation }) => {

    const dispatch = useDispatch()

    const authState = useSelector(state => state.auth)

    const validationSchema = yup.object({
        email: yup
          .string('Insert your email')
          .email('Email is not valid')
          .required('Email is required'),
        password: yup
          .string('Insert your password')
          .min(5, 'Min. 5 characters')
          .required('Password is required'),
    });

    const initialValues = { 
      email: '',
      password: ''
    }

    const singIn = (values) => {
      dispatch(login(values))
    }


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
        authState.error ? (
          <CustomText style={styles.error}>
                Email or Password are invalid 
              </CustomText>
        ): (
          <></>
        )
      );
    };

    
    const {height} = useWindowDimensions();

    const stylesLogo = [
      styles.logo, 
      {height: height*0.3}
    ]

    return (
        <View style={defaultStyles.container}>
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