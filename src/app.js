'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const axios = require('axios');
const request = require('request');
const requestPromise = require('request-promise-native');
const config = {
    logging: true,
    userDataCol: 'userData'
};
const app = new App(config);

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    'LAUNCH': function() {
        this.toIntent('AskMyName');
    },
    'AskMyName':function() {
        this.ask('Hello World! What\'s your project name?');
    },
'MyProjectName':function() {
        let ParentState=this
        const projectName =  getProjectName(this.$inputs.name.value);
        console.log(projectName);
        this.tell(projectName);
    },
});
 function getProjectName(projectid) {
   const options = {
        uri: 'https://793ff8ef.ngrok.io/getProjectNameByProjectId/'+projectid,
        json: true
    };
    const data = requestPromise(options);
    const projectName = data.projectName;

    return projectName
   {/* console.log("My Project Id"+projectid)
    return "My TEST";*/}
}
module.exports.app = app;
