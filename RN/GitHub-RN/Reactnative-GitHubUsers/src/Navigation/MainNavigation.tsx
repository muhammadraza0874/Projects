import React, {useEffect, useLayoutEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from '../Utils/Routes';
import SafeArea from 'react-native-safe-area';
import SplashScreen from 'react-native-splash-screen';
import {setSafeArea} from '../Redux/actions/AppLogics';
import UserList from '../Ui/Sections/User/UserList';
import UserDetail from '../Ui/Sections/Detail/UserDetail';
const MainStack = createStackNavigator();
interface AppStackProps {
  initialScreen: string;
}
const AppStack = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name={Routes.User.list} component={UserList} />
      <MainStack.Screen name={Routes.User.detail} component={UserDetail} />
    </MainStack.Navigator>
  );
};
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  useLayoutEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      console.log('finded value is ', result);
      if (selector.AppReducer.safeArea.top != result.safeAreaInsets.top) {
        dispatch(
          setSafeArea({
            top: result.safeAreaInsets.top,
            bottom: result.safeAreaInsets.bottom,
          }),
        );
      }
    });
  }, [selector.AppReducer]);
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
};
export default AppContainer;
