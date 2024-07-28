import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './home.navigator';
import { useWindowDimensions } from 'react-native';
import useScreenOrientation from '../features/utils/screen-orientation';

const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
};

export const AppNavigator = (): React.ReactElement => {
    const screenOrientation = useScreenOrientation();

    return (
    <NavigationContainer theme={navigatorTheme}>
        <HomeNavigator screenOrientation={screenOrientation}/>
    </NavigationContainer>
    );
};