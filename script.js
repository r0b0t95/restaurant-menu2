const phoneNumber = "50671260048";

const getProductInfo = ( id, foodType ) => {
    let container;
    let productType;

    switch( foodType ){
        case 'a':
            container = hamburgerContainer;
            productType = 'hamburger';
            break;
        case 'b':
            container = burritoContainer;
            productType = 'burrito';
            break;
        case 'c':
            container = tacoContainer;
            productType = 'taco';
            break;
        case 'd':
            container = friesContainer;
            productType = 'fries';
            break;
    };

    if ( container ){
        const food = container.children[id];
        if ( food ){
            const name = food.querySelector('h3').textContent;
            const price = food.querySelectorAll('p')[1].textContent;
            return { name, price };
        }
    }

    return null;
};

const orderItems = document.getElementById('order-items');
let totalPrice = document.getElementById('total-price');
const updateOrderDisplay = () => {
    
    if ( order.length === 0 ) {
        orderItems.innerHTML = 'La orden esta vacia';
        totalPrice.textContent = 0;
    } else {
        orderItems.innerHTML = '';
    }

    let totalBill = 0;

    order.forEach( (item, index) => {
        item.price = item.price.replace('₡', '');
        totalBill += parseInt(item.price) * parseInt(item.quantity);
        orderItems.innerHTML += `
            <div class="order-item">
                ${item.name} x ${item.quantity} = ₡${parseInt(item.price) * parseInt(item.quantity)}
                <button class="trash-can" onclick="removeOrderItem(${index}, '${item.id}')">🗑️</button>
            </div>
        `;
    });

    totalPrice.textContent = totalBill;
};

function removeOrderItem(orderItemId, itemIds) {
    // remove item from order
    order.splice(orderItemId, 1);

    const quantityInput = document.getElementById(itemIds);
    quantityInput.value = 0;

    updateOrderDisplay();
};

const removeOrder = document.getElementById('remove-order');
removeOrder.addEventListener('click', () => {
    resetAllInputs();

    updateOrderDisplay();
});

// whatsapp order
const placeOrder = document.getElementById('place-order');
placeOrder.addEventListener('click', () => {
    const user = document.getElementById( 'orderUser' ).value;
    if (order.length === 0) {
        showNameNotification(2);
    } else if (!user) {
        showNameNotification(1);
        document.getElementById('orderUser').classList.add('input-required');
        document.getElementById('orderUser').focus();
    } else {
        // Este bloque solo se ejecuta si order.length !== 0 Y user tiene valor
        const formattedList = orderText(user);
        const waLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(formattedList)}`;
        window.open(waLink);
    }
});

function showNameNotification(num) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    if ( num === 1 ) {
        notification.className = 'name-notification';
        notification.innerHTML = 'Por favor, ingrese su nombre para realizar el pedido';
    } 
    if ( num === 2 ) {
        notification.className = 'name-notification';
        notification.innerHTML = 'Por favor, añada productos a la orden.';
    }
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Eliminar la clase de validación cuando el usuario comienza a escribir
document.getElementById('orderUser').addEventListener('input', function() {
    this.classList.remove('input-required');
});

// sort the whatsapp order
const orderText = (user) => {
    h = 'a nombre de {' + user + '}\n : ';
    for ( let i = 0; i < order.length; i++ ){
        h += `(${order[i].quantity}) `;
        h += `${order[i].name}, \n`;
    }
    h += `Total: ₡ ${totalPrice.textContent}`;
    return h;
}

// help button
document.querySelector('.button-menu .menu-icon').addEventListener('click', function() {
    const navMenu = document.querySelector('.button-menu .nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});
  
// Cerrar al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.button-menu')) {
      document.querySelector('.button-menu .nav-menu').style.display = 'none';
    }
});

// main
document.addEventListener('DOMContentLoaded', () => {
    orderItems.innerHTML = 'La orden esta vacia';
});