import React, {useContext} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { Formik, useField } from 'formik';

import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import CustomText from '../CustomText';
import { register } from '../../redux/actions/authActions';


const SignUp = ({ navigation }) => {

    const dispatch = useDispatch();

    const validationSchema = yup.object({
        firstName: yup
          .string('Insert your first name')
          .min(3, 'Min. 3 characters')
          .required('First name is required'),
        lastName: yup
          .string('Insert your last name')
          .required('Last name is required'),
        email: yup
          .string('Insert your email')
          .email('Email is not valid')
          .required('Email is required'),
        password: yup
          .string('Insert your password')
          .min(5, 'Min. 5 characters')
          .required('Password is required'),
        confirmPassword: yup
          .string('Repeat your password')
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
      dispatch(register(values));
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
      fontSize: 30,
      color: 'cornflowerblue',
      marginBottom: 10,
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