import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View, Image, StyleSheet } from "react-native";
import LabelInfoComponent from "../components/label-info.component";
import { LabelInfoInterface } from "../interfaces/label-info.interface";

const DetailScreen = () => {
  const navigation: StackNavigationProp<any> = useNavigation();
  const route: RouteProp<any> = useRoute();
  const { breeds, url } = route.params?.cat as CatModel;
  const { name, description, energy_level, intelligence, temperament, health_issues } = breeds
    ? breeds[0]
    : {
        name: "cat",
        description: "",
        energy_level: -1,
        intelligence: -1,
        temperament: "",
        health_issues: -1
      };

  const labelInfoArray: LabelInfoInterface[] = [
    { label: "Energy Level", value: energy_level + "/5", isVisible: energy_level === -1 },
    { label: "Health Issues", value: health_issues + "/5", isVisible: health_issues === -1 },
    { label: "Temperament", value: temperament, isVisible: temperament === "" },
    { label: "Intelligence Level", value: intelligence + "/5", isVisible: intelligence === -1 }
  ];

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return route.params?.cat ? (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: url }} />
      <Text style={styles.textStyle}>{description}</Text>
      {labelInfoArray.map((labelInfo: LabelInfoInterface) => (
        <LabelInfoComponent
          key={labelInfo.label}
          label={labelInfo.label}
          value={labelInfo.value}
          styleText={styles.textStyle}
          styleBold={styles.boldTextStyle}
          isVisible={labelInfo.isVisible}
        />
      ))}
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
    textAlign: "left"
  },
  imageStyle: {
    flex: 1,
    width: 300,
    height: "auto",
    shadowOpacity: 3,
    shadowRadius: 4,
    borderRadius: 7,
    marginBottom: 10,
    marginHorizontal: "auto"
  },
  textStyle: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 14,
    marginBottom: 5
  },
  boldTextStyle: {
    fontWeight: "600"
  }
});

//TODO: Compentent maken van text components (line 33)
