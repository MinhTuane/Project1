import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { TextInput } from "react-native-paper";


const Sign_in=()=>{
    const [name,setName]= useState('');
    const [password,setPassword]= useState('');
    const [email,setEmail] =useState('');
    const [validEmail,setValidEmail] = useState(true);
    const [textWrong,setTextWrong] = useState('');
    const checkValid=()=>{
        if(name !='' && password!='' && email!=''){
            firbase();
        }else{
            Alert.alert("Invalid account");
        }
    }
    const firbase= async()=>{
        setValidEmail(true);
        await firestore().collection('Login').doc(email).get()
        .then(query=>{
            if(query.exists){
                setValidEmail(false);
                console.log(query.data());
            }
        })
        if(validEmail){
            firestore()
            .collection('Login').doc(email).set
            ({
                name:name,
                password:password,
                email:email
            })
            .then(()=>{
                console.log("Add successful");
            }
            )
            .then(()=>{
                setName('');
                setEmail('');
                setPassword('');
                setTextWrong('');
            })
        } else{
            setTextWrong("This Email has already been signed up for other account!!")
        }
        
    };
    return(
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput placeholder="Name" value={name} onChangeText={text=>setName(text)} style={styles.textInput}/>
            <TextInput placeholder="Email" value={email} onChangeText={text=>setEmail(text)} style={styles.textInput}/>
            <Text style={styles.textWrong} >{textWrong}</Text>
            <TextInput placeholder="Password" value={password} onChangeText={text=>setPassword(text)} style={styles.textInput}/>
            <TouchableOpacity style={styles.button} onPress={()=>checkValid()}>
                <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
};
const styles=StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    textWrong: {
        color:'red',
        margin:1,
        
    },
    title: {
        fontSize: 55,
        fontWeight: 'bold',
        marginTop: 90,
        marginBottom: 20,
        color: '#89ECDA',
        textShadowColor: '#89ECDA',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: -1 },
    },
    textInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#89ECDA',
        width: '90%',

        marginTop: 10,
        fontSize: 18,
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: '#89ECDA',
        marginVertical: 10,
        padding: 10,
        width: 120,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: -1 },
        shadowRadius: 10,
        shadowOpacity: 20,
        alignItems: 'center',
    },textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
export default Sign_in;