import { Card, Icon, IconElement, IndexPath, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { FC, ReactElement, useState } from "react";
import { StyleSheet } from "react-native";


const CloseIcon = (props: any): IconElement => (
    <Icon name='close' {...props} pack='material'/>
);

interface IFormulirAkunLayoutProps {
    setVisibleFormAkun: (visible:boolean) => void;
};

const FormulirAkunLayout: FC<IFormulirAkunLayoutProps> = ({setVisibleFormAkun}) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

    const renderHeader = (): ReactElement => (
        <Layout style={styles.topContainer}>
            <Text category="s2" style={styles.normalNamaText}>Formulir akun</Text>
            <CloseIcon style={{height: 18,color: '#FFFF'}} onPress={() => setVisibleFormAkun(false)}/>
        </Layout>
    );

    return (
        <Card 
            appearance="outline"
            header={renderHeader} 
            style={styles.cardContainer}
        >
            <Select
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                label='Kelompok akun'
            >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
            </Select>
        </Card>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#039D3D",
        padding: 8,
    },
    cardContainer: {
        display: "flex",
        backgroundColor: "#F4FFF1",
        borderWidth: 0,
    },
    normalNamaText: {
        // fontFamily: 'Cochin',
        borderColor: "none",
        color: "#FFFF",
    },
});

export default FormulirAkunLayout;