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

export const setIsLoggedIn = async (isLogged) => {
    try {
        await AsyncStorage.setItem('IS_LOGGED_ID', isLogged)
    } catch (e) {
        console.log(e);
    }
}

export const getIsLoggedIn = async () => {
    try {
        let value = await AsyncStorage.getItem('IS_LOGGED_ID')
        return value
    } catch (e) {
        console.log(e);
        return null
    }
}

export const clearValueIsLoggedIn = async () => {
    try {
        await AsyncStorage.removeItem('IS_LOGGED_ID')
    } catch (e) {
        console.log(e);
    }
}