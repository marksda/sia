import { createDrawerNavigator } from "@react-navigation/drawer";
import { TransaksiScreen } from "../../scenes/components/transaksi.component";
import { LaporanScreen } from "../../scenes/components/laporan.component";
import { FC } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import useScreenOrientation from "../../features/utils/screen-orientation";
import { StatusBar } from "../../components/status-bar.component";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AkutansiDrawerNav from "./akutansi-drawer-nav";
import PembukuanPortraitLayout from "../../layouts/portrait/pembukuan-portrait";
import PembukuanLandscapeLayout from "../../layouts/landscape/pembukuan-landscape";

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
    <SafeAreaProvider>
        <StatusBar hidden={true} backgroundColor="#61dafb"/>
        <NavigationContainer theme={navigatorTheme}>    
            <Drawer.Navigator
                screenOptions={{
                    drawerType: screenOrientation == "landscape" ? 'permanent' : 'front',
                    headerShadowVisible: screenOrientation == "landscape" ? false : true,
                    headerShown: screenOrientation == "portrait" ? true : false,
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
                        elevation: 0,
                    }
                }}   
                drawerContent={(props) => <AkutansiDrawerNav {...props} />}>
                <Drawer.Screen 
                    name='transaksi'
                    options={{
                        title: "Transaksi - Penjualan"
                    }}
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
                <Drawer.Screen 
                    name='pembukuan'
                    options={{
                        title: "Pembukuan"
                    }}
                >
                { 
                    screenOrientation == "portrait" ? (props) => <PembukuanPortraitLayout navigation={props.navigation} /> : (props) => <PembukuanLandscapeLayout navigation={props.navigation} />
                }   
                </Drawer.Screen>
                <Drawer.Screen name='laporan' component={LaporanScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
    );
};

export default AkutansiRouteProvider;