import React from "react";
import { View, Text, StyleProp, TextStyle } from "react-native";

export interface LabelInfoProps {
  isVisible: boolean;
  label: string;
  value: string | number;
  styleText: StyleProp<TextStyle>;
  styleBold: StyleProp<TextStyle>;
}

const LabelInfoComponent = ({ isVisible, label, value, styleText, styleBold }: LabelInfoProps) => {
  return (
    <View>
      {isVisible || (
        <Text style={styleText}>
          <Text style={styleBold}>{label}:</Text> {value}
        </Text>
      )}
    </View>
  );
};

export default LabelInfoComponent;
