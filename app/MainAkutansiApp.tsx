import React from "react";
import { useAppSelector } from "./redux-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignInScreen } from "../scenes/auth/sign-in.component";
import { StatusBar } from "../components/status-bar.component";
import { AppNavigator } from "../navigation/app.navigator";
import AkutansiRouteProvider from "../navigation/akutansi-app/akutansi-route-provider";

const MainAkutansiApp = (): React.ReactElement => {
    const token = useAppSelector(state => state.persisted.token); 

    return (
        <SafeAreaProvider>
            {
                token == null ? 
                <SignInScreen /> : 
                <>
                    <StatusBar hidden={true} backgroundColor="#61dafb"/>
                    <AkutansiRouteProvider />
                </>                
            }
        </SafeAreaProvider>
    );
};

export default MainAkutansiApp;