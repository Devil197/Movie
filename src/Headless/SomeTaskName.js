import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { StackActions } from '@react-navigation/native';
import { ROUTE_KEY } from '../constants/constants'
import { setNewNotification, clearNewNotification } from '../utils/asyncStorage'
module.exports = async (taskData) => {
    console.log('1001 chayj ne`');
    messaging().subscribeToTopic('N-M-M').then(res => console.log('111 topic ok '))
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('1001 -> noti ne` : ', remoteMessage);
        ToastAndroid.show(
            'chay setBackgroundMessageHandler NE NHA' + remoteMessage &&
                remoteMessage.notification &&
                Platform.OS === 'android'
                ? remoteMessage.notification.title
                : '',
            ToastAndroid.SHORT,
        );
        if (remoteMessage) {
            PushNotification.localNotification({
                title: remoteMessage.data.movie_name,
                message: 'abc',
                channelId: 'movie0103',
                id: moment().seconds(),
                largeIconUrl: remoteMessage.data.photo,
                invokeApp: false,
            });
            setNewNotification(remoteMessage)
        }
    });
};