//The function below will fail if you have not added this to the head tags in your html yet: <meta charset="utf-8" />
//import stuff

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

function subToNum(strToChange){
    strToChange = strToChange.replace(/₀/g, "0");
    strToChange = strToChange.replace(/₁/g, "1");
    strToChange = strToChange.replace(/₂/g, "2");
    strToChange = strToChange.replace(/₃/g, "3");
    strToChange = strToChange.replace(/₄/g, "4");
    strToChange = strToChange.replace(/₅/g, "5");
    strToChange = strToChange.replace(/₆/g, "6");
    strToChange = strToChange.replace(/₇/g, "7");
    strToChange = strToChange.replace(/₈/g, "8");
    strToChange = strToChange.replace(/₉/g, "9");
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
        if(polyIonsList[i].name == ionName){
            return i;
        }
    }
    return -1;
}

function symbolToElement(symbol){
    for(var i = 0; i < elementList.length; i++){
        if(elementList[i].symbol == symbol){
            return elementList[i];
        }
    }
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

function compareNumbers(a, b){
	if(a < b){
		return -1;
	}
	else if(a > b){
		return 1;
	}
	return 0;
}

function compareIonGroupElems(a, b){
	return compareNumbers(a.index, b.index);
}

function compareCompoundQuantities(a, b){
	return compareNumbers(a.ions.length, b.ions.length);
}

function formulaToCompound(formula){
    formula = strSubScript(formula);
    var ionic = false;
    var ionGroupList = new Array();
    var openBracketIndxs = new Array();
    var closedBracketIndxs = new Array();
    //find complex ions
    for(var i = 0; i < formula.length; i++){
        if(formula.charAt(i) == '['){
            openBracketIndxs.push(i);
        }
        else if(formula.charAt(i) == ']'){
            closedBracketIndxs.push(i);
        }
    }
    if(openBracketIndxs.length != closedBracketIndxs.length){
        return null;
    }
    for(i = 0; i < openBracketIndxs.length; i++){ //There are no brackets inside brackets, so we can just check if they match up properly by index
        if(openBracketIndxs[i] > closedBracketIndxs[i]){
            return null;
        } else { //we can use this loop to remove complex ions from the formula and make processing easier
            var procString = formula.substring(openBracketIndxs[i] + 1, closedBracketIndxs[i]); //make sure we are only looking through the complex ion when we search.  Also makes searching faster
			var currentLigands = new Array();
			var currentLigandsQuantities = new Array();
			var currentLigandsIndexes = new Array();
			var elementalLigandsIndexes = new Array(); //array of indexes of the elemental ligands that could exist in this complex ion
            var metal;
			var quantity = 1; //temporary placeholder for the subscript value associated with this complex ion
			var totalLigandTeeth = 0;
			var complexIonSubscriptIndx = closedBracketIndxs[i] + 1;
			while(complexIonSubscriptIndx < formula.length && formula.charAt(complexIonSubscriptIndx) != "[" && formula.charAt(complexIonSubscriptIndx) != "(" && formula.charAt(complexIonSubscriptIndx) != "-" && formula.charAt(complexIonSubscriptIndx).toUpperCase() == formula.charAt(complexIonSubscriptIndx).toLowerCase() ){
				complexIonSubscriptIndx++;
			}
			if(complexIonSubscriptIndx != closedBracketIndxs[i] + 1){
				quantity = Number(subToNum(formula.substring(closedBracketIndxs[i] + 1, complexIonSubscriptIndx)));
			}
            if(procString.charAt(1) == procString.charAt(1).toUpperCase()){ //metal symbol is one character long
                metal = symbolToElement(procString.charAt(0));
            } else { //metal symbol is two characters long
                metal = symbolToElement(procString.substring(0, 2));
            }
            for(var j = 0; j < ligands.length; j++){ //search for ligands in the complex ion
                var ligIndx = procString.indexOf(ligands[j].formulaNoCharge);
				var ligSubScriptIndx; //used to keep track of where the ligand's subscript
				var ligSubScriptQuantity; //quantity of the ligand's subscript
                if(ligIndx > -1){//Complex ion has the ligand
					if(ligands[j].formulaNoCharge == "CN" || ligands[j].formulaNoCharge == "CO"){ //CN and CO could be a copy of a ligand SCN, NCO
						if(ligIndx > 0 && procString.charAt(ligIndx - 1) == "S" && ligands[j].formulaNoCharge == "CN"){
							ligIndx = procString.indexOf("CN", ligIndx + 2);
						}
						else if(ligIndx > 0 && procString.charAt(ligIndx - 1) == "N" && ligands[j].formulaNoCharge == "CO"){
							ligIndx = procString.indexOf("CO", ligIndx + 2);
						}
					}
					if(ligIndx > -1){ //just in case of the CN and CO edge cases
						if(procString.charAt(ligIndx - 1) == "("){ //ligand identity guaranteed.  we can remove it from the string to speed up searching
							ligSubScriptIndx = ligIndx + ligands[j].formulaNoCharge.length + 1; //length + 1 because there will be a ')' at the end of the ligand formula
							while( ligSubScriptIndx < procString.length && procString.charAt(ligSubScriptIndx).toUpperCase() == procString.charAt(ligSubScriptIndx).toLowerCase() && procString.charAt(ligSubScriptIndx) != "(" ){
								ligSubScriptIndx++;
							}
							ligSubScriptQuantity = Number(subToNum(procString.substring(ligIndx + ligands[j].formulaNoCharge.length + 1, ligSubScriptIndx)));
							currentLigands.push(ligands[j]);
							currentLigandsQuantities.push(ligSubScriptQuantity);
							currentLigandsIndexes.push(j);
							procString.replace("("+ligands[j].formulaNoCharge+")"+strSubScript(ligSubScriptQuantity+""),"");
							totalLigandTeeth += ligSubScriptQuantity * ligandTeeth[j];
						} else {//deal with ligands that have no parenthesis
							if(removeSubScript(ligands[j].formulaNoCharge) == ligands[j].formulaNoCharge && ligands[j].charge != 0 && ligands[j].elements.length == 1){ //ligand symbol has no subscript, is not a compound, and has only 1 element, so if its quantity > 1, the following subscript is its quantity
								elementalLigandsIndexes.push(j); //save this in the array to be processed later
							} else { //all ligands that are dealt with here that aren't just elements aren't going to be a copy.  The only problem with this could be SCN being confused for S and CN, but sulfur is a weaker ligand than cyanide, so at worst it will be CNS
								currentLigands.push(ligands[j]);
								currentLigandsQuantities.push(1);
								procString.replace(ligands[j].formulaNoCharge, "");
							} //basically just processing all of the non elemental ligands first

						}
					}
                }
            }
			var elementalLigands = new Array();
			var elementalLigandsQuantities = new Array();
			for(j = 0; j < elementalLigandsIndexes.length; j++){ //now process the elemental ligands
				var ligIndx = procString.indexOf(ligands[elementalLigandsIndexes[j]].formulaNoCharge);
				var ligSubScriptIndx = ligIndx + ligands[elementalLigandsIndexes[j]].formulaNoCharge.length;
				var ligSubScriptQuantity;
				if(ligIndx > -1){ //checking to see if the elemental ligand that existed beforoe exists now (basically preventing duplicates)
					while( ligSubScriptIndx < procString.length && procString.charAt(ligSubScriptIndx).toUpperCase() == procString.charAt(ligSubScriptIndx).toLowerCase() && procString.charAt(ligSubScriptIndx) != "(" ){
						ligSubScriptIndx++;
					}
					if(ligSubScriptIndx == ligIndx + ligands[elementalLigandsIndexes[j]].formulaNoCharge.length){ //There was no subscript
						ligSubScriptQuantity = 1;
					} else {
						ligSubScriptQuantity = Number(subToNum(procString.substring(ligIndx + ligands[elementalLigandsIndexes[j]].formulaNoCharge.length, ligSubScriptIndx)));
					}
					elementalLigands.push(ligands[elementalLigandsIndexes[j]]);
					elementalLigandsQuantities.push(ligSubScriptQuantity);
				}
			}
			var indx1 = 0; //indexes for the elemental and non elemental ligands
			var indx2 = 0;
			var resultLigands = new Array();
			var resultLigandsQuantities = new Array();
			while(indx1 < currentLigands.length){ //loop through both lists and put them into a new array in order of priority
				if(indx2 < elementalLigands.length && elementalLigandsIndexes[indx2] < currentLigandsIndexes[indx1]){
					resultLigands.push(elementalLigands[indx2]);
					resultLigandsQuantities.push(elementalLigandsQuantities[indx2]);
					indx2++;
				} else {
					resultLigands.push(currentLigands[indx1]);
					resultLigandsQuantities.push(currentLigandsQuantities[indx1]);
					indx1++;
				}
			}
			while(indx2 < elementalLigands.length){
				resultLigands.push(elementalLigands[indx2]);
				resultLigandsQuantities.push(elementalLigandsQuantities[indx2]);
				indx2++;
			}		
			var possibleComplexIons = new Array();
			var quantities = new Array();
			for(j = 0; j < metal.ionicOxStates.length; j++){
				possibleComplexIons.push([new Ion([metal], [1], [metal.ionicOxStates[j]], resultLigands, resultLigandsQuantities, null, false)]);
				quantities.push([quantity]);
			}
			ionGroupList.push(new IonGroup(openBracketIndxs[i], possibleComplexIons, quantities));
			var replaceString = "";
			for(j = 0; j < procString.length; j++){ //make a replacement string of -'s so that the indexes of other ions in the string are maintained
				replaceString += "-";
			}
			formula = formula.replace(procString, replaceString);
			ionic = true;
        }
    }

	var possiblePolyIonsWaitlist = new Array();
    for(i = 0; i < polyIonsList.length; i++){ //find guaranteed and possible polyatomic ions
		var quantity;
		var replaceString = "";
		var ionic;
		for(var j = 0; j < polyIonsList[i].formulaNoCharge.length; j++){
			replaceString += "-";
		}
		var polyIonIndex = formula.indexOf(polyIonsList[i].formulaNoCharge); //rough estimate of where the polyatomic ion is
		if((polyIonIndex > 0 && formula.charAt(polyIonIndex - 1) == "(" && polyIonIndex + polyIonsList[i].formulaNoCharge.length < formula.length - 1 && formula.charAt(polyIonIndex + polyIonsList[i].formulaNoCharge.length) == ")" ) || (polyIonIndex > -1 && polyIonsList[i].formulaNoCharge === "NH₄")){ //ions in a formula with parenthesis around them are guaranteed.  so is ammonia
			var firstIonIndex = formula.indexOf(polyIonsList[i].formulaNoCharge);
            var lastIonIndex = firstIonIndex + polyIonsList[i].formulaNoCharge.length - 1;
            if(formula.charAt(lastIonIndex + 1) == ')'){ //find the quantity
                var endIndx = lastIonIndex + 2; //index of the last subscript char after while loop runs
                while(endIndx < formula.length && formula.charAt(endIndx).toUpperCase() == formula.charAt(endIndx).toLowerCase() && formula.charAt(endIndx) != "(" && formula.charAt(endIndx) != "-" && formula.charAt(endIndx) != "["){ //every char that isn't a letter will be a subscript char
                    endIndx++;
                }
                quantity = Number(subToNum(formula.substring(lastIonIndex + 2, endIndx))); //Get the value of the subscript.  endIndx not inclusive because it is either a letter or out of bounds
                for(j = 0; j < quantity.toString().length + 2; j++){
					replaceString += "-"; //need to add more -'s to account for the subscript and the parenthesis
				}
				formula = formula.replace("("+polyIonsList[i].formulaNoCharge+")"+strSubScript(quantity+""),replaceString);
            } else { //it's ammonia and quantity = 1
                quantity = 1;
                formula = formula.replace(polyIonsList[i].formulaNoCharge, replaceString);
            }
			if(polyIonsList[i].formulaNoCharge == "MnO₄"){ //MnO₄ can be either permanganate or manganate
				ionGroupList.push(new IonGroup(polyIonIndex, [[polyIonsList[polyIonsListIndexOf("permanganate")]], [polyIonsList[polyIonsListIndexOf("manganate")]]], [[quantity],[quantity]]));
			} else {
			   ionGroupList.push(new IonGroup(polyIonIndex, [[polyIonsList[i]]], [[quantity]]));
			}
			ionic = true;
			formula = formula.replace(polyIonsList[i].formulaNoCharge, replaceString);
		}
		else if(polyIonIndex > -1){ //Ions that aren't necessarily guaranteed
			if(collisionPolyAtomicIons.includes(polyIonsList[i])){ //process ions that could be misinterpreted later so that we avoid error Ex: put a potential CN ion away because SCN could be the anion
				possiblePolyIonsWaitlist.push(polyIonsList[i]); //all uncertain ions would only have a quantity of 1
			} else {
				var elementCombosSize = 1;
				var ionCombos = [];
				var ionComboNums = [];
				var tempIon = polyIonsList[i]; //to deal with things like triiodide, which is modelled to its structure
				var elemList = []; //just a list to check for allElemsUnique
				var elemListQuantities = [];
				var allElemsUnique = true;
				for(var j = 0; j < polyIonsList[i].elements.length; j++){ //have to check for ionic first so that we know whichlist to use.
					if(polyIonsList[i].elements[j].metal){
						ionic = true;
					}
					if(!elemList.includes(polyIonsList[i].elements[j])){
						elemList.push(polyIonsList[i].elements[j]);
						elemListQuantities.push(polyIonsList[i].quantities[j]);
					} else {
						allElemsUnique = false;
						elemListQuantities[elemList.indexOf(polyIonsList[i].elements[j])] += polyIonsList[i].quantities[j];
					}
				}
				if(!allElemsUnique){
					tempIon = new Ion(elemList, elemListQuantities, [], [], [], "", false); //just put in some placeholder thing that will work here
				}
				for(j = 0; j < tempIon.elements.length; j++){
					if(ionic){
						elementCombosSize *= tempIon.elements[j].ionicOxStates.length;
					} else {
						elementCombosSize *= tempIon.elements[j].normCovalentOxStates.length;
					}
				}
				var elementCombosNum = elementCombosSize;
				for(j = 0; j < elementCombosSize; j++){
					ionCombos.push([]);
					ionComboNums.push([]);
				}
				for(j = 0; j < tempIon.elements.length; j++){
					var list;
					if(ionic){
						list = tempIon.elements[j].ionicOxStates;
					} else {
						list = tempIon.elements[j].normCovalentOxStates;
					}
					elementCombosNum /= list.length;
					for(var h = 0; h < elementCombosSize; h++){
						var currIon = new Ion(
							[polyIonsList[i].elements[j]],
							[1],
							[list[Math.floor(h/elementCombosNum) % list.length]],
							[],
							[],
							null,
							true
						);
						ionCombos[h].push(currIon);
						ionComboNums[h].push(tempIon.quantities[j]);
					}
				}
				//manganate and permanganate case doesn't trigger here because they are collisions of each other.  they would be pushed off to possiblePolyIonsWaitlist
				ionCombos.push([polyIonsList[i]]);
				ionComboNums.push([1]);
				ionGroupList.push(new IonGroup(polyIonIndex, ionCombos, ionComboNums));
				formula = formula.replace(polyIonsList[i].formulaNoCharge, replaceString);
			}
			
		}
    }
    for(i = 0; i < possiblePolyIonsWaitlist.length; i++){
		var polyIonIndex = formula.indexOf(possiblePolyIonsWaitlist[i].formulaNoCharge);
		if(polyIonIndex > -1){
			var replaceString = "";
			for(var j = 0; j < possiblePolyIonsWaitlist[i].formulaNoCharge.length; j++){
				replaceString += "-";
			}
			var elementCombosSize = 1;
			var ionCombos = [];
			var ionComboNums = [];
			for(j = 0; j < possiblePolyIonsWaitlist[i].elements.length; j++){
				if(possiblePolyIonsWaitlist[i].elements[j].metal){
					ionic = true;
				}
			}
			for(j = 0; j < possiblePolyIonsWaitlist[i].elements.length; j++){
				if(ionic){
					elementCombosSize *= possiblePolyIonsWaitlist[i].elements[j].ionicOxStates.length;
				} else {
					elementCombosSize *= possiblePolyIonsWaitlist[i].elements[j].normCovalentOxStates.length;
				}
			}
			var elementCombosNum = elementCombosSize;
			for(j = 0; j < elementCombosSize; j++){
				ionCombos.push([]);
				ionComboNums.push([]);
			}
			for(j = 0; j < possiblePolyIonsWaitlist[i].elements.length; j++){ //make a truth table
				var list;
				if(ionic){
					list = possiblePolyIonsWaitlist[i].elements[j].ionicOxStates;
				} else {
					list = possiblePolyIonsWaitlist[i].elements[j].normCovalentOxStates;
				}
				for(var h = 0; h < elementCombosSize; h++){
					elementCombosNum /= list.length;
					var currIon = new Ion(
						[possiblePolyIonsWaitlist[i].elements[j]],
						[1],
						[list[Math.floor(h/elementCombosNum) % list.length]],
						[],
						[],
						null,
						true
					);
					ionCombos[h].push(currIon);
					ionComboNums[h].push(possiblePolyIonsWaitlist[i].quantities[j]);
				}
			}
			if(possiblePolyIonsWaitlist[i].formulaNoCharge == "MnO₄"){
				ionCombos.push([polyIonsList[polyIonsListIndexOf("permanganate")]]);
				ionComboNums.push([1]);
				ionCombos.push([polyIonsList[polyIonsListIndexOf("manganate")]]);
				ionComboNums.push([1]);
			} else {
				ionCombos.push([possiblePolyIonsWaitlist[i]]);
				ionComboNums.push([1]);
			}
			ionGroupList.push(new IonGroup(polyIonIndex, ionCombos, ionComboNums));
			formula = formula.replace(possiblePolyIonsWaitlist[i].formulaNoCharge, replaceString);
		}
	}
	var nonmetalElems = new Array();
	for(i = 0; i < formula.length; i++){
		if(formula.charAt(i).toUpperCase() != formula.charAt(i).toLowerCase() && formula.charAt(i) == formula.charAt(i).toUpperCase()){ //check for uppercase letters
			var symbol2 = i < formula.length - 1 && formula.charAt(i+1).toUpperCase() != formula.charAt(i+1).toLowerCase() && formula.charAt(i+1) == formula.charAt(i+1).toLowerCase();
			var elem1;
			var subscriptEndIndx; //index of where the subscript of this element begins
			var subscriptQuantity = 1;
			var elementCombos = [];
			var elementComboNums = [];
			if(symbol2){ //if element has two symbols
				elem1 = symbolToElement(formula.charAt(i)+formula.charAt(i+1));
				subscriptEndIndx = i+2;
			} else {
				elem1 = symbolToElement(formula.charAt(i));
				subscriptEndIndx = i+1;
			}
			while(subscriptEndIndx < formula.length && formula.charAt(subscriptEndIndx).toUpperCase() == formula.charAt(subscriptEndIndx).toLowerCase() && formula.charAt(subscriptEndIndx) != "(" && formula.charAt(subscriptEndIndx) != "-" && formula.charAt(subscriptEndIndx) != "["){
				subscriptEndIndx++;
			}
			if(symbol2 && subscriptEndIndx != i+2 || !symbol2 && subscriptEndIndx != i+1){
				if(symbol2){
					subscriptQuantity = Number(subToNum(formula.substring(i+2, subscriptEndIndx)));
				} else {
					subscriptQuantity = Number(subToNum(formula.substring(i+1, subscriptEndIndx)));
				}
			}
			if(!elem1.metal){
				elementCombos.push([new Ion([elem1], [1], [elem1.ionicOxStates[0]], [], [], null, true)]);
				elementComboNums.push([subscriptQuantity]);
				nonmetalElems.push(new IonGroup(i, elementCombos, elementComboNums));
			} else {
				for(var j = 0; j < elem1.ionicOxStates.length; j++){
					elementCombos.push([new Ion([elem1], [1], [elem1.ionicOxStates[j]], [], [], null, true)]);
					elementComboNums.push([subscriptQuantity]);
				}
				ionGroupList.push(new IonGroup(i, elementCombos, elementComboNums));
				ionic = true;
			}
		}
	}
    if(!ionic){ //for loops are split because the loop would need to check if the compound was ionic multiple times if it wasn't split
		for(i = 0; i < nonmetalElems.length; i++){
			var currElem = nonmetalElems[i].ionList[0][0].elements[0]; //current element is the first element in the ion
			var quantity = nonmetalElems[i].ionQuantities[0][0]; //quantity is the first element's quantity
			for(var j = 1; j < currElem.normCovalentOxStates.length; j++){
				nonmetalElems[i].ionList.push([new Ion([currElem],[1],[currElem.normCovalentOxStates[j]],[],[], null, true)]);
				nonmetalElems[i].ionQuantities.push([quantity]);
			}
			ionGroupList.push(nonmetalElems[i]);
		}
	} else {
		for(i = 0; i < nonmetalElems.length; i++){
			ionGroupList.push(nonmetalElems[i]);
		}
	}	
    ionGroupList.sort(compareIonGroupElems);
	//console.log(ionGroupList);
	var compounds = [];
	var compoundQuantities = [];
	var possibleCompounds = [];
	var allIonsCombosSize = 1;
	var ionSubGroupSize;
	for(i = 0; i < ionGroupList.length; i++){
		allIonsCombosSize *= ionGroupList[i].ionList.length;
	}
	ionSubGroupSize = allIonsCombosSize;
	//Generate a truth table of ions.  This way we can generate all the compound string possibilities in an O(N^2) complexity 
	for(i = 0; i < ionGroupList.length; i++){
		ionSubGroupSize /= (ionGroupList[i].ionList.length);
		for(var j = 0; j < allIonsCombosSize; j++){
			if(i == 0){
				compounds.push(new Array(ionGroupList.length));
				compoundQuantities.push(new Array(ionGroupList.length));
			}
			compounds[j][i] = ionGroupList[i].ionList[Math.floor(j/ionSubGroupSize) % ionGroupList[i].ionList.length];
			compoundQuantities[j][i] = ionGroupList[i].ionQuantities[Math.floor(j/ionSubGroupSize) % ionGroupList[i].ionList.length];
		}
	}
	for(i = 0; i < compounds.length; i++){
		var realCompoundList = [];
		var realQuantitiesList = [];
		var charge = 0;
		for(var j = 0; j < compounds[i].length; j++){
			for(var k = 0; k < compounds[i][j].length; k++){
				charge += compounds[i][j][k].charge * compoundQuantities[i][j][k];
				realCompoundList.push(compounds[i][j][k]);
				realQuantitiesList.push(compoundQuantities[i][j][k]);
			}
		}
		if(charge == 0){
			var stillPasses = true;
			//First, test to see if the given charges make sense in the context of electronegativity.  For instance, SClF should not have Chlorine (3+), Sulfur (2-), and Fluorine (1-) as a possibility
			var positiveList = [];
			var negativeList = [];
			for(var j = 0; j < realCompoundList.length; j++){
				if(realCompoundList[j].quantityLigandSum < 2){ //The electronegativity check only applies for monoatomic ions
					if(realCompoundList[j].charge > 0){
						positiveList.push(realCompoundList[j]);
					} else {
						negativeList.push(realCompoundList[j]);
					}
				}
			}
			if(positiveList.length > 0 && negativeList.length > 0){
				var elecnegSortFunc = function (ion1, ion2){return compareNumbers(ion1.elements[0].electronegativity, ion2.elements[0].electronegativity)};
				positiveList.sort(elecnegSortFunc);
				negativeList.sort(elecnegSortFunc);
				//the most electronegative element in the positive list should still be less electronegative than the least electronegative element in the negative list
				stillPasses = positiveList[positiveList.length - 1].elements[0].electronegativity < negativeList[0].elements[0].electronegativity;
			}
			if(stillPasses){
				possibleCompounds.push(new Compound(realCompoundList, realQuantitiesList));
			}
		}
	}
	if(possibleCompounds.length == 0){//time to check for things like Manganese(II,III) oxide
		if(ionGroupList.length == 2 && ionGroupList[0].ionList[0][0].quantityLigandSum < 2 && ionGroupList[0].ionList[0][0].elements[0].groupNumber > 3 && ionGroupList[0].ionList[0][0].elements[0].groupNumber < 12 ){
			//do basically what the generator does to get all possible combos of charges for the transition metal
			var currTransitionMetal = ionGroupList[0].ionList[0][0].elements[0];
			var chargeCaps = [];
			var chargeCombos = [];
			var chargeQuantities = [];
			for(var i = 0; i < ionGroupList[1].ionList.length; i++){
				if(ionGroupList[1].ionList[i].length < 2){ //multi ion things like sulfide oxide are just not happening
					chargeCaps.push(ionGroupList[1].ionList[i][0].charge * ionGroupList[1].ionQuantities[i][0]);
				} else {
					chargeCaps.push(0); //this will make the stuff automatically fail
				}
			}
			for(i = 0; i < currTransitionMetal.ionicOxStates.length - 1; i++){
				for(var j = currTransitionMetal.ionicOxStates.length - 1; j > 0; j--){
					if(currTransitionMetal.ionicOxStates[j] - currTransitionMetal.ionicOxStates[i] == 1){
						chargeCombos.push([new Ion([currTransitionMetal], [1], [currTransitionMetal.ionicOxStates[i]], [], [], null, true), 
						new Ion([currTransitionMetal], [1], [currTransitionMetal.ionicOxStates[j]], [], [], null, true)]);
						chargeQuantities.push([1, 1]);
					}
				}
			}
			for(i = 0; i < chargeCaps.length; i++){
				for(var j = 0; j < chargeCombos.length; j++){
					while(chargeCombos[j][0].charge * chargeQuantities[j][0] + chargeCombos[j][1].charge * chargeQuantities[j][1] + chargeCaps[i] < 0){
						while(chargeCombos[j][0].charge * chargeQuantities[j][0] + chargeCombos[j][1].charge * chargeQuantities[j][1] + chargeCaps[i] < 0){ //have to repeat twice because we are ticking both #'s
							chargeQuantities[j][1]++;
						}
						if(chargeQuantities[j][0] + chargeQuantities[j][1] == ionGroupList[0].ionQuantities[0] && chargeCombos[j][0].charge * chargeQuantities[j][0] + chargeCombos[j][1].charge * chargeQuantities[j][1] + chargeCaps[i] == 0){
							possibleCompounds.push(new Compound(chargeCombos[j].concat([ionGroupList[1].ionList[i][0]]), chargeQuantities[j].concat([ionGroupList[1].ionQuantities[i][0]])));
						}
						chargeQuantities[j][1] = 1;
						chargeQuantities[j][0]++;
					}
					//last check
					if(chargeQuantities[j][0] + chargeQuantities[j][1] == ionGroupList[0].ionQuantities[0] && chargeCombos[j][0].charge * chargeQuantities[j][0] + chargeCombos[j][1].charge * chargeQuantities[j][1] + chargeCaps[i] == 0){
						possibleCompounds.push(new Compound(chargeCombos[j].concat(ionGroupList[1].ionList[i]), chargeQuantities[j].concat(ionGroupList[1].ionQuantities[i][0])));
					}					
				}
			}
		}
	}
	possibleCompounds.sort(compareCompoundQuantities);
	return possibleCompounds;
}

//this function requires rref.js for it to work
//Precondition: rxn already has arrays for the reactants, reactantQuantities, products, and productQuantities
function balanceEquation(rxn){
    //Create a matrix of equations for each element
    var elems = new Array();
    var balanceMatrix = new Array();
    for(var i = 0; i < rxn.reactants.length; i++){
        for(var j = 0; j < rxn.reactants[i].ions.length; j++){
            for(var k = 0; k < rxn.reactants[i].ions[j].elements.length; k++){
                if(elems.indexOf(rxn.reactants[i].ions[j].elements[k].symbol) < 0){
                    elems.push(rxn.reactants[i].ions[j].elements[k].symbol);
                    balanceMatrix.push(new Array(rxn.reactants.length + rxn.products.length + 1));
                    for(var zeroset = 0; zeroset < balanceMatrix[0].length; zeroset++){
                        balanceMatrix[balanceMatrix.length-1][zeroset] = 0;
                    }
                }
                balanceMatrix[elems.indexOf(rxn.reactants[i].ions[j].elements[k].symbol)][i] = rxn.reactants[i].ions[j].quantities[k]*rxn.reactants[i].quantities[j];
                //Above is the calculation for the quantity of the coefficient for the term in the matrix.  For example, Cl2 would have a coefficient of 2, since the coefficient represents the quantity of the element in the compound
            }
            for(k = 0; k < rxn.reactants[i].ions[j].ligands.length; k++){
                if(rxn.reactants[i].ions[j].ligands[k].elements == null){ //Ligand is a compound
                    for(var l = 0; l < rxn.reactants[i].ions[j].ligands[k].ions.length; l++){
                        for(var m = 0; m < rxn.reactants[i].ions[j].ligands[k].ions[l].elements.length; m++){
                            if(elems.indexOf(rxn.reactants[i].ions[j].ligands[k].ions[l].elements[m].symbol) < 0){
                                elems.push(rxn.reactants[i].ions[j].ligands[k].ions[l].elements[m].symbol);
                                balanceMatrix.push(new Array(rxn.reactants.length + rxn.products.length + 1));
                                balanceMatrix[balanceMatrix.length-1][balanceMatrix[0].length-1] = 0;
                            }
                            for(var zeroset = 0; zeroset < balanceMatrix[0].length; zeroset++){
                                balanceMatrix[balanceMatrix.length-1][zeroset] = 0;
                            }                        }
                    }
                } else {
                    for(l = 0; l < rxn.reactants[i].ions[j].ligands[k].elements.length; l++){
                        if(elems.indexOf(rxn.reactants[i].ions[j].ligands[k].elements[l].symbol) < 0){
                            elems.push(rxn.reactants[i].ions[j].ligands[k].elements[l].symbol);
                            balanceMatrix.push(new Array(rxn.reactants.length + rxn.products.length + 1));
                            for(var zeroset = 0; zeroset < balanceMatrix[0].length; zeroset++){
                                balanceMatrix[balanceMatrix.length-1][zeroset] = 0;
                            }                        }
                        balanceMatrix[elems.indexOf(rxn.reactants[i].ions[j].ligands[k].elements[l].symbol)][i] = rxn.reactants[i].ions[j].ligands[k].quantities[l]*rxn.reactants[i].ions[j].ligandQuantities[k]*rxn.reactants[i].quantities[j];
                    }
                }
            }
        }
    }
    for(var i = 0; i < rxn.products.length; i++){
        for(var j = 0; j < rxn.products[i].ions.length; j++){
            for(var k = 0; k < rxn.products[i].ions[j].elements.length; k++){
                if(elems.indexOf(rxn.products[i].ions[j].elements[k].symbol) < 0){
                    return null;
                }
                balanceMatrix[elems.indexOf(rxn.products[i].ions[j].elements[k].symbol)][i+rxn.reactants.length] = rxn.products[i].ions[j].quantities[k]*rxn.products[i].quantities[j]*-1;
                //Above is the calculation for the quantity of the coefficient for the term in the matrix.  For example, Cl2 would have a coefficient of 2, since the coefficient represents the quantity of the element in the compound
            }
            for(k = 0; k < rxn.products[i].ions[j].ligands.length; k++){
                if(rxn.products[i].ions[j].ligands[k].elements == null){ //Ligand is a compound
                    for(var l = 0; l < rxn.products[i].ions[j].ligands[k].ions.length; l++){
                        for(var m = 0; m < rxn.products[i].ions[j].ligands[k].ions[l].elements.length; m++){
                            if(elems.indexOf(rxn.products[i].ions[j].ligands[k].ions[l].elements[m].symbol) < 0){
                                return null;
                            }
                            balanceMatrix[elems.indexOf(rxn.products[i].ions[j].ligands[k].ions[l].elements[m].symbol)][i+rxn.reactants.length] = rxn.products[i].ions[j].ligands[k].ions[l].quantities[m]*rxn.products[i].ions[j].ligands[k].quantities[l]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].quantities[j]*-1;
                        }
                    }
                } else {
                    for(l = 0; l < rxn.products[i].ions[j].ligands[k].elements.length; l++){
                        if(elems.indexOf(rxn.products[i].ions[j].ligands[k].elements[l].symbol in elems)){
                            return null;
                        }
                        balanceMatrix[elems.indexOf(rxn.products[i].ions[j].ligands[k].elements[l].symbol)][i+rxn.reactants.length] = rxn.products[i].ions[j].ligands[k].quantities[l]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].quantities[j]*-1;
                    }
                }
            }
        }
    }
    //remove rows at the bottom that are the same, since they do not help with solving for the coefficients
    var indx = balanceMatrix.length - 1;
    if(indx > 0){
        while(indx > 0 && balanceMatrix[indx].toString() === balanceMatrix[indx-1].toString()){
            balanceMatrix.splice(indx, 1);
            indx--;
        }
    }
    //clone balanceMatrix so its data isn't lost
    var oldBalanceMatrix = new Array(balanceMatrix.length);
    for(i = 0; i < balanceMatrix.length; i++){
        oldBalanceMatrix[i] = new Array(balanceMatrix[0].length);
        for(j = 0; j < balanceMatrix[0].length; j++){
            oldBalanceMatrix[i][j] = balanceMatrix[i][j];
        }
    }
    var almostReady = rref(balanceMatrix);
    var lowCoef = Math.abs(almostReady[0][almostReady[0].length - 2]); //variable for storing the lowest coefficient.  Needed to make all coefs integers.
    if(elems.length != balanceMatrix[0].length){ //action if the matrix has not already solved the equation.  This action assumes that there will only be one thing missing.
        indx = 0;
        while(indx < oldBalanceMatrix.length && oldBalanceMatrix[indx][oldBalanceMatrix[0].length - 2] != 0){ //Last coefficient value not solved for, so we will move down until we find a row where the last coefficient val isn't zero
            indx++;
        }

        var lastCoefVal = 0; //solve for the last coefficient value
        for(i = 0; i < oldBalanceMatrix[0].length - 2; i++){
            var changeCoefVal = Math.abs(oldBalanceMatrix[indx][i]*almostReady[i][almostReady[i].length - 2]);
            var checkLowCoef = Math.abs(almostReady[i][almostReady[i].length - 2]);
            if(i < rxn.reactants.length){
                lastCoefVal += changeCoefVal;
                rxn.reactantQuantities[i] = Math.abs(almostReady[i][almostReady[i].length - 2]);
            } else {
                lastCoefVal -= changeCoefVal;
                rxn.productQuantities[i-rxn.reactants.length] = Math.abs(almostReady[i][almostReady[i].length - 2]);
            }
            if(lowCoef > checkLowCoef){
                lowCoef = checkLowCoef;
            }
        }
        lastCoefVal /= Math.abs(oldBalanceMatrix[indx][oldBalanceMatrix.length-2]);
        rxn.productQuantities[rxn.products.length - 1] = Math.abs(lastCoefVal);
        if(lowCoef > lastCoefVal){
            lowCoef = lastCoefVal;
        }
    } else {
        for(i = 0; i < almostReady.length; i++){
            if(i < rxn.reactants.length){
                rxn.reactantQuantities[i] = Math.abs(almostReady[i][almostReady[i].length - 1]);
            } else {
                rxn.productQuantities[i-rxn.reactants.length] = Math.abs(almostReady[i][almostReady[i].length - 1]);
            }
        }
    }
    //now divide all of the coefficients by the lowest one to make them a whole number
    for(i = 0; i < rxn.reactants.length; i++){
        rxn.reactantQuantities[i] /= lowCoef;
    }
    for(i = 0; i < rxn.products.length; i++){
        rxn.productQuantities[i] /= lowCoef;
    }
    //console.log(rxn.reactionString);
    //console.log("oof");
    return rxn;
}

