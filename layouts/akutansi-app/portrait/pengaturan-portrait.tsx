import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon, IconElement, Layout, Text } from "@ui-kitten/components";
import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import PembukuanAkunPortraitLayout from "./pembukuan-akun-portrait";


const { Navigator, Screen } = createBottomTabNavigator();

const HakAksesIcon = (props: any): IconElement => (
    <Icon {...props} name='account-cog-outline' pack='material' />
);

const PrinterIcon = (props: any): IconElement => (
    <Icon {...props} name='printer-outline' pack='material' />
);
  
const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>ORDERS</Text>
    </Layout>
);

interface IBottomTabBarProps {
    navigation: any;
    state: any;
};

const BottomTabBar: FC<IBottomTabBarProps> = ({ navigation, state }) => {
    
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const _handleOnpress = (index: number) => {
        setSelectedIndex(index);
        navigation.navigate(state.routeNames[index])
    };

    return (
        <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={_handleOnpress}
        appearance="default"
        style={{borderTopWidth: 1, borderTopColor: "#EBE9EA"}}
        >
        <BottomNavigationTab title='Hak Akses' icon={<HakAksesIcon style={{height: 24, color: "#FA8105"}} onPress={() => _handleOnpress(0)}/>}/>
        <BottomNavigationTab title='Printer' icon={<PrinterIcon style={{height: 24, color: "#FA8105"}} onPress={() => _handleOnpress(1)}/>} />
        </BottomNavigation>
    );
};

interface IPengaturanPortraitLayoutProps {
    navigation: any;
};

const PengaturanPortraitLayout: FC<IPengaturanPortraitLayoutProps> = ({navigation}) => {    
    return (        
        <Layout style={styles.container}>
            <Navigator tabBar={props => <BottomTabBar {...props}/>}>
                <Screen 
                    name='hak_akses' 
                    options={{
                    headerShown: false,                    
                }}>{
                    () => (<PembukuanAkunPortraitLayout navigation={navigation}/>)
                }</Screen>
                <Screen 
                    name='printer' 
                    component={OrdersScreen} 
                    options={{headerShown: false,}}
                />
            </Navigator>
        </Layout>               
    );
};

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: 'column',
    }
});

export default PengaturanPortraitLayout;