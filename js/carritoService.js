function getCarrito() {
  document.getElementById("cardHeader").innerHTML =
    '<h4><i class="fa-solid fa-Carts"></i> Carrito de compras</h4>';
  fetch("https://fakestoreapi.com/carts", {
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
        let listCart = `
            <button type="button" class="btn btn-outline-success" onclick="addCart()">
                <i class="fa-solid fa-Cart-plus"></i>
            </button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">More info</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        response.body.forEach((cart) => {
          listCart = listCart.concat(`
                    <tr>
                        <td>${cart.userId}</td>
                        <td>${cart.date}</td>
                        
                        <td><button type="button" class="btn btn-outline-info" onclick="showInfoCart('${cart.id}')"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>                    
                    `);
        });
        listCart = listCart.concat(`
                </tbody>
            </table>
            `);
        document.getElementById("info").innerHTML = listCart;
      } else {
        document.getElementById("info").innerHTML =
          "<h3>No se encontraron usuarios</h3>";
      }
    });
}

function showInfoCart(cartId) {
  fetch("https://fakestoreapi.com/carts/" + cartId, {
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
        showModalCart(response.body);
      } else {
        document.getElementById("info").innerHTML =
          "<h3>No se encontro el Producto</h3>";
      }
    });
}

function showModalCart(cart) {
  const modalCart = `
        <!-- Modal -->
        <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"> Show Cart</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                        <h5 class="card-title">cart info</h5>
                        <p class="card-text">IDcarrito : ${cart.userId}</p>
                        <p class="card-text">Fecha : ${cart.date}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
  document.getElementById("showModal").innerHTML = modalCart;
  const modal = new bootstrap.Modal(document.getElementById("modalCart"));
  modal.show();
}
