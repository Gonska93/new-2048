let socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on( 'connect', function() {
    socket.emit( 'user_connected', {
        message: ''
    })
        
        
let form = $( '#chat-input form' ).on( 'submit', 
    function( e ) {
            e.preventDefault()
            socket.emit( 'message', {
                message : document.getElementById('user-input').value
                } )

          $( '#user-input' ).val( '' ).focus()
        } )
      } )

socket.on( 'my response', function( msg ) {
        let messageToDisplay = (msg.player_name) ? `${msg.player_name}:${msg.message}`: msg.message
        $('#chat-messages').append(`<div>${ messageToDisplay }</div>`)
      })