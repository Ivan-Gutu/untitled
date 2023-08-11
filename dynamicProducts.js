class ProductPage {
    constructor() {
        this.productContainer = document.getElementById("productContainer");
        this.itemsPerPageSelect = document.getElementById("itemsPerPage");
        this.currentPageElement = document.getElementById("currentPage");
        this.totalPagesElement = document.getElementById("totalPages");
        this.prevPageButton = document.getElementById("prevPageButton");
        this.nextPageButton = document.getElementById("nextPageButton");
        this.paginationItemsContainer = document.getElementById("pagination");
        this.spinnerContainer = document.querySelector(".spinner-container");

        this.productsPerPage = parseInt(this.itemsPerPageSelect.value);
        this.currentPage = 1;
    }

    loadProducts() {
        this.spinnerContainer.style.display = "block";
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                this.products = data;
                this.showProducts();
                this.restoreItemsPerPage();
                this.createDynamicPagination();
                this.updatePagination();

                this.spinnerContainer.style.display = "none";
            })
            .catch(error => console.error("Ошибка загрузки данных:", error));
    }

    showProducts() {
        this.productContainer.innerHTML = "";

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const paginatedProducts = this.products.slice(startIndex, endIndex);

        paginatedProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-3", "mb-4", "product");
            productCard.innerHTML = `
                    <div class="card">
                        <h2 class="card-title">${product.name}</h2>
                        <div class="card-body">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        </div>
                        <p class="card-text">Цена: $${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Добавить в корзину</button>
                    </div>
                `;
            this.productContainer.appendChild(productCard);
        });
        this.createDynamicPagination();
        this.updatePagination();
    }

    // Обработчики событий
    attachEventListeners() {
        // Обработчики событий для пагинации
        this.prevPageButton.addEventListener("click", () => this.prevPage());
        this.nextPageButton.addEventListener("click", () => this.nextPage());

        this.itemsPerPageSelect.addEventListener("change", () => {
            this.productsPerPage = parseInt(this.itemsPerPageSelect.value);
            this.currentPage = 1;
            this.showProducts();
            sessionStorage.setItem("itemsPerPage", this.productsPerPage.toString());
        });
    }

    restoreItemsPerPage() {
        const storedItemsPerPage = sessionStorage.getItem("itemsPerPage");
        if (storedItemsPerPage) {
            this.itemsPerPageSelect.value = storedItemsPerPage;
            this.productsPerPage = parseInt(storedItemsPerPage);
        }
    }

    // Метод для перехода на предыдущую страницу
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.showProducts(this.products);
            this.updatePagination();
        }
    }

    // Метод для перехода на следующую страницу
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.showProducts(this.products);
            this.updatePagination();
        }
    }

    // Метод для перехода на указанную страницу
    goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber;
            this.showProducts(this.products);
            this.updatePagination();
        }
    }

    updatePagination() {
        this.paginationItems.forEach((item, index) => {
            if (index === this.currentPage - 1) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        this.currentPageElement = this.currentPage;
        this.totalPagesElement = this.totalPages;

        this.prevPageButton.disabled = this.currentPage === 1;
        this.nextPageButton.disabled = this.currentPage === this.totalPages;
    }

    // Метод для создания динамической пагинации
    createDynamicPagination() {
        const totalProducts = this.products.length;
        this.totalPages = Math.ceil(totalProducts / this.productsPerPage);

        // Очищаем существующие элементы пагинации
        this.paginationItemsContainer.innerHTML = "";

        // Создаем ссылки для каждой страницы и добавляем их в список пагинации
        for (let i = 1; i <= this.totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.classList.add("page-item");
            const pageLink = document.createElement("a");
            pageLink.classList.add("page-link");
            pageLink.textContent = i.toString();
            pageLink.href = "#";
            pageLink.addEventListener("click", () => this.goToPage(i));
            pageItem.appendChild(pageLink);
            this.paginationItemsContainer.appendChild(pageItem);
        }

        // Обновляем ссылки на элементы пагинации
        this.paginationItems = document.querySelectorAll(".page-item");

        // Обновляем элементы пагинации
        this.updatePagination();
    }

}

const productPage = new ProductPage();
document.addEventListener("DOMContentLoaded", () => {
    productPage.loadProducts()
    productPage.attachEventListeners()
})