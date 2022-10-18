let date = (new Date()).toLocaleDateString('es');
document.getElementById('date-time').innerHTML = date;

let allContainerCart = document.querySelector('.categorias__cards');
let containerComprarEntrada = document.querySelector('.comprar__entrada')
let comprarEntradas = [];

loadEventListeners();
function loadEventListeners(){
    allContainerCart.addEventListener('click', addProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-sm')) {
        const selectProduct = e.target.parentElement;
        readContent(selectProduct);
        
    }
}

function readContent(product) {
    const infoProduct = {
        image: product.querySelector('src'),
        title: product.querySelector('.card-title').textContent,
        id: product.querySelector('a').getAttribute('data.id'),
    }
    comprarEntradas = [...comprarEntradas, infoProduct]
    openModal(infoProduct.title);
    //console.log(infoProduct);
}

function setPrecio(){
    let precio = 350;

    return precio;
}

function clearHtml() {
    containerComprarEntrada.innerHTML = '';
};


function openModal(title,precio) {
    clearHtml();
    precio = setPrecio();
    
    Swal.fire({
            title: `Vas a comprar entradas para ${title}`,
            html: `
                <form>
                    <label>Elegi la sala</label>
                    <div></div>
                    <select>
                        <option value="2D">2D</option>
                    </select>
                    <div></div>
                    <label>Selecciona la cantidad de entradas</label>
                    <div></div>
                    <input placeholder="1" class="cantidadEntradas" type="number">
                </form>
                
                <div> Precio: </div>
                <p id="price"> ${precio} </p>`,
            confirmButtonText: 'COMPRAR',
            denyButtonText: 'CANCELAR',
            showDenyButton: true,
            width: '80%',
            backdrop: true,
            position: 'center',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
        })
        
        .then((result) => {
    
            if (result.isConfirmed) {
            Swal.fire({
                title: 'Gracias por tu compra',
                icon: 'success',
                showConfirmButton: false,
            })
            } 
            
            else if (result.isDenied) {
            Swal.fire({
                title: 'Te esperamos la proxima',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    });
    

    const cantidadEntradas = document.querySelector('.cantidadEntradas');
    cantidadEntradas.addEventListener('change', updateValue);

};


function updateValue(e) {
    cantidadEntradas = e.target.value;
    //console.log(cantidadEntradas);
    let calculoEntradas = cantidadEntradas * 350;

    document.querySelector('div p').innerHTML = calculoEntradas;
};


function confirmarCompra() {
    Swal.fire({
    title: '¿Estas seguro de la compra?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `CANCELAR`,
    }).then((result) => {
    
        if (result.isConfirmed) {
        Swal.fire({
            title: 'Gracias por tu compra',
            icon: 'success',
            showConfirmButton: false,
        })
        } 
        
        else if (result.isDenied) {
        Swal.fire({
            title: 'Te esperamos la proxima',
            icon: 'error',
            showConfirmButton: false,
        })
    }
});

};
