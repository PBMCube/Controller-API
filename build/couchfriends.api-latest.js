/*! couchfriends.api 2015-07-29 */
"use strict";function Emitter(a){return a?mixin(a):void 0}function mixin(a){for(var b in Emitter.prototype)a[b]=Emitter.prototype[b];return a}Emitter.prototype.on=Emitter.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks["$"+a]=this._callbacks["$"+a]||[]).push(b),this},Emitter.prototype.once=function(a,b){function c(){this.off(a,c),b.apply(this,arguments)}return c.fn=b,this.on(a,c),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks["$"+a];if(!c)return this;if(1==arguments.length)return delete this._callbacks["$"+a],this;for(var d,e=0;e<c.length;e++)if(d=c[e],d===b||d.fn===b){c.splice(e,1);break}return this},Emitter.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks["$"+a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},Emitter.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks["$"+a]||[]},Emitter.prototype.hasListeners=function(a){return!!this.listeners(a).length};var COUCHFRIENDS={REVISION:"3",_VARS:{baseUrl:"http://cdn.couchfriends.com/api/",init:!1,socket:{},connectedPlayers:[],gameCode:"",status:{connected:!1},sounds:{},soundFiles:[{play:function(){},key:"achievement",file:"achievement.wav"}]},settings:{apiKey:"",host:"ws.couchfriends.com",port:"80",ui:{showNotifications:!0,showHowTo:!0,sound:!0}}};COUCHFRIENDS.callbacks=[],COUCHFRIENDS.callbacks["game.start"]="gameStart",COUCHFRIENDS.callbacks["game.achievementUnlock"]="achievementUnlock",COUCHFRIENDS.callbacks["player.left"]="playerLeft",COUCHFRIENDS.callbacks["player.join"]="playerJoined",COUCHFRIENDS.callbacks["player.orientation"]="playerOrientation",COUCHFRIENDS.callbacks["player.click"]="playerClick",COUCHFRIENDS.callbacks["player.clickDown"]="playerClickDown",COUCHFRIENDS.callbacks["player.clickUp"]="playerClickUp",COUCHFRIENDS.callbacks["player.buttonClick"]="buttonClick",COUCHFRIENDS.callbacks["player.identify"]="playerIdentify",COUCHFRIENDS.callbacks.error="error",COUCHFRIENDS.init=function(){COUCHFRIENDS._VARS.init=!0;var a=document.getElementsByTagName("head")[0],b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.href="http://cdn.couchfriends.com/js/couchfriends.ui.css",b.media="all",a.appendChild(b);var c=document.createElement("div");c.id="COUCHFRIENDS-overlay",c.innerHTML='<div id="COUCHFRIENDS-popup"></div><div id="COUCHFRIENDS-notifications"></div>',document.body.appendChild(c),this._loadAudio()},COUCHFRIENDS._loadAudio=function(){var a=!1;"function"==typeof AudioContext&&(a=new AudioContext),a&&COUCHFRIENDS._VARS.soundFiles.forEach(function(b,c){COUCHFRIENDS._VARS.sounds[b.key]={};var d=new XMLHttpRequest;d.open("GET",COUCHFRIENDS._VARS.baseUrl+"assets/"+b.file,!0),d.responseType="arraybuffer",COUCHFRIENDS._VARS.sounds[b.key].play=function(){},d.onload=function(){try{a.decodeAudioData(d.response,function(c){COUCHFRIENDS._VARS.sounds[b.key].play=function(){if(0==COUCHFRIENDS.settings.ui.sound)return!1;var b=a.createBufferSource();b.buffer=c,b.connect(a.destination),b.start||(b.start=b.noteOn),b.start(0)}})}catch(c){}},d.send()})},COUCHFRIENDS.showNotification=function(a,b){if(null==b&&(b=3500),0!=COUCHFRIENDS.settings.ui.showNotifications){var c=Date.now(),d=document.createElement("div");d.className="COUCHFRIENDS-notification",d.id="COUCHFRIENDS-"+c,d.innerHTML="<p>"+a+"</p>",document.getElementById("COUCHFRIENDS-notifications").appendChild(d),setTimeout(function(){document.getElementById("COUCHFRIENDS-"+c).className="COUCHFRIENDS-notification COUCHFRIENDS-notification-close",setTimeout(function(){var a=document.getElementById("COUCHFRIENDS-"+c);a.parentNode&&a.parentNode.removeChild(a)},1e3)},b)}},COUCHFRIENDS.showHideHowToPopup=function(){if(0==COUCHFRIENDS.settings.showHowTo)return void(1==COUCHFRIENDS.settings.showConnect?document.getElementById("COUCHFRIENDS-popup").className="COUCHFRIENDS-moveBottomLeft":document.getElementById("COUCHFRIENDS-popup").style.display="none");if(COUCHFRIENDS._VARS.connectedPlayers.length>0||""==COUCHFRIENDS._VARS.gameCode){if(null===document.getElementById("COUCHFRIENDS-popup").offsetParent)return;return void(document.getElementById("COUCHFRIENDS-popup").className="COUCHFRIENDS-moveBottomLeft")}var a='Go to <strong class="COUCHFRIENDS-underline">www.couchfriends.com</strong> with your <strong>phone</strong> or <strong>tablet</strong> and enter the code <strong id="COUCHFRIENDS-code">'+COUCHFRIENDS._VARS.gameCode+"</strong>";document.getElementById("COUCHFRIENDS-popup").innerHTML=a,null!==document.getElementById("COUCHFRIENDS-popup").offsetParent&&(document.getElementById("COUCHFRIENDS-popup").className="COUCHFRIENDS-moveCenter")},COUCHFRIENDS.connect=function(){return 0==COUCHFRIENDS._VARS.init&&COUCHFRIENDS.init(),"undefined"==typeof WebSocket?(COUCHFRIENDS.emit("error","Websockets are not supported by device."),!1):""==COUCHFRIENDS.settings.host||""==COUCHFRIENDS.settings.port?(COUCHFRIENDS.emit("error","Host or port is empty."),!1):1==COUCHFRIENDS._VARS.status.connected?!1:(COUCHFRIENDS._VARS.socket=new WebSocket("ws://"+COUCHFRIENDS.settings.host+":"+COUCHFRIENDS.settings.port),COUCHFRIENDS._VARS.socket.onmessage=function(a){var b=JSON.parse(a.data),c="";"string"==typeof b.topic&&(c+=b.topic),"string"==typeof b.action&&(c+="."+b.action),"undefined"!=typeof COUCHFRIENDS.callbacks[c]&&(COUCHFRIENDS.emit("_"+COUCHFRIENDS.callbacks[c],b.data),COUCHFRIENDS.emit(COUCHFRIENDS.callbacks[c],b.data))},COUCHFRIENDS._VARS.socket.onopen=function(){COUCHFRIENDS._VARS.status.connected=!0,COUCHFRIENDS.emit("connect")},void(COUCHFRIENDS._VARS.socket.onclose=function(){COUCHFRIENDS._VARS.status.connected=!1,COUCHFRIENDS.emit("disconnect")}))},COUCHFRIENDS.send=function(a){return 0==COUCHFRIENDS._VARS.status.connected?(COUCHFRIENDS.emit("error","Message not send because game is not connected to server."),!1):void COUCHFRIENDS._VARS.socket.send(JSON.stringify(a))},Emitter(COUCHFRIENDS),COUCHFRIENDS.on("error",function(a){}),COUCHFRIENDS.on("connect",function(){}),COUCHFRIENDS.on("disconnect",function(){}),COUCHFRIENDS.on("_disconnect",function(){COUCHFRIENDS._VARS.gameCode=""}),COUCHFRIENDS.on("gameStart",function(a){}),COUCHFRIENDS.on("_gameStart",function(a){COUCHFRIENDS._VARS.gameCode=a.code,COUCHFRIENDS.showHideHowToPopup()}),COUCHFRIENDS.on("playerLeft",function(a){}),COUCHFRIENDS.on("_playerLeft",function(a){var b=a.id;null!=a.name&&(b=a.name),COUCHFRIENDS.showNotification('Player "'+b+'" left.'),COUCHFRIENDS._VARS.connectedPlayers.splice(COUCHFRIENDS._VARS.connectedPlayers.indexOf(a.id),1),COUCHFRIENDS.showHideHowToPopup()}),COUCHFRIENDS.on("achievementUnlock",function(a){}),COUCHFRIENDS.on("_achievementUnlock",function(a){COUCHFRIENDS._VARS.sounds.achievement.play(),COUCHFRIENDS.showNotification('<img src="'+a.image+'" /> Achievement unlocked: <strong>'+a.name+"</strong>",5e3)}),COUCHFRIENDS.on("playerJoined",function(a){}),COUCHFRIENDS.on("_playerJoined",function(a){var b=a.id;null!=a.name&&(b=a.name),COUCHFRIENDS.showNotification('Player "'+b+'" joined.'),COUCHFRIENDS._VARS.connectedPlayers.push(a.id),COUCHFRIENDS.showHideHowToPopup()}),COUCHFRIENDS.on("playerOrientation",function(a){}),COUCHFRIENDS.on("playerIdentify",function(a){}),COUCHFRIENDS.on("playerClick",function(a){}),COUCHFRIENDS.on("playerClickDown",function(a){}),COUCHFRIENDS.on("playerClickUp",function(a){}),COUCHFRIENDS.on("buttonClick",function(a){});