import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import { CatModel } from "../interfaces/cat-api.interface";
import { PussyContext } from "../interfaces/context.interface";

export interface CatViewProps {
  cat: CatModel;
  alwaysBlue: boolean;
}

const CatView = ({ cat, alwaysBlue }: CatViewProps) => {
  const navigation: StackNavigationProp<any> = useNavigation();
  let { refresh } = useContext(PussyContext);

  const onPress = () => {
    navigation.navigate("Detail", { cat });
  };

  const setAsFavorite = async () => {
    await refresh(cat, false);
  };

  useEffect(() => {}, []);

  return (
    <View
      style={[
        {
          backgroundColor: !cat.isFavorite || alwaysBlue ? "blue" : "#BC1D1D"
        },
        styles.viewStyle
      ]}>
      <TouchableOpacity onPress={onPress} onLongPress={setAsFavorite} delayLongPress={1500}>
        <Image style={styles.imageStyle} source={{ uri: cat.url }} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>{cat.breeds[0]?.name}</Text>
    </View>
  );
};

export default CatView;

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 7,
    shadowOpacity: 3,
    shadowRadius: 4
  },
  viewStyle: {
    padding: 20,
    margin: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 7,
    shadowOpacity: 4,
    shadowRadius: 6
  },
  textStyle: {
    width: 100,
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});
