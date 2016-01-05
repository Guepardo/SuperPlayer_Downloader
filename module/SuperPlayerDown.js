var fs = require('fs'); 
var UI = require('./UI'); 
var down = new require('./Downloader'); 


var SuperPlayerDown = {}; 
    
SuperPlayerDown.init = function(dir){
	UI.log.log('Lendo aquivo /donwload/play.json'); 

	this.down = new down.Downloader(); 
	this.tracks = null; 
	this.tracks = fs.readFileSync(dir+'/download/play.json','utf8');

	if(this.tracks != null )
		UI.log.log('Aquivo /donwload/play.json foi lido'); 
	else
		UI.log.log('Falha ao ler o arquivo /donwload/play.json'); 

	this.tracks = JSON.parse(this.tracks); 
	this.tracks = this.tracks.tracks; 

	UI.log.log(this.tracks.length+' arquivos encontrados'); 

	UI.markdown.setMarkdown('@Play list label: '+ this.tracks[0].playlist.name+'\n');

	this.count    = this.tracks.length; 
	this.progress = 0;

	UI.log.log("Preparando nome dos arquivos."); 
	for(var a = 0 ; a < this.tracks.length ; a++){
		this.tracks[a].name = this.tracks[a].name.split('"').join(''); 
	}
}; 

SuperPlayerDown.beginDownload = function(){
	//Criar pasta para armazenar as músicas; 
	//Checar se a música já existe na pasta; 
	//Baixar; 
	
	try {
	    fs.mkdirSync(__dirname+'/'+this.tracks[0].playlist.name);
	    UI.log.log('Criando pasta para a playlist.'); 
	} catch(e) {
	    if ( e.code != 'EEXIST' ) throw e;
	    UI.log.log('A pasta já existe.'); 
	}
	this.down.on('done',function(){SuperPlayerDown.nextDown()}); 

	UI.progress.setPercent(parseInt((this.progress/this.count) * 100) ); 
	UI.log.log("Percentual "+parseInt((this.progress/this.count) * 100)); 

	if(this.musicExists(__dirname+'/'+this.tracks[this.progress].playlist.name+'/'+this.tracks[this.progress].name+'.mp3')){
		UI.log.log('Música já existe. Próxima.'); 
		this.progress++; 
		this.down.emit('done'); 
		return;
	}

	UI.log.log('baixando música '+ this.progress); 
	this.down.download(this.tracks[this.progress].media,
						__dirname+'/'+this.tracks[this.progress].playlist.name,
						this.tracks[this.progress++].name+'.mp3'
						);

}

SuperPlayerDown.nextDown = function(){

	UI.progress.setPercent(parseInt((this.progress/this.count) * 100) ); 
	UI.log.log("Percentual "+parseInt((this.progress/this.count) * 100)); 

	if(this.progress == this.count ){
		UI.log.log('Concluído.'); 
		return;
	}

	if(this.musicExists(__dirname+'/'+this.tracks[this.progress].playlist.name+'/'+this.tracks[this.progress].name+'.mp3')){
		UI.log.log('Música já existe. Próxima.'); 
		this.progress++; 
		this.down.emit('done'); 
		return;
	}

	UI.log.log('Aguardando 1 minuto para a próxima'); 
	var self = this; 
	setTimeout(function(){
		UI.log.log('baixando música '+ self.progress); 
		self.down.download(self.tracks[self.progress].media,
							__dirname+'/'+self.tracks[self.progress].playlist.name,
							self.tracks[self.progress++].name+'.mp3'
							);
	}, 1000 * 5); 

	
}

SuperPlayerDown.musicExists = function(path){
	return fs.existsSync(path);
}

module.exports = SuperPlayerDown; 