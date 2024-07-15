import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawer } from "../scenes/home/home-drawer.component";
import { TransaksiScreen } from "../scenes/components/transaksi.component";
import { LaporanScreen } from "../scenes/components/laporan.component";
import { useWindowDimensions } from "react-native";
import { Header, getHeaderTitle } from '@react-navigation/elements';
import React from "react";


const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => {
    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
                headerShadowVisible: dimensions.width >= 768 ? false : true,
                headerShown: true,
                // header: ({ options, route }) => (
                //     <Header {...options} title={getHeaderTitle(options, route.name)} headerTitleAlign="left"/>
                // ),
                headerStyle: {
                    backgroundColor: '#f4511e',
                    height: dimensions.width >= 768 ? 32:48
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: '500',
                    fontSize: dimensions.width >= 768 ? 16:20,
                },
                drawerStyle: {
                    width: dimensions.width >= 768 ? 160 : 350,
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
    );
};