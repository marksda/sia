import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { IconPack } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
// import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";


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
      <TouchableWithoutFeedback onPress={onPress}><Icon name={name} size={height} color={tintColor} style={iconStyle} /></TouchableWithoutFeedback>        
    );
  }