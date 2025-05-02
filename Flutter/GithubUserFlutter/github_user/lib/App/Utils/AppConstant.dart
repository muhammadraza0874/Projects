// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

double APP_HORIZONTAL_MARGIN = 15;

class AppImages {
  static var backImage = "assets/images/backBtn.png";
}

// Colors
class AppColor {
  static var shared = AppColor();
  var appGreen = Color.fromRGBO(14, 156, 98, 1);
  var appDarkColor = Color.fromRGBO(48, 48, 48, 1);
  var darkGrey = Color.fromRGBO(122, 122, 122, 1);
  var textBlackColor = Color(0xFF303030);
  var lightGreyColor = Color(0xFFE8E8E8);
  var borderColor = Color(0xFF7A7A7A);
  var tabUnselectedColor = Color(0xFFD4D4D4);
  var shadowColor = Color.fromRGBO(196, 196, 196, 0.15);
  var yellowColor = Color(0XFFFFCD00);
  var bgColor = Color(0xFFFCFCFC);
  var textDarkGrey = Color(0xFF505050);
  var orangeColor = Color(0XFFFF8526);
  var darkeshGrey = Color(0xFF505050);
}

// COMMON THEME
class AppTheme {
  static var commonShadow = BoxShadow(
      color: AppColor.shared.shadowColor,
      offset: Offset(0.2, 0.2),
      spreadRadius: 0.5,
      blurRadius: 0.5);
  static var commonBorder =
      Border.all(color: AppColor.shared.lightGreyColor, width: 1);
  static var commonRadius = BorderRadius.all(Radius.circular(8));
}

// APIS URL
String BASE_URL = "https://api.github.com/users";
