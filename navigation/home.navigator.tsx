import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawer } from "../scenes/home/home-drawer.component";
import { TransaksiScreen } from "../scenes/components/transaksi.component";
import { LaporanScreen } from "../scenes/components/laporan.component";


const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => {
    return (
        <Drawer.Navigator
            drawerContent={props => <HomeDrawer {...props} />}>
            <Drawer.Screen name='Transaksi'>
                {(props) => <TransaksiScreen navigation={props.navigation}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Laporan' component={LaporanScreen} />
        </Drawer.Navigator>
    );
};