import 'package:flutter/material.dart';
import 'package:github_user/App/Network/ConnectivityStatusSingleton.dart';
import 'package:github_user/App/Provider/AppProvider.dart';
import 'package:github_user/App/Section/User/UserListScreen.dart';
import 'package:github_user/App/Utils/AppConstant.dart';
import 'package:github_user/App/Utils/CommonManager.dart';
import 'package:provider/provider.dart';
import 'dart:async'; //For StreamSubscription
import 'package:flutter/foundation.dart' show kIsWeb;

void main() {
  runApp(MultiProvider(
    providers: [ChangeNotifierProvider(create: (_) => AppProvider())],
    child: MyApp(),
  ));
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    if (!kIsWeb) {
      ConnectionStatusSingleton connectionStatus =
          ConnectionStatusSingleton.getInstance();
      connectionStatus.initialize();
    }
    return MyAppState();
  }
}

class MyAppState extends State<MyApp> {
  StreamSubscription? _connectionChangeStream;
  @override
  initState() {
    super.initState();
    if (!kIsWeb) {
      ConnectionStatusSingleton connectionStatus =
          ConnectionStatusSingleton.getInstance();
      _connectionChangeStream =
          connectionStatus.connectionChange.listen(connectionChanged);
    }
  }

  void connectionChanged(dynamic hasConnection) {
    print("internet state is ${hasConnection}");
    CommonManager.manager.setConnectivityChange(hasConnection);
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      title: "GitHub Users",
      debugShowCheckedModeBanner: false,
      home: Stack(
        fit: StackFit.loose,
        children: [
          Navigator(
            onGenerateRoute: (route) => MaterialPageRoute(
              settings: route,
              builder: (context) => UserListScreen(),
            ),
          ),
          context.watch<AppProvider>().isLoaderState
              ? Container(
                  height: double.infinity,
                  width: double.infinity,
                  decoration:
                      BoxDecoration(color: Colors.black.withOpacity(0.1)),
                  child: Center(
                    child: Container(
                        height: 60,
                        width: 60,
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [AppTheme.commonShadow]),
                        child: Padding(
                          padding: EdgeInsets.all(15),
                          child: CircularProgressIndicator(),
                        )),
                  ),
                )
              : SizedBox.shrink()
        ],
      ),
    );
  }
}
