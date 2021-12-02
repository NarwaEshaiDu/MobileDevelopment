import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button,Image } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack' 
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export interface CatViewProps{
  item:CatModel
}

const CatView = ({item}:CatViewProps) => {
  const navigation : StackNavigationProp<any> = useNavigation();
  const onPress = () => {
    navigation.navigate('Detail', {cat: item});
  }

  return(
  <View style={{backgroundColor:'pink',padding:20,margin:4,borderWidth:2}}>
    <TouchableOpacity  onPress={onPress}>
    <Image
    style={{width:100,height:100}}
        source={{uri:item.url}}/>
    </TouchableOpacity>
  </View>
  );

  
}

export interface CatModel {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
}

interface ListItemProps {
  dinosaur: CatModel,
  selected?: boolean,
  onPress: () => void
}

const HomeScreen =()=>{
  const [cat, setCat] = useState([]);  
  

  const loadCat = async()=>{
    try{
      const response = await axios.get<any>('https://api.thecatapi.com/v1/images/search?limit=100',{
        headers:{
          ["x-api-key"]:"07b9d1ac-e5a5-41b8-a574-05803c333348"
        }
      });

      const catsWithBreeds = response.data.filter(x => x.breeds.length > 0);
      console.log(catsWithBreeds);
      setCat(catsWithBreeds);
    }catch{} 
  };

const renderItem=({item})=>{
  return <CatView item={item}></CatView>
}
const keyExtractor=(item)=>item.url;


  useEffect(()=>{
    loadCat();
  },[]);

  return (
    // <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:"center"}}>
    //   <Text>Home Screen</Text>
    //   {/* hier komt dan onze lijst van katten? en wij willen de details van zien.
    //   dit doen we door de ID mee te geven aan de detailscreen { itemId : 1} */}
    //   <Button title="Item 2" onPress={()=> navigation.navigate('Detail',{itemId:2})}/>
    // </View>
    <View style={styles.container}>
      <FlatList 
        data={cat}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}
const DetailScreen = (props) =>{
  const navigation : StackNavigationProp<any> = useNavigation();
  console.log(props.route.params.cat);  
  const { breeds, url } = props.route.params.cat;
  const {name, description,energy_level,health_issues,intelligence,origin,temperament} = breeds[0];
  
  useEffect(()=> {
    navigation.setOptions({title:"Details of " + name});
  },[]);

  return (
    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:"center"}}>
      <Image
    style={{width:100,height:100}}
        source={{uri:url}}/>
        <Text>{description}</Text>
        <Text>{energy_level}</Text>
        <Text>{health_issues}</Text>
        <Text>{origin}</Text>
        <Text>{temperament}</Text>
        <Text>{intelligence}</Text>
    </View>
  )
}

const Stack = createStackNavigator();



export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:"red"}, headerTitleStyle:{fontWeight:"bold"}, headerTintColor:"white"
      }}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding:20,
    justifyContent: 'center',
  },
});
