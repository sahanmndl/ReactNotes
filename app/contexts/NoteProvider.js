import React, {createContext, useEffect, useState, useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NoteContext = createContext()

const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        const result = await AsyncStorage.getItem('notes')
        if (result !== null) {
            setNotes(JSON.parse(result))
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export const provideNotes = () => useContext(NoteContext)

export default NoteProvider
