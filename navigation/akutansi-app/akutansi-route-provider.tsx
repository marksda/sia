import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawer } from "../../scenes/home/home-drawer.component";
import { TransaksiScreen } from "../../scenes/components/transaksi.component";
import { LaporanScreen } from "../../scenes/components/laporan.component";
import { FC } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import useScreenOrientation from "../../features/utils/screen-orientation";


const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
};

const Drawer = createDrawerNavigator();

const AkutansiRouteProvider: FC = (): React.ReactElement => {
    const screenOrientation = useScreenOrientation();

    return (
        <NavigationContainer theme={navigatorTheme}>    
            <Drawer.Navigator
                screenOptions={{
                    drawerType: screenOrientation == "landscape" ? 'permanent' : 'front',
                    headerShadowVisible: screenOrientation == "landscape" ? false : true,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: 'red',
                        height: screenOrientation == "landscape" ? 32:48
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: '500',
                        fontSize: screenOrientation == "landscape" ? 16:20,
                    },
                    drawerStyle: {
                        width: screenOrientation == "landscape" ? 160 : 350,
                    }
                }}   
                drawerContent={props => <HomeDrawer {...props} />}>
                <Drawer.Screen 
                    name='Transaksi'
                >
                    {
                        (props) => <TransaksiScreen 
                                        initSelectedFilters={
                                            {
                                                pageNumber: 1,
                                                pageSize: 25,
                                                filters: [],
                                                sortOrders: [],
                                            }
                                        }
                                        navigation={props.navigation}
                                    />
                    }
                </Drawer.Screen>
                <Drawer.Screen name='Laporan' component={LaporanScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AkutansiRouteProvider;