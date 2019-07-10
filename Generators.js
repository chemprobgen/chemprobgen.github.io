//Credit to Ryan Kim
function randomElementGenerator(min, max){
    return elementList[randInt(min, max)];
}
function randomIonGenerator(nonmetal, complex, positive, acceptableElemsList, acceptableIonsList){
    var randomNum;
    if(nonmetal){
		randomNum = 1;
	}
	else if(complex){
        randomNum = 3;
    } else {
        if(positive){
            if(randInt(0, 21) == 0){ // 1/20 chance for ammonium
                randomNum = 0;
            } else {
                randomNum = 1;
            }
        } else {
            randomNum = randInt(0,2);
        }
    }
    if(randomNum == 0){ //polyatomic ion selector
        var ionIndex = randInt(0, acceptableIonsList.length);
        if(positive){
            while(acceptableIonsList[ionIndex].charge < 0){
                ionIndex = randInt(0, acceptableIonsList.length);
            }
            
        } else {
            while(acceptableIonsList[ionIndex].charge > 0){
                ionIndex = randInt(0, acceptableIonsList.length);
            }
        }
        return acceptableIonsList[ionIndex];
    }
    else if(randomNum == 1){ //random element ion generator
        var elemIndex = randInt(0, acceptableElemsList.length);
        while(!hasCharge(positive,acceptableElemsList[elemIndex]) || 
		(acceptableElemsList[elemIndex].metal && nonmetal) ||
		(!nonmetal && positive && !acceptableElemsList[elemIndex].metal && acceptableElemsList[elemIndex].number != 1 )){
			elemIndex = randInt(0, acceptableElemsList.length);
        }
		var element = acceptableElemsList[elemIndex];
        var name;
        var charge;
        if(positive){
            if(element.metal){ //Metals don't usually form standalone ions where they have oxidation states of things like +6 or +7
                charge = element.ionicOxStates[randInt(0, element.ionicOxStates.length)]; //We don't need to verify if it's positive or not because metals are always in positive states when ionicly bonded    
            } else {
                charge = element.normCovalentOxStates[randInt(0, element.normCovalentOxStates.length)];
                while(charge < 0){ //If we have a nonmetal, we need to make sure that it is in a positive oxidation state
                    charge = element.normCovalentOxStates[randInt(0, element.normCovalentOxStates.length)];
                }
            }
        } else {
            charge = element.ionicOxStates[0]; //Since things like peroxide will be treated as polyatomic ions, each element should only really have one negative state
        }
        return new Ion([element],[1],[charge],[],[],null, true); //quantity is hardcoded because we will consider things like mercury(I) and peroxide as polyatomic ions
    } else { //Just so you know, I am NOT doing bridging ligands.  Also, complex ions will be fully filled with the maximum number of ligands they can hold.
        var metalCation = acceptableElemsList[randInt(0, acceptableElemsList.length)];
        while(metalCation.groupNumber < 3 || !metalCation.metal){
            metalCation = acceptableElemsList[randInt(0, acceptableElemsList.length)];
        }
        var metalCharge = metalCation.ionicOxStates[randInt(0, metalCation.ionicOxStates.length)];
        var maxLigands = 6;
        if(metalCharge < 3 && metalCation.number != 26 && metalCation.number != 28){ //IDK, Iron just seems to stick with 6 no matter what.  
            maxLigands = metalCharge * 2;
        }
        var ligandQuantities = new Array();
        charge = 0;
        var insertedLigands = new Array();
        while(((charge <= 0 && positive) || (charge >= 0 && !positive))){
            ligandQuantities = [];
            insertedLigands = [];
            maxLigands = 6;
            if(metalCharge < 3 && metalCation.number != 26&& metalCation.number != 28){ //IDK, Iron just seems to stick with 6 no matter what.  
                maxLigands = metalCharge * 2;
            }
            var prevLigandIndex = 0;
            var ligandIndex = 0;
            while(maxLigands > 0 && prevLigandIndex <= ligands.length - 1){
                ligandIndex = randInt(prevLigandIndex, ligands.length);
                while(ligandTeeth[ligandIndex] > maxLigands){
                    ligandIndex = randInt(prevLigandIndex, ligands.length);
                }
                insertedLigands.push(ligands[ligandIndex]);
                var qtyToAdd = randInt(1, Math.floor(maxLigands/ligandTeeth[ligandIndex]) + 1);
                
                if(ligandIndex == ligands.length - 1){ //Weakest ligand on the list will have one tooth.  Phew.
                    qtyToAdd = maxLigands;
                }
                ligandQuantities.push(qtyToAdd);
                maxLigands -= qtyToAdd * ligandTeeth[ligandIndex];
                prevLigandIndex = ligandIndex + 1;
            }
            charge = metalCharge;
            for(i = 0; i < insertedLigands.length; i++){
                charge += insertedLigands[i].charge * ligandQuantities[i];
            }
        }
        return new Ion([metalCation], [1], [metalCharge], insertedLigands, ligandQuantities, null, true);
    }
}

