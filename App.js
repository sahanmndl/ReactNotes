import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AllNotes from './app/screens/AllNotes';
import Intro from './app/screens/Intro';
import NoteDetails from './app/components/NoteDetails';
import NoteProvider from './app/contexts/NoteProvider';

const Stack = createStackNavigator()

export default function App() {
  const [user, setUser] = useState({})
  const [appInitialised, setAppInitialised] = useState(false)

  const getUser = async () => {
    const currentUser = await AsyncStorage.getItem('user')
    if (currentUser === null) {
      return setAppInitialised(true)
    } else {
      setUser(JSON.parse(currentUser))
      setAppInitialised(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const renderAllNotesScreen = (props) => <AllNotes {...props} user={user} />

  if (appInitialised) {
    return <Intro onFinish={getUser} />
  }
  
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator>
            <Stack.Screen component={renderAllNotesScreen} name="AllNotes" options={{headerShown: false}} />
            <Stack.Screen component={NoteDetails} name="NoteDetails" options={{headerTitle: '', headerTransparent: true}} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer> 
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
