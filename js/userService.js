function getUsers() {
  document.getElementById("cardHeader").innerHTML =
    '<h4><i class="fa-solid fa-users"></i> Listado de usuarios</h4>';
  fetch("https://fakestoreapi.com/users", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((result) => {
      return result.json().then((data) => {
        return {
          status: result.status,
          body: data,
        };
      });
    })

    .then((response) => {
      if (response.status === 200) {
        let listUsers = `
            <button type="button" class="btn btn-outline-success" onclick="addUser()">
                <i class="fa-solid fa-user-plus"></i>
            </button>
                <table class="table border-black border-2 mt-3">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Mas informacion</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        response.body.forEach((user) => {
          listUsers = listUsers.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address.city}</td>
                        <td>
                        <button type="button" class="btn btn-outline-info" onclick="showInfoUser('${user.id}')"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>                    
                    `);
        });
        listUsers = listUsers.concat(`
                </tbody>
            </table>
            `);
        document.getElementById("info").innerHTML = listUsers;
      } else {
        document.getElementById("info").innerHTML =
          "<h3>No se encontraron usuarios</h3>";
      }
    });
}

function showInfoUser(userId) {
  fetch("https://fakestoreapi.com/users/" + userId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((result) => {
      return result.json().then((data) => {
        return {
          status: result.status,
          body: data,
        };
      });
    })
    .then((response) => {
      if (response.status === 200) {
        showModalUser(response.body);
      } else {
        document.getElementById("info").innerHTML =
          "<h3>No se encontro el usuario</h3>";
      }
    });
}

function showModalUser(user) {
  const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user"></i> Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                        <h5 class="card-title">User info</h5>
                        <p class="card-text">ID : ${user.id}</p>
                        <p class="card-text">Pimer nombre : ${user.name.firstname}</p>
                        <p class="card-text">Email : ${user.email}</p>
                        <p class="card-text">Contraseña : ${user.password}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
  document.getElementById("showModal").innerHTML = modalUser;
  const modal = new bootstrap.Modal(document.getElementById("modalUser"));
  modal.show();
}

function addUser() {
  const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header bg-success bg-opacity-25">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Add User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <form id="formAddUser">
                            <div class="mb-3">
                                <label for="ID" class="form-label">ID</label>
                                <input type="text" class="form-control" id="ID" placeholder="id name input" required>
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">user name</label>
                                <input type="text" class="form-control" id="username" placeholder="user name input" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Email input" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">password</label>
                                <input type="password" class="form-control" id="password" placeholder="password input" required>
                            </div>
                            <div class="mb-3 text-center">
                                <button class="btn btn-success" type="button" onclick="saveUser()">
                                    <i class="fa-solid fa-floppy-disk"></i> Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
  document.getElementById("showModal").innerHTML = modalUser;
  const modal = new bootstrap.Modal(document.getElementById("modalUser"));
  modal.show();
}

function saveUser() {
  const form = document.getElementById("formAddUser");
  if (form.checkValidity()) {
    const id = document.getElementById("ID").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userData = { id, username, email, password };

    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((result) => {
        return result.json().then((data) => {
          return {
            status: result.status,
            body: data,
          };
        });
      })
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("info").innerHTML =
            "<h3>The user was register success!</h3>";
        } else {
          document.getElementById("info").innerHTML =
            "<h3>The user was not register error!</h3>";
        }
        const modalId = document.getElementById("modalUser");
        const modal = bootstrap.Modal.getInstance(modalId);
        modal.hide();
      });
  } else {
    form.reportValidity();
  }
}
