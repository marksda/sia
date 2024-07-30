import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Layout, Text } from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface IPembukuanPortraitLayoutProps {
    navigation: any;
};

const { Navigator, Screen } = createBottomTabNavigator();

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

const PembukuanPortraitLayout: FC<IPembukuanPortraitLayoutProps> = ({navigation}) => {
    return (        
        <Layout style={styles.container}>
            <Text>Pembukuan portrait</Text> 
            <Navigator>
                <Screen name="Home" component={UsersScreen} />
                <Screen name="Settings" component={OrdersScreen} />
            </Navigator>
        </Layout>               
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default PembukuanPortraitLayout;