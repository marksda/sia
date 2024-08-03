import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

export const MaterialIconsPack = {
    name: 'material',
    icons: createIconsMap(),
  };
  
  function createIconsMap() {
    return new Proxy({}, {
      get(target, name) {
        return IconProvider(name);
      },
    });
  }
  
  const IconProvider = (name: string|symbol) => ({
    toReactElement: (props: any) => MaterialIcon({ name, ...props }),
  });
  
  function MaterialIcon({ name, style } : {name: any; style: any;}) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <Icon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }