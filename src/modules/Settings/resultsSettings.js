import {
    MainPage
} from "./mainNew.js";

class ResultsSettings extends MainPage {
    constructor() {
        super()
        this.buttonStartOver.addEventListener('click', this.startOver.bind(this));
    }


    startOver() {
        console.log("startOver test");
        location.reload()

    }
}

export {
    ResultsSettings
};