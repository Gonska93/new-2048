var loginForm = { submitButtonName: 'login',
                  submitButtonContent: 'Login'}

var registerForm = {submitButtonName: 'register',
                    submitButtonContent: 'Register'}


function getForm(form) {
        let formContent = `<form id="form" method="POST">
                                <h3>${form.submitButtonContent}</h3>
                                <label for="username">Player Name</label>
                                <input name="username" placeholder="Enter User Name" required />
                                <br>
                                <label for="password">Password</label>
                                <br>
                                <input type="password" name="password" placeholder="Enter Password" required>
                                <button name="${form.submitButtonName}">${form.submitButtonContent}</button>
                                <button id="back-button" onclick="insertMainButtons()">Back</button>
                                </div>
                            </form>`;
        return formContent;
}

function insertMainButtons() {
    var getLoginForm = document.getElementById('form');
        getLoginForm.remove();

    var menuContent = document.getElementById('menu-content');
        menuContent.appendChild(buttonsClone);
}


function insertForm(form_name) {
    if (form_name == 'login') {
        var formContent = getForm(loginForm);
    }
    else if (form_name == 'register') {
        var formContent = getForm(registerForm)
    }
    else {
        return
    }

    let buttons = document.getElementsByClassName('buttons');
        buttonsClone = buttons[0].cloneNode(true);
        buttons[0].remove();

    let menuContent = document.getElementById('menu-content');
        menuContent.innerHTML = formContent;

    let backButton = document.getElementById('back-button');
        backButton.addEventListener("click", function(event) {event.preventDefault()});
}
