$(document).ready(function() {
    let saldoActual = localStorage.getItem('saldoCastle') 
        ? parseFloat(localStorage.getItem('saldoCastle')) 
        : 1250000;
    
    let transacciones = JSON.parse(localStorage.getItem('transaccionesCastle')) || [];

    function actualizarSaldo(nuevoMonto) {
        localStorage.setItem('saldoCastle', nuevoMonto);
        saldoActual = nuevoMonto;
        if ($('#saldoDisplay').length > 0) {
            $('#saldoDisplay').text('$' + saldoActual.toLocaleString('es-CL'));
        }
    }

    function registrarTransaccion(tipo, monto) {
        const nuevaTransa = {
            desc: tipo,
            fecha: new Date().toLocaleDateString('es-CL'),
            monto: monto,
            tipo: monto > 0 ? 'deposito' : 'transferencia'
        };
        transacciones.unshift(nuevaTransa);
        localStorage.setItem('transaccionesCastle', JSON.stringify(transacciones));
    }

    function cargarTabla() {
        const tablaBody = $('table tbody');
        if (tablaBody.length > 0) {
            tablaBody.empty();
            transacciones.forEach(t => {
                const claseMonto = t.monto > 0 ? 'text-success' : 'text-danger';
                const signo = t.monto > 0 ? '+' : '';
                tablaBody.append(`
                    <tr>
                        <td class="ps-4 fw-bold">${t.desc}</td>
                        <td>${t.fecha}</td>
                        <td class="text-end pe-4 ${claseMonto} fw-bold">
                            ${signo}$ ${Math.abs(t.monto).toLocaleString('es-CL')}
                        </td>
                    </tr>
                `);
            });
        }
    }

    if ($('#saldoDisplay').length > 0) {
        $('#saldoDisplay').text('$' + saldoActual.toLocaleString('es-CL'));
    }
    
    cargarTabla();

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
            registrarTransaccion("Depósito de Fondos", monto);
            alert("¡Ingreso exitoso!");
            window.location.href = 'menu.html'; 
        } else {
            alert("Ingrese un monto válido.");
        }
    });

    $('#transferForm').on('submit', function(e) {
        e.preventDefault();
        const montoEnviado = parseFloat($('#sendAmount').val());
        const contacto = $('#contact option:selected').text();
        if (montoEnviado > 0 && montoEnviado <= saldoActual) {
            actualizarSaldo(saldoActual - montoEnviado);
            registrarTransaccion("Envío a " + contacto, -montoEnviado);
            alert("Transferencia exitosa.");
            window.location.href = 'menu.html';
        } else {
            alert("Monto inválido o fondos insuficientes.");
        }
    });
    $(document).ready(function() {
    let saldoActual = localStorage.getItem('saldoCastle') 
        ? parseFloat(localStorage.getItem('saldoCastle')) 
        : 1250000;
    
    let transacciones = JSON.parse(localStorage.getItem('transaccionesCastle')) || [];

    let contactos = JSON.parse(localStorage.getItem('contactosCastle')) || [
        { nombre: "Arturo Pendragón", cuenta: "998877" },
        { nombre: "Ginebra de Camelot", cuenta: "554433" },
        { nombre: "Merlín el Sabio", cuenta: "112233" }
    ];

    function actualizarSaldo(nuevoMonto) {
        localStorage.setItem('saldoCastle', nuevoMonto);
        saldoActual = nuevoMonto;
        if ($('#saldoDisplay').length > 0) {
            $('#saldoDisplay').text('$' + saldoActual.toLocaleString('es-CL'));
        }
        if ($('#saldoDisponibleText').length > 0) {
            $('#saldoDisponibleText').text('$' + saldoActual.toLocaleString('es-CL'));
        }
    }

    function registrarTransaccion(tipo, monto) {
        const nuevaTransa = {
            desc: tipo,
            fecha: new Date().toLocaleDateString('es-CL'),
            monto: monto
        };
        transacciones.unshift(nuevaTransa);
        localStorage.setItem('transaccionesCastle', JSON.stringify(transacciones));
    }

    function cargarTabla() {
        const tablaBody = $('table tbody');
        if (tablaBody.length > 0) {
            tablaBody.empty();
            transacciones.forEach(t => {
                const claseMonto = t.monto > 0 ? 'text-success' : 'text-danger';
                const signo = t.monto > 0 ? '+' : '';
                tablaBody.append(`
                    <tr>
                        <td class="ps-4 fw-bold">${t.desc}</td>
                        <td>${t.fecha}</td>
                        <td class="text-end pe-4 ${claseMonto} fw-bold">
                            ${signo}$ ${Math.abs(t.monto).toLocaleString('es-CL')}
                        </td>
                    </tr>
                `);
            });
        }
    }

    function cargarContactos() {
        const selectContacto = $('#contact');
        if (selectContacto.length > 0) {
            selectContacto.empty().append('<option value="" selected disabled>Seleccione un contacto del reino</option>');
            contactos.forEach((c) => {
                selectContacto.append(`<option value="${c.cuenta}">${c.nombre} (Cuenta: ${c.cuenta})</option>`);
            });
        }
    }

    actualizarSaldo(saldoActual);
    cargarTabla();
    cargarContactos();

    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); 
        window.location.href = "menu.html";
    });

    $('#depositForm').on('submit', function(e) {
        e.preventDefault(); 
        const monto = parseFloat($('#amount').val());
        if (monto > 0) {
            actualizarSaldo(saldoActual + monto);
            registrarTransaccion("Depósito de Fondos", monto);
            alert("¡Ingreso exitoso!");
            window.location.href = 'menu.html'; 
        }
    });

    $('#transferForm').on('submit', function(e) {
        e.preventDefault();
        const montoEnviado = parseFloat($('#sendAmount').val());
        const contacto = $('#contact option:selected').text();
        if (montoEnviado > 0 && montoEnviado <= saldoActual) {
            actualizarSaldo(saldoActual - montoEnviado);
            registrarTransaccion("Envío a " + contacto, -montoEnviado);
            alert("Transferencia exitosa.");
            window.location.href = 'menu.html';
        } else {
            alert("Monto inválido o fondos insuficientes.");
        }
    });

    $('#addContactForm').on('submit', function(e) {
        e.preventDefault();
        const nombre = $('#contactName').val();
        const cuenta = $('#accountNumber').val();
        
        contactos.push({ nombre: nombre, cuenta: cuenta });
        localStorage.setItem('contactosCastle', JSON.stringify(contactos));
        
        cargarContactos();
        $('#addContactForm')[0].reset();
        
        const modalElement = document.getElementById('modalContacto');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
        alert("Contacto agendado con éxito.");
    });
});
});