import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:github_user/App/Model/UserViewModel.dart';
import 'package:github_user/App/Provider/AppProvider.dart';
import 'package:github_user/App/Section/Detail/widgets/SingleDesc.dart';
import 'package:github_user/App/Utils/AppConstant.dart';
import 'package:github_user/App/Widgets/AppImageWidget.dart';
import 'package:provider/provider.dart';
import '../../Utils/CommonManager.dart';
import '../../Widgets/TopBar.dart';

class UserDetail extends StatefulWidget {
  String? userId;
  UserDetail({required this.userId});
  @override
  State<StatefulWidget> createState() {
    return UserDetailState();
  }
}

class UserDetailState extends State<UserDetail> {
  UserViewModel? user;
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 1)).then((value) => getUserDetail());
  }

  void getUserDetail() async {
    if (CommonManager.manager.getConnectivityState()) {
      context.read<AppProvider>().setLoaderState();
      var response = await Dio().get(BASE_URL + "/${widget.userId}");
      UserViewModel v = UserViewModel.fromJson(response.data as dynamic);
      context.read<AppProvider>().setLoaderState();
      setState(() {
        user = v;
      });
    } else {
      CommonManager.manager
          .showMyDialog(context, "Error", "Please try to connect internet", () {
        getUserDetail();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          height: double.infinity,
          width: double.infinity,
          child: SafeArea(
              child: Column(
            children: [
              Topbar(
                title: "User Detail",
                onBack: () {
                  Navigator.pop(context);
                },
              ),
              this.user != null
                  ? SingleChildScrollView(
                      child: Column(
                        children: [
                          SizedBox(
                            height: 30,
                          ),
                          AppImageWidget(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(60),
                              ),
                              height: 120,
                              width: 120,
                              url: user!.avatar_url!),
                          SizedBox(
                            height: 20,
                          ),
                          SingleDesc(title: "Name", desc: this.user!.name),
                          SingleDesc(
                              title: "Company", desc: this.user!.company),
                          SingleDesc(title: "Blog", desc: this.user!.blog),
                          SingleDesc(
                              title: "Location", desc: this.user!.location),
                          SingleDesc(title: "Bio", desc: this.user!.bio),
                        ],
                      ),
                    )
                  : SizedBox.shrink()
            ],
          ))),
    );
  }
}
