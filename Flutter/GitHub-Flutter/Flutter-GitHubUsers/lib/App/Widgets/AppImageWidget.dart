import "package:flutter/material.dart";

class AppImageWidget extends StatelessWidget {
  BoxDecoration? decoration;
  double? height;
  double? width;
  String url;
  AppImageWidget(
      {required this.decoration,
      required this.height,
      required this.width,
      required this.url});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      decoration: decoration,
      clipBehavior: Clip.hardEdge,
      child: Image.network(
        this.url,
        loadingBuilder: (BuildContext context, Widget child,
            ImageChunkEvent? loadingProgress) {
          if (loadingProgress == null) {
            return child;
          }
          return Center(
            child: CircularProgressIndicator(
              value: loadingProgress.expectedTotalBytes != null
                  ? loadingProgress.cumulativeBytesLoaded /
                      loadingProgress.expectedTotalBytes!
                  : null,
            ),
          );
        },
      ),
    );
  }
}
