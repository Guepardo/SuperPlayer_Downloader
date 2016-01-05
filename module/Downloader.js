
var http   = require('http');
var fs     = require('fs');
var events = require('events'); 
var sys    = require('sys'); 
var UI     = require('./UI'); 

var Downloader = function(){}

sys.inherits(Downloader,events.EventEmitter);

Downloader.prototype.download = function(url,pathToStore,fileName){
	UI.log.log(fileName+" downloading."); 
	var file = fs.createWriteStream(pathToStore+"/"+fileName); 
	var self = this;
	var request = http.get(url,function(response){
		response.pipe(file); 
		
		file.on('finish', function() {
      		file.close();
      		UI.markdown.setMarkdown('@Music: '+fileName+' concluída.\n');
      		self.emit("done"); 
    	});
	}); 
}; 


exports.Downloader = Downloader; 
