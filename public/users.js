const url ="http://localhost:3000/users";

const usertable = document.getElementById("usertable");
const box = document.getElementById("box");
const adduser = document.getElementById("adduser");
const refresh = document.getElementById("refresh");

async function fetchUsers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    usertable.innerHTML = "";
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.lastname}</td>
        <td>${user.firstname}</td>
        <td>${user.passwd}</td>
        <td>${user.email}</td>
        <td>${user.urole}</td>
      `;
      usertable.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

adduser.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const lastname = document.getElementById("lastname").value;
  const firstname = document.getElementById("firstname").value;
  const passwd = document.getElementById("passwd").value;
  const email = document.getElementById("email").value;
  const urole = document.getElementById("urole").value;

  if (!username) {
    alert("Username is required");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, lastname, firstname, passwd, email, urole })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    alert(result.message);
    document.getElementById("username").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("passwd").value = "";
    document.getElementById("email").value = "";
    document.getElementById("urole").value = "";
  } catch (error) {
    console.error('Error adding user:', error);
  }
});

refresh.addEventListener("click", fetchUsers);

fetchUsers();