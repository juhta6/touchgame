var set = 1;
var point = 0;
var hw = 50;

var names = [];

//---------------------

var page = new tabris.Page({
  topLevel: true,
  background: "white"
});

var play = new tabris.Button({
  layoutData: {top: "30%", centerX: 0},
  text: "Play"
}).on("select", function(){
  game.open();  
}).appendTo(page);

var quit = new tabris.Button({
  layoutData: {top: "40%", centerX: 0},
  text: "Quit"
}).on("select", function(){
  page.close();
}).appendTo(page);

var name = new tabris.TextInput({
  layoutData: {top: 60, centerX: 0},
  message: "Set your name..."
}).on("accept", function(widget, text){
    names = [text]
}).appendTo(Page);

page.open();

//-------------------------------------------

var game = new tabris.Page({
  topLevel: true,
  background: "rgb(90,90,90)"
});

tabris.ui.set("toolbarVisible", false);

var player = new tabris.TextView({
  layoutData: {top: 10, left: 10},
  text: names
}).appendTo(game);

var composite = new tabris.Composite({
  layoutData: {top: 10, left: 10, right: 10, bottom: 10},
  background: "white"
}).appendTo(game);

var scores = new tabris.Button({
  layoutData: {right: 10, bottom: 20},
  text: "High scores"
}).on("select", function(){
  hscore.open()
}).appendTo(composite);

var text = new tabris.TextView({
  layoutData: {top: 30, centerX: 0},
  text: "Start the game",
  font: "22px"
}).appendTo(composite);

var timer = new tabris.InactivityTimer({
  delay: 1000
}).on("timeout", function(widget) {
  set = 0
  text.set({text: "Game over! Your points: " + point, layoutData: {top: 30, centerX: 0}, font: "22px"})
  restart.set("enabled", true)
  block.set({layoutData: {centerX: 0, centerY: 0, height: 50, width: 50}});
});

var block = new tabris.Composite({
  layoutData: {centerX: 0, centerY: 0, height: 50, width: 50},
  background: "red"
}).on("tap", function(widget){
  start(widget);
  timer.start();
}).appendTo(composite);

var restart = new tabris.Button({
  layoutData: {bottom: 20, left: 10},
  text: "Restart",
  enabled: false
}).on("select", function(widget){
  highscore(widget)
  timer.cancel();
  block.set({layoutData: {centerX: 0, centerY: 0, height: 50, width: 50}});
  text.set({text: "Start the game", layoutData: {top: 30, centerX:0}});
  point = 0;
  set = 1;
  hw = 50;
  restart.set("enabled", false)
}).appendTo(composite);

function times(widget){
  

function start(widget){
 if (set > 0){text.set({layoutData: {top: 10, right: 10}, font: "20px"})}
  if (hw == 15 && set == 1){
    set = 2
    block.set("background", "blue")
    composite.set("background", "black")
    text.set("textColor", "white")
    page.set("background", "rgb(170,170,170)")
  } else {
    if (hw == 50 && set == 2){
    set = 1
    block.set("background", "red")
    composite.set("background", "white")
    text.set("textColor", "black")
    page.set("background", "rgb(90,90,90)")
  }
 }
 if (set == 1){
  text.set("text", (++point))
  var y = Math.floor((Math.random() * 400));
  var x = Math.floor((Math.random() * 150));
  block.set({layoutData: {top: y, left: x, height: hw, width: hw}})
  hw--;
 }
 if (set == 2){
  text.set("text", (++point))
  var y = Math.floor((Math.random() * 400));
  var x = Math.floor((Math.random() * 150));
  block.set({layoutData: {top: y, left: x, height: hw, width: hw}})
  hw++;
  }
 }
//-------------------------------------------------

var hscore = new tabris.Page({
  topLevel: true,
  background: "white"
});

var points = point;

var back = new tabris.Button({
  layoutData: {left: 10, bottom: 20},
  text: "back"
}).on("select", function(){
  page.open()
}).appendTo(hscore);

new tabris.TextView({
  layoutData: {top: 20, centerX: 0},
  text: "HIGH SCORES",
  font: "bold 40px"
}).appendTo(hscore);

function highscore(widget){
var highscore = tabris.TextView({
  layoutData: {top: "prev() 8", centerX: 0},
  text: player + ": " + points
}).appendTo(hscore);
};
