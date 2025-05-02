/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppContainer from './src/Navigation/MainNavigation';
import { AppRootStore } from './src/Redux/store/AppStore';
import AppLoader from './src/Ui/Components/Loader/AppLoader';
import { AppStyles } from './src/Utils/AppStyles';

const App = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const dispatch = useDispatch();
  return (
    <View
      style={{ ...AppStyles.MainStyle }}
    >
      {selector.AppReducer.isLoaderStart == true ? <AppLoader /> : null}

      <View
      style = {{
        ...AppStyles.MainStyle,
        zIndex: selector.AppReducer.isLoaderStart == true ? 0 : 1,
      }}
      >
      <AppContainer />
      </View>
    </View>
  );
};
export default App;
