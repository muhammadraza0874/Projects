import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { UserViewModel } from "../../../Models/UserViewModel";
import { ApiResponseHandler } from "../../../Network/ApiResponseHandler";
import { getRequest } from "../../../Network/Services/UserServices";
import { BASE_URL } from "../../../Network/Urls";
import { startLoader } from "../../../Redux/actions/AppLogics";
import { ScreenProps } from "../../../Utils/AppConstants";
import { AppStyles } from "../../../Utils/AppStyles";
import CommonDataManager from "../../../Utils/CommonManager";
import TopBar from "../../Components/CustomHeader/TopBar";
import AppImageView from "../../Components/Image/AppImageView";
import SingleDesc from "./Components/SingleDesc";

const UserDetail = (props: ScreenProps) => {
    const dispatch = useDispatch()
    const { id } = props.route.params
    const [user, setUser] = useState<UserViewModel>()
    useEffect(() => {
        getUserDetail()
    }, [])
    // GET ALL USERS 
    const getUserDetail = async () => {
        const isConnected = await CommonDataManager.getSharedInstance().isNetAvailable()
        if (isConnected) {
            dispatch(startLoader(true))
            let response: ApiResponseHandler<UserViewModel> = await getRequest(BASE_URL + `/${id}`)
            setUser(response.data)
            dispatch(startLoader(false))
        }
        else {
            CommonDataManager.getSharedInstance().showPopUpWithOk("Error", "Please connect your internet.", () => {
                getUserDetail()
            })
        }
    }
    return (
        <View
            style={{
                ...AppStyles.MainStyle
            }}
        >
            <SafeAreaView />
            <TopBar
                onBack={() => {
                    props.navigation.goBack()
                }}
                title="User Detail"
            />
            <View
                style={{
                    ...AppStyles.MainStyle
                }}
            >
                {
                    user &&
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <AppImageView
                            url={user.avatar_url}
                            style={style.userImageView}
                        />
                        <SingleDesc
                        title="Name:"
                        desc={user.name}
                        />
                         <SingleDesc
                        title="Company:"
                        desc={user.company}
                        />
                         <SingleDesc
                        title="Blog:"
                        desc={user.blog}
                        />
                         <SingleDesc
                        title="Location:"
                        desc={user.location}
                        />
                          <SingleDesc
                        title="Bio:"
                        desc={user.bio}
                        />
                    </ScrollView>
                }
            </View>
            <SafeAreaView />
        </View>
    );
}
const style = StyleSheet.create({
    userImageView: {
        alignSelf: "center",
        marginTop: 30,
        height: 120,
        width: 130,
        borderRadius: 65,
        overflow: "hidden"
    }
})
export default UserDetail