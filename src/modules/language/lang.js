$(document).ready(function () {


	let people = $('.people-lang');
	let next = $('.next-lang');
	let bill = $('.bill-lang');
	let curr = $('.curr-lang');
	let tips = $('.tips-lang');
	let totalBill = $('.total-lang');
	let left = $('.left-lang');
	let person = $('.person-lang');
	let push = $('.push-lang');
	let lang_items;
	let wait_lang_items = $.Deferred();
	let current_lang = localStorage.getItem('lang');
	let username = $('.username');

	$(window).on('load', function () {
		if (current_lang == null) {
			localStorage.setItem('lang', 'en');
		}
		$.fn.getLanguageData(wait_lang_items);
		$.when(wait_lang_items).done(function () {
			$.fn.setLanguage();
		});
	});


	$.fn.getLanguageData = function (wait_promise) {
		$.ajax({
			url: '../src/modules/language/lang.json',
			success: function (data) {
				if (current_lang == 'en') {
					lang_items = data[0].en;
				}
				if (current_lang == 'ru') {
					lang_items = data[0].ru;
				}
				wait_promise.resolve();
			}
		});
	}

	$.fn.setLanguage = function () {
		people.text(lang_items.people);
		next.text(lang_items.next);
		bill.text(lang_items.bill);
		curr.text(lang_items.curr);
		tips.text(lang_items.tips);
		totalBill.text(lang_items.totalBill);
		left.text(lang_items.left);
		person.text(lang_items.person);
		push.text(lang_items.push);
		if(sessionStorage.getItem('username') != null){
			username.text(sessionStorage.getItem('username'));
		}
		
	}

	$('.lang a').on('click', function () {
		let click_lang = $(event.target).attr('lang-data');
		localStorage.setItem('lang', click_lang);
		current_lang = click_lang;
		let wait_lang_click = $.Deferred();
		$.fn.getLanguageData(wait_lang_click);
		$.when(wait_lang_click).done(function () {
			$.fn.setLanguage();
		});
	})



});