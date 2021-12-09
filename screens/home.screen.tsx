import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { FlatList, View, StyleSheet, Text, Button, Image } from "react-native";
import CatView from "../components/cat-view.component";
import { CatModel } from "../interfaces/cat-api.interface";
import { Camera } from "expo-camera";
import { PussyContext } from "../interfaces/context.interface";


const HomeScreen = () => {
    let { cats } = useContext(PussyContext);

    const [hasPermission, setHaspermission] = useState<boolean>();
    const [image, setImage] = useState();
    const camera = useRef();
   

    if(hasPermission===null)
    {
      return <View/>
    }
    if(hasPermission===false)
    {
      return <Text>No access to the camera</Text>
    }

    // const takePicture= async()=>{
    //   let picture = await camera.current.takePictureAsync();
    //   setImage(picture.uri);
    // }

    const renderItem = ({item}: any) => {
      return <CatView cat={item} alwaysBlue={false}></CatView>
    };
  
    const keyExtractor = (cat: CatModel)=> cat.url;
    
    useEffect(()=>{
      (async() =>{
        const permission = await Camera.requestCameraPermissionsAsync();
        setHaspermission(permission.status==='granted');
      })();
    },[]);
  
    return (
      <View style={styles.container}>
        <FlatList 
          // refreshing={loading}
          // onRefresh={() => {refresh()}}
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