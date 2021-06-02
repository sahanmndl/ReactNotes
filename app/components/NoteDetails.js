import React, {useState} from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import {useHeaderHeight} from '@react-navigation/stack'
import colors from '../misc/colors'
import CircularButton from './CircularButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {provideNotes} from '../contexts/NoteProvider'
import NoteInputModal from './NoteInputModal'

const formatDate = time => {
    const date = new Date(time)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} at ${hrs}:${min}:${sec}`
}

const NoteDetails = (props) => {
    const headerHeight = useHeaderHeight()
    const {setNotes} = provideNotes()

    const [note, setNote] = useState(props.route.params.note)
    const [modalVisibility, setModalVisiblity] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if (result !== null) {
            notes = JSON.parse(result)
        }

        const filteredNotes = notes.filter(n => n.id !== note.id)
        setNotes(filteredNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes))
        props.navigation.goBack()
    }

    const displayDeleteAlertDialog = () => {
        Alert.alert('Do you want to delete this note?', 'This action cannot be undone', [
            {
                text: 'No',
                onPress: () => console.log('Nope')
            },
            {
                text: 'Yes',
                onPress: deleteNote,
            }
        ], {
            cancelable: true
        })
    }

    const handleOnClose = () => setModalVisiblity(false)

    const handleUpdateNote = async (title, description, time) => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if (result !== null) {
            notes = JSON.parse(result)
        }

        const updatedNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title
                n.description = description
                n.isUpdated = true
                n.time = time

                setNote(n)
            }
            return n
        })
        
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    const openEditModal = () => {
        setIsEditing(true)
        setModalVisiblity(true)
    }

    return (
        <>
            <ScrollView contentContainerStyle={[styles.container, {paddingVertical: headerHeight}, {paddingHorizontal: 16}]}>

                <Text style={styles.timestamp}>
                    {note.isUpdated ? `Updated on ${formatDate(note.time)}` : `Created on ${formatDate(note.time)}`}
                </Text>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.description}>{note.description}</Text>

            </ScrollView>

            <View style={styles.circularButtonContainer}>
                <CircularButton
                    name="delete"
                    onPress={displayDeleteAlertDialog}
                />
                <View style={styles.space}/>
                <CircularButton
                    name="edit"
                    onPress={openEditModal}
                />
            </View>

            <NoteInputModal 
                visible={modalVisibility} 
                onClose={handleOnClose} 
                saveNote={handleUpdateNote} 
                note={note}
                isEditing={isEditing}
            />
        </>
    )
}

export default NoteDetails

const styles = StyleSheet.create({
    container: {},

    timestamp: {
        textAlign: 'right',
        fontSize: 12,
        color: colors.GREY,
        opacity: 0.8,
    },

    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: colors.BLACK,
    },

    description: {
        fontSize: 17,
        color: colors.BLACKISHED,
        marginTop: 8,
    },

    circularButtonContainer: {
        position: 'absolute',
        right: 25,
        bottom: 50,
    },

    space: {
        height: 25,
    },
})
