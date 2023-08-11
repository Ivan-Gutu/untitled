let cartItems = [];
let totalPrice = 0;

const cartList = document.getElementById("cartItems");
const totalElement = document.getElementById("totalPrice");

// Функция для добавления товара в корзину
const addToCart = (productName, price) => {
    cartItems.push({ productName, price });
    totalPrice += price;
    updateCart(); // Обновить корзину сразу
    saveCartToLocalStorage();
};

// Функция для удаления товара из корзины
const removeFromCart = productName => {
    const item = cartItems.find(item => item.productName === productName);
    if (item) {
        const price = item.price;
        const index = cartItems.indexOf(item);
        cartItems.splice(index, 1);
        totalPrice -= price;
        updateCart();
        saveCartToLocalStorage();
    }
};

// Функция для обновления отображения корзины
const updateCart = () => {
    cartList.innerHTML = "";

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
            ${item.productName} - $${item.price}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.productName}')">Убрать</button>
        `;
        cartList.appendChild(li);
    });

    updateCartButtonStatus()
    totalElement.textContent = totalPrice;
};

document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".list-group-item");

    categoryItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const ul = this.querySelector("ul");
            this.classList.toggle("open");
        });
    });
});
