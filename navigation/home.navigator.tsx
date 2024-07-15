import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawer } from "../scenes/home/home-drawer.component";
import { TransaksiScreen } from "../scenes/components/transaksi.component";
import { LaporanScreen } from "../scenes/components/laporan.component";
import { useWindowDimensions } from "react-native";


const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => {
    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
            }}   
            drawerContent={props => <HomeDrawer {...props} />}>
            <Drawer.Screen name='Transaksi'>
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