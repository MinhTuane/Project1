import {StyleSheet, Text } from "react-native";
import {Dimensions} from 'react-native';
import {
  LineChart,
  ProgressChart
} from "react-native-chart-kit";
import firestore from'@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { TouchableOpacity } from "react-native-gesture-handler";

const Product=({name,startDay,endDay,onpress})=>{
   const [quantity,setQuantity] = useState([0]);
   const [date,setDate] = useState(["0"]);
   const [isGetData,setIsGetData] = useState(false);
   useEffect(()=>{
     getProduct();
   },[startDay,endDay,isGetData])
    const getProduct=async()=>{
      setQuantity([0]);  
      setDate(["0"]);
      const fetchData = await firestore().collection('chainManufacture').doc(name).collection('Product').where("date",">=",startDay).where("date","<",endDay).orderBy('date').get()
      .then(querySnapshot=>{
          querySnapshot.forEach(docSnapshot=>{
            if(docSnapshot.exists){
              setQuantity(oldArray=>[...oldArray,docSnapshot.data().quantity]);
              const formatDate = DateTime.fromISO(docSnapshot.data().date).toLocaleString({day:'numeric'})
              setDate(oldArray=>[...oldArray,formatDate]);
              console.log(quantity);
              return true;
            }
        })
      })
      setIsGetData(fetchData);
    }
    const dataProgressChart = {
      labels: ["defect","inprogress","completed"],
      data: [0.1,0.2,0.7]
    }
    return(
        <TouchableOpacity style={styles.containList} onPress={onpress}>
            <Text style = {styles.title}>{name}</Text>
            <LineChart
              data={{
                labels: date,
                datasets: [
                  {
                    data: quantity
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

                <ProgressChart
                  data={dataProgressChart}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
        </TouchableOpacity>
    )
};
const styles= StyleSheet.create({
  title:{
    fontSize:24,
    color:'lightgreen',
  },
  containList:{
    marginVertical:10,
},
})
export default Product;