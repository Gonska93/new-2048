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
    if (msg.message) {
        let messageToDisplay = (msg.player_name) ?
        `${msg.player_name}:${msg.message}`: msg.message;
        let messageDiv = $('<div class="chat-message"></div>');
        messageDiv.text(`${messageToDisplay}`);
        $('#chat-messages').append(messageDiv);
        let test = document.getElementById('chat-messages');
        test.scrollTop = test.scrollHeight;
    }

});
