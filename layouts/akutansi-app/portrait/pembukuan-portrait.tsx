import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon, IconElement, Layout, Text } from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet } from "react-native";
import PembukuanAkunPortraitLayout from "./pembukuan-akun-portrait";


const { Navigator, Screen } = createBottomTabNavigator();

const AkunIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='list-outline'
    />
);

const JurnalIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='book-open-outline'
    />
);

const LedgerIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='book-outline'
    />
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

const BottomTabBar: FC<IBottomTabBarProps> = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      appearance="default"
      style={{borderTopWidth: 1, borderTopColor: "#EBE9EA"}}
    >
      <BottomNavigationTab title='Akun' icon={AkunIcon}/>
      <BottomNavigationTab title='Jurnal' icon={JurnalIcon}/>
      <BottomNavigationTab title='S. Ledger' icon={LedgerIcon}/>
      <BottomNavigationTab title='Ledger' icon={LedgerIcon}/>
    </BottomNavigation>
);

interface IPembukuanPortraitLayoutProps {
    navigation: any;
};

const PembukuanPortraitLayout: FC<IPembukuanPortraitLayoutProps> = ({navigation}) => {    
    return (        
        <Layout style={styles.container}>
            <Navigator tabBar={props => <BottomTabBar {...props}/>}>
                <Screen 
                    name='akun' 
                    options={{
                    headerShown: false,                    
                }}>{
                    () => (<PembukuanAkunPortraitLayout navigation={navigation}/>)
                }</Screen>
                <Screen name='jurnal' component={OrdersScreen} options={{
                    headerShown: false,
                }}/>
                <Screen name='buku_pembantu' component={OrdersScreen} options={{
                    headerShown: false,
                }}/>
                <Screen name='buku_besar' component={OrdersScreen} options={{
                    headerShown: false,
                }}/>
            </Navigator>
        </Layout>               
    );
};

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: 'column',
    //   backgroundColor: 'grey',
    }
});

export default PembukuanPortraitLayout;