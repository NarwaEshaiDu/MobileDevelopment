import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CatView from "../components/cat-view.component";
import { CatModel } from "../interfaces/cat-api.interface";

const HomeScreen = () => {
    const [ cats, setCats ] = useState<CatModel[]>([]);  
    
    const loadCats = async()=>{
      try{
        const { data } = await axios.get<CatModel[]>('https://api.thecatapi.com/v1/images/search?limit=100',{
          headers:{
            ["x-api-key"]:"07b9d1ac-e5a5-41b8-a574-05803c333348"
          }
        });
  
        const catsWithBreeds: CatModel[] = data.filter((cat: CatModel) => cat.breeds.length > 0);
        setCats(catsWithBreeds);
      } catch{ } 
    };
  
  
    const renderItem = ({item}: any) => {
      return <CatView cat={item}></CatView>
    };
  
    const keyExtractor = (cat: CatModel)=> cat.url;
  
    useEffect(()=>{
      loadCats();
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
          data={cats}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    )
  }

  export default HomeScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      padding:20,
      justifyContent: 'center',
    },
  });