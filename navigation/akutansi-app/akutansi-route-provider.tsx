import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNav from "../drawer-nav";
import { TransaksiScreen } from "../../scenes/components/transaksi.component";
import { LaporanScreen } from "../../scenes/components/laporan.component";
import { FC } from "react";
import { DefaultTheme, NavigationContainer, NavigationProp, useNavigation } from "@react-navigation/native";
import useScreenOrientation from "../../features/utils/screen-orientation";
import { StatusBar } from "../../components/status-bar.component";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IItemNav } from "../../features/entities/item-nav";
import { Icon } from "@ui-kitten/components";


const KasirIcon = (props: any) => (
    <Icon name='kasir' {...props} pack='assets'/>
);
  
const ReportIcon = (props: any) => (
    <Icon name='laporan' {...props} pack='assets'/>
);
  
const PengaturanIcon = (props: any) => (
    <Icon name='pengaturan' {...props} pack='assets'/>
);

const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
};

const Drawer = createDrawerNavigator();

function generateDataNav(navigation: any):IItemNav[] {
    return [
        {
            title: 'Transaksi',
            icon: KasirIcon,
            onPress: () => {
                navigation.toggleDrawer();
                navigation.navigate('Transaksi');
            },
        },
        {
        title: 'Laporan',
        icon: ReportIcon,
            onPress: () => {
                navigation.toggleDrawer();
                navigation.navigate('Laporan');
            },
        },
        {
        title: 'Pengaturan',
        icon: PengaturanIcon,
            onPress: () => {
                navigation.toggleDrawer();
                navigation.navigate('Laporan');
            },
        },
    ];
};

const AkutansiRouteProvider: FC = (): React.ReactElement => {
    const navigation = useNavigation();
    const screenOrientation = useScreenOrientation();

    // const DataItemNav: IItemNav[] = useMemo(
    //     () => generateDataNav(navigation),
    //     [navigation]
    // );

    return (
    <SafeAreaProvider>
        <StatusBar hidden={true} backgroundColor="#61dafb"/>
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
                drawerContent={(props) => <DrawerNav {...props} data={generateDataNav(null)} />}>
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
    </SafeAreaProvider>
    );
};

export default AkutansiRouteProvider;