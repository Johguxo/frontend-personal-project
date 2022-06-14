import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({ error, ...props }) => {
    const inputStyles = [
        styles.input,
        error && styles.error,
    ]
    return (
        <TextInput 
                style={inputStyles} 
                {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
    },
    error: {
        borderColor: 'red'
    },
})

export default CustomInput