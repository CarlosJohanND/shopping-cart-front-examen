function getCarrito() {
  document.getElementById("cardHeader").innerHTML =
    '<h4><i class="fa-solid fa-users"></i> Carrito de compras</h4>';
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
                <i class="fa-solid fa-user-plus"></i>
            </button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">CartId</th>
                        <th scope="col">More info</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        response.body.forEach((cart) => {
          listCart = listCart.concat(`
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        
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
