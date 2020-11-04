import AsyncStorage from '@react-native-community/async-storage';

export const storeValueIsShowIntroduceOrNot = async () => {
  try {
    await AsyncStorage.setItem(
      'IS_SHOW_INTRODUCE_SCREEN',
      JSON.stringify(false),
    );
  } catch (e) {
    console.log(e);
  }
};

export const getValueToShowIntroduceOrNot = async (isShow) => {
  try {
    await AsyncStorage.getItem('IS_SHOW_INTRODUCE_SCREEN', (err, value) => {
      if (err) {
        console.log(err);
      } else {
        if (value === null) {
          isShow(true);
        } else {
          isShow(JSON.parse(value));
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
