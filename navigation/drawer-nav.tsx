import { Avatar, Divider, Drawer, DrawerElement, DrawerItem, Icon, IndexPath, Layout, Text } from "@ui-kitten/components";
import { FC, Fragment, ReactElement, useState } from "react";
import { SafeAreaLayout } from "../components/safe-area-layout.component";
import { StyleSheet, View } from "react-native";
import { AppInfoService } from "../services/app-info.service";
import { IItemNav } from "../features/entities/item-nav";

interface IDrawerNavProps {
  data: IItemNav[];
};

const DrawerNav: FC<IDrawerNavProps> = ({ data}): DrawerElement => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath|null>(null);

    const renderHeader = (): ReactElement => (
        <SafeAreaLayout insets='top' level='2'>
          <Layout style={styles.header} level='2'>
            <View style={styles.profileContainer}>
              <Avatar
                size='giant'
                source={require('../assets/images/image-app-icon.png')}
              />
              <Text style={styles.profileName} category='h6'>
                SIA
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
            {data.map((el, index) => (
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

export default DrawerNav;