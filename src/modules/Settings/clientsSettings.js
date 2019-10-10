import {
    MainPage
} from "./mainNew.js";

const mainpage = new MainPage();

class ClientsSetting extends MainPage {
    constructor() {
        super();
        this.numberOfPeople.innerText = 0;
        this.buttonPlus.addEventListener('click', this.pluseOne.bind(this));
        this.buttonPlus.addEventListener('click', this.addPerson.bind(this));
        this.buttonMinus.addEventListener('click', this.minusOne.bind(this));
        this.buttonMinus.addEventListener('click', this.minusPerson.bind(this));
        this.buttonNextHowManyPeople.addEventListener('click', this.closeMenuSelectTheNumberOfPeople.bind(this));
    }

    pluseOne() {
        this.numberOfPeople.innerText = parseInt(this.numberOfPeople.innerText) + 1;
    }

    addPerson() {
        let newPerson = {
            person: 'New Person'
        };
        this.arrayOfPeople.push(newPerson);
        this.renderBoxes();
        this.renderPersons(this.placeForPerson);
    };


    minusOne() {
        let temp_number = parseInt(this.numberOfPeople.innerText);
        if (temp_number > 0) {
            --temp_number;
            this.numberOfPeople.innerText = temp_number;
        }
    }

    minusPerson() {
        this.arrayOfPeople.splice(-1, 1);
        this.renderBoxes();
        this.renderPersons(this.placeForPerson);
    }

    closeMenuSelectTheNumberOfPeople() {
        if (this.numberOfPeople.innerText != '0') {
            document.querySelector('#menuSelectTheNumberOfPeople').classList.add('hideLeftPart');
            document.querySelector('#menuBillSplit').classList.add('hideLeftPart');
            document.querySelector('#menuBillTotal').classList.remove('hideLeftPart');
        }

    }

}

export {
    ClientsSetting
};