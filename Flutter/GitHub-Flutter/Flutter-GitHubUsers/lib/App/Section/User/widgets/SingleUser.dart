import "package:flutter/material.dart";
import 'package:github_user/App/Model/UserViewModel.dart';
import 'package:github_user/App/Utils/AppConstant.dart';
import 'package:github_user/App/Widgets/AppImageWidget.dart';

class SingleUser extends StatelessWidget {
  UserViewModel user;
  VoidCallback onClick;
  SingleUser({required this.user, required this.onClick});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        child: Padding(
          padding: EdgeInsets.only(
              left: APP_HORIZONTAL_MARGIN,
              right: APP_HORIZONTAL_MARGIN,
              top: 15),
          child: Row(
            children: [
              AppImageWidget(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  height: 60,
                  width: 60,
                  url: user.avatar_url),
              SizedBox(
                width: 10,
              ),
              Text(
                "User Id: ${user.id}",
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
              )
            ],
          ),
        ),
      ),
    );
  }
}
