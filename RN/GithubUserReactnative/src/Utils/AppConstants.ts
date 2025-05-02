import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio} from 'react-native';
export const platformVersion = Platform.Version;
export type ScreenProps = StackScreenProps<any, any>;
export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);
export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
export const horizontalScreenWithMargin = ScreenSize.width - normalized(48);
export const AppImages = {
  backImage : require("../Ui/assets/images/backBtn.png")
};
export const AppFonts = {
  InterSemiBold: 'Inter-SemiBold',
  InterExtraBold: 'Inter-ExtraBold',
  InterBold: 'Inter-Bold',
  InterRegular: 'Inter',
  InterMedium: 'Inter-Medium',
  InterLight: 'Inter-Light',
  SwitzerThin: 'Switzer-Thin',
};
export const AppColors = {
  blue: {
    dark: '#004B87',
    lightBlue: '#C1E4FC',
  },

  grey: {
    light: '#C4C4C4',
    lightOp: '#FAFAFA',
    dark: '#6D6E72',
    dark2: '#787878',
  },

  shadowColor: {
    lightBlack: 'rgba(0,0,0,0.55)',
    darkBlack: 'rgba(0,0,0,1)',
    lightBlack2: 'rgba(0,0,0,0.3)',
  },

  yellow: {
    dark: '#FFCD00',
    lightYellow : "rgba(255,205,0,0.10)"
  },

  white: {
    whiteOP: 'rgba(255,255,255,0.65)',
    white: '#ffffff',
    lightWhite: '#FFFFF1',
    creamy: '#FFF9D5',
  },
  black: {
    black: '#000000',
    lightBlack: 'rgba(0,0,0,0.32)',
    withShadowLight:
      Platform.OS == 'ios' ? 'rgba(0,0,0,0.16)' : 'rgba(0,0,0,0.26)',
    textColor: '#414141',
    textDark: '#333333',
    lightOP: 'rgba(0,0,0,0.75)',
  },
  green: {
    dark: '#00870D',
  },
  red: {
    redOp: 'rgba(243,17,17,0.10)',
    red: 'rgba(243,17,17,1)',
    darkRed: '#F31111',
  },
};

