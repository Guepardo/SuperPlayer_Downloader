var blessed = require('blessed'); 
var contrib = require('blessed-contrib'); 
var screen = blessed.screen();

   // var grid = new contrib.grid({rows: 23, cols: 12, screen: screen});

   // //grid.set(row, col, rowSpan, colSpan, obj, opts)
   // var map = grid.set(0, 0, 4, 4, contrib.map, {label: 'World Map'});
   // var box = grid.set(0, 4, 4, 4, blessed.box, {content: 'My Box'});
   // var box = grid.set(0, 8, 4, 4, blessed.box, {content: 'My Box'});

var UI = {}; 

UI.init = function(){
	UI.grid = new contrib.grid({
		rows: 23, 
		cols: 12, 
		screen: screen
	}); 

	UI.progress = UI.grid.set(0,0,6,6,contrib.gauge,{
		label: 'Download progress', 
		stroke: 'green', 
		fill: 'white'
	}); 

	UI.log = UI.grid.set(4,0,19,6,contrib.log,{
		fg: "green",
	    selectedFg: "green",
	    label: 'App log'
	}); 

	UI.markdown = UI.grid.set(4,6,19,6,contrib.markdown,{}); 

	// UI.img = UI.grid.set(0,8,4,4,contrib.picture,{
	// 	   // file: './flower.png',
	//        cols: 25,
	//        onReady: function() {screen.render()}
	// }); 

}; 
UI.render = function(){
	screen.render();
}; 

setInterval(UI.render,25); 

module.exports = UI; 