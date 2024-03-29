import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, FlatList } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}


export function Home(){

  const [ newSkill, setNewSkill ] = useState('');
  const [ mySkill, setMySkill ] = useState<SkillData[]>([]);
  const [ greetings, setGreetings ] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkill(oldState => [ ...oldState, data]);
  }


  function handleRemoveSkill(id: string) {
    setMySkill(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good Afternoon');
    } else {
      setGreetings('Good Night');
    }

  }, []);

  return (
      <View style={styles.container}>

        <Text style={styles.title}>Welcome, Daniel!</Text>

        <Text style={styles.greetings}>
          {greetings}
        </Text>

        <TextInput 
          style={styles.input}
          placeholder='New skill'
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button onPress={handleAddNewSkill} title="Add" />

        <Text style={[styles.title, {marginVertical: 50 } ]}>
          My Skills
        </Text>



        <FlatList  data={mySkill} keyExtractor={item => item.id} renderItem={({ item }) => (
          <SkillCard skillName={item.name} onPress={() => handleRemoveSkill(item.id)}/>
        )} />

      </View>
  )
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  },

})