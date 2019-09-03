/* Main Mapping Variables & declarations */

var size = 200,x,y,cx,cy;
var roomsize=2;

var map = new Array(size);
for (var i = 0; i <= size * size; ++i){
	map[i] = new Array(size);
}
for (x=1;x<=size;++x){
	for (y=1;y<=size;++y){
		map[x][y]=0;
	} 
} 
map[Math.floor(size/2)][Math.floor(size/2)] = 1;

var radius = 3;

document.writeln("<canvas id = 'map' width='800' height='800'>< width='800' height='800'><font color='FFFFFF'>Your browser does not support canvas.</font></canvas>");
var canvas = document.getElementById("map");
var context = canvas.getContext("2d");
document.writeln("<table><tr>");
// Generate random color for the floor so it looks pretty every time
var c1=Math.floor(Math.random()*255);
var c2=Math.floor(Math.random()*255);
var c3=Math.floor(Math.random()*255);

function NewRadius(cx,cy,radius){
	var radius2 = Math.sqrt( (cx-size/2)*(cx-size/2) + (cy-size/2)*(cy-size/2) );
	if (radius2 > radius){
		return radius2;
	} else {
		return radius;
	}
}

function CheckRadius(cx,cy,radius){
	var radius2 = Math.sqrt( (cx-size/2)*(cx-size/2) + (cy-size/2)*(cy-size/2) );
	if (radius2 > radius*1.5){
		return 0;
	} else {
		return 1;
	}
}
				
function DLA_setup(map){
	var phi = Math.random()*Math.PI*2;
	cx = Math.floor(Math.cos(phi)*(radius*1.2)+size/2)+1;
	cy = Math.floor(Math.sin(phi)*(radius*1.2)+size/2)+1;
	var nope = 0;
	var count = 0;
	while (nope == 0){
		nope = DLA_step(map);
		if (count > 1000){
			nope = 1;
		}
		count++;
	} 
	
	return map;
}
	
function DLA_step(map){
	
	builderMoveDirection = Math.floor(Math.random()*4);
	var nope = 0;
	       if (builderMoveDirection==0 && cy > 0       ){
		cy--;
	} else if (builderMoveDirection==1 && cx < size    ){
		cx++;
	} else if (builderMoveDirection==2 && cy < size    ){
		cy++;
	} else if (builderMoveDirection==3 && cx > 0       ){
		cx--;
	}
	if (cx<size && cy<size && cx>1 && cy>1 && CheckRadius(cx,cy,radius)){
		if ( (map[cx+1][cy]==1) || (map[cx-1][cy]==1) || (map[cx][cy+1]==1) || (map[cx][cy-1]==1) ){
			map[cx][cy] = 1;
			radius = NewRadius(cx,cy,radius);
			return 1;
		} else {
			return 0;
		}
	} else {
		return 0;
	}						
}

function render(map){
	for (x=1;x<=size;++x){
		for (y=1;y<=size;++y){
			if (map[x][y]==0 && (x != cx || y != cy )){
				context.fillStyle="rgb(22,22,22)";
				context.fillRect(x*roomsize,y*roomsize,roomsize,roomsize);
			} else if (map[x][y]==1 || (cx = x && cy == y)){
				context.fillStyle="rgb("+c1+","+c2+","+c3+")";
				context.fillRect(x*roomsize,y*roomsize,roomsize,roomsize);
			} 
		} 
	} 
	
	context.strokeStyle='#444';
	context.lineWidth=3;
	context.strokeRect(roomsize,roomsize,x*roomsize-roomsize,y*roomsize-roomsize);
	context.font="bold 18px sans-serif";context.textAlign="center";
	context.fillStyle='rgb(200,200,200)';
	context.fillText('Diffusion Limited Aggregation',x*roomsize/2,18);
}

function main(map){
	map = DLA_setup(map);
	render(map);
}

var run = setInterval(function(){main(map);},.1);


				