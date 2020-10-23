var rotateCounter = 0;

var locations = [
"32.534389,-117.123744", // Tijuana, Pacific border: 
"32.542555,-117.029251", // San Ysidro crossing: 
"32.552122,-116.914455",// South of Otay detention center
"32.562529,-116.790673", // Tijuana river
"32.601442,-116.320928", // Tierra Del Sol
"32.576287,-116.627470", // Tecate 
"32.615341,-116.144087", // Just east of Jacumba
"32.641648,-115.810610", // Ocotillo
"32.641648,-115.810610", // Calexico West
"32.672982,-115.387635", // Calexico East 
"32.697529,-115.035480", // Imperial Desert 
"32.718606,-114.719700", // Los Algodones 
"32.166628,-113.742448", // halfway to Organ pipe
"31.909254,-112.913267", // Organ Pipe 
"31.504990,-111.611653", // kit peak
"31.332635,-110.965198", // Nogales 
"31.333922,-109.947935", // Naco
"31.334131,-109.560510", // Douglas
"31.333962,-109.255226", // San Bernadino Wildlife 
"31.332841,-109.050032", // AZ/NM Border
"31.333453,-108.530198", // Antelope Wells
"31.332846,-108.208609", // New Mexico corner 
"31.497597,-108.207872", // Crazy Cook monument
"31.783660,-107.627950", // Columbus NM
"31.783792,-107.186329", // hwy 9 NM
"31.764451,-106.451340", // El Paso 
"31.140762,-105.716474", // Esperanza TX
"30.824808,-105.327460", // Rio Grande, a little further
"30.137639,-104.689486", // Candelaria
"29.704317,-104.543694", // further still 
"28.991619,-103.228046", // Big Bend 
"29.785315,-102.051342", // after big bend
"29.471637,-101.106156", // Amistad reservoir
"28.705632,-100.511768", // Piedras Negras
"27.980087,-99.931063", // San Cirilo Creek
"27.917211,-99.915738", // Further down river
"27.699227,-99.745052", // Colombia
"27.500193,-99.502681", // Laredo
"26.047617,-97.768731", // Los Indios
"25.839976,-97.372929", // Southernmost point of texas
"25.955176,-97.289327", // Battle of Palmito Hill
"26.062144,-97.949926", // Progreso 
"25.954823,-97.146436", // Gulf Terminus 2
]

let squares = [];
let wrapperWide = document.getElementById("squaresParent").offsetWidth;

// let hoverVar;
// let newOrder;
 

class Square {
  constructor(idVar, squareL, squareT) {
    this.idVar = idVar;
    this.squareL = squareL;
	this.squareT = squareT;
  }
}
let squaresHoriz = 15;
let squaresVert = 20;
  
let totalSquares = squaresVert * squaresHoriz; // just a new variable to save some typing later

let squareL = 0;
let squareT = 0;
const squareWide = wrapperWide/squaresHoriz;
let idVar = 0; 

let rotVars = ["0deg", "90deg", "-90deg"];
let rotNum;


function squaresBuild() {
	getMapsImage();
	createSquares();
	// setRotation();
}

function createSquares(){

document.documentElement.style.setProperty('--gridWidthVar', squaresHoriz);
document.documentElement.style.setProperty('--bgSize', (squaresHoriz * 100) + "%");

bgColor = Math.floor(Math.random() * 360);
colorVar = [-1, 1];
colorHelper = Math.floor(Math.random() * colorVar.length);
bgColorVar = colorVar[colorHelper];

colorOne = "hsl(" + bgColor + ", 90%, 60%)"
colorTwo = "hsl(" + (bgColor-(25*bgColorVar)) + ", 90%, 60%)";


document.documentElement.style.setProperty('--colorOne', colorOne);
document.documentElement.style.setProperty('--colorTwo', colorTwo);


for (let i = 0; i < squaresVert; i++ ) {
	for (let  j = 0; j < squaresHoriz; j++) {
		squareL = 0 - (squareWide * j);
		squares[idVar] = new Square(idVar, squareL, squareT); 
    
    let newDiv = document.createElement("DIV");
		document.getElementById("squaresParent").appendChild(newDiv);
		newDiv.setAttribute("id", idVar);
		newDiv.setAttribute("class", "rotater");
		newDiv.style.backgroundPosition = squares[idVar].squareL + "px" + " " + squares[idVar].squareT + "px";
		newDiv.onmouseover = function() {reOrder(this.id); }
		newDiv.style.order = [idVar]; //use this since it's just counting up from 0, so each initial order equals the order it was created in
		if (idVar < (totalSquares/2)) {
			newDiv.style.backgroundColor = "var(--colorOne)";
			} else {
				newDiv.style.backgroundColor = "var(--colorTwo)";
				}
		// console.log(idVar + " // " + testy);
		idVar++;
		}

	squareL = 0;
	squareT -= squareWide;
	}
	
}

// function setRotation(){
// 	const rotaters = document.querySelectorAll('.rotater');

// 	document.body.offsetWidth; // force a single reflow
//   	rotaters.forEach( (elem, i) => {
// 		rotNum = Math.floor(Math.random() * 4);
// 		if (Math.floor(Math.random() * 11) == 10) {		
// 			elem.style.transform = "rotate(" + rotVars[rotNum] + ")";
// 			} 
//   	});
// }

function reOrder(hoverVar){
	// document.body.offsetWidth; // force a single reflow

	newOrder = (squares.length-1) - hoverVar;
	rotNumA = Math.floor(Math.random() * 4);
	rotNumB = Math.floor(Math.random() * 4);

	reorderA = document.getElementById(hoverVar);
	reorderB = document.getElementById(newOrder);

	reorderA.style.order = newOrder;
	reorderA.style.transform = "rotate(" + rotVars[rotNumA] + ")";

	reorderB.style.order = hoverVar;
	reorderB.style.transform = "rotate(" + rotVars[rotNumB] + ")";

	rotateCounter ++;
	console.log(rotateCounter);

	if (rotateCounter == squares.length) {
		location.reload();
	}


	// console.log(hoverVar + " // " + newOrder);
	
}

function getMapsImage(){
	mapVar = Math.floor(Math.random() * locations.length);
	const mapOne = "https://maps.googleapis.com/maps/api/staticmap?center=" + locations[mapVar] + "&zoom=15&size=450x600&scale=2&maptype=satellite&key=" + myKey;

	document.documentElement.style.setProperty('--mapsURL', "url('" + mapOne + "')");
}
		 
// setInterval(function () {
// 	setRotation();
// 	reOrder();
// 	}, 2000);



