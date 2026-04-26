export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = users.find(u => u.email === user.email);

  if (emailExists) {
    throw new Error("Email já cadastrado");
  }

  const usernameExists = users.find(u => u.username === user.username);

  if (usernameExists) {
    throw new Error("Nome de usuário já existe");
  }

  const newUser = {
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", JSON.stringify(newUser));
}

export function loginUser(identifier, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u =>
      (u.email === identifier || u.username === identifier) &&
      u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");

  localStorage.setItem("currentUser", "");
}

export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user && user !== "undefined" ? JSON.parse(user) : null;
}