import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawer } from "../scenes/home/home-drawer.component";
import { TransaksiScreen } from "../scenes/components/transaksi.component";


const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => (
    <Drawer.Navigator
        drawerContent={props => <HomeDrawer {...props} />}>
        <Drawer.Screen name='Transaksi' component={TransaksiScreen} />
        <Drawer.Screen name='Laporan' component={TransaksiScreen} />
    </Drawer.Navigator>
);