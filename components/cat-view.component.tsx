import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { CatViewProps } from "../interfaces/props.interfaces";

const CatView = ({ cat }: CatViewProps) => {
    const navigation: StackNavigationProp<any> = useNavigation();
  
    const onPress = () => {
      navigation.navigate('Detail', { cat });
    }
  
    return(
    <View style={{ backgroundColor: 'pink', padding: 20, margin: 4, borderWidth: 2 }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{width:100,height:100}}
          source={{ uri: cat.url }}
        />
      </TouchableOpacity>
    </View>
    );
  }

  export default CatView;