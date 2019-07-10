//Credit to Ryan Kim
function Element( //The object for an element
    symbol,
    name,
    number,
    groupNumber,
    mass,
    ionicOxStates,
    normCovalentOxStates,
    metal,
    electronegativity
){
    this.symbol = symbol; //The element's symbol
    this.name = name; //The element's name
    this.number = number; //The element's number on the periodic table
    this.groupNumber = groupNumber; //The element's group number on the periodic table
    this.mass = mass; //The atomic mass of the element
    this.ionicOxStates = ionicOxStates; //The common oxidation states of an element
    this.normCovalentOxStates = normCovalentOxStates; //All of the oxidation states of an element (not really, just a more comprehensive list)
    this.metal = metal; //Is this element a metal?
    this.electronegativity = electronegativity; //The electronegativity of the element
}

function Ion( //The object for just a normal ion
    elements,
    quantities,
    charges,
    ligands,
    ligandQuantities,
    name,
    combineElems
){
    this.elements = elements;
    this.quantities = quantities;
    this.charges = charges;
    this.name = name;
    this.ligands = ligands;
    this.ligandQuantities = ligandQuantities;
    this.charge = 0;
	this.quantityLigandSum = this.quantities.reduce(function(acc, val){return acc + val;}, 0) + this.ligands.length;
    this.combineElems = combineElems; //to support ions that may have elements that have many different charges.  This doesn't affect ligands that are in the ion.
    for(var i = 0; i < charges.length; i++){
        this.charge += charges[i] * quantities[i];
    }
    for(i = 0; i < ligandQuantities.length; i++){
        this.charge += this.ligands[i].charge * this.ligandQuantities[i];
    }
    this.formulaNoCharge = "";
    var ionSymbols = new Array();
    var ionCounts = new Array();
    for(i = 0; i < elements.length; i++){
        if(ionSymbols.includes(elements[i].symbol) && this.combineElems){
            ionCounts[ionSymbols.indexOf(elements[i].symbol, 0)] += quantities[i];
        } else {
            ionSymbols.push(elements[i].symbol);
            ionCounts.push(quantities[i]);
        }
    }
    for(i = 0; i < ionSymbols.length; i++){
        this.formulaNoCharge += ionSymbols[i];
        if(ionCounts[i] > 1){
            this.formulaNoCharge += strSubScript(ionCounts[i].toString());
        }
    }
    for(i = 0; i < ligands.length; i++){
        if((this.ligands[i].formulaNoCharge.replace(/[^A-Z]/g, "").length > 1 || this.ligands[i].formulaNoCharge != removeSubScript(this.ligands[i].formulaNoCharge))&& ligandQuantities[i] > 1){
            this.formulaNoCharge += "(";
        }
        this.formulaNoCharge += ligands[i].formulaNoCharge;
        if((this.ligands[i].formulaNoCharge.replace(/[^A-Z]/g, "").length > 1 || this.ligands[i].formulaNoCharge != removeSubScript(this.ligands[i].formulaNoCharge))&& ligandQuantities[i] > 1){
            this.formulaNoCharge += ")";
        }
        if(ligandQuantities[i] > 1){
            this.formulaNoCharge += strSubScript(ligandQuantities[i].toString());
        }
    }
    
    if(this.ligands.length > 0){
        this.formulaNoCharge = "[" + this.formulaNoCharge + "]";
    }
    this.formula = this.formulaNoCharge;
    var chargeString = "";
    if(Math.abs(this.charge) > 1){
        chargeString += Math.abs(this.charge);
    }
    if(this.charge > 0){
        chargeString += "+";
    } 
    else if(this.charge < 0) {
        chargeString += "-";
    }
    this.formula += strSupScript(chargeString); //The chargeString is there in case there is a way to make superscripts with javascript
	
	//Migrated code for naming from ion generator to make things easier for the formula to compound function
	if(this.name == null){
		if(this.ligands.length > 0){
			var ligandsNamePortion = new Array();
			for(var i = 0; i < ligands.length; i++){
				ligandsNamePortion.push(this.ligands[i]);
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
			this.name = "";
			for(var i = 0; i < ligandsNamePortion.length; i++){
				var prefix = "";
				prefix = ligandsNamePortion[i].name.replace("ide", "ido").replace("ite", "ito").replace("ate", "ato");
				if(ideToO.includes(ligandsNamePortion[i].name)){
					prefix = ligandsNamePortion[i].name.replace("ide", "o");
				}
				var realIndex = this.ligands.indexOf(ligandsNamePortion[i]);
				if(ligandQuantities[realIndex] > 1){
					prefix = quantityToPrefix(ligandQuantities[realIndex]) + prefix;
				}
				this.name += prefix;
			}
			if(this.charge > 0){
				this.name += elements[0].name + "(" + romanize(charges[0]) + ")"; //the metal cation of a complex ion should be at the first index in the element list
			} else { //Negative ions are brutal, mate.
				var metalName = elements[0].name.replace("ium","um").replace(/um(?![\s\S]*um)/, 'ate'); //This misses tungsten, but that's not even a metal that can be generated here, so it doesn't matter
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
				this.name += metalName + "(" + romanize(charges[0]) + ")";
				//Account for conventional names
				if(this.name == "hexacyanoferrate(III)"){
					this.name = "ferricyanide";
				}
				else if(this.name == "hexacyanoferrate(II)"){
					this.name = "ferrocyanide";
				}
			}
		} else {
			if(this.quantities.reduce(function(acc, val){return acc + val;}, 0) < 2){
				if(this.charge > 0){ //positive ion of a single element naming
					if(this.elements[0].ionicOxStates.length > 1 && this.elements[0].metal){ //make sure the name is unambiguous for metals with multiple oxidation states
						this.name = elements[0].name + "(" + romanize(this.charge) + ")";
					} else {
						this.name = elements[0].name;
					}
				} else { //negative ion of a single element naming
					var nonConsecutiveVowelCount = 0;
					var index = 0;
					var prevIndex = -1;
					var maxCount = 0;
					if(elements[0].number == 14 || elements[0].number == 32 || elements[0].number == 33 || elements[0].number == 34 || elements[0].number == 52){ //Count two nonconsecutive vowels instead of one
						maxCount = 3;
					} else { //Count one nonconsecutive vowel and then make a substring for that part.  Afterwards, append a -ide to the name.
						maxCount = 2;
					}
					while(index < elements[0].name.length && nonConsecutiveVowelCount < maxCount){
						if(vowels.indexOf(elements[0].name[index].toLowerCase()) > -1){ //check if the character is in the vowels list
							nonConsecutiveVowelCount++;
						}
						if(prevIndex > -1){
							if(vowels.indexOf(elements[0].name[prevIndex].toLowerCase()) > -1 && vowels.indexOf(elements[0].name[index].toLowerCase()) > -1){ //If there's a vowel right behind what was a vowel, reduce the count because we are only counting non consecutive vowels
								nonConsecutiveVowelCount--;
							}
						}
						if(nonConsecutiveVowelCount < maxCount){
							prevIndex++;
							index++;
						}
					}	
					this.name = elements[0].name.substr(0, index) + "ide"; //index represents how many characters there were before the nth nonconsecutive vowel appeared.					
				}				
			}
		}
	}
}

function IonGroup( //Object for dealing with multiple possibilities that occur when converting a formula to a compound object
	index,
	ionList,
	ionQuantities
){
	this.index = index; //index represents where in the formula that ion group symbol starts
	this.ionList = ionList; //array of an array of ions.  This is so that multi-ion combos that aren't polyatomic ions can be supported
	this.ionQuantities = ionQuantities; //quantities to support the multi-ion combos
}

function Compound(
    ions,
    quantities
){
    this.charge = 0; //set a charge value so that it can be treated properly as a ligand if necessary
    this.ions = ions;
    this.quantities = quantities;
    this.elems = new Array();
    this.elemsQuantities = new Array();
    this.formula = "";
    this.formulaNoCharge = ""; //compliance for if this is a ligand
    this.name = "";
    for(var i = 0; i < this.ions.length; i++){//Things like MnO(O2)2 will happen.  I highly doubt you combine ions with polyatomic ions.  (This includes mercury)
        if(!this.elems.includes(this.ions[i].formulaNoCharge)){
            this.elems.push(this.ions[i].formulaNoCharge);
            this.elemsQuantities.push(this.quantities[i]);
        } else {
            this.elemsQuantities[this.elems.indexOf(this.ions[i].formulaNoCharge)] += this.quantities[i] * this.ions[i].quantities[0];
        }
    }
    for(i = 0; i < this.elems.length; i++){
        if((this.elems[i].replace(/[^A-Z]/g, "").length > 1 || hasSubScript(this.elems[i])) && this.elemsQuantities[i] > 1 && this.elems[i].indexOf("[") == -1){
            this.formula += "(" + this.elems[i] + ")";
        } else {
            this.formula += this.elems[i];
        }
        if(this.elemsQuantities[i] > 1){
            this.formula += strSubScript(this.elemsQuantities[i].toString());
        }
    }
    this.formulaNoCharge = this.formula;
    this.ionic = false;
    this.numPositiveIons = 0;
    this.numNegativeIons = 0;
    var cationString = "";
    var anionString = "";
    var containsHydrogenCation = false;
    if(ions[0].formulaNoCharge === "H"){ //Do not use prefixes.
        containsHydrogenCation = true;
    }
    for(i = 0; i < this.ions.length; i++){
        if(ions[i].quantities.reduce(function(acc, val){return acc + val;}, 0) + ions[i].ligands.length > 1 || polyIonsListIndexOf(ions[i].name) > -1 || ions[i].elements[0].metal){
            this.ionic = true;
        }
        if(ions[i].charge > 0){
            this.numPositiveIons++;
        } else{
            this.numNegativeIons++;
        }
    }
    var cations = new Array();
    var anions = new Array();
    var cationOldNames = new Array();
    var anionOldNames = new Array();
    var cationFormulas = new Array();
    var anionFormulas = new Array();
    for(i = 0; i < ions.length; i++){
        if(ions[i].charge > 0){
            cations.push(ions[i]);
        } else {
            anions.push(ions[i]);
        }
    }
    for(i = 0; i < cations.length; i++){
        cationOldNames.push(cations[i].name);
        cationFormulas.push(cations[i].formula);
    }
    for(i = 0; i < anions.length; i++){
        anionOldNames.push(anions[i].name);
        anionFormulas.push(anions[i].formula);
    }
    for(i = 0; i < cations.length; i++){
        if(cations[i].elements.length + cations[i].ligands.length > 1 || cations[i].elements[0].metal){
            cations[i].name = "@" + removePrefix(cations[i].name);
        } else {
            cations[i].name = removePrefix(cations[i].name);
        }
    }
    for(i = 0; i < anions.length; i++){
        anions[i].name = removePrefix(anions[i].name);
    }
    cations.sort(compareIons);
    anions.sort(compareIons);
    for(i = 0; i < cations.length; i++){
        cations[i].name = cationOldNames[cationFormulas.indexOf(cations[i].formula)];
        var realIndex = this.ions.indexOf(cations[i]);
        if((this.numPositiveIons > 1 || (!this.ionic && !containsHydrogenCation)) && this.quantities[realIndex] > 1){
            if(cations[i].ligands.length < 1){
                cationString += quantityToPrefix(this.quantities[realIndex]) + cations[i].name + " ";
            } else {
                cationString += quantityToOtherPrefix(this.quantities[realIndex]) + "(" + cations[i].name + ")" + " ";
            }
        } else {
            cationString += cations[i].name + " ";
        }
    }
    for(i = 0; i < anions.length; i++){
        anions[i].name = anionOldNames[anionFormulas.indexOf(anions[i].formula)];
        realIndex = this.ions.indexOf(anions[i]);
        if(this.numNegativeIons > 1 || (!this.ionic && !containsHydrogenCation)){
            if(!this.ionic || this.quantities[realIndex] > 1){
                var addString = anions[i].name;
                if(anions[i].name === "oxide" && this.quantities[realIndex] != 2 && this.quantities[realIndex] != 3){
                    addString = "xide";
                }
                if(anions[i].ligands.length < 1){
                    anionString += quantityToPrefix(this.quantities[realIndex]) + addString + " ";
                } else {
                    anionString += quantityToOtherPrefix(this.quantities[realIndex]) + "(" + addString + ")" + " ";
                }
            } else {
                anionString += anions[i].name + " ";
            }
        } else {
            anionString += anions[i].name + " ";
        }
    }
    anionString = anionString.substr(0, anionString.length - 1);
    //PRECASE FOR THIS CUZ I DON"T WANT TO DEAL WITH MORE CRAP THAN NECESSARY.  NO OTHER TYPES OF CATIONS CAN BE HERE CUZ I DON"T EVEN KNOW HOW SOMETHING LIKE Manganese(II, III), Sodium Nitride would even work.  Seriously.  No ._.
    if(this.ions.length > this.elems.length && this.numPositiveIons > 1){ //Manganese(II,III) case.  Doesn't work for things like mercury(I,II), but then again, does that even happen?  I'll just make the precase say no.
        //This is a separate case because I don't want to make weird and incorrect names like Calcium (II)
        //This means that this is only intended to happen with transition metals.
        var firstMetalFormula = this.ions[0].formulaNoCharge;
        var firstMetalOxStates = new Array();
        firstMetalOxStates.push(this.ions[0].charge);
        for(i = 1; i < this.ions.length; i++){ //Loop through the rest of the ions, and add oxidation states to the list if there are other ions with the same formula (omitting the charge)
            if(this.ions[i].formulaNoCharge === firstMetalFormula){ //Also this loop assumes that the ions are consecutive, which they should be.
                firstMetalOxStates.push(this.ions[i].charge);
            }
        }
        cationString = this.ions[0].name.substr(0, this.ions[0].name.indexOf("(")) + "(";
        for(i = 0; i < firstMetalOxStates.length; i++){
            cationString += romanize(this.ions[i].charge) + ",";
        }
        cationString = cationString.substr(0, cationString.length - 1) + ") "; //remove the last comma and add a ")"
    }
    this.name = cationString + anionString;
    
    if(this.ions[0].formulaNoCharge == "H" && 
	this.ions.length == 2 && 
	((this.ions[1].elements[this.ions[1].elements.length - 1].number == 8 && this.ions[1].elements.length > 1) 
	|| this.ions[1].elements[0].groupNumber == 17)){ //oxyacid or hydro acid with a halogen
        var acidName = this.ions[1].name.replace("ate", "ic").replace("ite", "ous") + " acid";
        acidName = acidName.replace("phosph","phosphor").replace("sulf","sulfur");
		if(this.ions[1].quantityLigandSum < 2){
			acidName = "hydro" + acidName.replace("ide", "ic");
		}
        this.name = acidName;
    }
    if(this.formula == "H₃N" || this.formula == "NH₃"){
        this.name = "ammonia";
        this.formula = "NH₃";
    }
    else if(this.formula == "H₂O"){
        this.name = "water";
    }
    else if(this.formula == "HOH"){
        this.name = "water";
        this.formula = "H₂O";
    }
	else if(this.formula == "H₄C" || this.formula == "CH₄"){
		this.name = "methane";
		this.formula = "CH₄";
	}
    
}

function Reaction(
    reactants,
    reactantQuantities,
    areReactantsDissociated,
    products,
    productQuantities,
    areProductsDissociated
){
    this.reactants = reactants;
    this.reactantQuantities = reactantQuantities;
    this.areReactantsDissociated = areReactantsDissociated;
    this.products = products;
    this.productQuantities = productQuantities;
    this.areProductsDissociated = areProductsDissociated;
    this.reactantSpecies = new Array();
    this.reactantSpeciesQuantities = new Array();
    this.productSpecies = new Array();
    this.productSpeciesQuantities = new Array();    
    for(var i = 0; i < reactants.length; i++){
        if(areReactantsDissociated[i]){
            for(var j = 0; j < reactants[i].ions.length; j++){
                this.reactantSpecies.push(reactants[i].ions[j].formula);
                this.reactantSpeciesQuantities.push(reactantQuantities[i] * reactants[i].quantities[j]);
            }
        } else {
            this.reactantSpecies.push(reactants[i].formula);
            this.reactantSpeciesQuantities.push(reactantQuantities[i]);
        }
    }

    for(i = 0; i < products.length; i++){
        if(areProductsDissociated[i]){
            for(j = 0; j < products[i].ions.length; j++){
                this.productSpecies.push(products[i].ions[j].formula);
                this.productSpeciesQuantities.push(productQuantities[i] * products[i].quantities[j]);
            }
        } else {
            this.productSpecies.push(products[i].formula);
            this.productSpeciesQuantities.push(productQuantities[i]);
        }
    }    
    for(i = 0; i < this.reactantSpecies.length; i++){ //Remove spectator ions
        for(j = 0; j < this.productSpecies.length; j++){
            if(this.reactantSpecies[i] === this.productSpecies[j]){
                this.reactantSpecies.splice(i, 1);
                this.reactantSpeciesQuantities.splice(i, 1);
                this.productSpecies.splice(j, 1);
                this.productSpeciesQuantities.splice(j, 1);
            }
        }
    }
    
}

//reaction string code
Object.defineProperty(Reaction.prototype, 'reactionString', {
   get: function(){
       //code that needs to be repasted here too because stuff changes
        this.reactantSpecies = new Array();
        this.reactantSpeciesQuantities = new Array();
        this.productSpecies = new Array();
        this.productSpeciesQuantities = new Array();
        for(var i = 0; i < this.reactants.length; i++){
            if(this.areReactantsDissociated[i]){
                for(var j = 0; j < this.reactants[i].ions.length; j++){
                    this.reactantSpecies.push(this.reactants[i].ions[j].formula);
                    this.reactantSpeciesQuantities.push(this.reactantQuantities[i] * this.reactants[i].quantities[j]);
                }
            } else {
                this.reactantSpecies.push(this.reactants[i].formula);
                this.reactantSpeciesQuantities.push(this.reactantQuantities[i]);
            }
        }
    
        for(i = 0; i < this.products.length; i++){
            if(this.areProductsDissociated[i]){
                for(j = 0; j < this.products[i].ions.length; j++){
                    this.productSpecies.push(this.products[i].ions[j].formula);
                    this.productSpeciesQuantities.push(this.productQuantities[i] * this.products[i].quantities[j]);
                }
            } else {
                this.productSpecies.push(this.products[i].formula);
                this.productSpeciesQuantities.push(this.productQuantities[i]);
            }
        }    
        for(i = 0; i < this.reactantSpecies.length; i++){ //Remove spectator ions
            for(j = 0; j < this.productSpecies.length; j++){
                if(this.reactantSpecies[i] === this.productSpecies[j]){
                    this.reactantSpecies.splice(i, 1);
                    this.reactantSpeciesQuantities.splice(i, 1);
                    this.productSpecies.splice(j, 1);
                    this.productSpeciesQuantities.splice(j, 1);
                }
            }
        }
        //actual reaction string code
       var reactionString = "";
        for(var i = 0; i < this.reactantSpecies.length; i++){
            if(this.reactantSpeciesQuantities[i] > 1){
                reactionString += this.reactantSpeciesQuantities[i];
            }
            reactionString += this.reactantSpecies[i];
            if(i < this.reactantSpecies.length - 1){
                reactionString += " + ";
            }
        }
        reactionString += " -> ";
        for(i = 0; i < this.productSpecies.length; i++){
            if(this.productSpeciesQuantities[i] > 1){
                reactionString += this.productSpeciesQuantities[i];
            }
            reactionString += this.productSpecies[i];
            if(i < this.productSpecies.length - 1){
                reactionString += " + ";
            }
        }
        return reactionString;
   } 
});


function ReductionPotentialRxn(
    rxn, 
    chargeChange, 
    cellPotential 
){ //For reduction, chargeChange is negative, for oxidation it's positive.  MnO4- + 5e- -> Mn2+ is (-5) since 5e- are added 
    this.rxn = rxn;
    this.chargeChange = chargeChange;
    this.cellPotential = cellPotential;
}
ReductionPotentialRxn.prototype.flip = new function(){
    
};