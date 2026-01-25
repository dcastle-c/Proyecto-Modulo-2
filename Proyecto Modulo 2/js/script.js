$(document).ready(function() {
    $('#btnLogin').on('click', function(e) {
        const email = $('#email').val();
        const password = $('#password').val();

        if (email === "" || password === "") {
            e.preventDefault(); 
            alert("Por favor, complete todos los campos para ingresar al castillo.");
        } else {
            console.log("Acceso concedido para: " + email);
        }
    });
});