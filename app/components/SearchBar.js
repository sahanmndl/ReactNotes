import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../misc/colors'
import {AntDesign} from '@expo/vector-icons'

const SearchBar = ({containerStyle, value, onChangeText, clearSearchBar}) => {
    return (
        <View style={[styles.container, {...containerStyle}]}>

            <TextInput 
                value={value}
                onChangeText={onChangeText}
                style={styles.searchBar}
                placeholder = 'Search your notes...'
            />

            {value ? 
            <AntDesign 
                style={styles.clearIcon}
                name="close" 
                size={20} 
                color={colors.GREY} 
                onPress={clearSearchBar}
            /> 
            : null}
            
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 100,
        paddingLeft: 15,
    },

    clearIcon: {
        position: 'absolute',
        right: 10,
    },

    container: {
        justifyContent: 'center',
    },
})

export default SearchBar
