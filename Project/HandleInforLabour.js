import React, { useState } from "react";
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { Menu, MenuItem } from 'react-native-material-menu';
import firestore from '@react-native-firebase/firestore';

const Handle_infor_labour=({nameProduct,position,quantity,salary,id, setLabour})=>{
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    console.log(nameProduct,position,id);
    const hanldeDelete=async ()=>{
        const res = await firestore().collection('chainManufacture').doc(nameProduct).collection('Labour').doc(id).delete()
        .then(() => {
            console.log("Document successfully deleted!");
            setLabour(l=> l.filter(item => item.id!=id ))
        }).catch((error) => {
            console.error("Error removing document: ", error);
        }).finally(hideMenu);
        
    }

    const hanldeUpdate=async ()=>{

        const res = await firestore().collection('chainManufacture').doc(nameProduct).collection('Labour').doc(id).update({quantity:"33334"})
        .then(() => {
            console.log("Document successfully updated!");
            hideMenu
        }).catch((error) => {
            console.error("Error removing document: ", error);
        }).finally(hideMenu);
        
    }
    return(
        <View style={[styles.container,{flexDirection:'row'}]} >
                    <View style={{flex:9}}>
                        <Text style={styles.textDecor}>Position : {position}</Text>
                        <Text style={styles.textDecor}>Quantity : {quantity}</Text>
                        <Text style={styles.textDecor}>Salary : {salary}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Menu
                            visible={visible}
                            anchor={<Text onPress={showMenu} style={{fontSize:30}}>...</Text>}
                            onRequestClose={hideMenu}
                        >
                            <MenuItem onPress={()=>hanldeDelete()}>Delete</MenuItem>
                            <MenuItem onPress={()=>hanldeUpdate()}>Update</MenuItem>
                        
                        </Menu>
                    </View>
                </View>    
    )
};
const styles=StyleSheet.create({
    container:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'lightgreen',
        padding:10,
        margin:10,
    },
    buttonDelete: {
        paddingTop:20,
    },
    textDecor:{
        fontWeight:'bold',
        fontSize:15,
    }
})
export default Handle_infor_labour;