import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { PussyContext } from "../interfaces/context.interface";

const CameraScreen = () => {
  const navigation: StackNavigationProp<any> = useNavigation();
  let { refresh } = useContext(PussyContext);
  const [hasPermission, setHaspermission] = useState<boolean>();
  const [flipType, setFlipType] = useState(Camera.Constants.Type.front);
  let camera: any = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === "granted");
    })();
  }, []);

  const generateUUID = () => {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
    let uuid = [];
    for (let i = 0; i < 10; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join("");
  };

  const takePicture = async () => {
    console.log(camera);
    let picture = await camera.takePictureAsync({ skipProcessing: true });
    const newCat: CatModel = {
      id: generateUUID(),
      width: 500,
      height: 500,
      url: picture.uri,
      isFavorite: true,
      breeds: [
        {
          id: generateUUID(),
          description: "picture was taken at: " + Date.now(),
          name: "Alpha Chad",
          intelligence: -1,
          temperament: "",
          energy_level: -1,
          health_issues: -1
        }
      ]
    };
    refresh(newCat);

    navigation.navigate("Home");
  };

  const flipCamera = () => {
    setFlipType(
      flipType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={flipType}
        ref={r => {
          camera = r;
        }}></Camera>
      <TouchableOpacity style={[styles.button, { marginBottom: 5 }]} onPress={flipCamera}>
        <Text style={{ color: "white", fontSize: 18 }}>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={{ color: "white", fontSize: 18 }}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "orange",
    marginHorizontal: -20,
    padding: 10
  }
});

export default CameraScreen;
