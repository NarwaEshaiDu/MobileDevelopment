import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View ,Image } from 'react-native';

const DetailScreen = () =>{
    const navigation : StackNavigationProp<any> = useNavigation();
    const route : RouteProp<any> = useRoute();
  
    const { breeds, url } = route.params?.cat as CatModel;
    const { name, description, energy_level, health_issues, intelligence, origin, temperament } 
      = breeds ? breeds[0] : { name: "cat", description: "", energy_level: "", health_issues: "", intelligence: "", origin: "", temperament: "" };
  
    useEffect(()=> {
      navigation.setOptions({title: "Details of " + name});
    },[]);
  
    
    return route.params?.cat 
      ? (<View style={{flex: 1,backgroundColor: '#fff',justifyContent: 'center',alignItems: "center"}}>
          <Image
            style={{ width: 100,height: 100 }}
            source={{ uri: url }}/>
            <Text>{ description }</Text>
            <Text>{ energy_level }</Text>
            <Text>{ health_issues }</Text>
            <Text>{ origin }</Text>
            <Text>{ temperament }</Text>
            <Text>{ intelligence }</Text>
        </View>) 
      : (<Text>No cat was found</Text>)
  }

  export default DetailScreen;
  