import React, { useEffect, useState, useRef, useContext } from "react";
import { FlatList, View, StyleSheet, Text, Button, Image, Pressable } from "react-native";
import CatView from "../components/cat-view.component";
import { CatModel } from "../interfaces/cat-api.interface";
import { Camera } from "expo-camera";
import { PussyContext } from "../interfaces/context.interface";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const HomeScreen = () => {
  let { cats, refresh } = useContext(PussyContext);
  const navigation: StackNavigationProp<any> = useNavigation();

  const renderItem = ({ item }: any) => {
    return <CatView cat={item} alwaysBlue={false}></CatView>;
  };

  const keyExtractor = (cat: CatModel) => cat.url;

  const goToCamera = () => navigation.navigate("Camera");

  <View style={styles.container}></View>;
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={goToCamera}>
        <Text style={{ color: "white", fontSize: 18 }}>Take Picture</Text>
      </Pressable>
      <FlatList data={cats} renderItem={renderItem} keyExtractor={keyExtractor} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    padding: 20,
    justifyContent: "center",
    display: "flex"
  },
  button: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "orange",
    marginHorizontal: -20
  }
});
