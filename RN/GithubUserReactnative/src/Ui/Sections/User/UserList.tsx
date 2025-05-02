import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { UserViewModel } from "../../../Models/UserViewModel";
import { ApiResponseHandler } from "../../../Network/ApiResponseHandler";
import { getRequest} from "../../../Network/Services/UserServices";
import { BASE_URL } from "../../../Network/Urls";
import { startLoader } from "../../../Redux/actions/AppLogics";
import { ScreenProps } from "../../../Utils/AppConstants";
import { AppStyles } from "../../../Utils/AppStyles";
import CommonDataManager from "../../../Utils/CommonManager";
import { Routes } from "../../../Utils/Routes";
import TopBar from "../../Components/CustomHeader/TopBar";
import SingleUser from "./Components/SingleUser";
const UserList = (props : ScreenProps)=>{
    const [userList,setUserList] = useState<[UserViewModel]>([])
    const dispatch = useDispatch()
    useEffect(()=>{
        getUserList()
    },[])
    // GET ALL USERS 
    const getUserList = async()=>{
        const isConnected = await CommonDataManager.getSharedInstance().isNetAvailable()
        if (isConnected) {
            dispatch(startLoader(true))
            let response : ApiResponseHandler<[UserViewModel]> = await getRequest(BASE_URL)
            setUserList(response.data)
            dispatch(startLoader(false))
        }
        else {
            CommonDataManager.getSharedInstance().showPopUpWithOk("Error","Please connect your internet.",()=>{
                getUserList()
            })
        }
    }
    return(
        <View
        style = {{
            ...AppStyles.MainStyle
        }}
        >
            <SafeAreaView/>
            <TopBar
            title="User List"
            />
            <View
            style = {{
                ...AppStyles.MainStyle
            }}
            >
                <FlatList
                data={userList}
                keyExtractor = {(item,index)=>`${index}`}
                renderItem={({item,index})=>{
                    return (
                        <SingleUser
                        onPress={()=>{
                            props.navigation.push(Routes.User.detail,{
                                id : item.login
                            })
                        }}
                        user={item}
                        />
                    )
                }}
                />
            </View>
            <SafeAreaView/>
        </View>
    );
}
export default UserList