function checkBalance(rxn){
    var reactantElems = {}; //Using a map instead of parallel arrays
    var productElems = {};
    for(var i = 0; i < rxn.reactants.length; i++){
        for(var j = 0; j < rxn.reactants[i].ions.length; j++){
            for(var k = 0; k < rxn.reactants[i].ions[j].elements.length; k++){
                if(rxn.reactants[i].ions[j].elements[k].symbol in reactantElems){
                    reactantElems[rxn.reactants[i].ions[j].elements[k].symbol] += rxn.reactantQuantities[i]*rxn.reactants[i].quantities[j]*rxn.reactants[i].ions[j].quantities[k];
                } else {
                    reactantElems[rxn.reactants[i].ions[j].elements[k].symbol] = rxn.reactantQuantities[i]*rxn.reactants[i].quantities[j]*rxn.reactants[i].ions[j].quantities[k];
                }
            }
            for(k = 0; k < rxn.reactants[i].ions[j].ligands.length; k++){
                if(rxn.reactants[i].ions[j].ligands[k].elements == null){ //Ligand is a compound
                    for(var l = 0; l < rxn.reactants[i].ions[j].ligands[k].ions.length; l++){
                        for(var m = 0; m < rxn.reactants[i].ions[j].ligands[k].ions[l].elements.length; m++){
                            if(rxn.reactants[i].ions[j].ligands[k].ions[l].elements[m].symbol in reactantElems){
                                reactantElems[rxn.reactants[i].ions[j].ligands[k].ions[l].elements[m].symbol] += rxn.reactantQuantities[i]*rxn.reactants[i].ions[j].ligandQuantities[k]*rxn.reactants[i].ions[j].ligands[k].quantities[l]*rxn.reactants[i].ions[j].ligands[k].ions[l].quantities[m];
                            } else {
                                reactantElems[rxn.reactants[i].ions[j].ligands[k].ions[l].elements[m].symbol] = rxn.reactantQuantities[i]*rxn.reactants[i].ions[j].ligandQuantities[k]*rxn.reactants[i].ions[j].ligands[k].quantities[l]*rxn.reactants[i].ions[j].ligands[k].ions[l].quantities[m];
                            }
                        }
                    }
                } else {
                    for(l = 0; l < rxn.reactants[i].ions[j].ligands[k].elements.length; l++){
                        if(rxn.reactants[i].ions[j].ligands[k].elements[l].symbol in reactantElems){
                            reactantElems[rxn.reactants[i].ions[j].ligands[k].elements[l].symbol] += rxn.reactantQuantities[i]*rxn.reactants[i].ions[j].ligandQuantities[k]*rxn.reactants[i].ions[j].ligands[k].quantities[l];
                        } else {
                            reactantElems[rxn.reactants[i].ions[j].ligands[k].elements[l].symbol] = rxn.reactantQuantities[i]*rxn.reactants[i].ions[j].ligandQuantities[k]*rxn.reactants[i].ions[j].ligands[k].quantities[l];
                        }
                    }
                }
            }
        }
    }
    for(i = 0; i < rxn.products.length; i++){
        for(j = 0; j < rxn.products[i].ions.length; j++){
            for(k = 0; k < rxn.products[i].ions[j].elements.length; k++){
                if(rxn.products[i].ions[j].elements[k].symbol in productElems){
                    productElems[rxn.products[i].ions[j].elements[k].symbol] += rxn.productQuantities[i]*rxn.products[i].quantities[j]*rxn.products[i].ions[j].quantities[k];
                } else {
                    productElems[rxn.products[i].ions[j].elements[k].symbol] = rxn.productQuantities[i]*rxn.products[i].quantities[j]*rxn.products[i].ions[j].quantities[k];
                }
            }
            for(k = 0; k < rxn.products[i].ions[j].ligands.length; k++){
                if(rxn.products[i].ions[j].ligands[k].elements == null){ //Ligand is a compound
                    for(l = 0; l < rxn.products[i].ions[j].ligands[k].ions.length; l++){
                        for(m = 0; m < rxn.products[i].ions[j].ligands[k].ions[l].elements.length; m++){
                            if(rxn.products[i].ions[j].ligands[k].ions[l].elements[m].symbol in productElems){
                                productElems[rxn.products[i].ions[j].ligands[k].ions[l].elements[m].symbol] += rxn.productQuantities[i]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].ions[j].ligands[k].quantities[l]*rxn.products[i].ions[j].ligands[k].ions[l].quantities[m];
                            } else {
                                productElems[rxn.products[i].ions[j].ligands[k].ions[l].elements[m].symbol] = rxn.productQuantities[i]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].ions[j].ligands[k].quantities[l]*rxn.products[i].ions[j].ligands[k].ions[l].quantities[m];
                            }
                        }
                    }
                } else {
                    for(l = 0; l < rxn.products[i].ions[j].ligands[k].elements.length; l++){
                        if(rxn.products[i].ions[j].ligands[k].elements[l].symbol in productElems){
                            productElems[rxn.products[i].ions[j].ligands[k].elements[l].symbol] += rxn.productQuantities[i]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].ions[j].ligands[k].quantities[l];
                        } else {
                            productElems[rxn.products[i].ions[j].ligands[k].elements[l].symbol] = rxn.productQuantities[i]*rxn.products[i].ions[j].ligandQuantities[k]*rxn.products[i].ions[j].ligands[k].quantities[l];
                        }
                    }
                }
            }
        }
    }
    var tempMap = {};
    var tempMap2 = {};
    Object.keys(reactantElems).sort().forEach(function(key){
        tempMap[key] = reactantElems[key];
    });
    reactantElems = tempMap;

    Object.keys(productElems).sort().forEach(function(key){
        tempMap2[key] = productElems[key];
    });
    productElems = tempMap2;
    var reactantStr = "", productStr = "";
    for(i in reactantElems){
        reactantStr+=i+reactantElems[i];
    }
    for(i in productElems){
        productStr+=i+productElems[i];
    }
    return reactantStr === productStr;
}
