import React, { useState } from "react";
import { View,Image,ActivityIndicator, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { AppColors } from "../../../Utils/AppConstants";
interface Props {
    url : string,
    style : StyleProp<ViewStyle>
}
const AppImageView = (props : Props)=>{
    const  [loading,setLoading] = useState(true)
    return(
        <View
        style = {props.style}
        >
            <Image
            style = {{
                flex : 1,
            }}
            source={{uri : props.url}}
            onLoadEnd = {()=>{
                setLoading(false)
            }}
            />
            {
                loading &&
                <View
                style = {{
                    ...style.loaderView
                }}
                >
                    <ActivityIndicator
                    size={"small"}
                    color = {AppColors.blue.dark}
                    />
                </View>
            }
        </View>
    )
}
export default AppImageView
const style = StyleSheet.create({
    loaderView : {
        position : "absolute",
        zIndex : 1,
        elevation : 3,
        top : 0,bottom : 0,left : 0,right : 0,
        justifyContent : "center",
        alignItems : "center"
    }
})