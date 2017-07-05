/*https://developer.mozilla.org/en-US/docs/Web/API/WebSocket*/
var client;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function conectar() {
    var subscription = client.subscribe('/topic/bunny', recibirMensaje);
    $('#estado').text("Estado: Conectado :D");
    $('#numero').text(getRndInteger(1, 10));
}

function error() {
    alert('error en la conexión');
}

function recibirMensaje(mensaje) {
    if (mensaje.body) {
        var mensaje_recibido = mensaje.body;
        var texto = document.createTextNode(">> " + mensaje_recibido);
        $('#mensajes').append($('<p></p>').append(texto));
    } else {
        console.log("Error!");
    }
}

function enviarMensaje() {
    let patron = '/day_range='
    let texto = $('#texto').val();

    if (texto.indexOf(patron) >= 0) {

    } else {
        console.log("Error en el comando");
    }


    /*
    var texto = 'Usuario-'+$('#numero').text()+': '+$('#texto').val();
    client.send('/topic/bunny', {}, texto);
    $('#texto').val('');
    */
}

function desconectado() {
    $('#estado').text("Conexión terminada");
}

function crearWebSocket() {
    if ("WebSocket" in window) {
        // Let us open a web socket
        var ws = new WebSocket('ws://127.0.0.1:15674/ws');
        client = Stomp.over(ws);
        client.connect('guest', 'guest', conectar, error, '/');
    } else {
        alert("Su navegador NO soporta WebSocket!");
    }
}

$(window).load(function() {
    crearWebSocket();
    /*$('#conectar').click(function() {
        
    })*/
    $('#enviar').click(function() {
        enviarMensaje();
    })

});
