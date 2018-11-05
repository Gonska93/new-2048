let templates = {
    getForm: function(form) {
        return `<form id="form" method="POST" action="${form.action}">
                                <h3>${form.submitButtonContent}</h3>
                                <label for="username">Player Name</label>
                                <input name="username" placeholder="Enter User Name" required />
                                <br>
                                <label for="password">Password</label>
                                <br>
                                <input type="password" name="password" placeholder="Enter Password" required>
                                <button name="${form.submitButtonName}">${form.submitButtonContent}</button>
                                <button id="back-button" onclick="dom.insertMainButtons()">Back</button>
                                </div>
                            </form>`
    },
    getTitleInput: function () {
        return `
        <div id="saveInput">
            <label for="saveTitle">Save title:</label>
            <input type="text" id="saveTitle" />
            <button id="sendData" type="button">Save game</button>
        </div>`
    },
    getSaveButton: function () {
        return `
        <a id="saveBtn" class="btn">Save</a>`
    },
    getFlashDiv: function(result) {
        return `
        <div class="message ${result.status}">
            <h3>${result.message}</h3>
        </div>`
    },
    getSavesDiv: function () {
        return `
        <div id="savesDiv">
            <h3>Saved games:</h3>
            <ul id="savesDiv-container"></ul>
            <button>Back</button>
        </div>`
    },
    getStateButton: function (state) {
        return `
        <li><a id="state-${state.id}">${state.save_title}</a></li>`
    },
    getLoadBtn: function () {
        return `
        <a id="loadBtn" class="btn">Load</a>`
    }
};

