import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:github_user/App/Model/UserViewModel.dart';
import 'package:github_user/App/Provider/AppProvider.dart';
import 'package:github_user/App/Section/Detail/UserDetail.dart';
import 'package:github_user/App/Section/User/widgets/SingleUser.dart';
import 'package:github_user/App/Utils/AppConstant.dart';
import 'package:github_user/App/Utils/CommonManager.dart';
import 'package:github_user/App/Widgets/TopBar.dart';
import 'package:provider/provider.dart';

class UserListScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return UserListState();
  }
}

class UserListState extends State<UserListScreen> {
  List<UserViewModel> userList = [];
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 1)).then((value) => getAllUsers());
  }

  void getAllUsers() async {
    if (CommonManager.manager.getConnectivityState()) {
      context.read<AppProvider>().setLoaderState();
      var response = await Dio().get(BASE_URL);
      var newList = response.data as List<dynamic>;
      List<UserViewModel> userNewList = [];
      for (int i = 0; i < newList.length; i++) {
        userNewList.add(UserViewModel.fromJson(newList[i]));
      }
      context.read<AppProvider>().setLoaderState();
      setState(() {
        userList = userNewList;
      });
    } else {
      CommonManager.manager
          .showMyDialog(context, "Error", "Please try to connect internet", () {
        getAllUsers();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          height: double.infinity,
          width: double.infinity,
          child: Column(
            children: [
              Topbar(
                title: "User List",
              ),
              Expanded(
                child: userList.length > 0
                    ? ListView.builder(
                        itemCount: userList.length,
                        itemBuilder: (context, item) {
                          return SingleUser(
                            user: userList[item],
                            onClick: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (_) => UserDetail(
                                            userId: userList[item].login,
                                          )));
                            },
                          );
                        })
                    : Container(),
              )
            ],
          ),
        ),
      ),
    );
  }
}
