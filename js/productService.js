function getProducts() {
  document.getElementById("cardHeader").innerHTML =
    '<h4><i class="fa-solid fa-box"></i> Carrusel de productos</h4>';
  document.getElementById("info").innerHTML = "";

  fetch("https://api.escuelajs.co/api/v1/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
    .then((Response) => {
      if (Response.status == 200) {
        let products = `
        <button type="button" class="btn btn-outline-success" onclick="addProduct()">
          <i class="fa-solid fa-square-plus"></i>
        </button>
        <div class="d-flex flex-wrap justify-content-start gap-3 mt-3">
        `;

        for (let index = 0; index <= 11; index++) {
          const element = Response.body[index];
          products += `
          
          <div class="card" style="width: 18rem;">
            <img src="${element.images}" class="card-img-top" alt="Avatar del producto">
            <div class="card-body">
              <p class="card-text">${element.title} </p>
              <p class="card-text">${element.price} </p>
            </div>
          </div>

          `;
        }
        products += `
        </div>
        `;

        document.getElementById("info").innerHTML = products;
      } else {
        document.getElementById("info").innerHTML =
          "<p>Error al cargar los productos.</p>";
      }
    });
}

function addProduct() {
  const modalProduct = `
        <!-- Modal -->
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel"><i class="fa-solid fa-box"></i> Add Product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <form id="formAddProduct">
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
                                    <label for="product_category" class="form-label">Category ID</label>
                                    <input type="number" class="form-control" id="product_category" placeholder="Category ID" required>
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
                <div class="modal-footer">
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
    const title = document.getElementById("product_title").value;
    const price = parseFloat(document.getElementById("product_price").value);
    const description = document.getElementById("product_description").value;
    const categoryId = parseInt(
      document.getElementById("product_category").value
    );
    const imageUrl = document.getElementById("product_image").value;

    const productData = {
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
