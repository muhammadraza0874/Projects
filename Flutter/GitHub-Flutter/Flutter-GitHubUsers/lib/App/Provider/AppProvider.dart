import 'package:flutter/material.dart';

class AppProvider extends ChangeNotifier {
  bool isLoader = false;
  bool get isLoaderState => isLoader;
  void setLoaderState() {
    isLoader = !isLoader;
    print(isLoader);
    notifyListeners();
  }
}
