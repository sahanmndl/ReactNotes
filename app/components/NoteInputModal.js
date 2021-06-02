import React, {useState, useEffect} from 'react'
import { Keyboard, Modal, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import colors from '../misc/colors'
import CircularButton from './CircularButton'

const NoteInputModal = ({visible, onClose, saveNote, note, isEditing}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isEditing) {
            setTitle(note.title)
            setDescription(note.description)
        }
    }, [isEditing])

    const handleModalClose = () => {
        Keyboard.dismiss()
    }

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') {
            setTitle(text)
        } else if (valueFor === 'description') {
            setDescription(text)
        }
    }

    const handleSaveNote = () => {
        if (!title.trim() && !description.trim()) {
            return onClose()
        } else if (isEditing) {
            saveNote(title, description, Date.now())
        } else {
            saveNote(title, description)
            setTitle('')
            setDescription('')
        }
        onClose()
    }

    const closeModal = () => {
        if (!isEditing) {
            setTitle('')
            setDescription('')
        }
        onClose()
    }

    return (
        <>
            <Modal visible={visible} animationType="fade">

                <View style={styles.container}>
    
                    <TextInput
                        value={title} 
                        style={[styles.input, styles.title]}
                        placeholder={'Title'}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />
                    <TextInput 
                        value={description}
                        multiline
                        placeholder={'Description'} 
                        style={[styles.input, styles.description]}
                        onChangeText={(text) => handleOnChangeText(text, 'description')}
                    />

                    <View style={styles.btnContainer}>

                        <View style={styles.btnCloseLayout}>
                            <CircularButton
                                name="close"
                                size={16}
                                onPress={closeModal}
                            />
                        </View>
                        <View style={styles.btnSaveLayout}>
                            { title.trim() || description.trim() ? <CircularButton
                                name="check"
                                size={16}
                                onPress={handleSaveNote}
                            /> : null}
                        </View>

                    </View>

                </View>

                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBackground, StyleSheet.absoluteFillObject]}/>
                </TouchableWithoutFeedback>
                
            </Modal>
        </>
    ) 
}

export default NoteInputModal

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    input: {
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        color: colors.DARK,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
    },

    description: {
        fontSize: 17,
        marginTop: 40,
        minHeight: 250,
        maxHeight: 500,
        textAlignVertical: 'top',
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },

    btnCloseLayout: {
        position: 'absolute',
        left: 25,
    },

    btnSaveLayout: {
        position: 'absolute',
        right: 25,
    },

    modalBackground: {
        flex: 1,
        zIndex: -1,
    },
})
