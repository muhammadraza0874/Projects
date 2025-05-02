import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class CommonManager {
  bool isInternetConnect = false;
  static CommonManager manager = CommonManager();
  void setConnectivityChange(bool state) {
    this.isInternetConnect = state;
  }

  bool getConnectivityState() {
    if (kIsWeb) {
      return true;
    } else {
      return isInternetConnect;
    }
  }

  Future<void> showMyDialog(BuildContext context, String title, String desc,
      VoidCallback onRetry) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text(desc),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Retry'),
              onPressed: () {
                Navigator.of(context).pop();
                onRetry();
              },
            ),
          ],
        );
      },
    );
  }
}
