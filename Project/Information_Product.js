import firestore from '@react-native-firebase/firestore';
import { useEffect,useState } from 'react';
import Handle_infor from './HandleInfor';
import { FlatList, View , ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import { Text} from 'react-native-paper';
import Handle_infor_labour from './HandleInforLabour';



const Information_Product=({route})=>{

    const{data} = route.params;
    const{name} = data;
    
    const [quantity,setQuatity] = useState('');

    const [DirectMaterial,setDirectMaterial] = useState([]);

    const [MOH,setMOH] = useState([]);
    
    const [Labour,setLabour] = useState([]);

    
    useEffect(()=>{
        handleInfor();
    },[])
    const handleInfor=()=>{
        firestore().collection('chainManufacture').doc(name).get()
        .then(docSnapshot=>{
            setQuatity(docSnapshot.data().quantity)
        });

        setDirectMaterial([])
        firestore().collection('chainManufacture').doc(name).collection('DicrectMaterial').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setDirectMaterial(oldArray=>[...oldArray,{
                    nameProduct: name,
                    collection : 'DicrectMaterial',
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
            })
        })

        setMOH([])
        firestore().collection('chainManufacture').doc(name).collection('ManufactureOverhead').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setMOH(oldArray=>[...oldArray,{
                    nameProduct: name,
                    collection : "ManufactureOverhead",
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
            })
        })

        setLabour([])
        firestore().collection('chainManufacture').doc(name).collection('Labour').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setLabour(oldArray=>[...oldArray,{
                    nameProduct: name,
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
                console.log(docSnapshot.id);
            })
        })
    }
    
    const renderitem=({item})=>{
        const {nameProduct,collection,id,data} = item
        const {name,quantity,price} =data;
        if(collection=='ManufactureOverhead'){
            return<Handle_infor nameProduct={nameProduct} name={name}
             quantity={quantity} price={price} id={id} collection={collection} hook={setMOH}/>
        } else {
            return<Handle_infor nameProduct={nameProduct} name={name}
             quantity={quantity} price={price} id={id} collection={collection} hook={setDirectMaterial}/>
        }
        
    }
    const renderItemLabour=({item})=>{
        
        const {nameProduct,id,data} = item
        const {position,quantity,salary} =data;
        
        return<Handle_infor_labour nameProduct={nameProduct} position={position} quantity={quantity} salary={salary} id={id} setLabour={setLabour}/>
    }
    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
            />
        )
    }

    return(
        <VirtualizedList>
        <ScrollView style={styles.totalcontainer}>
            <Text style={styles.titleProduct}>Name Product : {name}</Text>
            <Text style={styles.titleProduct}>Quantity : {quantity}</Text>
            <Text style={styles.title}>Direct</Text>
            <FlatList
            data={DirectMaterial}
            renderItem={renderitem}
            />
            <Text style={styles.title}>Manufacture Overhead</Text>
            <FlatList
            data={MOH}
            renderItem={renderitem}
            />
            <Text style={styles.title}>Labour</Text>
            <FlatList
            data={Labour}
            extraData={Labour}
            renderItem={renderItemLabour}
            />
        
        </ScrollView>
        </VirtualizedList>
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
    },
    totalcontainer:{
        margin:5,
        
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
    },
    titleProduct:{
        fontWeight:'bold',
        fontSize:20,
    },
})
export default Information_Product;