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

function addProduct() {
  const modalProduct = `
        <!-- Modal -->
        <div class="modal fade " id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header bg-success bg-opacity-25">
                    <h1 class="modal-title fs-5" id="modalProductLabel"><i class="fa-solid fa-box"></i> Add Product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <form id="formAddProduct">
                                <div class="mb-3">
                                    <label for="product_id" class="form-label">id</label>
                                    <input type="text" class="form-control" id="product_id" placeholder="Product id" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product_title" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="product_title" placeholder="Product title" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product_price" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="product_price" placeholder="Product price" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product_description" class="form-label">Description</label>
                                    <input type="text" class="form-control" id="product_description" placeholder="Product description" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product_category" class="form-label">Category</label>
                                    <input type="text" class="form-control" id="product_category" placeholder="Category" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product_image" class="form-label">Image URL</label>
                                    <input type="url" class="form-control" id="product_image" placeholder="Image URL" required>
                                </div>
                                <div class="mb-3 text-center">
                                    <button class="btn btn-success" type="button" onclick="saveProduct()">
                                        <i class="fa-solid fa-floppy-disk"></i> Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-dark-subtle">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
        </div>
    `;
  document.getElementById("showModal").innerHTML = modalProduct;
  const modal = new bootstrap.Modal(document.getElementById("modalProduct"));
  modal.show();
}

function saveProduct() {
  const form = document.getElementById("formAddProduct");
  if (form.checkValidity()) {
    const id = document.getElementById("product_id").value;
    const title = document.getElementById("product_title").value;
    const price = parseFloat(document.getElementById("product_price").value);
    const description = document.getElementById("product_description").value;
    const categoryId = document.getElementById("product_category".value);
    const imageUrl = document.getElementById("product_image").value;

    const productData = {
      id,
      title,
      price,
      description,
      categoryId,
      images: [imageUrl],
    };

    fetch("https://api.escuelajs.co/api/v1/products/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productData),
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
        response.status;
        console.log(response.status);
        if (response.status === 400) {
          document.getElementById("info").innerHTML =
            "<h3>The product was registered successfully!</h3>";
        } else {
          document.getElementById("info").innerHTML =
            "<h3>There was an error registering the product!</h3>";
        }
        const modalId = document.getElementById("modalProduct");
        const modal = bootstrap.Modal.getInstance(modalId);
        modal.hide();
      });
  } else {
    form.reportValidity();
  }
}
