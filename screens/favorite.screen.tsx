import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CatView from "../components/cat-view.component";

const FavouriteScreen = () => {
  const [ cats, setCats ] = useState<CatModel[]>([]);

  const loadFavorites = async () => {
    let item = await AsyncStorage.getItem("@favourite");

    if (item) {
        let cats = JSON.parse(item);
        setCats(cats);
    }
  };

  const renderItem = ({item}: any) => {
    return <CatView cat={item} reload={loadFavorites}></CatView>
  };



  const keyExtractor = (cat: CatModel)=> cat.url;
  useEffect(()=>{
    loadFavorites();
    },[]);
    
  return (
    <View>
        <FlatList 
          data={cats}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
  );
};
export default FavouriteScreen;


