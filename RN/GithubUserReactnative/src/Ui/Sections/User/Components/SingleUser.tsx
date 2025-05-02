import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { UserViewModel } from "../../../../Models/UserViewModel";
import { AppHorizontalMargin, AppStyles } from "../../../../Utils/AppStyles";
import AppImageView from "../../../Components/Image/AppImageView";
interface Props {
    user : UserViewModel,
    onPress : ()=>void
}
const SingleUser = (props : Props)=>{
    return (
       <TouchableWithoutFeedback
       onPress={()=>props.onPress()}
       >
         <View
        style = {{
            ...style.mainViewStyle
        }}
        >
            <AppImageView
            url={props.user.avatar_url}
            style = {style.userImageStyle}
            />
            <Text
            style = {style.idStyle}
            >
                {
                    `User Id: ${props.user.id}`
                }
            </Text>
        </View>
       </TouchableWithoutFeedback>
    )
}
export default SingleUser
const style = StyleSheet.create({
    mainViewStyle : {
        flex : 1,
        marginTop : 15,
        paddingHorizontal : AppHorizontalMargin,
        flexDirection : "row",
        alignItems : "center"
    },
    userImageStyle : {
        height : 60,
        width : 60,
        borderRadius :30,
        overflow : "hidden"
    },
    idStyle : {
        marginLeft : 10,
        ...AppStyles.textInterSemiBold,
        fontSize : 16
    }
})