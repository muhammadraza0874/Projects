import 'package:flutter/material.dart';
import 'package:github_user/App/Utils/AppConstant.dart';

class Topbar extends StatelessWidget {
  String? title = "";
  VoidCallback? onBack;
  Widget? rightWidget;
  Topbar({this.title, this.onBack, this.rightWidget});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      decoration: BoxDecoration(boxShadow: [AppTheme.commonShadow]),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: APP_HORIZONTAL_MARGIN),
        child: Row(
          children: [
            onBack != null
                ? GestureDetector(
                    onTap: () {
                      if (this.onBack != null) {
                        this.onBack!();
                      }
                    },
                    child: Container(
                      width: 30,
                      child: Center(
                        child: Image(
                          image: AssetImage(AppImages.backImage),
                          width: 22,
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  )
                : Container(
                    width: 30,
                  ),
            Expanded(
                child: Text(
              this.title ?? "",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
              textAlign: TextAlign.center,
            )),
            rightWidget != null
                ? rightWidget!
                : Container(
                    width: 30,
                  )
          ],
        ),
      ),
    );
  }
}
