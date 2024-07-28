import { MenuItemDescriptor } from "@ui-kitten/components/ui/menu/menu.service";
import { GestureResponderEvent } from "react-native";

export interface IItemNav {
    title: string;
    icon?: (props: any) => React.JSX.Element;
    onPress: (descriptor: MenuItemDescriptor, event?: GestureResponderEvent | undefined) => void;
};