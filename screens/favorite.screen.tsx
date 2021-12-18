import React, { useContext, useEffect } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { View, FlatList, StyleSheet } from "react-native";
import CatView from "../components/cat-view.component";
import { PussyContext } from "../interfaces/context.interface";

const FavouriteScreen = () => {
  let { favorites } = useContext(PussyContext);

  const renderItem = ({ item }: any) => {
    return <CatView cat={item} alwaysBlue={true}></CatView>;
  };

  const keyExtractor = (cat: CatModel) => cat.url;
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E94242",
    alignItems: "stretch",
    padding: 20,
    justifyContent: "center",
    display: "flex",
    shadowOpacity: 3,
    shadowRadius: 4,
  },
});
