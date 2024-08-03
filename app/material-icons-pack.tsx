import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconPack } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";


export const MaterialIconsPack: IconPack<SvgProps> = {
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
  
  function MaterialIcon({ name, style , onPress} : {name: any; style: any; onPress: any}) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <TouchableOpacity onPress={onPress}><Icon name={name} size={height} color={tintColor} style={iconStyle} /></TouchableOpacity>        
    );
  }