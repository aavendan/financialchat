var client;

function saveMessage(message) {
	var userid = $('#userid').text();

	$.ajax({
            url: '/chat/save/',
            data: {message:message,userid:userid},
            error: function() {
            },
            success: function(data) {
            	$('#mensaje').html(data);
            },
            type: 'POST'
        });
}

function conectar() {
    var subscription = client.subscribe('/topic/bunny', recibirMensaje);
    $('#estado').text("Estado: Conectado :D");

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
    // /day_range=APPL
    var patron = '/day_range='
    var instruccion = $('#texto').val();

    if (instruccion.indexOf(patron) >= 0) {

    	instruccion = instruccion.replace(patron,"");

        var texto = $('#texto').val();
        client.send('/topic/bunny', {}, texto);
        $('#texto').val('');

        $.ajax({
            url: '/chat/lowhigh/'+instruccion,
            error: function() {
                alert('¡error al cargar el archivo!')
            },
            dataType: 'xml',
            success: function(data) {
                let dayslow= $(data).find('DaysLow').text();
                let dayshigh =$(data).find('DaysHigh').text();
                let name =$(data).find('Name').text();

                var message = instruccion+" ("+name+") Days Low quote is $"+dayslow+
                " and Days High quote is $"+dayshigh+"."
                
                saveMessage(message);

            },
            type: 'GET'
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

});
