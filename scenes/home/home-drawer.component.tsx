import { Avatar, Divider, Drawer, DrawerElement, DrawerItem, Icon, IconElement, IndexPath, Layout, Text } from "@ui-kitten/components";
import { Fragment, ReactElement, useState } from "react";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { StyleSheet, View } from "react-native";
import { AppInfoService } from "../../services/app-info.service";

const BrowserIcon = (props): IconElement => (
  <Icon
    {...props}
    name='browser-outline'
  />
);

export const HomeDrawer = ({ navigation } : {navigation: any}): DrawerElement => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath|null>(null);

    const DATA = [
        {
          title: 'Transaksi',
          icon: BrowserIcon,
          onPress: () => {
            navigation.toggleDrawer();
            navigation.navigate('Transaksi');
          },
        },
        {
          title: 'Laporan',
          icon: BrowserIcon,
          onPress: () => {
            navigation.toggleDrawer();
            navigation.navigate('Laporan');
          },
        },
    ];

    const renderHeader = (): ReactElement => (
        <SafeAreaLayout insets='top' level='2'>
          <Layout style={styles.header} level='2'>
            <View style={styles.profileContainer}>
              <Avatar
                size='giant'
                source={require('../../assets/images/image-app-icon.png')}
              />
              <Text style={styles.profileName} category='h6'>
                Kitten Tricks
              </Text>
            </View>
          </Layout>
        </SafeAreaLayout>
    );

    const renderFooter = () => (
        <SafeAreaLayout insets='bottom'>
          <Fragment>
            <Divider />
            <View style={styles.footer}>
              <Text>{`Version ${AppInfoService.getVersion()}`}</Text>
            </View>
          </Fragment>
        </SafeAreaLayout>
    );

    return (
        <Drawer
            header={renderHeader}
            footer={renderFooter}
            selectedIndex={selectedIndex!}
            onSelect={(index) => setSelectedIndex(index)}>
            {DATA.map((el, index) => (
                <DrawerItem
                    key={index}
                    title={el.title}
                    onPress={el.onPress}
                    accessoryLeft={el.icon}
                    />
            ))}
        </Drawer>
    )

}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    header: {
      height: 128,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 16,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileName: {
      marginHorizontal: 16,
    },
});