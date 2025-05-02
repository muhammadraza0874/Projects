import 'package:flutter/material.dart';

class SingleDesc extends StatelessWidget {
  String title;
  String desc;
  SingleDesc({required this.title, required this.desc});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 30, right: 30, top: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            this.title,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
          ),
          Expanded(
              child: Text(
            this.desc,
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
            textAlign: TextAlign.right,
          ))
        ],
      ),
    );
  }
}
