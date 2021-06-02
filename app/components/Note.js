import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../misc/colors'

const Note = ({item, onPress}) => {
    const {title, description} = item
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>

            <Text style={styles.title} numberOfLines={3}>
                {title}
            </Text>
            <Text style={styles.description} numberOfLines={7}>
                {description}
            </Text>

        </TouchableOpacity>
    )
}

export default Note

const width = Dimensions.get('window').width - 32

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.SECONDARY,
        width: width / 2 - 8,
        padding: 8,
        borderRadius: 8,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 17,
    },

    description: {
        fontSize: 15,
        marginTop: 8,
    },
})
