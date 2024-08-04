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
import { normalizePxToDp } from "../../features/utils/android-dp-px-converter";
import { useWindowDimensions } from "react-native";

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
    const dimensions = useWindowDimensions();

    return (
    <SafeAreaProvider>
        <StatusBar hidden={false} backgroundColor="#61dafb"/>
        <NavigationContainer theme={navigatorTheme}>    
            <Drawer.Navigator
                screenOptions={{
                    drawerType: screenOrientation == "landscape" ? 'front' : 'front',
                    headerShadowVisible: screenOrientation == "landscape" ? false : true,
                    headerShown: screenOrientation == "landscape" ? false : false,
                    headerStyle: {
                        height: screenOrientation == "landscape" ? normalizePxToDp(16, dimensions.scale):normalizePxToDp(24, dimensions.scale),
                        elevation: 1,
                    },
                    // headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: screenOrientation == "landscape" ? normalizePxToDp(8, dimensions.scale):normalizePxToDp(11, dimensions.scale),
                    },
                    drawerStyle: {
                        width: screenOrientation == "landscape" ? 160 : 350,
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
                    screenOrientation == "portrait" ? (props) => <PembukuanPortraitLayout navigation={props.navigation}/> : (props) => <PembukuanLandscapeLayout navigation={props.navigation} />
                }   
                </Drawer.Screen>
                <Drawer.Screen name='laporan' component={LaporanScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
    );
};

export default AkutansiRouteProvider;