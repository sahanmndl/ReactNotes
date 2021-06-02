import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import CircularButton from '../components/CircularButton'
import colors from '../misc/colors'

const Intro = ({onFinish}) => {
    const [name, setName] = useState('');

    const onChangeTextHandler = (text) => setName(text);

    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onFinish) {
            onFinish();
        }
    };

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.introTitle}>ReactNotes</Text>

                <TextInput 
                    value={name}
                    onChangeText={onChangeTextHandler}
                    placeholder= {'Enter your name to continue...'} 
                    style={styles.textInput}
                />

                {name.trim().length >= 3 ? (
                    <CircularButton name="arrowright" onPress={handleSubmit}/>
                ) : null}

            </View>
        </>
    );
};

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        marginVertical: 20,
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        width,
        height: 40,
        borderRadius: 8,
        paddingLeft: 14,
    },

    introTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Intro