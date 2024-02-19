import React from "react";
import { useAppSelector } from "./redux-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignInScreen } from "../scenes/auth/sign-in.component";

export const Main = (): React.ReactElement => {

    const token = useAppSelector(state => state.token); 
    
    return (
        <SafeAreaProvider>
            <SignInScreen />
        </SafeAreaProvider>
    );

};