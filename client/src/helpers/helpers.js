export async function isLoggedIn() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://bloombud-0013ffd7d655.herokuapp.com/users/authenticate",
      {
        method: "GET",
        headers: headers,
        credentials: "include",
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
