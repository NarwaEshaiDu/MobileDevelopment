import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View, Image, StyleSheet } from "react-native";

const DetailScreen = () => {
  const navigation: StackNavigationProp<any> = useNavigation();
  const route: RouteProp<any> = useRoute();
  const { breeds, url } = route.params?.cat as CatModel;
  const {
    name,
    description,
    energy_level,
    intelligence,
    temperament,
    health_issues,
  } = breeds
    ? breeds[0]
    : {
        name: "cat",
        description: "",
        energy_level: -1,
        intelligence: -1,
        temperament: "",
        health_issues: -1,
      };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return route.params?.cat ? (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: url }} />
      <Text style={styles.textStyle}>{description}</Text>
      {energy_level === -1 || (
        <Text style={styles.textStyle}>
          <Text style={styles.boldTextStyle}>Energy Level:</Text> {energy_level}
          /5
        </Text>
      )}
      {health_issues === -1 || (
        <Text style={styles.textStyle}>
          <Text style={styles.boldTextStyle}>Health Issues:</Text>{" "}
          {health_issues}/5
        </Text>
      )}
      {temperament === "" || (
        <Text style={styles.textStyle}>
          <Text style={styles.boldTextStyle}>Temperament:</Text> {temperament}
        </Text>
      )}
      {intelligence === -1 || (
        <Text style={styles.textStyle}>
          <Text style={styles.boldTextStyle}>Intelligence Level:</Text>{" "}
          {intelligence}/5
        </Text>
      )}
    </View>
  ) : (
    <Text>No cat was found</Text>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E94242",
    padding: 20,
    justifyContent: "center",
    display: "flex",
    textAlign: "left",
  },
  imageStyle: {
    flex: 1,
    width: 300,
    height: "auto",
    shadowOpacity: 3,
    shadowRadius: 4,
    borderRadius: 7,
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  textStyle: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 14,
    marginBottom: 5,
  },
  boldTextStyle: {
    fontWeight: "600",
  },
});

//TODO: Compentent maken van text components (line 33)
