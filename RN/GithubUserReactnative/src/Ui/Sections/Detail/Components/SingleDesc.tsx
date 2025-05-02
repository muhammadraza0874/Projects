import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppHorizontalMargin, AppStyles } from "../../../../Utils/AppStyles";
interface Props {
    title : string,
    desc : string
}
const SingleDesc = (props : Props)=>{
    return(
        <View
        style = {style.mainView}
        >
            <Text
            style = {style.title}
            >
                {
                    props.title
                }
            </Text>
            <View
            style = {{
                ...AppStyles.MainStyle,
                marginLeft : 10,
                alignItems : "flex-end",
            }}
            >
                 <Text
            style = {style.desc}
            >
                {
                    props.desc
                }
            </Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        marginTop : 15,
        paddingHorizontal : AppHorizontalMargin,
    },
    title : {
        ...AppStyles.textInterSemiBold,
        fontSize : 16,
    },
    desc : {
        ...AppStyles.textInterSimple,
        fontSize : 16,
    }
})
export default SingleDesc