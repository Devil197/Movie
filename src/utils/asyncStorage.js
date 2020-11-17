import AsyncStorage from '@react-native-community/async-storage'

export const setNewNotification = async (remote) => {
    try {
        await AsyncStorage.setItem('@newNotifications', JSON.stringify(remote.length ? remote : []))
    } catch (e) {
        console.log(e);
    }
}

export const getNewNotification = async () => {
    try {
        let list = await AsyncStorage.getItem('@newNotifications')
        const outputData = JSON.parse(list);
        return outputData && outputData.length ? outputData : []
    } catch (e) {
        console.log(e);
        return false
    }
}

export const clearNewNotification = async () => {
    try {
        await AsyncStorage.removeItem('@newNotifications')
    } catch (e) {
        console.log(e);
    }
}

export const setNotificationList = async (listNotification) => {
    try {
        await AsyncStorage.setItem(
            '@getNotificationList:key',
            JSON.stringify(listNotification.length ? listNotification : []),
        );
    } catch (e) {
        console.log(e);
    }
};
export const getNotificationList = async () => {
    try {
        const notiList = await AsyncStorage.getItem('@getNotificationList:key');
        const outputData = JSON.parse(notiList);
        return outputData && outputData.length ? outputData : [];
    } catch (error) {
        return false;
    }
};
