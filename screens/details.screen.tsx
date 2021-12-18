import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useRef } from "react";
import { CatModel } from "../interfaces/cat-api.interface";
import { Text, View, Image, StyleSheet, Button, Pressable, ScrollView } from "react-native";
import LabelInfoComponent from "../components/label-info.component";
import { LabelInfoInterface } from "../interfaces/label-info.interface";
import { Audio } from "expo-av";
import { PussyContext } from "../interfaces/context.interface";

const DetailScreen = () => {
  let { refresh } = useContext(PussyContext);
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [soundurlState, setsoundurlState] = React.useState<string>();
  const AudioPlayer = useRef(new Audio.Sound());
  const navigation: StackNavigationProp<any> = useNavigation();
  const route: RouteProp<any> = useRoute();
  const { breeds, url, soundurl } = route.params?.cat as CatModel;
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

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const PlayRecordedAudio = async () => {
    try {
      if (soundurl || soundurlState) {
        const url = (soundurl || soundurlState) as string;
        console.log("test", url);
        await AudioPlayer.current.loadAsync({ uri: url }, {}, true);
        const playerStatus = await AudioPlayer.current.getStatusAsync();
        if (playerStatus.isLoaded) {
          setIsPlaying(true);
          AudioPlayer.current.playAsync();
          setTimeout(() => {
            AudioPlayer.current.unloadAsync();
            setIsPlaying(false);
          }, 5000);
        }
      }
    } catch (error) {}
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    console.log(uri);
    if (uri && route.params?.cat) {
      var newCat = { ...route.params?.cat, soundurl: uri };
      refresh(newCat, true);
      setsoundurlState(uri);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return route.params?.cat ? (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.imageStyle} source={{ uri: url }} />
        {route.params?.cat.isFavorite && (
          <View>
            <Pressable
              style={styles.pressableStyle}
              onPress={recording ? stopRecording : startRecording}>
              <Text style={styles.buttonTextStyle}>
                {recording ? "Stop Recording" : "Start Recording"}
              </Text>
            </Pressable>
            {(soundurl || soundurlState) && (
              <Pressable
                style={[styles.pressableStyle, isPlaying && styles.disabled]}
                disabled={isPlaying}
                onPress={PlayRecordedAudio}>
                <Text style={styles.buttonTextStyle}>Play Sound</Text>
              </Pressable>
            )}
          </View>
        )}
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
      </ScrollView>
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
    height: 250,
    shadowOpacity: 3,
    shadowRadius: 4,
    borderRadius: 7,
    marginBottom: 10,
    marginHorizontal: "auto"
  },
  textStyle: {
    // fontFamily: "Roboto",
    fontSize: 14,
    marginBottom: 5
  },
  boldTextStyle: {
    fontWeight: "800"
  },
  pressableStyle: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "orange",
    borderRadius: 100,
    marginBottom: 10
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 18
  },
  disabled: {
    opacity: 0.5
  }
});

//TODO: Compentent maken van text components (line 33)
