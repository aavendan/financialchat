var client;

function conectar() {
    var subscription = client.subscribe('/topic/bunny', recibirMensaje);

}

function error() {
    alert('error en la conexión');
}

function recibirMensaje(mensaje) {
    if (mensaje.body) {
        $('#listofmessages').html(mensaje.body); 
        $("#listofmessages").animate({ scrollTop: $('#listofmessages').prop("scrollHeight")}, 1000);       
    } else {
        console.log("Error!");
    }
}

function enviarMensaje() {
    // AAPL YHOO MSFT
    var patron = '/day_range='
    var instruccion = $('#texto').val();

    if (instruccion.indexOf(patron) >= 0) {

        instruccion = instruccion.replace(patron, "");

        var userid = $('#userid').text();
        var texto = $('#texto').val();
        
        $('#texto').val('/day_range=');

        $.ajax({
            url: '/chat/lowhigh/',
            data: { userid: userid, instruccion: instruccion },
            error: function() {
                alert('¡error al cargar el archivo!')
            },
            success: function(data) {
                client.send('/topic/bunny', {}, data);
            },
            type: 'POST'
        });

    } else {
        console.log("Error en el comando");
    }
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

    $('#enviar').click(function() {
        enviarMensaje();
    })
    $("#listofmessages").animate({ scrollTop: $('#listofmessages').prop("scrollHeight")}, 1000);
    
});
