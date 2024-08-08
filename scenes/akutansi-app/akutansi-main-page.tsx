import React from "react";
import { useAppSelector } from "../../app/akutansi-app-redux-hooks";
import { SignInScreen } from "../auth/sign-in.component";
import AkutansiRouteProvider from "../../navigation/akutansi-app/akutansi-route-provider";

const MainAkutansiScreen = (): React.ReactElement => {
    const token = useAppSelector(state => state.persisted.token); 
    // console.log(token);

    return token.token == null ? <SignInScreen /> :  <AkutansiRouteProvider />;
};

export default MainAkutansiScreen;