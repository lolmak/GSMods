module.exports = {
  name: "Action Container MOD",
  section: "Geometry Space Mods",
  subtitle(data, presets) {
    if(data.descriptionx == true){
    desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}"></font>`

  },
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: 'LIK (Данил)',
	designer: 'LIK (Данил)',
    authorUrl: 'https://discord.gg/kmza9YD',
    downloadURL: 'https://github.com/lolmak/GSMods/blob/main/actions/action_container_MOD.js',},

  fields: ['comment', 'actions', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://discord.gg/SPAa5YchXQ">DBM CIS</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://discord.gg/ztBb9CuVhj">By LIK (Данил)</div>

<div style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Описание действия</span><br><input type="text" class="round" id="description" placeholder="Оставьте пустым, чтобы не использовалось!"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Цвет (вкл)"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<action-list-input id="actions" height="calc(100vh - 300px)"></action-list-input>

<style>

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
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const actions = data.actions;
    this.executeSubActionsThenNextAction(actions, cache);
  },

  modInit(data) {
    this.prepareActions(data.actions);
  },

  mod() {},
};