function randNormIonGenerator(covalent, complex, acceptableElemsList, acceptableIonsList){
    if(randInt(0, 2) == 0){
        return randomIonGenerator(covalent, complex, true, acceptableElemsList, acceptableIonsList);
    } else {
        return randomIonGenerator(covalent, complex, false, acceptableElemsList, acceptableIonsList);
    }
}

function randomCompoundGenerator(percentCovalent, percentComplicated, percentComplex, acceptableElemsList, acceptableIonsList){ //percents are decimals.  For instance, 0.7 = 70%
    var positiveIons = new Array();
    var positiveIonsQuantities = new Array();
    var negativeIons = new Array();
    var negativeIonsQuantities = new Array();
    var allIons = new Array();
    var allIonsQuantities = new Array();
	var isCovalent = Math.random() < percentCovalent;
    var isComplex = Math.random() < percentComplex && !isCovalent;
    if(Math.random() < percentComplicated){
		var passes = false;
		while((positiveIonsQuantities.length < 2 && negativeIonsQuantities.length < 2) || !passes){
			var numStart = randInt(1, 4); //Keep it reasonable.  1-3 starting ions (4 is exclusive)
			var fillPositiveFirst = randInt(0, 2) == 0;
			var firstArray = new Array();
			var firstArrayQuantities = new Array();
			var totalChargeFirst = 0;
			var secondArray = new Array();
			var secondArrayQuantities = new Array();
			var totalChargeSecond = 0;
			var maxQty = 3;
			for(i = 0; i < numStart; i++){
				isComplex = Math.random() < percentComplex && !isCovalent;
				firstArrayQuantities.push(randInt(1, maxQty + 1));
				firstArray.push(randomIonGenerator(isCovalent, isComplex, fillPositiveFirst, acceptableElemsList, acceptableIonsList));
			}
			//console.log(firstArray);
			for(i = 0; i < firstArray.length; i++){
				totalChargeFirst += firstArray[i].charge * firstArrayQuantities[i];
			}
			while(secondArray.length > maxQty || secondArray.length == 0){ //We don't want there to be too many ions
				secondArray = [];
				secondArrayQuantities = [];
				totalChargeSecond = 0;
				//We have filled up the first array with ions and their quantities.  Now we need to accordingly add ions to the second array, similar to how the multiple teeth ligands generator worked.
				while(totalChargeFirst + totalChargeSecond != 0){
					isComplex = Math.random() < percentComplex && !isCovalent;
					var ionToAdd = randomIonGenerator(isCovalent, isComplex, !fillPositiveFirst, acceptableElemsList, acceptableIonsList);
					while(Math.abs(ionToAdd.charge) > Math.abs(totalChargeFirst + totalChargeSecond)){
						ionToAdd = randomIonGenerator(isCovalent, isComplex, !fillPositiveFirst, acceptableElemsList, acceptableIonsList); //We should always be able to get an ion with the charge of one
					}
					secondArray.push(ionToAdd);
					var qtyToAdd = randInt(1, Math.abs(Math.floor((totalChargeFirst+totalChargeSecond)/ionToAdd.charge)));
					secondArrayQuantities.push(qtyToAdd);
					totalChargeSecond += qtyToAdd * ionToAdd.charge;
					//failsafe in case something goes very wrong...
					if(Math.abs(totalChargeSecond) > Math.abs(totalChargeFirst)){
						secondArray = [];
						secondArrayQuantities = [];
						totalChargeSecond = 0;
					}
				}
			}
			//console.log(secondArray);
			if(fillPositiveFirst){
				positiveIons = firstArray;
				positiveIonsQuantities = firstArrayQuantities;
				negativeIons = secondArray;
				negativeIonsQuantities = secondArrayQuantities;
			} else {
				positiveIons = secondArray;
				positiveIonsQuantities = secondArrayQuantities;
				negativeIons = firstArray;
				negativeIonsQuantities = firstArrayQuantities;
			}
			//Make checks to see if this passes
			var dummyPass = true;
			var hasMetalOrPoly = false;
			var hasPositiveNonmetal = false; //This refers to if there is a positive nonmetal
			var elecNegativities1 = new Array();
			var elecNegativities2 = new Array();
			for(i = 0; i < positiveIons.length; i++){
				if(positiveIons[i].quantities.reduce(function(acc, val){return acc + val;}, 0) > 1 || positiveIons[i].elements[0].metal || positiveIons[i].ligands.length > 0 || positiveIons[i].quantities[0] > 1){
					hasMetalOrPoly = true;
				}
				else if(positiveIons[i].quantities.reduce(function(acc, val){return acc + val;}, 0) < 2 && !positiveIons[i].elements[0].metal && positiveIons[i].elements[0].number != 1){ //H+ is fine
					hasPositiveNonmetal = true;    
				}
				if(positiveIons[i].quantities.reduce(function(acc, val){return acc + val;}, 0) < 2 && positiveIons[i].ligands.length < 1){
					elecNegativities1.push(positiveIons[i].elements[0].electronegativity);
				}
			}
			for(i = 0; i < negativeIons.length; i++){
				if(negativeIons[i].quantityLigandSum > 1){
					hasMetalOrPoly = true;
				}
				if(negativeIons[i].quantityLigandSum < 2){
					elecNegativities2.push(negativeIons[i].elements[0].electronegativity);
				}
			}
			if(hasMetalOrPoly && hasPositiveNonmetal){
				dummyPass = false;
			}
			var sortElecNeg = function (e1, e2) { return compareNumbers(e1, e2); };
			elecNegativities1.sort(sortElecNeg);
			elecNegativities2.sort(sortElecNeg);
			if(elecNegativities1[elecNegativities1.length - 1] > elecNegativities2[0]){ //most electronegative positive element has greater e- than least electronegative negative element
				dummyPass = false;
			}
			
			var checkNoDupes = new Array();
			for(i = 0; i < positiveIons.length; i++){
				if(checkNoDupes.includes(positiveIons[i].formulaNoCharge)){
					dummyPass = false;
				}
				checkNoDupes.push(positiveIons[i].formulaNoCharge);
			}
			for(i = 0; i < negativeIons.length; i++){
				if(checkNoDupes.includes(negativeIons[i].formulaNoCharge)){
					dummyPass = false;
				}
				checkNoDupes.push(negativeIons[i].formulaNoCharge);
			}
			if(!isCovalent){ //if ionic, make sure that not all of the ions are nonmetals and not polyatomic ions/complex ions
				if(!hasMetalOrPoly){
					dummyPass = false;
				}
			}
			passes = dummyPass;
		}
		//We have generated a plausible list!  Now to sort the elements ._.
		var sortListPos = new Array();
		var posOriginalPosition = new Array();
		var sortListNeg = new Array();
		var negOriginalPosition = new Array();
		//We will sort the ions by... Whether or not they are polyatomic, (electronegativity if the ion is not polyatomic), and then formula
		for(i = 0; i < positiveIons.length; i++){
			var sortStr = "";
			if(positiveIons[i].quantities.reduce(function(acc, val){return acc + val;}, 0) + positiveIons[i].ligands.length < 2){
				sortStr += positiveIons[i].elements[0].electronegativity;
			}
			sortListPos.push(sortStr + positiveIons[i].formulaNoCharge);
		}
	   for(i = 0; i < negativeIons.length; i++){
			sortStr = "";
			if(negativeIons[i].quantities.reduce(function(acc, val){return acc + val;}, 0) + negativeIons[i].ligands.length < 2){
				sortStr += negativeIons[i].elements[0].electronegativity;
			}
			sortListNeg.push(sortStr + negativeIons[i].formulaNoCharge);
		}
		sortListPos.sort();
		sortListNeg.sort();
		for(i = 0; i < sortListPos.length; i++){
			for(j = 0; j < positiveIons.length; j++){
				if(sortListPos[i].replace(/[0-9]/g, "").replace(".", "") === positiveIons[j].formulaNoCharge){
					posOriginalPosition.push(j);
				}
			}
		}
		
		for(i = 0; i < sortListNeg.length; i++){
			for(j = 0; j < negativeIons.length; j++){
				if(sortListNeg[i].replace(/[0-9]/g, "").replace(".", "") === negativeIons[j].formulaNoCharge){
					negOriginalPosition.push(j);
				}
			}
		}
		
		for(i = 0; i < posOriginalPosition.length; i++){
			allIons.push(positiveIons[posOriginalPosition[i]]);
			allIonsQuantities.push(positiveIonsQuantities[posOriginalPosition[i]]);
		}
		for(i = 0; i < negOriginalPosition.length; i++){
			allIons.push(negativeIons[negOriginalPosition[i]]);
			allIonsQuantities.push(negativeIonsQuantities[negOriginalPosition[i]]);
		}
    } else {
		if(randInt(0, 26) > 0 || isCovalent){ // 24/25 chance to get a normal binary compound
			isComplex = Math.random() < percentComplex && !isCovalent;
			var negComplex = isComplex;
			negativeIons.push(randomIonGenerator(isCovalent, isComplex, false, acceptableElemsList, acceptableIonsList));
			while(negativeIons[0].elements[0].number == 14 && isCovalent){ //silicide will cause an infinite loop if this is a covalent compound
				negativeIons[0] = randomIonGenerator(isCovalent, isComplex, false, acceptableElemsList, acceptableIonsList);
			}
			isComplex = Math.random() < percentComplex && !isCovalent;
			positiveIons.push(randomIonGenerator(isCovalent, isComplex, true, acceptableElemsList, acceptableIonsList));
			while((positiveIons[0].quantityLigandSum < 2 &&
				negativeIons[0].quantityLigandSum < 2 &&
				positiveIons[0].elements[0].electronegativity > negativeIons[0].elements[0].electronegativity) ||
				(!positiveIons[0].elements[0].metal &&
				(negativeIons[0].quantities.reduce(function(acc, val){return acc + val;}, 0) + negativeIons[0].ligands.length > 1) &&
				positiveIons[0].elements[0].number != 1) ||
				(positiveIons[0].elements[0].number == negativeIons[0].elements[0].number &&
				positiveIons[0].quantities.reduce(function(acc, val){return acc + val;}, 0) + positiveIons[0].ligands.length < 2 &&
				negativeIons[0].quantities.reduce(function(acc, val){return acc + val;}, 0) + negativeIons[0].ligands.length < 2) &&
				!isComplex ||
				(!positiveIons[0].elements[0].metal && 
				positiveIons[0].quantities.reduce(function(acc, val){return acc + val;}, 0) > 1
				&& negComplex) ||
				(!isCovalent && positiveIons[0].quantityLigandSum < 2 && !positiveIons[0].elements[0].metal && negativeIons[0].quantityLigandSum < 2 && !negativeIons[0].elements[0].metal)
			){
				/*while...
					(the positive ion is not a polyatomic ion or it is a complex ion and the negative ion is not a polyatomic ion or complex ion and the electronegativity of the positive ion is more than that of the negative ion) or
					(the positive ion is not a metal and the negative ion is a polyatomic ion and the positive ion is not hydrogen)
					...
					last line: the negative and positive ions are nonmetals and not polyatomic ions/complex ions and this is an ionic compound
				*/
				positiveIons[0] = randomIonGenerator(isCovalent, isComplex, true, acceptableElemsList, acceptableIonsList);
			}
			if(positiveIons[0].charge == 0 || negativeIons[0].charge == 0){
				alert("ERROR!!! Charge was 0" + positiveIons[0].formula + negativeIons[0].formula);
			}
			var chargesLCM = lcm(positiveIons[0].charge, negativeIons[0].charge);
			positiveIonsQuantities.push(chargesLCM/positiveIons[0].charge);
			negativeIonsQuantities.push(Math.abs(chargesLCM/negativeIons[0].charge));
			for(var i = 0; i < positiveIonsQuantities.length; i++){
				allIons.push(positiveIons[i]);
				allIonsQuantities.push(positiveIonsQuantities[i]);
			}
			for(i = 0; i < negativeIonsQuantities.length; i++){
				allIons.push(negativeIons[i]);
				allIonsQuantities.push(negativeIonsQuantities[i]);
			}
		} else { //make a compound like Manganese(II,III) Oxide
            var transitionMetal = acceptableElemsList[randInt(0, acceptableElemsList.length)];
            while(transitionMetal.groupNumber < 3 || transitionMetal.groupNumber > 11 || transitionMetal.ionicOxStates.length < 2){ //Most group 12 transition metals don't really have two consecutive states, and we don't want to deal with mercury.
                transitionMetal = acceptableElemsList[randInt(0, acceptableElemsList.length)];
            }
			var chargeCombos = [];
			for(var i = 0; i < transitionMetal.ionicOxStates.length - 1; i++){
				for(var j = transitionMetal.ionicOxStates.length - 1; j > 0; j--){
					if(transitionMetal.ionicOxStates[j] - transitionMetal.ionicOxStates[i] == 1){
						chargeCombos.push([transitionMetal.ionicOxStates[i], transitionMetal.ionicOxStates[j]]);
					}
				}
			}
            var metalCharges = chargeCombos[randInt(0, chargeCombos.length)];
            var metalQuantities = [1, 1];
            isComplex = Math.random() < percentComplex;
            var anion = randomIonGenerator(isCovalent, isComplex, false, acceptableElemsList, acceptableIonsList);
            while(anion.charge > -2){
                anion = randomIonGenerator(isCovalent, isComplex, false, acceptableElemsList, acceptableIonsList); //Anions of charges with -1 don't really form this type of compound
            }
            var anionQuantity = 1;
            var currCharge = metalQuantities[0] * metalCharges[0] + metalQuantities[1] * metalCharges[1] + anion.charge * anionQuantity;
            var passed = true;
            while(currCharge != 0){
                if(currCharge > 0 || !passed){
                    anionQuantity++;
                    currCharge = metalQuantities[0] * metalCharges[0] + metalQuantities[1] * metalCharges[1] + anion.charge * anionQuantity;
                    passed = true;
                }
                
                if(currCharge <= Math.min(metalCharges[0], metalCharges[1]) * -1){ //avoid useless tries 
                    var m1AddCount = 0;
                    var m2AddCount = 0;
                    if(Math.abs(currCharge) % metalCharges[0] == 0){ // If it is divisible, then we can add the metal
                        m1AddCount = Math.abs(currCharge)/metalCharges[0];
                    }
                    if(Math.abs(currCharge) % metalCharges[1] == 0){
                        m2AddCount = Math.abs(currCharge)/metalCharges[1];
                    }
                    if(m1AddCount != 0 && m2AddCount != 0){
                        
                    }
                    else if(m1AddCount != 0){
                        metalQuantities[0] += m1AddCount;
                    }
                    else if(m2AddCount != 0){
                        metalQuantities[1] += m2AddCount;
                    }
                    currCharge = metalQuantities[0] * metalCharges[0] + metalQuantities[1] * metalCharges[1] + anion.charge * anionQuantity;
                }
                passed = false;
            }
            for(i = 0; i < metalCharges.length; i++){
                allIons.push(
                    new Ion(
                        [transitionMetal],
                        [1],
                        [metalCharges[i]],
                        [],
                        [],
                        transitionMetal.name + "(" + romanize(metalCharges[i]) + ")",
                        true
                    )    
                );
            }
            allIons.push(anion);
            for(i = 0; i < metalQuantities.length; i++){
                allIonsQuantities.push(metalQuantities[i]);
            }
            allIonsQuantities.push(anionQuantity);			
		}
			
    }
	return new Compound(allIons, allIonsQuantities);
}