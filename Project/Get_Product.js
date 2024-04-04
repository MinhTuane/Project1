import { useCallback, useRef, useState,useEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, TouchableOpacity, View,Dimensions,Platform } from "react-native";
import { Text } from "react-native-paper";
import Product from "./Product";
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import MonthPicker from 'react-native-month-year-picker';
import  moment from 'moment';
import { AutocompleteDropdown,AutocompleteDropdownContextProvider  } from 'react-native-autocomplete-dropdown';


const Get_Product = ({navigation}) => {
    const dropdownController = useRef(null)
    const searchRef = useRef(null)
    const [allId, setAllId] = useState([]);
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [idDoc, setIdDoc] = useState(null);
    var today = new Date();
    const [start,setStart] = useState(new Date(today.getFullYear(),today.getMonth(),1));
    const [end,setEnd] = useState((new Date().getFullYear+1)+'-01-01');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const showPicker = useCallback((value) => setShow(value), []);

    const onValueChange = useCallback(
        (event, newDate) => {
        const selectedDate = newDate || date;

        showPicker(false);
        setDate(selectedDate);
        
        },
        [date, showPicker],
    );
        useEffect(()=>{
            setStart(moment(date).startOf('month').format('yyyy-MM-DD'))
            setEnd(moment(date).endOf('month').format('yyyy-MM-DD'))
        },[date])
    useEffect(()=>{
        setDate(new Date())
         firbase();
         console.log(allId);
    },[])

    const firbase =  () => {
        setIdDoc([]);
        setAllId([])
        id=0;
        firestore().collection('chainManufacture').get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    setIdDoc(oldArray => [...oldArray, {
                        id: id++,
                        name: documentSnapshot.id
                    }]);

                    setAllId(oldArray => [...oldArray, {
                        id: id++,
                        name: documentSnapshot.id
                    }]);
                })
            })
        }
    const renderItem =({ item }) => {
        const { name } = item;
        return <Product name={name} startDay={start} endDay={end}
        onpress={()=>navigation.navigate('Information',({data:item}))}/>
    }

    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase()
        console.log('getSuggestions', q)
        
        const items = allId
        const suggestions = items
          .filter(item => item.name.toLowerCase().includes(filterToken))
          .map(item => ({
            id: item.id,
            name: item.name,
          }))
        setSuggestionsList(suggestions)
      }, [])
      const onClearPress = useCallback(() => {
        setSuggestionsList(null)
      }, [])
    
      const onOpenSuggestionsList = useCallback(isOpened => {}, [])
    return (
        <AutocompleteDropdownContextProvider
    //  headerOffset={100}
    >
        <SafeAreaView style={styles.container}>
        
            <AutocompleteDropdown
            ref={searchRef}
            controller={controller => {
                dropdownController.current = controller
            }}
            // initialValue={'1'}
            direction={Platform.select({ android: 'down' })}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={item => {
                item && setIdDoc(a=>{
                    a =[item]
                    return [...a]
                })
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
            onOpenSuggestionsList={onOpenSuggestionsList}
            useFilter={false} // set false to prevent rerender twice
            textInputProps={{
                placeholder: 'Search  ',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                borderRadius: 25,
                backgroundColor: '#383b42',
                color: '#fff',
                paddingLeft: 18,
                },
            }}
            rightButtonsContainerStyle={{
                right: 8,
                height: 30,
                
                alignSelf: 'center',
            }}
            inputContainerStyle={{
                backgroundColor: '#383b42',
                borderRadius: 25,
            }}
            suggestionsListContainerStyle={{
                backgroundColor: '#383b42',
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.name}</Text>}
            //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
            inputHeight={50}
            showChevron={false}
            closeOnBlur={false}
            //  showClear={false}
            />
            <View style ={styles.select}>
                
                <View >
                    <Text>Month Year Picker Example</Text>
                </View>
                <Text >{moment(date).format("dddd, MMM DD YYYY")}</Text>
            </View>
                <TouchableOpacity onPress={() => showPicker(true)}>
                    <Text>OPEN</Text>
                </TouchableOpacity>
                {show && (
                    <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date(1990,1,1)}
                    maximumDate={new Date()}
                    locale="us"
                    />
                )}
            

            <View style={styles.containSignin}>
                <TouchableOpacity onPress={()=>navigation.navigate('AddProduct')}>
                    <Text style={[styles.textFind,styles.add]}>Add Product</Text>
                </TouchableOpacity>
            </View>

                <FlatList
                data={idDoc}
                extraData={idDoc}
                renderItem={renderItem} />
            
        </SafeAreaView>
        </AutocompleteDropdownContextProvider>
    )
};
const styles= StyleSheet.create({
    select:{
        paddingTop: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    selectText:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10,
    },
    inputStyles:{
        alignItems: 'center',
        fontWeight:'bold',
    },
    container :{
        flex:1,
        marginHorizontal:5,
        marginTop:5,
        marginBottom:0,
    },
    find:{
        marginHorizontal:13,
        borderWidth:1,
        borderRadius:5,
        padding:10,
        width:60,
        height:40,
        backgroundColor:'darkgrey',
    },
    textFind:{
        fontWeight:'bold',
        fontSize:16,
        color:'red'
    },
    add:{
        marginLeft:'60%', 
        marginVertical:5, 
    },
    containSignin: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignSelf: 'baseline',
        marginLeft: 10,
    },
})
export default Get_Product;