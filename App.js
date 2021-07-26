import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import GlobalNav from "./navigators/GlobalNav";
import landing from "./assets/landing.png";
import { AppearanceProvider } from "react-native-appearance";
import { Appearance } from "react-native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar } from "./apollo";


export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [landing];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  const subscription = Appearance.addChangeListener(({ colorScheme }) => { });

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <GlobalNav />
      </AppearanceProvider>
    </ApolloProvider>

  );
}
