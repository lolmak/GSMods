module.exports = {
  name: 'Reply To Message',
  section: 'Geometry Space Mods',
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: 'lolmak',
    designer: 'LIK (Данил)',
    authorUrl: 'https://discord.gg/kmza9YD',
    downloadURL: 'https://github.com/lolmak/GSMods/blob/main/actions/reply_to_message_MOD.js',
  },
  subtitle(data, presets) {
    if(data.descriptionx == true){
    desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${presets.getMessageText(data.storage, data.varName)}</font>`

  },
  variableStorage(data, varType) {
    const type = parseInt(data.storage3, 10);
    if (type !== varType) return;
    return [data.varName3, "Сообщение"];
  },
  fields: ['storage', 'varName', 'storage2', 'varName2', 'storage3', 'varName3', 'descriptioncolor', 'description', 'descriptionx', 'notification', 'iffalse', 'iffalseVal'],

  html(_isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://discord.gg/kmza9YD">GSteam</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://discord.gg/ztBb9CuVhj">By lolmak and LIK (Данил)</div>

    <div style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Описание действия</span><br><input type="text" class="round" id="description" placeholder="Оставьте пустым, чтобы не использовалось!"></td>
    <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Цвет (вкл)"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

  <tab-system>
   <tab label="Конфиг" icon="save outline">
    <message-input dropdownLabel="Source Message" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input>
    <br><br><br>
    <message-input dropdownLabel="Message option" selectId="storage2" variableContainerId="varNameContainer2" variableInputId="varName2"></message-input>
    <br><br><br>

    <store-in-variable allowNone dropdownLabel="Store In" selectId="storage3" variableContainerId="varNameContainer3" variableInputId="varName3"></store-in-variable>

  </tab>

  <tab label="Доп настройки" icon="external alternate">
  <span class="dbminputlabel">Опции</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
  <dbm-checkbox id="notification" label="Уведомление" checked></dbm-checkbox>
  </div><br></div>

  <div style="float: left; width: 50%">
  <span class="dbminputlabel">Если не удалось ответить</span>
  <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0" selecionado>Продолжать действия</option>
      <option value="1">Остановить последовательность действий</option>
      <option value="2">Перейти к действию</option>
      <option value="3">Пропустить следующие действия</option>
      <option value="4">Перейти к якорю</option>
  </select>
</div>

<div id="iffalseContainer" style="display: none; float: right; width: 45%;">
  <span id="xinelas" class="dbminputlabel">Для</span>
  <br>
  <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
</div>

  </tab>

  <tab label="Помощь" icon="help">

  <center>
  <tlt><b>Source Meesage</b></tlt>
  <tl><span style="color:Khaki">Это сообщение на которое бот будет давать свой ответ.</span></tl><br>
  <center>
  <tlt><b>Message option</b></tlt>
  <tl><span style="color:Khaki">Это сохранённое сообщение в действии Send Message с установленным параметром &quot;Dont't Send Message&quot;.</span></tl><br>

  </div>
  </tab>
  </tab-system>

    <style>
    tl{background:rgba(0,0,0,0.1);border: 1px solid rgba(50,50,50,0.1);padding:5px;width:100%;display:block}
    tlt{background:rgba(0,0,0,0.2);border: 1px solid rgba(50,50,50,0.2);padding:2px;width:100%;display:block}
     .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
     .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
    </style>`;
  },

  init() {
	  const { glob, document } = this;
	  const xinelaslinks = document.getElementsByClassName('xinelaslink');
	  for (let x = 0; x < xinelaslinks.length; x++) {
		const xinelaslink = xinelaslinks[x];
		const url = xinelaslink.getAttribute('data-url');
		if (url) {
		 xinelaslink.setAttribute('title', url);
		 xinelaslink.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			console.log(`Запуск URL: [${url}] В вашем браузере по умолчанию.`);
			require('child_process').execSync(`start ${url}`);
		  });
		}
	  }

    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }

      if (event.value == "2") {
        document.querySelector("[id='xinelas']").innerText = (`Номер действия`);
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelas']").innerText = (`Пропустить действий`);
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelas']").innerText = (`Название якоря`);
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));
  },

  async action(cache) {
	const data = cache.actions[cache.index];
	const message = await this.getMessageFromData(data.storage, data.varName, cache);
	const messageToReply = await this.getMessageFromData(data.storage2, data.varName2, cache);
	var _this = this;
	function ifFlse(ifflseVal) {
	switch (ifflseVal) {
				case 0:
					_this.callNextAction(cache);
					break;
				case 1:
					break;
				case 2:
					const val = parseInt(_this.evalMessage(data.iffalseVal, cache), 10);
					const index = Math.max(val - 1, 0);
					if (cache.actions[index]) {
						cache.index = index - 1;
						_this.callNextAction(cache);
					}
					break;
				case 3:
					const amnt = parseInt(_this.evalMessage(data.iffalseVal, cache), 10);
					const index2 = cache.index + amnt + 1;
					if (cache.actions[index2]) {
						cache.index = index2 - 1;
						_this.callNextAction(cache);
					}
				case 4:
					const anchorName = _this.evalMessage(data.iffalseVal, cache);
					cache.goToAnchor(anchorName);
			}
	}
	let messageToReplyWN = null;
	if (data.notification) {
		messageToReplyWN = messageToReply;
	} else {
		const notificationObj = { allowedMentions: { repliedUser: false }};
		messageToReplyWN = Object.assign(messageToReply, notificationObj);
	}
	try {
		message.reply(messageToReplyWN)
		.then( resultMsg => {
			if (parseInt(data.storage3, 10) == 0) {
				this.callNextAction(cache);
			} else {
				this.storeValue(resultMsg, parseInt(data.storage3, 10), this.evalMessage(data.varName3, cache), cache)
				this.callNextAction(cache);
			}
		})
		.catch( err => {
			console.error('Ошибка в действии Reply To Message:\n' + err);
			ifFlse(parseInt(this.evalMessage(data.iffalse, cache), 10));
		});
	} catch (err) {
		console.error('Ошибка в действии Reply To Message:\n' + err);
		ifFlse(parseInt(this.evalMessage(data.iffalse, cache), 10));
	}
  },
  mod() {},
};
