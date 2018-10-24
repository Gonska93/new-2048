let forms = {'loginForm': { submitButtonName: 'login',
                  submitButtonContent: 'Login',
                  action: '/login'},
            'registerForm': {submitButtonName: 'register',
                    submitButtonContent: 'Register',
                    action: '/register'},
            mainButtons: `<div class="buttons">
                            <ul>
                                <li><a onclick="insertForm('loginForm')" class="btn">Login</a></li>
                                <li><a onclick="insertForm('registerForm')" class="btn">Register</a></li>
                            </ul>
                        </div>`
};

function getForm(form) {
        return `<form id="form" method="POST" action="${form.action}">
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
                            </form>`
}

function getTitleInput() {
    return `
    <div id="saveInput">
        <label for="saveTitle">Save title:</label>
        <input type="text" id="saveTitle" />
        <button id="sendData" type="button">Save game</button>
    </div>`
}

function getSaveButton() {
    return `
    <a id="saveBtn" class="btn">Save</a>`
}

function getFlashDiv(result) {
    return `
    <div class="message ${result.status}">
        <h3>${result.message}</h3>
    </div>`
}

function getSavesDiv() {
    return `
    <div id="savesDiv">
    <h3>Saved games:</h3>
    </div>`
}

function getStateButton(state) {
    return `
    <button type="button" id="state-${state.id}">${state.save_title}</button></br>`
}


function insertMainButtons() {
    $('#form').remove();
    $('#menu-content').append(forms.mainButtons);
}


function insertForm(form_name) {
    let formContent = getForm(forms[form_name]);

    let buttons = document.getElementsByClassName('buttons');
        forms.mainButtons = buttons[0].cloneNode(true);
        buttons[0].remove();

    let menuContent = document.getElementById('menu-content');
        menuContent.innerHTML = formContent;

    let backButton = document.getElementById('back-button');
        backButton.addEventListener("click", function(event) {event.preventDefault()});
}

function createTitleInput() {
    $('#saveBtn').replaceWith(getTitleInput());
    $('#sendData').on('click', gameplay.saveGameState);
}

function flashResult(result) {
    $('.flashes').append(getFlashDiv(result));
    let flashes = $('.message');
    setTimeout(() => flashes.remove(), 3000);
}
