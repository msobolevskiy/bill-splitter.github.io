class MainPage {
    constructor() {
        this.buttonPlus = document.querySelector('.middle-left-buttonBox-plus');
        this.buttonMinus = document.querySelector('.middle-left-buttonBox-minus');
        this.numberOfPeople = document.querySelector('.middle-right-numberOfPeople');
        this.placeForPerson = document.querySelector('.rightpart');
        this.buttonNextHowManyPeople = document.querySelector('#buttonNumberOfPeople');
        this.buttonNextMenuBillTotal = document.querySelector('#buttonBillTotal');
        this.totalSum = document.querySelector('#totalSum');
        this.tips = document.querySelector('#tips');
        this.totalbill = document.querySelector('#inputForSum');
        this.leftsum = document.querySelector('.leftsum');
        this.dishinput = document.querySelector('#adddish');
        this.buttonAddDish = document.querySelector('#buttonAddDish');
        this.placeForCheckbox = document.querySelector('.middle-form-checkboxes');
        this.buttonStartOver = document.querySelector('#button-startOver')
        this.arrayOfPeople = [];
        this.renderPersons = this.render;
        this.renderBoxes = this.renderCheckbox;
    }
    render(place) {
        place.innerHTML = "";
        let tempperson = place;
        let counter = 1;
        this.arrayOfPeople.forEach(() => {
            const personDiv = document.createElement('div');
            personDiv.className = 'placeForPerson pc' + counter;
            tempperson.appendChild(personDiv);

            const insideDiv = document.createElement('div');
            insideDiv.className = "personval";
            insideDiv.innerText = '0';
            const allClass = document.getElementsByClassName('placeForPerson');
            for (let i = 0; i < allClass.length; i++) {
                const currentitem = allClass[i];
                currentitem.appendChild(insideDiv);
            }
            counter++;
        })
    }
    renderCheckbox() {
        this.placeForCheckbox.innerHTML = "";
        let tempelement = this.placeForCheckbox;
        let counter = 1;
        this.arrayOfPeople.forEach(function (element) {
            let personCheckboxName = document.createElement('div');
            personCheckboxName.innerHTML = '<span class="person-lang">Person</span> №' + counter;
            personCheckboxName.classList.add("personalCount");
            let personCheckbox = document.createElement('input');
            personCheckbox.className = 'person-checkbox pc' + counter;
            personCheckbox.type = 'checkbox';
            tempelement.appendChild(personCheckboxName);
            tempelement.appendChild(personCheckbox);
            counter++;
        })
        /**
         * add another function (SOLID)
         */
        const personCheckboxName = document.createElement('div');
        personCheckboxName.innerText = 'For all';
        personCheckboxName.classList.add("personalCount");
        const personCheckbox = document.createElement('input');
        personCheckbox.className = 'allpersons';
        personCheckbox.type = 'checkbox';
        this.placeForCheckbox.appendChild(personCheckboxName);
        this.placeForCheckbox.appendChild(personCheckbox);
    }
}

export {
    MainPage
};