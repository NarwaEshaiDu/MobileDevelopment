import React, { useEffect, useState, useRef, useContext } from "react";
import { FlatList, View, StyleSheet, Text, Button, Image, Pressable } from "react-native";
import CatView from "../components/cat-view.component";
import { CatModel } from "../interfaces/cat-api.interface";
import { Camera } from "expo-camera";
import { PussyContext } from "../interfaces/context.interface";

const HomeScreen = () => {
    let { cats,refresh } = useContext(PussyContext);

    
  const [hasPermission, setHaspermission] = useState<boolean>();
  const [image, setImage] = useState<string>("");
  let camera: any = useRef();

    const renderItem = ({item}: any) => {
      return <CatView cat={item} alwaysBlue={false}></CatView>
    };
  
    const keyExtractor = (cat: CatModel)=> cat.url;

    if(hasPermission===null)
    {
      return <View/>
    }
    if(hasPermission===false)
    {
      return <Text>No access to the camera</Text>
    }

    useEffect(()=>{
      (async() =>{
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHaspermission(status==='granted');
      })();
    },[]);

    const takePicture= async()=>{
      if (await Camera.isAvailableAsync()) {
        let picture = await camera._cameraHandle.takePicture({ skipProcessing: true });
        setImage(picture.uri);;

        const newCat: CatModel = {id:"rtest", width: 500, height: 500, url: image, isFavorite: true, breeds: [{id:"test", description: "picture was taken at: " + Date.now(), name: "Alpha Chad", intelligence:-1, temperament:"",energy_level:-1, health_issues:-1}] }
        refresh(newCat);
      }

    }
    
    <View style={styles.container}>
    
  </View>
    return (
      <View style={styles.container}>
        <Camera type={Camera.Constants.Type.front} 
          ref={(r) => {
          camera = r
        }}>
      </Camera>
      <Pressable style={styles.button} onPress={takePicture}><Text style={{color:"white",fontSize:18}}>Take Picture</Text></Pressable>
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
      display:'flex'
    },
    button:{
      display:"flex",
      alignItems:"center",
      textAlign:"center",
      backgroundColor:"orange",
      marginHorizontal:-20
    }
  });