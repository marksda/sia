import { Button, Card, Divider, Icon, IconElement, Input, Layout, List, Popover} from "@ui-kitten/components";
import { FC, useMemo, useState } from "react";
import { IQueryParamFilters } from "../../features/entities/query-param-filters";
import { useGetDaftarAkunQuery } from "../../services/api-rtkquery-service";
import { IAkun } from "../../features/entities/akutansi-app/akun";
import { ListRenderItemInfo, StyleSheet, Text, useWindowDimensions } from "react-native";
import { normalizePxToDp } from "../../features/utils/android-dp-px-converter";
import { color } from "@rneui/base";


const MenuIcon = (props: any): IconElement => (
    <Icon name='menu' {...props} pack='material'/>
);

const FilterIcon = (props: any): IconElement => (
    <Icon name='filter-variant' {...props} pack='material'/>
);

const AddIcon = (props: any): IconElement => (
    <Icon name='plus-circle' {...props} pack='material'/>
);

const CloseIcon = (props: any): IconElement => (
    <Icon name='close' {...props} pack='material'/>
);

interface IPembukuanAkunPortraitLayoutProps {
    navigation: any;
};
const PembukuanAkunPortraitLayout: FC<IPembukuanAkunPortraitLayoutProps> = ({navigation}) => {
    const dimensions = useWindowDimensions();
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
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false);
    const [visiblePopOverFilter, setVisiblePopOverFilter] = useState<boolean>(false);
    const { data: items, isLoading } = useGetDaftarAkunQuery(filter);

    const styles = useMemo(
        () => createStyle(dimensions.scale),
        [dimensions.scale]
    ); 

    const renderItem = ({item}: ListRenderItemInfo<IAkun>) => {
        return (
            <Layout style={styles.item}>
                <Text style={[ item.header ? styles.boldKodeText : styles.normalKodeText, {marginLeft: 16 * (item.level!-1)}]}>{item.kode!}</Text>
                <Text style={item.header ? styles.boldNamaText : styles.normalNamaText}>{item.nama!}</Text>
            </Layout>
        );
    };

    const renderAccessoryRight = (props: any): React.ReactElement => (
        <>
        { visibleFilter == false ? <FilterIcon {...props} style={{height: 24, color: "#FA8105", marginRight: 8}} onPress={() => setVisibleFilter(true)}/> : null}
        { visiblePopOverFilter == false ? <AddIcon {...props} style={{height: 24, color: "#039D3D"}} onPress={() => setVisiblePopOverFilter(true)} /> : null}
        </>
    );

    const renderAccessoryLeft = (props: any): React.ReactElement => (
        <MenuIcon {...props} onPress={() => navigation.openDrawer(true)} />
    );

    const renderListAkun = (): React.ReactElement => (
        <List
            style={styles.containerList}
            data={items == undefined ? [] : items}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );

    return (
        <>      
            <Layout style={styles.containerTopNav}>
                <Input
                    style={styles.inputSearch}
                    placeholder='Pencarian'
                    accessoryLeft={renderAccessoryLeft}
                    accessoryRight={renderAccessoryRight}
                />
                {
                visibleFilter == true ?
                <Layout style={styles.containerFilter}>
                    <Layout style={styles.containerGroupFilter}>
                        <Button style={styles.button} size="small">Semua</Button>
                        <Button style={styles.button} size="small">Semua</Button>
                    </Layout>
                    <CloseIcon style={{height: 18}} onPress={() => setVisibleFilter(false)}/>
                </Layout> : null  
                }  
            </Layout> 
            <Popover 
                visible={visiblePopOverFilter} 
                onBackdropPress={() => setVisiblePopOverFilter(false)}
                anchor={renderListAkun}
                fullWidth={true}
                placement="inner bottom"
                style={{marginRight: 8}}
            >
                <Card disabled={true}>
                <Text>
                    Welcome to UI Kitten 😻
                </Text>
                <Button onPress={() => setVisiblePopOverFilter(false)}>
                    DISMISS
                </Button>
                </Card>
            </Popover>            
        </>
    );
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerTopNav: {
            // height: normalizePxToDp(28, skala), 
            padding: 8,
            borderBottomWidth: 1, 
            borderBottomColor: "#EBE9EA",
        },
        containerFilter: {
            display: "flex",
            flexDirection: "row",
            columnGap: 8,
            alignItems: "center",
            paddingHorizontal: 8,
            paddingTop: 8,
            // padding: 8,
        },
        containerGroupFilter: {
            display: "flex",
            flex: 1,
            flexDirection: "row",
            columnGap: 8,
            alignContent: "center",
            alignItems: "center",
            // height: normalizePxToDp(24, skala), 
            // paddingHorizontal: 8,
            // paddingBottom: 8,
        },
        containerList: {
            marginBottom: 24,
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 12,
            // marginVertical: 2,
        },
        boldKodeText: {            
            fontSize: normalizePxToDp(7, skala),
            fontWeight: 'bold',
        },
        normalKodeText: {            
            fontSize: normalizePxToDp(7, skala),
            fontFamily: 'Cochin',
        },
        boldNamaText: {
            fontSize: normalizePxToDp(7, skala),
            fontWeight: 'bold',
            marginLeft: 16,
        },
        normalNamaText: {
            fontSize: normalizePxToDp(7, skala),
            fontFamily: 'Cochin',
            marginLeft: 16,
        },
        inputSearch: {
            // borderRadius: 32,
        },
        button: {
            // maxWidth: 80,
            borderRadius: 16,
        }
    }
    )
};

export default PembukuanAkunPortraitLayout;