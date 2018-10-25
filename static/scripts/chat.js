let socket = io.connect('http://' + document.domain + ':' + location.port),
    form = $( '#chat-input form' );

form.on( 'submit', ( e ) => {
    e.preventDefault();
    socket.emit( 'message', {
        message : document.getElementById('user-input').value
        } );
    $( '#user-input' ).val( '' ).focus()
});

socket.on( 'connect', () => {
    socket.emit( 'user_connected', { message: ''})
});

socket.on( 'response', ( msg ) => {
    let messageToDisplay = (msg.player_name) ?
        `${msg.player_name}:${msg.message}`: msg.message;
    $('#chat-messages').append(`<div>${ messageToDisplay }</div>`)
});
