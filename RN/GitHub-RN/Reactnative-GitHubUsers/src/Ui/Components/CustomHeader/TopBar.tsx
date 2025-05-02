import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';
import { AppColors, AppImages, normalized } from '../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
interface Props {
  onBack?: () => void;
  onCart?: () => void;
  title?: string;
  isProfile?: boolean;
}
const TopBar = (props: Props) => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  return (
    <View
      style={{
        ...style.topBarStyle,
        paddingHorizontal: AppHorizontalMargin,
        backgroundColor : AppColors.white.lightWhite
      }}>
      {props.onBack != null ? (
        <TouchableWithoutFeedback onPress={() => props.onBack()}>
          <Image source={AppImages.backImage} />
        </TouchableWithoutFeedback>
      ) : (
        <View />
      )}
      <Text
        style={{
          ...style.titleStyle,
        }}>
        {props.title}
      </Text>
      <View />
    </View>
  );
};
export default TopBar;
const style = StyleSheet.create({
  topBarStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    ...AppStyles.textInterBold,
    color: AppColors.black.textDark,
    fontSize: normalized(20),
    textAlign: 'center',
    flex: 1,
  },
  editStyle: {
    ...AppStyles.textInterSemiBold,
    fontSize: normalized(18),
    color: AppColors.blue.dark,
  },
});
