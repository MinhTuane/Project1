import firestore, { firebase } from '@react-native-firebase/firestore';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const Add_Product=()=>{
    const [nameProduct,setNameProduct] = useState('');
    const [quantity,setQuatity] = useState('');

    const [nameOfDirectMaterial,setNameOfDirectMaterial] = useState('');
    const [quantityDM,setQuantityDM] = useState('');
    const [priceDirectMaterial,setPriceDirectMaterial] = useState('');

    const [nameOfMOH,setNamOfMOH] = useState('');
    const [quantityMOH,setQuantityMOh] = useState('');
    const [priceMOH,setPriceMOH] = useState('');

    const [positionLabour,setPositionLabour] = useState('');
    const [quantityLabour,setQuantityLabour] = useState('');
    const [salary,setSalary] = useState('');
    
    const [StringDM,setStringDM] = useState('');
    const [StringOHM,setStringOHM] = useState('');
    const [StringLabour,setStringLabour] = useState('');
    const addProduct=()=>{
        firestore().collection('chainManufacture').doc(nameProduct)
        .set({
            name:nameProduct,
            quantity:quantity,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>{
            console.log("Add Product successful");
        })
    };
    const add_Direct_Material=()=>{
        firestore().collection('chainManufacture').doc(nameProduct)
        .collection('DicrectMaterial').doc(nameOfDirectMaterial).set({
            name:nameOfDirectMaterial,
            quantity:quantityDM,
            price:priceDirectMaterial,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    };
    const add_Manufacture_Overhead=()=>{
        firestore().collection('chainManufacture').doc(nameProduct)
        .collection('ManufactureOverhead').doc(nameOfMOH).set({
            name:nameOfMOH,
            quantity:quantityMOH,
            price:priceMOH,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    };
    const add_Labour=()=>{
        firestore().collection('chainManufacture').doc(nameProduct)
        .collection('Labour').doc(positionLabour).set({
            position:positionLabour,
            quantity: quantityLabour,
            salary:salary,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    };

    const checkValidProduct=()=>{
        if(nameProduct!='' && quantity>0 ){
            addProduct();
            setNameProduct('');
            setQuatity('');
            setStringDM('');
            setStringLabour('');
            setStringOHM('');
            Alert.alert('Add successfully');
        }else{
            Alert.alert("Invalid Product")
        }
    };
    const checkValidDM=()=>{
        if(nameOfDirectMaterial!='' && quantityDM>0 && priceDirectMaterial>0 && nameProduct!=''){
            add_Direct_Material();
            setStringDM(StringDM+'Name :'+nameOfDirectMaterial+', Quantity :'+quantityDM+', Price :'+priceDirectMaterial+'\n');
            setNameOfDirectMaterial('');
            setQuantityDM(0);
            setPriceDirectMaterial(0);
            Alert.alert("Add successfully")
        }else{
            Alert.alert('Invalid Direct Material');
        }
    };

    const checkValidMOH=()=>{
        if(nameOfMOH!='' && quantityMOH>0 && priceMOH>0 && nameProduct!=''){
            add_Manufacture_Overhead();
            setStringOHM(StringOHM+'Name :'+nameOfMOH+', Quantity: '+quantityMOH+', Price :'+priceMOH+'\n');
            setNamOfMOH('');
            setQuantityMOh('');
            setPriceMOH('');
            Alert.alert("Add successfully")
        }else{
            Alert.alert('Invalid Manufacture Overhead');
        }
    };

    const checkValidLablour=()=>{
        if(positionLabour!='' && quantityLabour>0 && salary>0 && nameProduct!=''){
            add_Labour();
            setStringLabour(StringLabour+'Position :'+positionLabour+', Quantity :'+quantityLabour+', Salary: '+salary+'\n');
            setPositionLabour('');
            setQuantityLabour('');
            setSalary(''); 
            Alert.alert('Add successfully')
        }else{
            Alert.alert('Invalid Labour');
        }
    }
    
    return(
        <ScrollView>
            <View>
                <TextInput placeholder='Name Product' onChangeText={text=>setNameProduct(text)} value={nameProduct}/>
                <TextInput placeholder='Quantity' onChangeText={text=>setQuatity(text)} value={quantity}/>
                <Text style={styles.title}>Dicrect Material</Text>
                <Text>{StringDM}</Text>
                <TextInput placeholder='Name Direct Material' onChangeText={text=>setNameOfDirectMaterial(text)} value={nameOfDirectMaterial}/>
                <TextInput placeholder='Quantity' onChangeText={text=>setQuantityDM(text)} value={quantityDM} keyboardType='numeric'/>
                <TextInput placeholder='Price' onChangeText={text=>setPriceDirectMaterial(text)} value={priceDirectMaterial} keyboardType='numeric'/>
                <TouchableOpacity style={styles.add} onPress={()=>checkValidDM()}>
                    <Text style={styles.textFind}>Add Direct Material</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Manufacture Overhead</Text>
                <Text>{StringOHM}</Text>
                <TextInput placeholder='Name Manufacture Overhead' onChangeText={text=>setNamOfMOH(text)} value={nameOfMOH}/>
                <TextInput placeholder='Quantity' onChangeText={text=>setQuantityMOh(text)} value={quantityMOH} keyboardType='numeric'/>
                <TextInput placeholder='Price' onChangeText={text=>setPriceMOH(text)} value={priceMOH} keyboardType='numeric'/>
                <TouchableOpacity style={styles.add} onPress={()=>checkValidMOH()}>
                    <Text style={styles.textFind}>Add Manufacture Overhead</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Labour</Text>
                <Text>{StringLabour}</Text>
                <TextInput placeholder='Position of Labour' onChangeText={text=>setPositionLabour(text)} value={positionLabour}/>
                <TextInput placeholder='Quantity' onChangeText={text=>setQuantityLabour(text)} value={quantityLabour} keyboardType='numeric'/>
                <TextInput placeholder='Salary' onChangeText={text=>setSalary(text)} value={salary} keyboardType='numeric'/> 
                <TouchableOpacity style={styles.add} onPress={()=>checkValidLablour()}>
                    <Text style={styles.textFind}>Add Labour</Text>
                </TouchableOpacity>   
                <TouchableOpacity onPress={()=>checkValidProduct()} style={styles.button}>
                    <Text style={styles.textButton}>Add Product</Text>
                </TouchableOpacity>      
            </View>
        </ScrollView>
    )
};
const styles= StyleSheet.create({
    button: {
        backgroundColor: '#89ECDA',
        marginVertical: 10,
        padding: 10,
        width: 200,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: -1 },
        shadowRadius: 10,
        shadowOpacity: 20,
        alignItems: 'center',
        alignSelf:'center',
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
    },
    textFind:{
        fontWeight:'bold',
        fontSize:16,
        color:'red'
    },
    add:{
        alignSelf:'center',
        margin:5,
    },
});
export default Add_Product;