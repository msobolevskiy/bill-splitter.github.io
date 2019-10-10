import {
	ClientsSetting
} from './Settings/clientsSettings.js';
import {
	BillSettings
} from './Settings/billSettings.js';
import {
	PaymentSettings
} from './Settings/paymentSettings.js';
import {
	LoginPage
} from './login/login.js';
import {
	ResultsSettings
} from './Settings/resultsSettings.js';

const clientSettings = new ClientsSetting();
const billSettings = new BillSettings();
const paymentSettings = new PaymentSettings();
const resultsSettings = new ResultsSettings();
const loginPage = new LoginPage();

$(document).ready(function () {
	$('.log-in-btn').on('click', function () {
		let screen = $('.login-screen');
		if (screen.hasClass('opened-login')) {
			screen.fadeOut();
			screen.removeClass('opened-login');
		} else {
			screen.fadeIn();
			screen.addClass('opened-login');
		}
	});
});
