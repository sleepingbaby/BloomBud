export async function isLoggedIn() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:3001/users/authenticate", {
      method: "GET",
      headers: headers,
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
