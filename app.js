var UI = require('./module/UI').init(); 
var downloader = require('downloader'); 
var SuperPlayerDown = require("./module/SuperPlayerDown"); 

// var progress = 0; 
// setInterval(function(){
// 	if( progress != 100){
// 		progress += 10; 
// 		UI.progress.setPercent(progress); 
// 	}else
// 	progress = 0; 

// 	UI.log.log("Aleatório"); 
// 	UI.markdown.setMarkdown("@Hello \n nadas");
// },1000); 


SuperPlayerDown.init(__dirname); 
SuperPlayerDown.beginDownload(); 