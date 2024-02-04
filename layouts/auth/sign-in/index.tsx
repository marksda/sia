import React from "react";
import { KeyboardAvoidingView } from "./extra/3rd-party";

export default (): React.ReactElement => {
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    return (
        <KeyboardAvoidingView>
            
        </KeyboardAvoidingView>
    );
}