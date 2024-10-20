// Variables to store order information
let order = [];
let totalprice = 0;

// Function to update the order summary on the page
function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const totalpriceContainer = document.getElementById('total-price');
    orderItemsContainer.innerHTML = '';

    if (order.length === 0 || order.length === null) {
        orderItemsContainer.innerHTML = '<p>Your order is currently empty.</p>';
        totalpriceContainer.textContent = '0.00';
        return;
    }

    order.forEach((item, index) => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('mb-2', 'd-flex', 'justify-content-between', 'align-items-center');
        orderItem.innerHTML = `
            <span>${item.name} (${item.quantity}) : $${(item.price * item.quantity).toFixed(2)}</span>
            <div>
                <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
                <!-- <button class="btn btn-sm btn-warning" onclick="decreaseQuantity(${index})">-</button> -->
            </div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    totalpriceContainer.textContent = totalprice.toFixed(2);
}


// Function to add items to the order
function addToOrder(name, price, quantity=1) {
        const existingItemIndex = order.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
            // If the item already exists, update the quantity
            order[existingItemIndex].quantity += quantity;
        } else {
            // If the item does not exist, add it to the order
            order.push({ name, price, quantity });
        }
    
        // Update total price
        totalprice += price * quantity;

        // Update order summary
        updateOrderSummary();
}

// Function to add items to the order
function removeToOrder(name, price, quantity=1) {
        const existingItemIndex = order.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
            // If the item already exists, update the quantity
            order[existingItemIndex].quantity -= quantity;
        } else {
            // If the item does not exist, add it to the order
            order.push({ name, price, quantity });
        }
    
        // Update total price
        totalprice -= price * quantity;

        // Update order summary
        updateOrderSummary();
}

// Function to remove an item from the order
function removeItem(index) {
    const itemToRemove = order[index];
    totalprice -= itemToRemove.price * itemToRemove.quantity;
    order.splice(index, 1);

    // Update order summary
    updateOrderSummary();
}

// Decrease the quantity or a item
function decreaseQuantity(index) {
    if (order[index].quantity > 1) {
        order[index].quantity -= 1;
        totalprice -= order[index].price;
    } else {
        // If quantity is 1, remove the item
        removeItem(index);
    }

    // Update order summary
    updateOrderSummary();
}

// Event listeners for the add to order buttons
document.querySelectorAll('.add-to-order').forEach((button) => {
    button.addEventListener('click', (e) => {
        const foodItem = e.target.closest('.food-item');
        const name = foodItem.querySelector('h3').textContent;
        const price = parseFloat(foodItem.querySelector('p:nth-of-type(2)').textContent.replace('price: $', ''));
        const quantity = parseInt(foodItem.querySelector('input[type="number"]').value);
        addToOrder(name, price, quantity);
    });
});

// Event listeners for the remove to order buttons
document.querySelectorAll('.remove-to-order').forEach((button) => {
    button.addEventListener('click', (e) => {
        const foodItem = e.target.closest('.food-item');
        const name = foodItem.querySelector('h3').textContent;
        const price = parseFloat(foodItem.querySelector('p:nth-of-type(2)').textContent.replace('price: $', ''));
        const quantity = parseInt(foodItem.querySelector('input[type="number"]').value);
        removeToOrder(name, price, quantity);
    });
});

// inspect the order
document.querySelectorAll('.inspect-order').forEach((button) => {
    button.addEventListener('click', (e) => {
        displayOrder();
    });
});

// Event listener for placing the order
document.getElementById('place-order').addEventListener('click', () => {
    if (order.length === 0 || order.length === null) {
        alert('Su pedido está vacío. Por favor, añada algunas comidas..');
    } else {
        console.log('hola desde realizar pedido')
        whatsApp();
        alert('Pedido realizado con éxito!');
        cleanOrder();
    }
});

const whatsApp = () => {
    const phoneNumber = "50684006669";
    const baseText = "El pedido se realizó desde la web: ";
    const formattedList = formatList(list);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(baseText + formattedList)}`;
    window.open(whatsappLink);
};

const formatList = (formatOrder) => {
    return formatOrder.join(", ");
};

const displayOrder = () => {
    alert(order);
}

// watch the order
document.getElementById('watch-order').addEventListener('click', () => {
    h = '-=( PEDIDO )=-\n';
    for (let i = 0; i < order.length; i++){
        h += `${order[i].name} \n`;
        h += `Unidades: ${order[i].quantity} \n`;
        h += `Precio: ${order[i].price * order[i].quantity} \n`;
        h += '***************************** \n';
    }
    alert(h);
});

// Event listener for clean the order
document.getElementById('remove-order').addEventListener('click', () => {
    cleanOrder();
});

const cleanOrder = () => {
    order = [];
    totalprice = 0;
    updateOrderSummary();
}