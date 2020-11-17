import AsyncStorage from '@react-native-community/async-storage'

export const setNewNotification = async (remote) => {
    try {
        await AsyncStorage.setItem('@newNotifications', remote)
    } catch (e) {
        console.log(e);
    }
}

export const getNewNotification = async () => {
    try {
        let list = await AsyncStorage.getItem('@newNotifications')
        return list
    } catch (e) {
        console.log(e);
        return []
    }
}

export const clearNewNotification = async () => {
    try {
        await AsyncStorage.removeItem('@newNotifications')
    } catch (e) {
        console.log(e);
    }
}