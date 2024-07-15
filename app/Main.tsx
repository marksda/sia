import React, { useEffect, useState } from "react";
import { useAppSelector } from "./redux-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignInScreen } from "../scenes/auth/sign-in.component";
import { StatusBar } from "../components/status-bar.component";
import { AppNavigator } from "../navigation/app.navigator";
import { Dimensions,  } from "react-native";
import { Text } from "@ui-kitten/components";

const windowDimensions = Dimensions.get('window');

export const Main = (): React.ReactElement => {
    const token = useAppSelector(state => state.persisted.token); 
    const [dimensions, setDimensions] = useState({
        window: windowDimensions
      });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window}) => {
            setDimensions({window});
          },
        );
        return () => subscription?.remove();
    });

    return (
        <SafeAreaProvider>
            {
                token == null ? 
                <SignInScreen /> : 
                <>
                    <StatusBar hidden={false} backgroundColor="#61dafb"/>
                    <AppNavigator />
                    <Text>
                        scale: {dimensions.window.scale} - width: {dimensions.window.width}
                    </Text>
                </>                
            }
        </SafeAreaProvider>
    );
};