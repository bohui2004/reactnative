/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_AGE ='@save_age'
const STORAGE_KEY_NAME='@save_name'

const App = () =>{

  const [age, setAge]= useState('')
  const [name, setName]= useState('')

  //save data into async store
  const saveData = async () =>{
    try{
      await AsyncStorage.setItem(STORAGE_KEY_AGE,age)
      await AsyncStorage.setItem(STORAGE_KEY_NAME,name)

      alert('Data successfully saved')
    } catch (e){
      alert('Failed to save the data to the storage')
    }
  }

  //read data from async storage
  const readData = async () => {
    try{
      const userAge = await AsyncStorage.getItem(STORAGE_KEY_AGE)
      const userName = await AsyncStorage.getItem(STORAGE_KEY_NAME)

      if(userAge !== null){
        setAge(userAge)
      }
      if(userName !== null){
        setName(userName)
      }
    } catch (e){
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect(() => {
    readData()
  }, [])

  //clear data from async storage
  const clearStorage = async () => {
    try{
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e){
      alert('Failed to clear async storage')
    }
  }

  const onChangeTextAge = userAge => setAge(userAge)
  const onChangeTextName = userName => setName(userName)

  const onSubmitEditing = () => {
    if(!age && !name) return
    saveData(age,name)
    setAge('')
    setName('')
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Async Storage</Text>
      </View>
      <View style={styles.panel}>
        <Text>Enter your age here:</Text>
        <TextInput
        style={styles.input}
        value={age}
        placeholder= "Age is just a number"
        onChangeText={onChangeTextAge}
        onSubmitEditing={onSubmitEditing}
        />
        <Text style={styles.text}>Your age is {age}</Text>
        <Text>Enter your name here:</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={onChangeTextName}
          onSubmitEditing={onSubmitEditing}
        />
        <Text style={styles.text}>Your name is {name}</Text>
        <TouchableOpacity onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}> Clear storage</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

  header:{
    width:'100%',
    backgroundColor:'#dcdcdc',
    padding:20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems:'center'
  },

  title:{
    fontSize:22,
    color:'#333',
    fontWeight: 'bold'
  },

  panel :{
    paddingTop: 40,
    alignItems: 'center'
  },

  text:{
    fontSize:24,
    padding:10,
    backgroundColor:'#dcdcdc'
  },

  input:{
    padding:15,
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'#333',
    margin:10
  },

  button:{
    margin: 10,
    padding:10,
    backgroundColor: 'yellow'
  },

  buttonText :{
    fontSize:18,
    color:'#444'
  }
})


export default App;
