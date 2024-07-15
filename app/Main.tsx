import React, { useEffect, useState } from "react";
import { useAppSelector } from "./redux-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignInScreen } from "../scenes/auth/sign-in.component";
import { StatusBar } from "../components/status-bar.component";
import { AppNavigator } from "../navigation/app.navigator";
import { useWindowDimensions,  } from "react-native";
import { Text } from "@ui-kitten/components";

export const Main = (): React.ReactElement => {
    const dimensions = useWindowDimensions();
    const token = useAppSelector(state => state.persisted.token); 

    return (
        <SafeAreaProvider>
            {
                token == null ? 
                <SignInScreen /> : 
                <>
                    <StatusBar hidden={true} backgroundColor="#61dafb"/>
                    <AppNavigator />
                    <Text>
                        scale: {dimensions.scale} - width: {dimensions.width}
                    </Text>
                </>                
            }
        </SafeAreaProvider>
    );
};