import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors'
import CircularButton from '../components/CircularButton'
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { provideNotes } from '../contexts/NoteProvider';
import NoSearchResults from '../components/NoSearchResults';


const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time)
      const bInt = parseInt(b.time)
      if (aInt < bInt) return 1
      if (aInt == bInt) return 0
      if (aInt > bInt) return -1
    })
}

const AllNotes = ({user, navigation}) => {
    const [greet, setGreet] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [noSearchResults, setNoSearchResults] = useState(false)

    const {notes, setNotes, getNotes} = provideNotes()

    const setGreetAccordingToTime = () => {
        const hrs = new Date().getHours()
        if (hrs >= 4 && hrs < 12) {
            return setGreet('Morning')
        } else if (hrs >= 12 && hrs < 18) {
            return setGreet('Afternoon')
        } else {
            return setGreet('Night')
        }
    }

    useEffect(() => {
        setGreetAccordingToTime()
    }, [])

    const reverseNotes = reverseData(notes)

    const handleOnSaveNote = async (title, description) => {
        const note = {id: Date.now(), title, description, time: Date.now()}
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    const openNoteDetails = (note) => {
        navigation.navigate('NoteDetails', {note})
    }

    const handleOnSearchInput = async text => {
        setSearchQuery(text)
        if (!text.trim()) {
            setSearchQuery('')
            setNoSearchResults(false)
            return await getNotes()
        }

        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note
            }
        })

        if (filteredNotes.length) {
            setNotes([...filteredNotes])
        } else {
            setNoSearchResults(true)
        }
    }

    const handleOnClearSearchBar = async () => {
        setSearchQuery('')
        setNoSearchResults(false)
        await getNotes()
    }

    return (
        <> 
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}/>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

                    <SearchBar 
                        containerStyle={{marginVertical: 20}}
                        value={searchQuery}
                        onChangeText={handleOnSearchInput}
                        clearSearchBar={handleOnClearSearchBar}
                    />

                    {noSearchResults ? 
                    <NoSearchResults/> : 
                    <FlatList
                        data={reverseNotes}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16}}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Note item={item} onPress={() => openNoteDetails(item)} />}
                    />
                    }

                    {!notes.length ? 
                        <View style={[StyleSheet.absoluteFillObject, styles.contentContainer]}>
                            <Text style={styles.midHeader}>Create new Note</Text>
                        </View> 
                    : null}

                    <View style={styles.bottomLayout}>
                        <CircularButton 
                            onPress={() => setModalVisible(true)} 
                            style={styles.cirularButtonStyle} 
                            name="plus"
                        />
                    </View>

                </View>
                
            </TouchableWithoutFeedback>

            <NoteInputModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                saveNote={handleOnSaveNote}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
        zIndex: 1,
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },

    midHeader: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },

    bottomLayout: {
        position: 'absolute',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        right: 25,
        bottom: 50,
    },

    circularButtonStyle: {
        position: 'absolute',
        zIndex: 1,
    },
})

export default AllNotes;
