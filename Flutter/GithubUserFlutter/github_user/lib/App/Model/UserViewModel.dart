class UserViewModel {
  int id = 0;
  String node_id = "";
  String avatar_url = "";
  String url = "";
  bool site_admin = false;
  String type = "";
  String name = "";
  String company = "";
  String blog = "";
  String location = "";
  String bio = "";
  String login = "";
  UserViewModel.fromJson(Map<String, dynamic> data) {
    id = data["id"] as int;
    node_id = data["node_id"] as String;
    avatar_url = data["avatar_url"] as String;
    url = data["url"] as String;
    type = data["type"] as String;
    login = data["login"] as String;
    site_admin = data["site_admin"] as bool;
    if (data.containsKey("name") && data["name"] is String) {
      name = data["name"] as String;
    }
    if (data.containsKey("company") && data["company"] is String) {
      company = data["company"] as String;
    }
    if (data.containsKey("blog") && data["blog"] is String) {
      blog = data["blog"] as String;
    } else {}
    if (data.containsKey("location") && data["location"] is String) {
      location = data["location"] as String;
    }
    if (data.containsKey("bio") && data["bio"] is String) {
      bio = data["bio"] as String;
    }
  }
}
