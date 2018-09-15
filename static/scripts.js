window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function hideRegisterForm() {
    document.getElementById('id01').style.display='none';
}

function showRegisterForm() {
    document.getElementById('id01').style.display='block';
}