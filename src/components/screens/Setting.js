import React,  { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Appbar, Card,RadioButton,Modal, Portal, Provider} from 'react-native-paper';
import { ptColor } from '../../constants/styles';
import { WIDTH_SCALE, HEIGHT_SCALE, WIDTH, HEIGHT, ROUTE_KEY } from '../../constants/constants';
import { Icon as IconElement } from 'react-native-elements';
import { Fonts } from '../../utils/Fonts'
import { MyHighLightButton, } from '../views'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'
export default function Setting({navigation}) {

    const WIDTH_MODAL = WIDTH - 24 * WIDTH_SCALE
    const [enableNotifi, setEnableNotifi] = useState(false);
    const [enableDark, setEnableDark] = useState(false);
    const [enableMusic, setEnableMusic] = useState(false);
    const [enableStatus, setEnableStatus] = useState(false)
    const [value, setValue] = React.useState('English');

    const [isModal, setIsModal] = useState(false);



    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
    function Header() {
        const _goBack = () => navigation.goBack();
        return (
          <Appbar.Header
            style={{ backgroundColor: '#fafafa', elevation: 0, justifyContent: 'space-between' }}>
            <Appbar.Action
              onPress={_goBack}
              icon={() => (
                <IconElement name="chevron-left" type="feather" color={ptColor.black} size={18 * WIDTH_SCALE} />
              )}
              color={ptColor.black}
              size={24}
            />
            <Text style={{ fontSize: 18 * WIDTH_SCALE }}>Setting</Text>
            <View style={{ width: '10%' }} />
          </Appbar.Header>
        )
      }

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.group}>
       
                <View style={[styles.row, styles.groupItem]}>
                            
                    <Text style={styles.groupItemText}>Notification</Text>
                    <Switch 
                        thumbColor= {enableNotifi ? "#be2edd" : '#747d8c'}
                        onValueChange={(value) => setEnableNotifi(value)} 
                        value = {enableNotifi}
                        trackColor = {{false: "#bdc3c7",true: '#D980FA'}}/>
                </View>

                <View style={[styles.row, styles.groupItem]}>
                          
                    <Text style={styles.groupItemText} >Darkmode</Text>
                    <Switch 
                        thumbColor= {enableDark ? "#be2edd" : '#747d8c'}
                        onValueChange={(value) => setEnableDark(value)} 
                        value = {enableDark}
                        trackColor = {{false: "#bdc3c7",true: '#D980FA'}}/>      
                </View>
                <View style={[styles.row, styles.groupItem]}>
                          
                    <Text style={styles.groupItemText}>Music Bubbles</Text>
                    <Switch 
                        thumbColor= {enableMusic ? "#be2edd" : '#747d8c'}
                        onValueChange={(value) => setEnableMusic(value)} 
                        value = {enableMusic}
                        trackColor = {{false: "#bdc3c7",true: '#D980FA'}}/>      
                 </View>
                 <View style={[styles.row, styles.groupItem]}>
                          
                    <Text style={styles.groupItemText}>Status</Text>
                    <Switch 
                        thumbColor= {enableStatus ? "#be2edd" : '#747d8c'}
                        onValueChange={(value) => setEnableStatus(value)} 
                        value = {enableStatus}
                        trackColor = {{false: "#bdc3c7",true: '#D980FA'}}/>      
                 </View>
                 <MyHighLightButton onPress={() => setIsModal(true)}> 
                    <View style={[styles.row, styles.groupItem]}>
                          
                        <Text style={styles.groupItemText}>Language</Text>
                        <Text style={styles.groupTitle}>{value}</Text>
                    </View>
                </MyHighLightButton>
                <MyHighLightButton>
                    <View style={[styles.row, styles.groupItem]}>
                        <Text style={styles.groupItemText} >Setting in your phone</Text>
                        <Icon name="chevron-right" />
                    </View>
                </MyHighLightButton>
          
            </View>
            {/* <Text>{toggled? "ON":"OFF"}</Text> */}
           
          <Modal
          // transparent = {true}
          // onDismiss={() => setIsModal(false)}
          // visible={isModal}>
          deviceWidth={'100%'}
          animationIn="fadeIn" // or without prop
          animationOut="fadeOut" // or without prop
          backdropTransitionOutTiming={0}
          onDismiss={() => setIsModal(false)}
          visible={isModal}
          contentContainerStyle={{
              margin: 0,
              padding: 0,
              flex: 1,
              zIndex: 9999,
              elevation: 9999,
              position: 'absolute',

          }}>
               <View style={{
              width: WIDTH_MODAL * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              margin: 70 * WIDTH_SCALE,
              overflow: 'hidden',
              borderRadius: 30 * WIDTH_SCALE
              }}>
                <View style={{ alignItems: 'center',justifyContent:'center', width: WIDTH_MODAL, margin: 10 * WIDTH_SCALE , height: 0.4* WIDTH_MODAL}}>
              
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <View style = {{justifyContent:'flex-start'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton value="English" color={'#be2edd'}/>
                                <Text>English</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton value="Vietnamese" color={'#be2edd'}/>
                                <Text>Vietnamese</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    
                </View>
            </View>
                   
          
        </Modal>
     
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
      },
    group: {
        padding: 16 * WIDTH_SCALE
    },
     groupTitle: {
        fontSize: 13 * WIDTH_SCALE,
        color: "#B1B9C0",
        fontFamily: Fonts.SansBold
    },
    groupItem: {
        paddingVertical: 16 * WIDTH_SCALE,
        borderBottomWidth: 1,
        borderBottomColor: "#E9ECEF",
        alignItems: "center"
    },
    row: {
        alignItems: "center",
        flexDirection: 'row',
        overflow: 'hidden'
    },
    groupItemText: {
        flex: 1,
        marginHorizontal: 16 * WIDTH_SCALE,
        fontSize: 14 * WIDTH_SCALE,
        fontFamily: Fonts.SansMedium,
    }
})
