import { Image } from "react-native";

const IconProvider = (source) => ({
    toReactElement: ({ animation, ...props }) => (
      <Image {...props} source={source}/>
    ),
  });

export const AssetIconsPack  = {
    name: 'assets',
    icons: {
        'transaksi': IconProvider(require('../assets/images/icon-ecommerce.png')),
        'laporan': IconProvider(require('../assets/images/icon-modal.png')),
    }
};