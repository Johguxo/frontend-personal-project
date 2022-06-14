import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({ onPress, text, type }) => {
    const containerStyles = [
        styles.container, 
        styles[`container_${type}`]
    ] 
    const buttonStyles = [
        styles.text,
        styles[`text_${type}`]
    ]
    return (
        <Pressable onPress={onPress} style={containerStyles}>
            <Text style={buttonStyles}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        textAlign: 'center',

        paddingVertical: 10,
        marginVertical: 10
    },
    container_PRIMARY: {
        backgroundColor: 'rgb(33, 150, 243)',
    },
    container_TERTIARY: {

    },
    text: {
        fontWeight: 'bold'
    },
    text_PRIMARY: {
        textTransform: 'uppercase',
        color: 'white',
    },
    text_TERTIARY: {
        color: 'grey'
    }
});

export default CustomButton;