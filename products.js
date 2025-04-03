const sheetId = '17VdUvh-C5axGynR2-1xcazWkgg6M6nBHl7YDTqhjs9A';
const sheetRange = 'A2:C100';

const sheetHamburgerName = 'hamburger'; 
const sheetBurritoName = 'burrito';
const sheetTacoName = 'taco';
const sheetFriesName = 'fries';

const getHamburgerSheet = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetHamburgerName + '&range=' + sheetRange);
const getBurritoSheet = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetBurritoName + '&range=' + sheetRange);
const getTacoSheet = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetTacoName + '&range=' + sheetRange);
const getFriesSheet = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetFriesName + '&range=' + sheetRange);

const hamburgerContainer = document.getElementById('hamburger-container');
const burritoContainer = document.getElementById('burrito-container');
const tacoContainer = document.getElementById('taco-container');
const friesContainer = document.getElementById('fries-container');

let hamburgerId = 0;
let burritoId = 0;
let tacoId = 0;
let friesId = 0;


let order = [];


function fetchHamburgers(){
    fetch( getHamburgerSheet )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok: ' + response.statusText );
            }
            return response.text(); 
        })
        .then( data => {
            try {
                const jsonString = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
                const jsonData = JSON.parse( jsonString );

                if ( !jsonData.table || !jsonData.table.rows ) {
                    console.error('Invalid data format received from Google Sheet');
                    return;
                };

                hamburgerContainer.innerHTML = '';

                jsonData.table.rows.forEach(row => {
                    buildHamburger( row );
                });
           
            } catch (error) {
                console.error( 'Error parsing JSON:', error );
                //if ( productCasesContainer ) productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            }
        })
        .catch( error => {
            console.error( 'Error parsing JSON:', error );
            //if ( productCasesContainer ) {
            //    productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            //}
        })
        .finally(() => {
            //if ( loadingCasesIndicator ) loadingCasesIndicator.style.display = 'none';
        })
};

function fetchBurritos(){
    fetch( getBurritoSheet )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok: ' + response.statusText );
            }
            return response.text(); 
        })
        .then( data => {
            try {
                const jsonString = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
                const jsonData = JSON.parse( jsonString );

                if ( !jsonData.table || !jsonData.table.rows ) {
                    console.error('Invalid data format received from Google Sheet');
                    return;
                };

                burritoContainer.innerHTML = '';

                jsonData.table.rows.forEach(row => {
                    buildBurrito( row );
                });
           
            } catch (error) {
                console.error( 'Error parsing JSON:', error );
                //if ( productCasesContainer ) productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            }
        })
        .catch( error => {
            console.error( 'Error parsing JSON:', error );
            //if ( productCasesContainer ) {
            //    productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            //}
        })
        .finally(() => {
            //if ( loadingCasesIndicator ) loadingCasesIndicator.style.display = 'none';
        })
};

function fetchTacos(){
    fetch( getTacoSheet )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok: ' + response.statusText );
            }
            return response.text(); 
        })
        .then( data => {
            try {
                const jsonString = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
                const jsonData = JSON.parse( jsonString );

                if ( !jsonData.table || !jsonData.table.rows ) {
                    console.error('Invalid data format received from Google Sheet');
                    return;
                };

                tacoContainer.innerHTML = '';

                jsonData.table.rows.forEach(row => {
                    buildTaco( row );
                });
           
            } catch (error) {
                console.error( 'Error parsing JSON:', error );
                //if ( productCasesContainer ) productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            }
        })
        .catch( error => {
            console.error( 'Error parsing JSON:', error );
            //if ( productCasesContainer ) {
            //    productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            //}
        })
        .finally(() => {
            //if ( loadingCasesIndicator ) loadingCasesIndicator.style.display = 'none';
        })
};

function fetchFries(){
    fetch( getFriesSheet )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok: ' + response.statusText );
            }
            return response.text(); 
        })
        .then( data => {
            try {
                const jsonString = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
                const jsonData = JSON.parse( jsonString );

                if ( !jsonData.table || !jsonData.table.rows ) {
                    console.error('Invalid data format received from Google Sheet');
                    return;
                };

                friesContainer.innerHTML = '';

                jsonData.table.rows.forEach(row => {
                    buildFries( row );
                });
           
            } catch (error) {
                console.error( 'Error parsing JSON:', error );
                //if ( productCasesContainer ) productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            }
        })
        .catch( error => {
            console.error( 'Error parsing JSON:', error );
            //if ( productCasesContainer ) {
            //    productCasesContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
            //}
        })
        .finally(() => {
            //if ( loadingCasesIndicator ) loadingCasesIndicator.style.display = 'none';
        })
};

