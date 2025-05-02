var baseUrl = "https://api.github.com/";
export async function userListing() {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  return await fetch(baseUrl + "users", requestOptions).then((data) =>
    data.json()
  );
}

export async function userDetail(userId) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  return await fetch(baseUrl + "users/" + userId, requestOptions).then((data) =>
    data.json()
  );
}
