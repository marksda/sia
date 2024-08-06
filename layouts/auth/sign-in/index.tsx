import React from "react";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { ImageOverlay } from "./extra/image-overlay.component";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "./extra/icons";
import { useAppDispatch } from "../../../app/akutansi-app-redux-hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ICredential } from "../../../features/entities/credential";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialSchema } from "../../../features/schema-resolver/zod-schema";
import { fetchToken } from "../../../services/redux-token-slice.service";

export default (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { handleSubmit, control} = useForm<ICredential>({
      resolver: zodResolver(CredentialSchema)
    });
    const [userName, setUserName] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [disableForm, setDisableForm] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<ICredential> = (data): void => {
      setDisableForm(true);
      dispatch(fetchToken(data)).then((dataHasil) => {
        setDisableForm(false);
      }).catch(() => {
        setDisableForm(false);
      });      
    };

    return (
      <KeyboardAvoidingView>
        <ImageOverlay
            style={styles.container}
            source={require('./assets/image-background.jpg')}>
            <View style={styles.signInContainer}>                  
              <Text
                  style={styles.signInLabel}
                  status='control'
                  category='h4'>
                  SIGN IN
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
                  <Input
                    label='User name'
                    placeholder='isikan user name'
                    status='control'
                    value={userName}
                    disabled={disableForm}
                    onChangeText={(newValue?: string) => {
                        field.onChange(newValue || '');
                        setUserName(newValue || '');
                      }
                    }
                  />
                }
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
                  <Input
                      style={styles.passwordInput}
                      secureTextEntry={true}
                      placeholder='isikan password'
                      label='Password'
                      status='control'
                      value={password}
                      disabled={disableForm}
                      onChangeText={(newValue?: string) => {
                        field.onChange(newValue || '');
                        setPassword(newValue || '');
                      }
                    }
                  />
                }
              />
            </View>
            <Button
                status='control'
                size='large'
                disabled={disableForm}
                onPress={handleSubmit(onSubmit)}>
                SIGN IN
            </Button>
            <View style={styles.socialAuthContainer}>
                <Text
                    style={styles.socialAuthHintText}
                    status='control'>
                    Sign with a social account
                </Text>
                <View style={styles.socialAuthButtonsContainer}>
                    <Button
                    appearance='ghost'
                    size='giant'
                    status='control'
                    accessoryLeft={GoogleIcon}
                    />
                    <Button
                    appearance='ghost'
                    size='giant'
                    status='control'
                    accessoryLeft={FacebookIcon}
                    />
                    <Button
                    appearance='ghost'
                    size='giant'
                    status='control'
                    accessoryLeft={TwitterIcon}
                    />
                </View>
            </View>
        </ImageOverlay>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    signInContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
    },
    socialAuthContainer: {
      marginTop: 48,
    },
    evaButton: {
      maxWidth: 72,
      paddingHorizontal: 0,
    },
    formContainer: {
      flex: 1,
      marginTop: 48,
      marginBottom: 24
    },
    passwordInput: {
      marginTop: 16,
    },
    signInLabel: {
      flex: 1,
    },
    signUpButton: {
      flexDirection: 'row-reverse',
      paddingHorizontal: 0,
    },
    socialAuthButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
      alignSelf: 'center',
      marginBottom: 16,
    },
});