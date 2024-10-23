// Variables to store order information
let order = [];
let totalprice = 0;

// Function to update the order summary on the page
function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const totalpriceContainer = document.getElementById('total-price');
    orderItemsContainer.innerHTML = '';

    if ( order.length === 0 ) {
        orderItemsContainer.innerHTML = '<p>Tu pedido está actualmente vacío.</p>';
        totalpriceContainer.textContent = '0.00';
        return;
    }

    order.forEach(( item, index ) => {

        const orderItem = document.createElement('div');
        orderItem.classList.add('mb-2', 'd-flex', 'justify-content-between', 'align-items-center');
        orderItem.innerHTML = `
            <span>${item.name} (${item.quantity}) : ₡${(item.price * item.quantity).toFixed(2)}</span>
            <div>
                <button class="btn btn-sm btn-danger" onclick="removeItem(${index}, '${item.name}')">X</button>
            </div>
        `;
        orderItemsContainer.appendChild( orderItem );
        totalpriceContainer.textContent = totalprice.toString();
        removeEmptyOrder( index, item );
    });
}

// remove empty food
const removeEmptyOrder = (index, item) => {
    if(item.quantity == 0){
        removeItem(index, item.name);
    }
}


// Function to add items to the order
function addToOrder( name, price, quantity ) {
    quantity = 1;
    const existingItemIndex = order.findIndex( item => item.name === name );
    let inputCant = event.target.closest( '.food-item' ).querySelector( 'input[type="number"]' );       
    if ( existingItemIndex !== -1 ) {
        // If the item already exists, update the quantity
        order[existingItemIndex].quantity += 1;
        inputCant.value = parseInt( inputCant.value ) + 1;
    } else {
        // If the item does not exist, add it to the order
        order.push( { name, price, quantity } );
        inputCant.value = parseInt( inputCant.value ) + 1;
    }
    // Update total price
    totalprice += price;

    // Update order summary
    updateOrderSummary();
}


// Function to add items to the order
function removeToOrder( name, price, quantity ) {
    const existingItemIndex = order.findIndex( item => item.name === name );
    let inputCant = event.target.closest( '.food-item').querySelector('input[type="number"]' );
    if( parseInt( inputCant.value ) > 0 ){
        if ( existingItemIndex !== -1 ) {
            // If the item already exists, update the quantity
            order[existingItemIndex].quantity -= 1;
            inputCant.value = parseInt( inputCant.value ) - 1;
        } else {
            // If the item does not exist, add it to the order
            order.push( { name, price, quantity } );
            inputCant.value = parseInt( inputCant.value ) - 1;
        }
        // Update total price
        totalprice -= price;

        // Update order summary
        updateOrderSummary();
    }
}


// Function to remove an item from the order
function removeItem( index, name ) {
    const itemToRemove = order[index];
    totalprice -= itemToRemove.price * itemToRemove.quantity;
    order.splice( index, 1 );

    // For update CANT input value when I delete from Order
    resetValueById( name );

    // Update order summary
    updateOrderSummary();
}


// Event listeners for the add to order buttons
document.querySelectorAll('.add-to-order').forEach((button) => {
    button.addEventListener('click', (e) => {
        const foodItem = e.target.closest( '.food-item' );
        const name = foodItem.querySelector( 'h3' ).textContent;
        const price = parseFloat( foodItem.querySelector( 'p:nth-of-type(2)' ).textContent.replace( 'precio: ₡', '' ) );
        const quantity = parseInt( foodItem.querySelector( 'input[type="number"]' ).value );
        addToOrder( name, price, quantity );
    });
});


// Event listeners for the remove to order buttons
document.querySelectorAll('.remove-to-order').forEach((button) => {
    button.addEventListener('click', (e) => {
        const foodItem = e.target.closest( '.food-item' );
        const name = foodItem.querySelector( 'h3' ).textContent;
        const price = parseFloat( foodItem.querySelector( 'p:nth-of-type(2)' ).textContent.replace( 'precio: ₡', '' ) );
        const quantity = parseInt( foodItem.querySelector( 'input[type="number"]' ).value );
        removeToOrder( name, price, quantity );
    });
});


// inspect the order
document.querySelectorAll('.inspect-order').forEach( ( button ) => {
    button.addEventListener('click', (e) => {
        displayOrder();
    });
});


// Event listener for placing the order
document.getElementById('place-order').addEventListener('click', () => {
    user = orderUser();
    r = checkData ( order, user )
    if ( r != null ) {
        alert( r );
    } else {
        whatsApp();
        alert( 'Pedido realizado con éxito!' );
        cleanOrder();
    }
});


const checkData = ( checkOrder, checkUser ) => {
    if ( checkOrder.length === 0 || checkOrder.length == null ){
        return 'Su pedido está vacío. Por favor, añada algunas comidas...'
    }
    if ( checkUser.length === 0 || checkUser.length == null ){
        return 'Agrega un nombre para el pedido...'
    }
    return null
}

const whatsApp = () => {
    const phoneNumber = "50684006669";
    const formattedList = orderText(order);
    const waLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(formattedList)}`;
    window.open( waLink );
};


// watch the order
document.getElementById('watch-order').addEventListener('click', () => {
    h = '-=( PEDIDO )=-\n';
    h += 'a nombre de: ' + orderUser() + '\n';
    for ( let i = 0; i < order.length; i++ ){
        h += `${order[i].name} \n`;
        h += `Unidades: ${order[i].quantity} \n`;
        h += `Precio: ${order[i].price * order[i].quantity} \n`;
        h += '***************************** \n';
    }

    alert(h);
});


const orderUser = () => {
    return document.getElementById( 'orderUser' ).value
}


const orderText = () => {
    h = 'El pedido se realizó desde la web: \n';
    h += 'a nombre de: ' + orderUser() + '\n';
    for ( let i = 0; i < order.length; i++ ){
        h += `(${order[i].quantity}) `;
        h += `${order[i].name}, \n`;
    }
    return h;
}


// Event listener for clean the order
document.getElementById('remove-order').addEventListener('click', () => {
    cleanOrder();
});


const cleanOrder = () => {
    order = [];
    totalprice = 0;
    cleanInputs();
    updateOrderSummary();
}

const cleanInputs = () => {
    let inputs = document.querySelectorAll('.food-item input[type="number"]');
    inputs.forEach(function(input) {
        input.value = 0
    });
}


const formatString = ( str ) => {
    let string = '';
    string = str.toLowerCase();
    string = removeSymbols( string );
    
    return string;
}

const removeSymbols = ( word ) => {
    let letter = word
    for(i = 0; i < 9; i++){
        letter = letter.replace('á', 'a');
        letter = letter.replace('é', 'e');
        letter = letter.replace('í', 'i');
        letter = letter.replace('ó', 'o');
        letter = letter.replace('ú', 'u');
        letter = letter.replace('ñ', 'ni');
        letter = letter.replace(' ', '-');
    }
    console.log( `eliminaste: ${letter}` );
    return letter
}

const resetValueById = ( id ) => {
    let filteredId = formatString( id );
    let inputElement = document.getElementById( filteredId );
    inputElement.value = 0;
}

