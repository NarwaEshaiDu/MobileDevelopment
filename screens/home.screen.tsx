import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FlatList, View, StyleSheet, Text, Button, Image } from "react-native";
import CatView from "../components/cat-view.component";
import { CatModel } from "../interfaces/cat-api.interface";
import { Camera } from "expo-camera";


const HomeScreen = () => {
    const [ cats, setCats ] = useState<CatModel[]>([]);

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

    const takePicture= async()=>{
      let picture = await camera.current.takePictureAsync();
      setImage(picture.uri);
    }

    const loadCats = async()=>{
      try{
        const { data } = await axios.get<CatModel[]>('https://api.thecatapi.com/v1/images/search?limit=100',{
          headers:{
            ["x-api-key"]:"07b9d1ac-e5a5-41b8-a574-05803c333348"
          }
        });
  
        const catsWithBreeds: CatModel[] = data.filter((cat: CatModel) => cat.breeds.length > 0);
        setCats(catsWithBreeds);
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={camera} />
        {image && <Image source={{uri:image}} style={{width:200, height:200}}></Image> }
        <Button title="Take Picture" onPress={takePicture }></Button>
      } catch{ } 
    };
  
  
    const renderItem = ({item}: any) => {
      return <CatView cat={item}></CatView>
    };
  
    const keyExtractor = (cat: CatModel)=> cat.url;
    
    useEffect(()=>{
      (async() =>{
        const permission = await Camera.requestCameraPermissionsAsync();
        setHaspermission(permission.status==='granted');
        loadCats();
      })();
    },[]);
  
    return (
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