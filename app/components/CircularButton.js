import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const CircularButton = ({name, size, color, style, onPress}) => {
    return (
        <AntDesign 
            name={name} 
            size={size || 24} 
            color={color || colors.LIGHT}
            style={[styles.icon, {...styles}]}
            onPress={onPress}
        />
    ); 
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 16,
        borderRadius: 100,
        elevation: 4,
    },
});

export default CircularButton;
