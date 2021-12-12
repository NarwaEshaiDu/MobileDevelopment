import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
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
    await refresh(cat);
  };

  useEffect(() => {}, []);

  return (
    <View
      style={{
        backgroundColor: !cat.isFavorite || alwaysBlue ? "blue" : "pink",
        padding: 20,
        margin: 4,
        borderWidth: 2
      }}>
      <TouchableOpacity onPress={onPress} onLongPress={setAsFavorite} delayLongPress={1500}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: cat.url }} />
      </TouchableOpacity>
    </View>
  );
};

export default CatView;
