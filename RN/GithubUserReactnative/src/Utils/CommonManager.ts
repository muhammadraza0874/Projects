import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Platform} from 'react-native';
import {ScreenProps} from './AppConstants';
import KeyboardManager from 'react-native-keyboard-manager';
import NetInfo from "@react-native-community/netinfo";
export default class CommonDataManager {
  static shared: CommonDataManager;
  _translations = [];
  _currentLanguage = 'en';
  _screenStack: ScreenProps = null;
  selector: any = null;
  dispatch: any = null;
  containerDispatcher;
  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
      CommonDataManager.shared.setup();
    }
    return CommonDataManager.shared;
  }
  setContainerDispatcher = dispatch => {
    this.containerDispatcher = dispatch;
  };
  getContainerDispatcher = () => {
    return this.containerDispatcher;
  };
  setup = async () => {
    try {
      this._translations = [];
      const localTranslaionsData = require('../Utils/translation.json');
      this._translations = localTranslaionsData;
    } catch (e) {}
  };
  setReduxReducer = (select: any, dispatch: any) => {
    this.selector = select;
    this.dispatch = dispatch;
  };
  getTranslation = (language: any, screen: any, labelString: string) => {
    var lbl = '';
    var languageDic = this._translations[language];
    var mainScreen = languageDic[screen];
    if (mainScreen !== undefined) {
      var translatedLabel = mainScreen[labelString];
      if (translatedLabel !== undefined) {
        lbl = translatedLabel;
      }
    }
    return lbl;
  };
  showPopUp = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: true},
    );
  };
  showPopUpWithOk = (title: string, message: string, onClick: () => void) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => onClick()}], {
      cancelable: false,
    });
  };
  showPopUpWithOkCancel = (
    title: string,
    message: string,
    onClick: () => void,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
        {text: 'OK', onPress: () => onClick()},
      ],
      {cancelable: true},
    );
  };
  showPopUpWithOkCancel1 = (
    title: string,
    message: string,
    ok: string = '',
    cancel: string = '',
    onClick: () => void,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancel == '' ? 'Cancel' : cancel,
          onPress: () => console.log('OK Pressed'),
        },
        {text: ok == '' ? 'OK' : ok, onPress: () => onClick()},
      ],
      {cancelable: true},
    );
  };
  showPopUpReset = (title: string, message: string, resetPress: () => void) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Reset', onPress: () => resetPress()},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
  };
  validateEmail = (email: string) => {
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmailRegex.test(email) == false) {
      return false;
    } else {
      return true;
    }
  };
  _setScreenStack = (props: ScreenProps) => {
    this._screenStack = props;
  };
  getAppleUser = async (params: any, setUser: (user: any) => void) => {
    let users = {
      email: params.email,
      firstname: params.firstname,
      lastname: params.lastname,
      authId: params.authId,
      authType: 'apple',
      isSocialType: true,
    };
    let list = await AsyncStorage.getItem('appleUserList');
    if (list) {
      let allList = JSON.parse(list);
      if (allList[users.authId]) {
        (users['email'] = allList[users.authId].email),
          (users['firstname'] = allList[users.authId].firstname),
          (users['lastname'] = allList[users.authId].lastname);
      } else {
        allList[users.authId] = users;
        await AsyncStorage.setItem('appleUserList', JSON.stringify(allList));
      }
    } else {
      let allList: any = {};
      allList[users.authId] = users;
      await AsyncStorage.setItem('appleUserList', JSON.stringify(allList));
    }
    setUser(users);
  };
  logoutUser = async () => {
    return this._screenStack.navigation.reset({
      index: 0,
      routes: [{name: ScreenNames.Authentication.LoginScreen}],
    });
  };
  saveLang = async (index: number) => {
    let saveResult = await AsyncStorage.setItem('lang', JSON.stringify(index));
    return saveResult;
  };
  loadLang = async () => {
    let stringResult = await AsyncStorage.getItem('lang');
    if (stringResult) {
      return stringResult;
    } else {
      return null;
    }
  };
  disableIQ = () => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(false);
    }
  };
  enableIQ = () => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(true);
    }
  };
  // CHECK INTERNET STATE 
  isNetAvailable = async()=>{
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}
