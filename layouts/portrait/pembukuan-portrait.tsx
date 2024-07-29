import { Layout, Text, TopNavigation } from "@ui-kitten/components";
import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface IPembukuanPortraitLayoutProps {
    navigation: any;
};

const PembukuanPortraitLayout: FC<IPembukuanPortraitLayoutProps> = ({navigation}) => {
    return (        
        <Text>Pembukuan portrait</Text>        
    );
};

export default PembukuanPortraitLayout;