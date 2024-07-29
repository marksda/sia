import { Layout, Text, TopNavigation } from "@ui-kitten/components";
import { FC, useMemo } from "react";
import { normalizeDpToPx } from "../../features/utils/android-dp-px-converter";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IPembukuanLandscapeLayoutProps {
    navigation: any;
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerTopNav: {
            height: normalizeDpToPx(62, skala), 
            minHeight: normalizeDpToPx(32, skala),
            elevation: 1,
            backgroundColor: "red",
        },
        fontStyle: {
            fontSize: normalizeDpToPx(24, skala), 
        },
        fontTitleStyle: {
            color: "white",
        },
    }
    )
};

const PembukuanLandscapeLayout: FC<IPembukuanLandscapeLayoutProps> = ({navigation}) => {
    const dimensions = useWindowDimensions();
    const styles = useMemo(
        () => createStyle(dimensions.scale),
        [dimensions.scale]
    ); 

    return (
        <SafeAreaView>
            <TopNavigation 
                title={() => {
                    return <Text category='label' style={[styles.fontTitleStyle]}>Pembukuan</Text>
                }}
                alignment='start' 
                style={[styles.containerTopNav]}/>
            <Text style={styles.fontStyle}>pembukuan landscape</Text>
        </SafeAreaView>
    );
};

export default PembukuanLandscapeLayout;