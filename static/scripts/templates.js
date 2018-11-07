let templates = {
    getForm: function(form) {
        return `<div class="p-2">
                    <form id="form" method="POST" action="${form.action}">
                        <span class="text-center"><h3>${form.submitButtonContent}</h3></span>
                            <input class="form-control" name="username" placeholder="Enter Playername..." required />
                            <br />
                            <input class="form-control" type="password" name="password" placeholder="Enter Password..." required>
                        <div class="text-center mt-2">
                            <button name="${form.submitButtonName}" class="btn btn-primary">${form.submitButtonContent}</button>
                            <button id="back-button" class="btn btn-primary" onclick="dom.insertMainButtons()">Back</button>
                        </div>
                    </form>
                </div>`
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
    },
    getGameStart: function () {
        return `<div id="startGame" class="text-center"><h3>To start game press 'Start'.</h3></div>`
    }
};

