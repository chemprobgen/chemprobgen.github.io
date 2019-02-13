//The function below will fail if you have not added this to the head tags in your html yet: <meta charset="utf-8" />
function strSubScript (strToSub){ //replace all numbers and +'s and -'s that are not subscripts to be subscripts
    strToSub = strToSub.replace(/0/g, "₀");
    strToSub = strToSub.replace(/1/g, "₁");
    strToSub = strToSub.replace(/2/g, "₂");
    strToSub = strToSub.replace(/3/g, "₃");
    strToSub = strToSub.replace(/4/g, "₄");
    strToSub = strToSub.replace(/5/g, "₅");
    strToSub = strToSub.replace(/6/g, "₆");
    strToSub = strToSub.replace(/7/g, "₇");
    strToSub = strToSub.replace(/8/g, "₈");
    strToSub = strToSub.replace(/9/g, "₉");
    strToSub = strToSub.replace(/\+/g, "₊");
    strToSub = strToSub.replace(/-/g, "₋");
    return strToSub;
}

function strSupScript(strToSup){
    strToSup = strToSup.replace(/0/g, "⁰");
    strToSup = strToSup.replace(/1/g, "¹");
    strToSup = strToSup.replace(/2/g, "²");
    strToSup = strToSup.replace(/3/g, "³");
    strToSup = strToSup.replace(/4/g, "⁴");
    strToSup = strToSup.replace(/5/g, "⁵");
    strToSup = strToSup.replace(/6/g, "⁶");
    strToSup = strToSup.replace(/7/g, "⁷");
    strToSup = strToSup.replace(/8/g, "⁸");
    strToSup = strToSup.replace(/9/g, "⁹");
    strToSup = strToSup.replace(/\+/g, "⁺");
    strToSup = strToSup.replace(/-/g, "⁻");
    return strToSup;
}

function removeSubScript(strToChange){
    strToChange = strToChange.replace(/₀/g, "");
    strToChange = strToChange.replace(/₁/g, "");
    strToChange = strToChange.replace(/₂/g, "");
    strToChange = strToChange.replace(/₃/g, "");
    strToChange = strToChange.replace(/₄/g, "");
    strToChange = strToChange.replace(/₅/g, "");
    strToChange = strToChange.replace(/₆/g, "");
    strToChange = strToChange.replace(/₇/g, "");
    strToChange = strToChange.replace(/₈/g, "");
    strToChange = strToChange.replace(/₉/g, "");
    strToChange = strToChange.replace(/₊/g, "");
    strToChange = strToChange.replace(/₋/g, "");
    return strToChange;
}

function hasSubScript(str){
    if(!(str === removeSubScript(str))){
        return true;
    }
    return false;
}

function hasCharge(positive, element){
    if(positive){
        for(var i = 0; i < element.normCovalentOxStates.length; i++){
            if(element.normCovalentOxStates[i] > 0){
                return true;
            }
        }
        return false;
    } else { //negative
        for(i = 0; i < element.normCovalentOxStates.length; i++){
            if(element.normCovalentOxStates[i] < 0){
                return true;
            }
        }
        return false;
    }
}

function randInt(min, max){ //min is inclusive, max is exclusive
    return Math.floor(Math.random() * (max - min) + min);
}



function romanize(num) { //from here: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
function polyIonsListIndexOf(ionName){
    for(var i = 0; i < polyIonsList.length; i++){
        if(polyIonsList[i].name === ionName){
            return i;
        }
    }
    return -1;
}

function quantityToPrefix(num) { //convert things like 2 to di and 3 to tri
    switch(num){
        case 1:
            return "mono";
        case 2:    
            return "di";
        case 3:
            return "tri";
        case 4:
            return "tetra";
        case 5:
            return "penta";
        case 6:
            return "hexa";
        case 7:
            return "hepta";
        case 8:
            return "octa";
        case 9:
            return "nona";
        case 10:
            return "deca";
        case 11:
            return "undeca";
        case 12:
            return "dodeca";
        case 13:
            return "trideca";
        case 14:
            return "tetradeca";
        case 15:
            return "pentadeca";
        case 16:
            return "hexadeca";
        case 17:
            return "heptadeca";
        case 18:
            return "octadeca";
        case 19:
            return "nonadeca";
        case 20:
            return "icosa";
        default:
            return "FAILURE"; //I guess we failed if there is a quantity greater than 20 :3
    }
}

function quantityToOtherPrefix(num){
    switch(num){
        case 2:
            return "bis";
        case 3:
            return "tris";
        default:
            return quantityToPrefix(num) + "kis";
    }
    
}

function removePrefix(str){
    if(polyIonsListIndexOf(str) < 0){
        str = str.replace(/mono/g, "");
        str = str.replace(/di/g, "");
        str = str.replace(/tri/g, "");
        str = str.replace(/tetra/g, "");
        str = str.replace(/penta/g, "");
        str = str.replace(/hexa/g, "");
        str = str.replace(/hepta/g, "");
        str = str.replace(/octa/g, "");
        str = str.replace(/nona/g, "");
        str = str.replace(/deca/g, "");
        str = str.replace(/undeca/g, "");
        str = str.replace(/dodeca/g, "");
    }
    return str;
}

function lcm(num1, num2){ //Yes O(n^2), but that doesn't really matter in the scope of this program, since numbers here are quite small
    var multiples1 = new Array();
    var multiples2 = new Array();
    var startNumber = 1;
    var stopNumber = 100;
    var lcmFound = false;
    while(!lcmFound){
        for(var i = startNumber; i < stopNumber; i++){
            multiples1.push(Math.abs(num1)*i);
            multiples2.push(Math.abs(num2)*i);
        }
        for(i = startNumber - 1; i < multiples1.length; i++){
            if(multiples2.includes(multiples1[i])){
                lcmFound = true;
                return multiples1[i];
            }    
        }
        startNumber = stopNumber + 1;
        stopNumber *= 2;
    }
}
function sumArray(arr){
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        sum+= arr[i];
    }
    return sum;
}
function compareIons(a, b){
    if(a.name < b.name){
        return -1;
    }
    else if(a.name > b.name){
        return 1;
    }
    return 0;
}