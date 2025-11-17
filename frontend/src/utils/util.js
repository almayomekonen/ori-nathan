export function getToken() {
  const token = localStorage.getItem("token");
  return token || null;
}

const token = getToken();
console.log(token);
