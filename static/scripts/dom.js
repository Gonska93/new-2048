let dom = {
        forms: {loginForm: { submitButtonName: 'login',
                      submitButtonContent: 'Login',
                      action: '/login'},
                registerForm: {submitButtonName: 'register',
                        submitButtonContent: 'Register',
                        action: '/register'},
                mainButtons: ''
    },


    insertMainButtons: function () {
        $('#form').remove();
        $('#menu-content').append(this.forms.mainButtons);
    },


    insertForm: function (form_name) {
        let formContent = templates.getForm(this.forms[form_name]);

        let buttons = document.querySelector('.buttons');
            this.forms.mainButtons = buttons.cloneNode(true);
            buttons.remove();

        let menuContent = document.getElementById('menu-content');
            menuContent.innerHTML = formContent;

        let backButton = document.getElementById('back-button');
            backButton.addEventListener("click", function(event) {event.preventDefault()});
    },


    createTitleInput: function () {
        $('#saveBtn').replaceWith(templates.getTitleInput());
        $('#sendData').on('click', gameplay.saveGameState);
    },

    flashResult: function (result) {
        $('.flashes').append(templates.getFlashDiv(result));
        let flashes = $('.message');
        setTimeout(() => flashes.remove(), 2000);
    },

    displaySavedGames: function (states) {
        $('#loadBtn').replaceWith($(templates.getSavesDiv()));

        let savesDivContainer = $('#savesDiv-container');
        $('#savesDiv button').on('click', this.restoreLoadBtn);

        states.forEach((state) => {
            let stateButton = $(templates.getStateButton(state));
            stateButton.on('click', () => {
                gameplay.loadState(state);
                this.restoreLoadBtn();
            });
            savesDivContainer.append(stateButton);
        })
    },

    restoreLoadBtn: function () {
        let loadButton = $(templates.getLoadBtn());
        loadButton.off('click');
        loadButton.on('click', dataHandler.getSavedGames);
        $('#savesDiv').replaceWith(loadButton);
    },

    updateGameOverModal: function() {
        alert(`You ${(gameplay.gameState == 1) ? 'won':'lost'}`);
        gameplay.gameState = 0;
        gameplay.started = false;
        timer.stopTimer();
    }
};

