import { Text, TopNavigation } from "@ui-kitten/components";
import { FC, useMemo } from "react";
import { normalizePxToDp } from "../../../features/utils/android-dp-px-converter";
import { StyleSheet, useWindowDimensions } from "react-native";

interface IPembukuanLandscapeLayoutProps {
    navigation: any;
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerTopNav: {
            height: normalizePxToDp(16, skala), 
            minHeight: normalizePxToDp(16, skala),
            elevation: 1,
            // backgroundColor: "red",
        },
        fontStyle: {
            fontSize: normalizePxToDp(6, skala), 
        },
        fontTitleStyle: {
            fontSize: normalizePxToDp(7, skala), 
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
        <>
            <TopNavigation 
                title={() => {
                    return <Text category='label' style={[styles.fontTitleStyle]}>Pembukuan</Text>
                }}
                alignment='start' 
                style={[styles.containerTopNav]}
            />
            <Text>pembukuan landscape</Text>
        </>
    );
};

export default PembukuanLandscapeLayout;