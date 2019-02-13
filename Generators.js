//Credit to Ryan Kim
function randomElementGenerator(min, max){
    return elementList[randInt(min, max)];
}
function randomIonGenerator(complex, positive, acceptableElemsList, acceptableIonsList){
    var randomNum;
    if(complex){
        randomNum = 3;
    } else {
        if(positive){
            if(randInt(0, 16) == 0){ // 1/15 chance for either of the two positive polyatomic ions
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
        while(!hasCharge(positive,acceptableElemsList[elemIndex])){
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
            if(element.normCovalentOxStates.length > 1 && element.metal){ //Make sure the name is unambiguous
                name = element.name + "(" + romanize(charge) + ")";
            } else {
                name = element.name;
            }
        } else {
            charge = element.ionicOxStates[0]; //Since things like peroxide will be treated as polyatomic ions, each element should only really have one negative state
            var nonConsecutiveVowelCount = 0;
            var index = 0;
            var prevIndex = -1;
            var maxCount = 0;
            if(element.number == 14 || element.number == 32 || element.number == 33 || element.number == 34 || element.number == 52){ //Count two nonconsecutive vowels instead of one
                maxCount = 3;
            } else { //Count one nonconsecutive vowel and then make a substring for that part.  Afterwards, append a -ide to the name.
                maxCount = 2;
            }
            while(index < element.name.length && nonConsecutiveVowelCount < maxCount){
                if(vowels.indexOf(element.name[index].toLowerCase()) > -1){ //check if the character is in the vowels list
                    nonConsecutiveVowelCount++;
                }
                if(prevIndex > -1){
                    if(vowels.indexOf(element.name[prevIndex].toLowerCase()) > -1 && vowels.indexOf(element.name[index].toLowerCase()) > -1){ //If there's a vowel right behind what was a vowel, reduce the count because we are only counting non consecutive vowels
                        nonConsecutiveVowelCount--;
                    }
                }
                if(nonConsecutiveVowelCount < maxCount){
                    prevIndex++;
                    index++;
                }
            }
            name = element.name.substr(0, index) + "ide"; //index represents how many characters there were before the nth nonconsecutive vowel appeared.
        }
        return new Ion([element],[1],[charge],[],[],name, true); //quantity is hardcoded because we will consider things like mercury(I) and peroxide as polyatomic ions
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
        
        var ligandsNamePortion = new Array();
        for(var i = 0; i < insertedLigands.length; i++){
            ligandsNamePortion.push(insertedLigands[i]);
        }
        for(var i = 0; i < ligandsNamePortion.length; i++){
            if(ligandsNamePortion[i].formula === "CO"){
                ligandsNamePortion[i].name = "carbonyl";
            }
            if(ligandsNamePortion[i].formula === "NH₃"){
                ligandsNamePortion[i].name = "ammine";
            }
            if(ligandsNamePortion[i].formula === "H₂O"){
                ligandsNamePortion[i].name = "aqua";
            }
            if(ligandsNamePortion[i].formula === "NO"){
                ligandsNamePortion[i].name = "nitrosyl";
            }
        }
        ligandsNamePortion.sort(compareIons);
        name = "";
        for(var i = 0; i < ligandsNamePortion.length; i++){
            var prefix = "";
            prefix = ligandsNamePortion[i].name.replace("ide", "ido").replace("ite", "ito").replace("ate", "ato");
            if(ideToO.includes(ligandsNamePortion[i].name)){
                prefix = ligandsNamePortion[i].name.replace("ide", "o");
            }
            var realIndex = insertedLigands.indexOf(ligandsNamePortion[i]);
            if(ligandQuantities[realIndex] > 1){
                prefix = quantityToPrefix(ligandQuantities[realIndex]) + prefix;
            }
            name += prefix;
        }
        if(charge > 0){
            name += metalCation.name + "(" + romanize(metalCharge) + ")";
        } else { //Negative ions are brutal, mate.
            var metalName = metalCation.name.replace("ium","um").replace(/um(?![\s\S]*um)/, 'ate'); //This misses tungsten, but that's not even a metal that can be generated here, so it doesn't matter
            if(metalName === "copper"){
                metalName = "cuprate";
            }
            if(metalName === "gold"){
                metalName = "aurate";
            }
            if(metalName === "iron"){
                metalName = "ferrate";
            }
            if(metalName === "lead"){
                metalName = "plumbate";
            }
            if(metalName === "manganese"){
                metalName = "manganate";
            }
            if(metalName === "mercury"){
                metalName = "mercurate";
            }
            if(metalName === "silver"){
                metalName = "argenate";
            }
            if(metalName === "tin"){
                metalName = "stannate";
            }
            if(metalName.indexOf("ate") < 0){
                metalName += "ate";
            }
            name += metalName + "(" + romanize(metalCharge) + ")";
            //Account for conventional names
            if(name === "hexacyanoferrate(III)"){
                name = "ferricyanide";
            }
            else if(name === "hexacyanoferrate(II)"){
                name = "ferrocyanide";
            }
        }
        return new Ion([metalCation], [1], [metalCharge], insertedLigands, ligandQuantities, name, true);
    }
}

function randNormIonGenerator(complex, acceptableElemsList, acceptableIonsList){
    if(randInt(0, 2) == 0){
        return randomIonGenerator(complex, true, acceptableElemsList, acceptableIonsList);
    } else {
        return randomIonGenerator(complex, false, acceptableElemsList, acceptableIonsList);
    }
}

function randomCompoundGenerator(percentComplicated, percentComplex, acceptableElemsList, acceptableIonsList){ //percents are decimals.  For instance, 0.7 = 70%
    var positiveIons = new Array();
    var positiveIonsQuantities = new Array();
    var negativeIons = new Array();
    var negativeIonsQuantities = new Array();
    var allIons = new Array();
    var allIonsQuantities = new Array();
    var isComplex = Math.random() < percentComplex;
    
    
    if(Math.random() < percentComplicated){
        if(randInt(0, 10) > 1 ){
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
                for(var i = 0; i < numStart; i++){
                    isComplex = Math.random() < percentComplex;
                    firstArrayQuantities.push(randInt(1, maxQty + 1));
                    firstArray.push(randomIonGenerator(isComplex, fillPositiveFirst, acceptableElemsList, acceptableIonsList));
                }
                for(i = 0; i < firstArray.length; i++){
                    totalChargeFirst += firstArray[i].charge * firstArrayQuantities[i];
                }
                while(secondArray.length > maxQty || secondArray.length == 0){ //We don't want there to be too many ions
                    secondArray = [];
                    secondArrayQuantities = [];
                    totalChargeSecond = 0;
                    //We have filled up the first array with ions and their quantities.  Now we need to accordingly add ions to the second array, similar to how the multiple teeth ligands generator worked.
                    while(totalChargeFirst + totalChargeSecond != 0){
                        isComplex = Math.random() < percentComplex;
                        var ionToAdd = randomIonGenerator(isComplex, !fillPositiveFirst, acceptableElemsList, acceptableIonsList);
                        while(Math.abs(ionToAdd.charge) > Math.abs(totalChargeFirst + totalChargeSecond)){
                            ionToAdd = randomIonGenerator(isComplex, !fillPositiveFirst, acceptableElemsList, acceptableIonsList); //We should always be able to get an ion with the charge of one
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
                var hasNonmetal = false; //This refers to if there is a positive nonmetal
                var elecNegativities1 = new Array();
                var elecNegativities2 = new Array();
                for(i = 0; i < positiveIons.length; i++){
                    if(positiveIons[i].elements.length > 1 || positiveIons[i].elements[0].metal || positiveIons[i].ligands.length > 0 || positiveIons[i].quantities[0] > 1){
                        hasMetalOrPoly = true;
                    }
                    else if(positiveIons[i].elements.length < 2 && !positiveIons[i].elements[0].metal && positiveIons[i].elements[0].number != 1){ //H+ is fine
                        hasNonmetal = true;    
                    }
                    if(positiveIons[i].elements.length < 2 && positiveIons[i].ligands.length < 1){
                        elecNegativities1.push(positiveIons[i].elements[0].electronegativity);
                    }
                }
                var hasPoly2 = false; //check if the anions have a polyatomic ion
                for(i = 0; i < negativeIons.length; i++){
                    if(negativeIons[i].elements.length > 1 || negativeIons[i].ligands.length > 0 || negativeIons[i].quantities[0] > 1){
                        hasPoly2 = true;
                    }
                    if(negativeIons[i].elements.length < 2 && negativeIons[i].ligands.length < 1){
                        elecNegativities2.push(negativeIons[i].elements[0].electronegativity);
                    }
                }
                if(hasMetalOrPoly && hasNonmetal){
                    dummyPass = false;
                }
                if(hasNonmetal && hasPoly2){
                    dummyPass = false;
                }
                for(i = 0; i < elecNegativities1.length; i++){
                    for(var j = 0; j < elecNegativities2.length; j++){
                        if(elecNegativities1[i] > elecNegativities2[j]){ //basically check that all the electronegativities of the monoatomic ions in the positive list are less than the electronegativities of those in the negative list
                            dummyPass = false;
                        }
                    }
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
                if(positiveIons[i].elements.length + positiveIons[i].ligands.length < 2){
                    sortStr += positiveIons[i].elements[0].electronegativity;
                }
                sortListPos.push(sortStr + positiveIons[i].formulaNoCharge);
            }
           for(i = 0; i < negativeIons.length; i++){
                sortStr = "";
                if(negativeIons[i].elements.length + negativeIons[i].ligands.length < 2){
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
        } else {//Make an ion that is like Manganese (III, IV) oxide
            var transitionMetal = acceptableElemsList[randInt(0, acceptableElemsList.length)];
            while((transitionMetal.groupNumber < 3 && transitionMetal.groupNumber > 11) || transitionMetal.ionicOxStates.length < 2){ //Most group 12 transition metals don't really have two consecutive states, and we don't want to deal with mercury.
                transitionMetal = acceptableElemsList[randInt(0, acceptableElemsList.length)];
            }
            var firstCharge = transitionMetal.ionicOxStates[randInt(0, transitionMetal.ionicOxStates.length - 1)];
            var secondCharge = transitionMetal.ionicOxStates[randInt(1, transitionMetal.ionicOxStates.length)];
            while(secondCharge - firstCharge != 1){
                firstCharge = transitionMetal.ionicOxStates[randInt(0, transitionMetal.ionicOxStates.length - 1)];
                secondCharge = transitionMetal.ionicOxStates[randInt(1, transitionMetal.ionicOxStates.length)];
            }
            var metalCharges = [firstCharge, secondCharge];
            var metalQuantities = [1, 1];
            isComplex = Math.random() < percentComplex;
            var anion = randomIonGenerator(isComplex, false, acceptableElemsList, acceptableIonsList);
            while(anion.charge > -2){
                anion = randomIonGenerator(isComplex, false, acceptableElemsList, acceptableIonsList); //Anions of charges with -1 don't really form this type of compound
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
        return new Compound(allIons, allIonsQuantities); //works for both types of complicated compounds
    } else {
        isComplex = Math.random() < percentComplex;
        var negComplex = isComplex;
        negativeIons.push(randomIonGenerator(isComplex, false, acceptableElemsList, acceptableIonsList));
        isComplex = Math.random() < percentComplex;
        positiveIons.push(randomIonGenerator(isComplex, true, acceptableElemsList, acceptableIonsList));
        while((positiveIons[0].elements.length + positiveIons[0].ligands.length < 2 &&
            negativeIons[0].elements.length + negativeIons[0].ligands.length < 2 &&
            positiveIons[0].elements[0].electronegativity > negativeIons[0].elements[0].electronegativity) ||
            (!positiveIons[0].elements[0].metal &&
            negativeIons[0].elements.length + negativeIons[0].ligands.length > 1 &&
            positiveIons[0].elements[0].number != 1) ||
            (positiveIons[0].elements[0].number == negativeIons[0].elements[0].number &&
            positiveIons[0].elements.length + positiveIons[0].ligands.length < 2 &&
            negativeIons[0].elements.length + negativeIons[0].ligands.length < 2) &&
            !isComplex ||
            (!positiveIons[0].elements[0].metal && 
            positiveIons[0].elements.length > 1
            && negComplex)
        ){
            positiveIons[0] = randomIonGenerator(isComplex, true, acceptableElemsList, acceptableIonsList);
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
        return new Compound(allIons, allIonsQuantities);
    }
}