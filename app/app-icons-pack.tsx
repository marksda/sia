import { Image, ImageRequireSource } from "react-native";

const IconProvider = (source: ImageRequireSource) => ({
    toReactElement: ({ animation, ...style }: { [x: string]: any; animation: any;}) => (
      <Image style={style} source={source}/>
    ),
});

export const AppIconsPack = {
    name: 'app',
    icons: {
        'transaksi': IconProvider(require('../assets/images/icon-ecommerce.png')),
        'laporan': IconProvider(require('../assets/images/icon-modal.png')),
    }
};