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
        let messageDiv = $('<div class="chat-message"></div>'),
            test = document.getElementById('chat-messages'),
            date = new Date(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            messageToDisplay = (msg.player_name) ? `${hour}:${minute} ${msg.player_name}: ${msg.message}`: msg.message;

        messageDiv.text(`${messageToDisplay}`);
        $('#chat-messages').append(messageDiv);
        test.scrollTop = test.scrollHeight;
    }

});
