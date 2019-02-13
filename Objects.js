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
        if(this.ligands[i].formulaNoCharge.replace(/[^A-Z]/g, "").length > 1){
            this.formulaNoCharge += "(";
        }
        this.formulaNoCharge += ligands[i].formulaNoCharge;
        if(this.ligands[i].formulaNoCharge.replace(/[^A-Z]/g, "").length > 1){
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
        if(ions[i].elements.length > 1 || polyIonsListIndexOf(ions[i].name) > -1 || ions[i].elements[0].metal){
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
    
    if(this.ions[0].formulaNoCharge == "H" && this.ions.length == 2 && ((this.ions[1].elements[this.ions[1].elements.length - 1].number == 8 && this.ions[1].elements.length > 1) || this.ions[1].elements[0].groupNumber == 17)){ //oxyacid or hydro acid with a halogen
        var acidName = this.ions[1].name.replace("ate", "ic").replace("ite", "ous") + " acid";
        acidName = acidName.replace("phosph","phosphor").replace("sulf","sulfur");
        if(this.ions[1].elements[0].groupNumber == 17 && this.ions.length < 2){
            acidName = "Hydro" + acidName.replace("ide", "ic");
        }
        this.name = acidName;
    }
    if(this.formula === "H₃N"){
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
    
}
