
import React from "react";
import Login from "./Project/Login";
import Sign_in from "./Project/Sign_in";
import Add_Product from "./Project/Add_Product";
import Get_Product from "./Project/Get_Product";
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler'
import Information_Product from "./Project/Information_Product";
import UpdateProduct from "./Project/UpdateProduct";
import Handle_infor from "./Project/HandleInfor";

const Stack = createStackNavigator();
const App=()=>{
  
  return(
    <NavigationContainer>
      <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{
          headerShown:true,
          headerStyle:{backgroundColor:'#89ECDA',borderBottomEndRadius:10,height:40},
          headerTitleStyle:{color:'white',fontSize:25,fontWeight:'bold'}
         }}
        >
          <Stack.Screen
          name="HandleInfor"
          component={Handle_infor}
          />
          <Stack.Screen
          name="Update"
          component={UpdateProduct}
          />
          <Stack.Screen
           name="Login"
           component={Login}/>
          <Stack.Screen 
            name="Product"
            component={Get_Product}
            options={{title:'Product in Producing'}}
            />
          <Stack.Screen
           name="Signin"
           component={Sign_in}
           options={{title:'Sign in',headerTintColor:'grey'}}
           />
           <Stack.Screen
            name="AddProduct"
            component={Add_Product}
            options={{title:'Add new Product'}}
            />
            <Stack.Screen
            name="Information"
            component={Information_Product}
            options={{title:'Information about Product'}}
            />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default App;