// hamburger
const buildHamburger = ( row ) => {
    const name = (row.c[0]?.v) || '';
    const desc = (row.c[1]?.v) || '';
    const price = (row.c[2]?.v) || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${desc}</p>
        <p class="card-price">${price}</p>
        <label class="card-label" for="${`a${hamburgerId}`}">Cant:</label>
        <input type="number" id="${`a${hamburgerId}`}" class="card-input" value="0" min="0" readonly>
        <div class="card-buttons">
            <button class="add-to-order" onclick="sum(${hamburgerId}, 'a')">
                <i class="fas fa-plus"></i>
            </button>
            <button class="remove-to-order" onclick="minus(${hamburgerId}, 'a')">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;

    hamburgerContainer.appendChild(card);
    hamburgerId += 1;
};

// burrito
const buildBurrito = ( row ) => {
    const name = (row.c[0]?.v) || '';
    const desc = (row.c[1]?.v) || '';
    const price = (row.c[2]?.v) || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${desc}</p>
        <p class="card-price">${price}</p>
        <label class="card-label" for="${`b${burritoId}`}">Cant:</label>
        <input type="number" id="${`b${burritoId}`}" class="card-input" value="0" min="0" readonly>
        <div class="card-buttons">
            <button class="add-to-order" onclick="sum(${burritoId}, 'b')">
                <i class="fas fa-plus"></i>
            </button>
            <button class="remove-to-order" onclick="minus(${burritoId}, 'b')">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;

    burritoContainer.appendChild(card);
    burritoId += 1;
};

// taco
const buildTaco = ( row ) => {
    const name = (row.c[0]?.v) || '';
    const desc = (row.c[1]?.v) || '';
    const price = (row.c[2]?.v) || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${desc}</p>
        <p class="card-price">${price}</p>
        <label class="card-label" for="${`c${tacoId}`}">Cant:</label>
        <input type="number" id="${`c${tacoId}`}" class="card-input" value="0" min="0" readonly>
        <div class="card-buttons">
            <button class="add-to-order" onclick="sum(${tacoId}, 'c')">
                <i class="fas fa-plus"></i>
            </button>
            <button class="remove-to-order" onclick="minus(${tacoId}, 'c')">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;

    tacoContainer.appendChild(card);
    tacoId += 1;
};

// fries
const buildFries = ( row ) => {
    const name = (row.c[0]?.v) || '';
    const desc = (row.c[1]?.v) || '';
    const price = (row.c[2]?.v) || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${desc}</p>
        <p class="card-price">${price}</p>
        <label class="card-label" for="${`d${friesId}`}">Cant:</label>
        <input type="number" id="${`d${friesId}`}" class="card-input" value="0" min="0" readonly>
        <div class="card-buttons">
            <button class="add-to-order" onclick="sum(${friesId}, 'd')">
                <i class="fas fa-plus"></i>
            </button>
            <button class="remove-to-order" onclick="minus(${friesId}, 'd')">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;

    friesContainer.appendChild(card);
    friesId += 1;
};

const sum = ( id, food ) => {
    const foodId = `${food}${id}` + '';
    const foodItem = document.getElementById( foodId );
    foodItem.value = parseInt( foodItem.value ) + 1; 

    const productInfo = getProductInfo( id, food );
    if ( productInfo ){

        const existItemIndex = order.findIndex( item => item.id === foodId );

        if ( existItemIndex !== -1 ){
            order[existItemIndex].quantity += 1;
        } else {
            order.push({
                name: productInfo.name,
                price: productInfo.price,
                quantity: 1,
                id: foodId,
                testfood: food,
                testid: id,
            });
        }
        
        updateOrderDisplay();

    }
};

const minus = ( id, food ) => {
    const foodId = `${food}${id}`;
    const foodItem = document.getElementById( foodId + '' );

    if (foodItem.value > 0) {
        foodItem.value = parseInt( foodItem.value ) - 1;
        
        const existItemIndex = order.findIndex( item => item.id === foodId );

        if ( existItemIndex !== -1 ){
            order[existItemIndex].quantity -= 1;

            if ( order[existItemIndex].quantity <= 0 ){
                order.splice( existItemIndex, 1 );
            }

            updateOrderDisplay();

        }
    }
};

const resetAllInputs = () => {

    // Reset hamburger inputs
    for (let i = 0; i < hamburgerId; i++) {
        document.getElementById(`a${i}`).value = 0;
    };
  
    // Reset burrito inputs
    for (let i = 0; i < burritoId; i++) {
        document.getElementById(`b${i}`).value = 0;
    };
  
    // Reset taco inputs
    for (let i = 0; i < tacoId; i++) {
        document.getElementById(`c${i}`).value = 0;
    };
  
    // Reset fries inputs
    for (let i = 0; i < friesId; i++) {
        document.getElementById(`d${i}`).value = 0;
    };

    // Reset order
    order = [];
};

fetchHamburgers();
fetchBurritos();
fetchTacos();
fetchFries();


