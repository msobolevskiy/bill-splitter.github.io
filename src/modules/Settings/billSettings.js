import {
    MainPage
} from "./mainNew.js";


class BillSettings extends MainPage {
    constructor() {
        super();
        this.buttonNextMenuBillTotal.addEventListener('click', this.closeMenuBillTotal.bind(this));
    }
    closeMenuBillTotal() {
        if (parseFloat(this.totalbill.value) > 0) {
            let tips = this.tips.value;
            let totalbill = this.totalbill.value;
            document.querySelector('#menuSelectTheNumberOfPeople').classList.add('hideLeftPart');
            document.querySelector('#menuBillTotal').classList.add('hideLeftPart');
            document.querySelector('#menuBillSplit').classList.remove('hideLeftPart');
            this.totalSum.innerHTML = `<span class="total-lang">Total bill</span>: ${totalbill}`;
            this.leftsum.innerText = totalbill;
        }

    }
}
export {
    BillSettings
};