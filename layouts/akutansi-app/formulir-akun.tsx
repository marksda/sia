import { Card, Icon, IconElement, IndexPath, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { FC, ReactElement, useState } from "react";
import { StyleSheet } from "react-native";
import { useGetDaftarKelompokAkunQuery } from "../../services/api-rtkquery-service";
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
            <Select
                value={kelompokAkunName}
                selectedIndex={selectedIndex}
                onSelect={_onSelectedKelompokAkun}
                label='Kelompok akun'
            >
            {
                items != undefined ?
                items.map((item) => <SelectItem key={item.id} title={item.nama!} />) : []
            }   
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