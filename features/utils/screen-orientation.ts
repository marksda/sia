import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

export default function useScreenOrientation() {
    const dimensions = useWindowDimensions();
    const [screenOrientation, setScreenOrientation] = useState<string>("portrait");

    useEffect(
        () => {
            if(dimensions.width >= 768) {
                setScreenOrientation("landscape");
            } 
            else {
                setScreenOrientation("portrait");
            }
        },
        [dimensions]
    );

    return screenOrientation;
}