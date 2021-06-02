import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../misc/colors'

const NoSearchResults = () => {
    return (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
            <AntDesign name="frowno" size={90} color={colors.GREY} />
            <Text style={{ marginTop: 20, fontSize: 20 }}>No Search Results</Text>
        </View>
    )
}

export default NoSearchResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1,
    },
})
