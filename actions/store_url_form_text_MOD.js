module.exports = {
  name: 'Store URL from Text',
  section: 'Geometry Space Mods',
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: 'lolmak',
	designer: null,
    authorUrl: 'https://discord.gg/kmza9YD',
    downloadURL: 'https://github.com/lolmak/GSMods/blob/main/actions/delete_json_data_MOD.js',
  },
  subtitle(data, presets) {
    return `${presets.getMessageText(data.storage, data.varName)} - <b>Текст:</b> ${data.text}`;
  },
  
  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Список URL'];
  },

  fields: ['storage', 'text', 'varName', 'iffalse', 'iffalseVal'],

  html(_isEvent, data) {
    return `
	<div class="dbmmodsbr1 xinelaslink" data-url="https://discord.gg/SPAa5YchXQ">DBM CIS</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://discord.gg/ztBb9CuVhj">By lolmak</div>

<tab-system>

<tab label="Конфиг" icon="cogs">
<div style="padding-top:12px">
	<span class="dbminputlabel">Текст</span><br>
	<textarea id="text" rows="8" placeholder="Введите текст здесь..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
</div></div><br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer3" variableInputId="varName"></store-in-variable><br><br><br>
  <div style="float: left; width: 50%">
  <span class="dbminputlabel">Если ссылок в тексте не обнаружено</span>
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
<tlt><b>Хранение результата</b></tlt>
<tl><span style="color:Khaki">Система распознаёт <b><ins>только рабочие ссылки</b></ins>!
<br>Ссылки, которые ведут на несуществующий сайт сохраняться не будут!</span></tl><br>
<tl><span style="color:Khaki">Вы так же можете проверить каждую сохранённую ссылку отдельно,
воспользовавшись действием</span> <span style="color:CornflowerBlue"><b>Loop Through List</b></span>
<span style="color:Khaki">.</span></tl><br>
<center>
<tlt><b>Необходимые модули</b></tlt>
<tl><span style="color:Khaki">Для работы текущего действия необходим модуль </i>"get-url-title".</i></span><br>
<span style="color:Khaki">Усатновить его можно, прописав данную команду в консоль:</span><br>
<mark>npm install get-url-title@2.0.0</mark><br></tl><br>
</tab>

</tab-system>

<style>
tl{background:rgba(0,0,0,0.1);border: 1px solid rgba(50,50,50,0.1);padding:5px;width:100%;display:block}
tlt{background:rgba(0,0,0,0.2);border: 1px solid rgba(50,50,50,0.2);padding:2px;width:100%;display:block}
mark{background-color:rgba(50,50,50,0.7);border-radius: 8px 8px 8px 8px;border: 1px solid rgba(134,88,118,0.9);color:LightGreen;padding:1px;}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },

  init() {
	  const { glob, document } = this;
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
	  const getUrlTitle = require("get-url-title");
	  const data = cache.actions[cache.index];
	  let sourceText = this.evalMessage(data.text, cache);
	  let urls = (sourceText.replaceAll('\\', '')).match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
	  let checkedUrls = [];
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
	  if (urls == null) {
		  this.storeValue(undefined, parseInt(data.storage, 10), this.evalMessage(data.varName, cache), cache)
		  ifFlse(parseInt(this.evalMessage(data.iffalse, cache), 10));
	  } else {
		  for (var i = 0; i < urls.length; i++) {
			  await getUrlTitle('https://' + urls[i])
			  .then(urlTitle => checkedUrls.push('https://' + urls[i]))
			  .catch(err => {})
		  }
		  this.storeValue(checkedUrls, parseInt(data.storage, 10), this.evalMessage(data.varName, cache), cache)
		  this.callNextAction(cache);
	  }
  },
  mod() {},
};
