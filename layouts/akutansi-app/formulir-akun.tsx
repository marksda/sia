import { Card, CheckBox, Icon, IconElement, IndexPath, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { FC, ReactElement, useState } from "react";
import { StyleSheet } from "react-native";
import { useGetDaftarKelompokAkunQuery } from "../../services/akutansi-app-api-rtkquery-service";
import { IQueryParamFilters } from "../../features/entities/query-param-filters";

const CloseIcon = (props: any): IconElement => (
    <Icon name='close' {...props} pack='material'/>
);

interface IFormulirAkunLayoutProps {
    setVisibleFormAkun: (visible:boolean) => void;
};

const FormulirAkunLayout: FC<IFormulirAkunLayoutProps> = ({setVisibleFormAkun}) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [kelompokAkunName, setKelompokAkunName] = useState<string>("Aktiva");
    const [headerChecked, setHeaderChecked] = useState<boolean>(false);
    const [subAkunChecked, setSubAkunChecked] = useState<boolean>(true);
    const [filter] = useState<IQueryParamFilters>({
        pageNumber: 1,
        pageSize: 25,
        filters: [
            {
            fieldName: 'kelompok_akun',
            value: '0'
            },
        ],
        sortOrders: [
            {
                fieldName: 'kelompok_akun',
                value: 'ASC'
            },
            {
                fieldName: 'kode',
                value: 'ASC'
            },
            {
                fieldName: 'level',
                value: 'ASC'
            },
        ],
    });
    const { data: items, isLoading } = useGetDaftarKelompokAkunQuery(filter);

    

    const renderHeader = (): ReactElement => (
        <Layout style={styles.topContainer}>
            <Text category="s2" style={styles.normalNamaText}>Formulir akun</Text>
            <CloseIcon style={{height: 18,color: '#FFFF'}} onPress={() => setVisibleFormAkun(false)}/>
        </Layout>
    );

    const _onSelectedKelompokAkun = (index: IndexPath | IndexPath[]) => {
        setSelectedIndex(index)
        setKelompokAkunName(items![(index as IndexPath).row].nama!);
    }

    return (
        <Card 
            appearance="outline"
            header={renderHeader} 
            style={styles.cardContainer}
        >
            <Layout style={styles.containerRowFlex}>
                <Select
                    value={kelompokAkunName}
                    selectedIndex={selectedIndex}
                    onSelect={_onSelectedKelompokAkun}
                    label='Kelompok akun'
                    style={{flex: 1}}
                >
                {
                    isLoading == false ?
                    items!.map((item) => <SelectItem key={item.id} title={item.nama!} />) : []
                }   
                </Select>
                <CheckBox
                    style={[styles.checkbox, {width: 80}]}
                    checked={subAkunChecked}
                    onChange={nextChecked => setSubAkunChecked(nextChecked)}
                >
                    Sub. akun
                </CheckBox>
                <CheckBox
                    style={styles.checkbox}
                    checked={headerChecked}
                    onChange={nextChecked => setHeaderChecked(nextChecked)}
                >
                    Header
                </CheckBox>
            </Layout>
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
        // borderColor: "none",
        color: "#FFFF",
    },
    containerRowFlex: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    checkbox: {
        marginTop: 18,
        marginHorizontal: 8,    
        // verticalAlign: "middle",    
        width: 70,
    },
});

export default FormulirAkunLayout;