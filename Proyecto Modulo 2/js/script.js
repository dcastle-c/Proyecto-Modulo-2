$(document).ready(function() {
    let saldoActual = 1250000;

    $('#btnLogin').on('click', function(e) {
        const email = $('#email').val();
        const password = $('#password').val();

        if (email === "" || password === "") {
            e.preventDefault();
            alert("Por favor, complete todos los campos para ingresar al castillo.");
        }
    });

    $('#depositForm').on('submit', function(e) {
        e.preventDefault(); 
        
        const monto = parseFloat($('#amount').val());
        
        if (monto > 0) {
            saldoActual += monto;
            alert("¡Ingreso exitoso! Su nuevo saldo es: $" + saldoActual.toLocaleString('es-CL'));
            window.location.href = 'menu.html'; 
        } else {
            alert("Por favor, ingrese un monto válido.");
        }
    });

    $('#transferForm').on('submit', function(e) {
        e.preventDefault();
        
        const montoEnviado = parseFloat($('#sendAmount').val());
        
        if (montoEnviado > 0 && montoEnviado <= saldoActual) {
            saldoActual -= montoEnviado; /
            alert("Transferencia realizada con éxito.");
            window.location.href = 'menu.html';
        } else if (montoEnviado > saldoActual) {
            alert("Error: Fondos insuficientes en la bóveda.");
        }
    });
});