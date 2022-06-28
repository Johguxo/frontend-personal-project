import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({ error, textBox, ...props }) => {
    const inputStyles = [
        styles.input,
        textBox && styles.inputTextBox,
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
    inputTextBox: {
        height: 100,
        marginBottom: 20
    },
    error: {
        borderColor: 'red'
    },
})

export default CustomInput