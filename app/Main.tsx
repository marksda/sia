import React from "react";
import { useAppSelector } from "./redux-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignInScreen } from "../scenes/auth/sign-in.component";
import { StatusBar } from "../components/status-bar.component";
import { AppNavigator } from "../navigation/app.navigator";

export const Main = (): React.ReactElement => {

    const token = useAppSelector(state => state.token); 
    
    return (
        <SafeAreaProvider>
            {
                token.authorized == null ? 
                <SignInScreen /> : 
                <>
                    <StatusBar />
                    <AppNavigator />
                </>                
            }
        </SafeAreaProvider>
    );

};