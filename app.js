// Datos iniciales de ejemplo
let movimientos = [
    { id: 1, descripcion: 'Salario Mensual', monto: 2500000, tipo: 'ingreso' },
    { id: 2, descripcion: 'Mercado Supermercado', monto: 350000, tipo: 'gasto' }
];

const form = document.getElementById('form-movimiento');
const lista = document.getElementById('lista-movimientos');
const saldoTotalEl = document.getElementById('saldo-total');
const totalIngresosEl = document.getElementById('total-ingresos');
const totalGastosEl = document.getElementById('total-gastos');

// Función principal para renderizar pantalla
function actualizarInterfaz() {
    lista.innerHTML = '';
    let ingresos = 0;
    let gastos = 0;

    movimientos.forEach((mov) => {
        if (mov.tipo === 'ingreso') {
            ingresos += mov.monto;
        } else {
            gastos += mov.monto;
        }

        const li = document.createElement('li');
        li.className = `item-movimiento ${mov.tipo === 'ingreso' ? 'item-ingreso' : 'item-gasto'}`;
        li.innerHTML = `
            <span>${mov.descripcion}</span>
            <div>
                <strong>${mov.tipo === 'ingreso' ? '+' : '-'}$${mov.monto.toLocaleString()}</strong>
                <button class="btn-eliminar" onclick="eliminarMovimiento(${mov.id})">X</button>
            </div>
        `;
        lista.appendChild(li);
    });

    const saldo = ingresos - gastos;
    saldoTotalEl.textContent = `$${saldo.toLocaleString()}`;
    totalIngresosEl.textContent = `$${ingresos.toLocaleString()}`;
    totalGastosEl.textContent = `$${gastos.toLocaleString()}`;
}

// Agregar nuevo movimiento
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const tipo = document.getElementById('tipo').value;

    const nuevoMovimiento = {
        id: Date.now(),
        descripcion,
        monto,
        tipo
    };

    movimientos.push(nuevoMovimiento);
    form.reset();
    actualizarInterfaz();


});

// Eliminar movimiento
function eliminarMovimiento(id) {
    movimientos = movimientos.filter(mov => mov.id !== id);
    actualizarInterfaz();
}

//mejora rwalixada por aleja
document.getElementById('btn-limpiar').addEventListener('click', () => {
    movimientos = [];
    actualizarInterfaz();
});

// Cargar datos al iniciar
actualizarInterfaz()
saldoTotalEl.style.color = saldo < 0? '#e74c3c' : '#ffffff';