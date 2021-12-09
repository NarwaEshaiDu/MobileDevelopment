import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CatView from "../components/cat-view.component";
import { PussyContext } from "../interfaces/context.interface";

const FavouriteScreen = () => {
  let { favorites } = useContext(PussyContext);


  const renderItem = ({item}: any) => {
    return <CatView cat={item} alwaysBlue={true}></CatView>
  };

  const keyExtractor = (cat: CatModel)=> cat.url;
  useEffect(()=>{
    },[]);
    
  return (
    <View>
        <FlatList 
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
  );
};
export default FavouriteScreen;


