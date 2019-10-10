import {
    MainPage
} from "./mainNew.js";

// MainPage = new MainPage();

class PaymentSettings extends MainPage {
    constructor() {
        super()
        this.buttonAddDish.addEventListener('click', this.addDish.bind(this));
        this.dishinput.addEventListener('blur', this.checkSumm.bind(this));
    }

    addDish() {
        const tips = this.tips.value;
        let dishprice = parseFloat(this.dishinput.value);
        let fullprice = parseFloat(this.leftsum.innerHTML);
        let leftSum = fullprice - dishprice;
        let checkboxcounter = 0;
        let checkedcounter = 0;
        let arrayCheckboxes = document.querySelectorAll('.middle-form-checkboxes .person-checkbox');
        let arrayPersons = document.querySelectorAll('#list .personval');
        let forall = document.querySelector('.allpersons');
        let arrayIndexCheck = [];
        arrayCheckboxes.forEach((Element) => {
            if (Element.checked) {
                arrayIndexCheck.push(checkboxcounter);
                checkedcounter++
            }
            checkboxcounter++;
        })

        if (dishprice > 0 && (fullprice >= dishprice) && ((checkedcounter > 0) || forall.checked == true)) {

            this.leftsum.innerHTML = fullprice - dishprice;
            if (forall.checked) {
                let personcount = arrayPersons.length;

                arrayPersons.forEach(Element => {

                    let newSumm = parseFloat(Element.innerHTML) + parseFloat(this._priceCounter(dishprice, personcount, tips));
                    newSumm = newSumm.toFixed(2);
                    Element.innerHTML = newSumm;
                })
            } else {
                let counterpersons = 0;
                arrayPersons.forEach(Element => {
                    if (arrayIndexCheck.indexOf(counterpersons) != -1) {
                        let newSumm = parseFloat(Element.innerHTML) + parseFloat(this._priceCounter(dishprice, checkedcounter, tips));
                        newSumm = newSumm.toFixed(2);
                        Element.innerHTML = newSumm
                    }
                    counterpersons++;
                })
            }



            this.refreshCheckboxes(arrayCheckboxes, forall);
            this.refreshPriceInput();
            this.checkIfItEnd(leftSum);
        }

    }

    /**
     *  Отдельно вынесенные Функции
     */

    _priceCounter(dishprice, numberOfPeople, tips) {
        let price = (dishprice / numberOfPeople) + dishprice / 100 * tips / numberOfPeople;
        price = price.toFixed(2);
        return price;

    }

    refreshCheckboxes(arrayCheckboxes, forall) {
        arrayCheckboxes.forEach(function (elem) {
            elem.checked = false;
        })
        forall.checked = false;
    };

    refreshPriceInput() {
        this.dishinput.value = "";
    }

    checkIfItEnd(leftsum) {
        if (leftsum === 0) {
            this.closeMenuPaymentSettings()
        }
    }

    closeMenuPaymentSettings() {
        // debugger
        document.querySelector('.leftpart').classList.add('hide');
        document.querySelector('.rightpart').classList.add('results');
        document.querySelector('.startOverDiv').classList.remove('hideLeftPart')
    }


    checkSumm() {
        if (this.dishinput.value <= 0 && this.dishinput.value != "") {
            this.dishinput.classList.add('emptyInput')
        } else {
            this.dishinput.classList.remove('emptyInput')
        }
    }

}

export {
    PaymentSettings
};