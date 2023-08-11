// Загрузка корзины из localStorage при загрузке страницы
window.addEventListener("load", () => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
        cartItems.push(...savedCart);
        updateCart();
    }
    const savedTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    if (savedTotalPrice !== null) {
        totalPrice = savedTotalPrice;
        updateCart(); // Обновить корзину с сохраненной итоговой суммой
    }
});

function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice)); // Сохранить итоговую сумму
}
const cartItemsElement = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");
const checkoutButton = document.getElementById("checkoutButton");
const clearCartButton = document.getElementById("clearCartButton");

// Функция для отображения товаров в корзине
function updateCartView() {
    cartItemsElement.innerHTML = "";
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.productName} - $${item.price}`;
        cartItemsElement.appendChild(li);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Оформление заказа
checkoutButton.addEventListener("click", () => {
        alert("Заказ оформлен!");
        clearCart();
        updateCart();
});

const updateCartButtonStatus =() => {
    checkoutButton.disabled = cartItems.length === 0;
}
// Очистка корзины
clearCartButton.addEventListener("click", () => {
    clearCart();
    updateCartView();
    updateCart()
});

// Очистка корзины и обновление представления
const clearCart = () => {
    cartItems = [];
    totalPrice = 0;
    updateCartView();
}

// Инициализация представления корзины
updateCartView();
