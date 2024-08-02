import { Image } from "react-native";

const IconProvider = (source:any) => ({
    toReactElement: ({ animation, ...props }: { [x: string]: any; animation: any; }) => (
      <Image {...props} source={source}/>
    ),
  });

export const AssetIconsPack  = {
    name: 'assets',
    icons: {
        'keranjang': IconProvider(require('../assets/images/icon-ecommerce.png')),
        'laporan': IconProvider(require('../assets/images/icon-report.png')),
        'kasir': IconProvider(require('../assets/images/icon-card-machine.png')),
        'pengaturan': IconProvider(require('../assets/images/icon-setting-filter.png')),
        'filter': IconProvider(require('../assets/images/filter.svg')),
    }
};