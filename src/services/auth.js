export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === user.email);

  if (exists) {
    throw new Error("Usuário já existe");
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}