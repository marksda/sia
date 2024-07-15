import { PixelRatio, Platform } from "react-native"

export function normalizePxToDp(_size: number, _scale: number) {
    const newSize = _size * _scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    }
  }