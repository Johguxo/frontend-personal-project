import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const CustomIndicator = ({ ...props }) => {
    const indicatorStyles = [
        styles.loadingContainer,
    ]
    return (
      <View style={indicatorStyles}>
        <ActivityIndicator
                size={"large"} 
                color="#185ace"
                {...props}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CustomIndicator
