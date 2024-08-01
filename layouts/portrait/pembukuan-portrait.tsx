import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon, IconElement, Layout, Text } from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet } from "react-native";


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

const UsersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>USERS</Text>
    </Layout>
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
      style={{borderTopWidth: 1, borderTopColor: "rgba(203, 202, 202, 0.89)"}}
    >
      <BottomNavigationTab title='Akun' icon={AkunIcon}/>
      <BottomNavigationTab title='Jurnal' icon={JurnalIcon}/>
      <BottomNavigationTab title='S. Ledger' icon={LedgerIcon}/>
      <BottomNavigationTab title='Ledger' icon={LedgerIcon}/>
    </BottomNavigation>
);

const PembukuanPortraitLayout: FC = () => {
    return (        
        <Layout style={styles.container}>
            <Navigator tabBar={props => <BottomTabBar {...props}/>}>
                <Screen name='akun' component={UsersScreen} options={{
                    headerShown: false,
                }}/>
                <Screen name='jurnal' component={OrdersScreen} options={{
                    headerShown: false,
                }}/>
                <Screen name='buku_pembantu' component={UsersScreen} options={{
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
    }
});

export default PembukuanPortraitLayout;