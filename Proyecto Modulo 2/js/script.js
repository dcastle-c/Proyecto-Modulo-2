$(document).ready(function() {
    let saldoActual = localStorage.getItem('saldoCastle') 
        ? parseFloat(localStorage.getItem('saldoCastle')) 
        : 1250000;
     let transacciones = JSON.parse(localStorage.getItem('transaccionesCastle')) || [];

    function actualizarSaldo(nuevoMonto) {
        localStorage.setItem('saldoCastle', nuevoMonto);
        saldoActual = nuevoMonto;
    }
    function registrarTransaccion(tipo, monto) {
        const nuevaTransa = {
            desc: tipo,
            fecha: new Date().toLocaleDateString('es-CL'),
            monto: monto,
            tipo: monto > 0 ? 'deposito' : 'transferencia'
        };
        transacciones.unshift(nuevaTransa);
        localStorage.setItem('transaccionesCastle', JSON.stringify(transacciones.slice(0, 10)));
    }


    if ($('#saldoDisplay').length > 0) {
        $('#saldoDisplay').text('$' + saldoActual.toLocaleString('es-CL'));
    }

    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); 
        const email = $('#email').val();
        const password = $('#password').val();

        if (email.trim() !== "" && password.trim() !== "") {
            window.location.href = "menu.html";
        } else {
            alert("Por favor, ingresa tus credenciales.");
        }
    });

    $('#depositForm').on('submit', function(e) {
        e.preventDefault(); 
        const monto = parseFloat($('#amount').val());
        
        if (monto > 0) {
            actualizarSaldo(saldoActual + monto);
            alert("¡Ingreso exitoso! Nuevo saldo: $" + saldoActual.toLocaleString('es-CL'));
            window.location.href = 'menu.html'; 
        } else {
            alert("Ingrese un monto válido.");
        }
    });

    $('#transferForm').on('submit', function(e) {
        e.preventDefault();
        const montoEnviado = parseFloat($('#sendAmount').val());
        
        if (montoEnviado > 0 && montoEnviado <= saldoActual) {
            actualizarSaldo(saldoActual - montoEnviado);
            alert("Transferencia exitosa.");
            window.location.href = 'menu.html';
        } else {
            alert("Monto inválido o fondos insuficientes.");
        }
    });
});