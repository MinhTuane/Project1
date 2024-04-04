import React, { useState }  from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";

const UpdateProduct=({navigation},{nameProduct,name,quantity,price,id,collection})=>{
        const [newName,setNewName] = useState()
        const [newQuantiry,setNewQuantity] = useState()
        const [newPrice,setNewPrice] = useState()

        const handleUpdate=()=>{
            firestore().collection('chainManufacture').doc(nameProduct).collection(collection).doc(id)
            .update({
                name : newName,
                quantity : newQuantiry,
                price : newPrice,
                date : moment(new Date()).format('YYYY-MM-DD')
            })
        }
        return(
            <View>
                <TextInput placeholder={name} onChangeText={(text)=> setNewName(text)}/>
                <TextInput placeholder={quantity} onChangeText={(text) => setNewQuantity(text)} keyboardType="numeric"/>
                <TextInput placeholder={price} onChangeText={(text) => setNewPrice(text)} keyboardType="numeric"/>
                <Button onPress={()=> handleUpdate()}>Update</Button>
            </View>
        )
}
export default UpdateProduct