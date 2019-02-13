//By Ryan Kim

function init(){
}
function ok(){

//var ion = randNormIonGenerator(false, 1, acceptableRandElemList, allPoly);
//var complexIon = randomIonGenerator(true, 2, false, acceptableRandElemList, allPoly);
var ok = new Array();
for(var i = 0; i < 10000; i++){
    var otherList = new Array();
    otherList.push(randomIonGenerator(true,true, acceptableRandElemList, allPoly));
    otherList.push(randomIonGenerator(true, false, acceptableRandElemList, allPoly));
    ok.push(new Compound([otherList[0],otherList[1]],[1, 1]));
}
alert(ok[0].name);
document.getElementById("testing").innerHTML = randSimpleCompound.formula + " " + randSimpleCompound.name;
var newJsfile = new File(ok, "oofy.txt", {type: "text/plain;charset=utf-8"});
saveAs(newJsfile);

}

//functions
