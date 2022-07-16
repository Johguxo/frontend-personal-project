import React, {useContext} from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { Formik, useField } from 'formik';
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import CustomText from '../CustomText';

import * as yup from "yup";
import { register } from '../../hooks/auth/ApiCalls';
import { AuthContext } from '../../contexts/AuthContext';

const SignUp = ({ navigation }) => {

    const { state, dispatch } = useContext(AuthContext)

    const validationSchema = yup.object({
        firstName: yup
          .string('Ingrese su nombre')
          .min(3, 'El nombre debe tener como mínimo 3 caracteres')
          .required('El nombre es requerido'),
        lastName: yup
          .string('Ingrese sus apellidos')
          .required('Los apellidos son requeridos'),
        email: yup
          .string('Ingrese su correo electronico')
          .email('Ingrese un correo electronico correcto')
          .required('El correo electronico es requerido'),
        password: yup
          .string('Ingrese su  contraseña')
          .min(5, 'La contraseña debería tener como mínimo 5 caracteres')
          .required('La contraseña es requerida'),
        confirmPassword: yup
          .string('Ingrese nuevamente la contraseña')
          .oneOf([yup.ref('password'),null], 'Passwords must match'),
    });

    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
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

    const registerSubmit = (values) => {
      setTimeout(() => {
        register(values, dispatch)
      }, 10);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values)=>registerSubmit(values)}
              >
                  {(formik) => (
                    <View style={styles.form}>
                      <FormikInputValue  
                        icon='person'
                        placeholder="First name"
                        name="firstName"
                      />
                      <FormikInputValue  
                        icon='person'
                        placeholder="Last name"
                        name="lastName"
                      />
                      <FormikInputValue  
                        icon='mail'
                        placeholder="Email"
                        name="email"
                      />
                      <FormikInputValue 
                        icon='key'
                        placeholder="Password"
                        name="password"
                        secureTextEntry={true}
                      />
                      <FormikInputValue 
                        icon='key'
                        placeholder="Confirm password"
                        name="confirmPassword"
                        secureTextEntry={true}
                      />
                      <CustomButton
                        text='Register'
                        type='PRIMARY'
                        onPress={formik.handleSubmit}
                      />
                    </View>
                  )}
            </Formik>
            <CustomButton
                text="Have an account? Sign In"
                type='TERTIARY'
                onPress={()=>{
                    navigation.navigate('Login')
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
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'cornflowerblue'
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

export default SignUp