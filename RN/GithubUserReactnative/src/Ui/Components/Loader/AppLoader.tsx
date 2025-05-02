import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';
import { AppColors } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
const AppLoader = () => {
  const appState = useSelector((appState: AppRootStore) => appState);
  return (
    <View
      style={[
        AppStyles.AppLoaderStyle,
        {
          zIndex: appState.AppReducer.isLoaderStart == true ? 1 : 0,
          backgroundColor: appState.AppReducer.isLoaderStart == true ? 'rgba(0,0,0,0.3)' : "transparent",
        },
      ]}>
        {
          appState.AppReducer.isLoaderStart == true ? 
          <View
          style = {AppStyles.AppIndicatorStyle}
          >
          <ActivityIndicator size="large" color={AppColors.blue.dark} />
          </View>
          : null
        }
    </View>
  );
};
export default AppLoader;
