//Credit to lh64.
//NOTE: Probably almost all the organic compounds have incorrect oxidation states per ion
var elementList = new Array();
elementList.push(
    new Element(
        "H",
        "hydrogen",
        1,
        1,
        1.008,
        [-1],
        [-1, 1],
        false,
        2.20
    )
);
elementList.push(
    new Element(
        "He",
        "helium",
        2,
        18,
        4.003,
        [],
        [],
        false,
        null
    )  
);
elementList.push(
    new Element(
        "Li",
        "lithium",
        3,
        1,
        6.94,
        [1],
        [1],
        true,
        0.98
    )  
);

elementList.push(
    new Element(
        "Be",
        "beryllium",
        4,
        2,
        9.012,
        [2],
        [2],
        true,
        1.57
    )
);
elementList.push(
    new Element(
        "B",
        "boron",
        5,
        13,
        10.81,
        [3],
        [3],
        false,
        2.04
    )
);
elementList.push(
    new Element(
        "C",
        "carbon",
        6,
        14,
        12.01,
        [-4],
        [-4,4],
        false,
        2.55
    )    
);
elementList.push(
    new Element(
        "N",
        "nitrogen",
        7,
        15,
        14.01,
        [-3],
        [-3, 3],
        false,
        3.04
    )    
);
elementList.push(
    new Element(
        "O",
        "oxygen",
        8,
        16,
        16.00,
        [-2],
        [-2],
        false,
        3.44
    )    
);
elementList.push(
    new Element(
        "F",
        "fluorine",
        9,
        17,
        19.00,
        [-1],
        [-1],
        false,
        3.98
    )  
);
elementList.push(
    new Element(
        "Ne",
        "neon",
        10,
        18,
        20.18,
        [],
        [],
        false,
        null
    )    
);
elementList.push(
    new Element(
        "Na",
        "sodium",
        11,
        1,
        22.99,
        [1],
        [1],
        true,
        0.93
    )    
);
elementList.push(
    new Element(
        "Mg",
        "magnesium",
        12,
        2,
        24.31,
        [2],
        [2],
        true,
        1.31
    )    
);
elementList.push(
    new Element(
        "Al",
        "aluminum",
        13,
        13,
        26.98,
        [3],
        [3],
        true,
        1.61
    )    
);
elementList.push(
    new Element(
        "Si",
        "silicon",
        14,
        14,
        28.09,
        [-4],
        [-4, 4],
        false,
        1.90
    )    
);
elementList.push(
    new Element(
        "P",
        "phosphorus",
        15,
        15,
        30.97,
        [-3],
        [-5, -3, 3, 5],
        false,
        2.19
    )    
);
elementList.push(
    new Element(
        "S",
        "sulfur",
        16,
        16,
        32.06,
        [-2],
        [-2, 2, 4, 6],
        false,
        2.58
    )    
);
elementList.push(
    new Element(
        "Cl",
        "chlorine",
        17,
        17,
        35.45,
        [-1],
        [-1, 1, 3, 5],
        false,
        3.16
    )    
);
elementList.push(
    new Element(
        "Ar",
        "argon",
        18,
        18,
        39.95,
        [],
        [],
        false,
        null
    )    
);
elementList.push(
    new Element(
        "K",
        "potassium",
        19,
        1,
        39.10,
        [1],
        [1],
        true,
        0.82
    )    
);
elementList.push(
    new Element(
        "Ca",
        "calcium",
        20,
        2,
        40.08,
        [2],
        [2],
        true,
        1.0
    )    
);
elementList.push(
    new Element(
       "Sc",
       "scandium",
       21,
       3,
       44.96,
       [3],
       [3],
       true,
       1.36
    )    
);
elementList.push(
    new Element(
        "Ti",
        "titanium",
        22,
        4,
        47.87,
        [3, 4],
        [3, 4],
        true,
        1.54
    )    
);
elementList.push(
    new Element(
        "V",
        "vanadium",
        23,
        5,
        50.94,
        [2,3,4,5],
        [2,3,4,5],
        true,
        1.63
    )    
);
elementList.push(
    new Element(
        "Cr",
        "chromium",
        24,
        6,
        52.00,
        [2, 3],
        [2, 3, 6],
        true,
        1.66
    )
);
elementList.push(
    new Element(
        "Mn",
        "manganese",
        25,
        7,
        54.94,
        [2, 3, 4],
        [2, 3, 4, 6, 7],
        true,
        1.55
    )    
);
elementList.push(
    new Element(
        "Fe",
        "iron",
        26,
        8,
        55.85,
        [2, 3],
        [2, 3],
        true,
        1.83
    )    
);
elementList.push(
    new Element(
        "Co",
        "cobalt",
        27,
        9,
        58.93,
        [2, 3],
        [2, 3],
        true,
        1.88
    )    
);
elementList.push(
    new Element(
        "Ni",
        "nickel",
        28,
        10,
        58.69,
        [2, 3],
        [2, 3],
        true,
        1.91
    )    
);
elementList.push(
    new Element(
        "Cu",
        "copper",
        29,
        11,
        63.55,
        [1, 2],
        [1, 2],
        true,
        1.90
    )    
);
elementList.push(
    new Element(
        "Zn",
        "zinc",
        30,
        12,
        65.36,
        [2],
        [2],
        true,
        1.65
    )    
);
elementList.push(
    new Element(
        "Ga",
        "gallium",
        31,
        13,
        69.72,
        [3],
        [3],
        true,
        1.81
    )    
);
elementList.push(
    new Element(
        "Ge",
        "germanium",
        32,
        14,
        72.63,
        [-4],
        [-4, 4],
        false,
        2.01
    )    
);
elementList.push(
    new Element(
        "As",
        "arsenic",
        33,
        15,
        75.92,
        [-3],
        [-3, 3, 5],
        false,
        2.18
    )    
);
elementList.push(
    new Element(
        "Se",
        "selenium",
        34,
        16,
        78.97,
        [-2],
        [-2, 2, 4, 6],
        false,
        2.55
    )
);
elementList.push(
    new Element(
        "Br",
        "bromine",
        35,
        17,
        79.90,
        [-1],
        [-1,1,3,5],
        false,
        2.96
    )    
);
elementList.push(
    new Element(
        "Kr",
        "krypton",
        36,
        18,
        83.80,
        [],
        [2],
        false,
        3.0
    )    
);
elementList.push(
    new Element(
        "Rb",
        "rubidium",
        37,
        1,
        85.47
        [1],
        [1],
        true,
        0.82
    )    
);
elementList.push(
    new Element(
        "Sr",
        "strontium",
        38,
        2,
        87.62,
        [2],
        [2],
        true,
        0.95
    )    
);
elementList.push(
    new Element(
        "Y",
        "yttrium",
        39,
        3,
        88.91,
        [3],
        [3],
        true,
        1.22
    )    
);
elementList.push(
    new Element(
        "Zr",
        "zirconium",
        40,
        4,
        91.22,
        [4],
        [4],
        true,
        1.33
    )    
);
elementList.push(
    new Element(
        "Nb",
        "niobium",
        41,
        5,
        92.91,
        [5],
        [5],
        true,
        1.6
    )    
);
elementList.push(
    new Element(
        "Mb",
        "molybdenum",
        42,
        6,
        95.95,
        [2,4,6],
        [2,4,6],
        true,
        2.16
    )    
);
elementList.push(
    new Element(
        "Tc",
        "technetium",
        43,
        7,
        98,
        [4],
        [4, 7],
        true,
        1.9
    )    
);
elementList.push(
    new Element(
        "Ru",
        "ruthenium",
        44,
        8,
        101.1,
        [3, 4],
        [3, 4],
        true,
        2.2
    )    
);
elementList.push(
    new Element(
        "Rh",
        "rhodium",
        45,
        9,
        102.9,
        [3],
        [3],
        true,
        2.28
    )    
);
elementList.push(
    new Element(
        "Pd",
        "palladium",
        46,
        10,
        106.4,
        [2, 4],
        [2, 4],
        true,
        2.20
    )    
);
elementList.push(
    new Element(
        "Ag",
        "silver",
        47,
        11,
        107.9,
        [1],
        [1],
        true,
        1.93
    )    
);
elementList.push(
    new Element(
        "Cd",
        "cadmium",
        48,
        12,
        112.4,
        [2],
        [2],
        true,
        1.69
    )    
);
elementList.push(
    new Element(
        "In",
        "indium",
        49,
        13,
        114.8,
        [3],
        [3],
        true,
        1.78
    )    
);
elementList.push(
    new Element(
        "Sn",
        "tin",
        50,
        14,
        118.7,
        [2, 4],
        [2, 4],
        true,
        1.96
    )    
);
elementList.push(
    new Element(
        "Sb",
        "antimony",
        51,
        15,
        121.8,
        [-3],
        [-3, 3, 5],
        false,
        2.05
    )    
);
elementList.push(
    new Element(
        "Te",
        "tellurium",
        52,
        16,
        127.6,
        [-2],
        [-2, 2, 4, 6],
        false,
        2.1
    )    
);
elementList.push(
    new Element(
        "I",
        "iodine",
        53,
        17,
        126.9,
        [-1],
        [-1, 1, 3, 5],
        false,
        2.66
    )    
);
elementList.push(
    new Element(
        "Xe",
        "xenon",
        54,
        18,
        131.3,
        [],
        [2, 4, 6],
        false,
        2.6
    )    
);
elementList.push(
    new Element(
        "Cs",
        "cesium",
        55,
        1,
        132.9,
        [1],
        [1],
        true,
        0.79
    )    
);
elementList.push(
    new Element(
        "Ba",
        "barium",
        56,
        2,
        137.3,
        [2],
        [2],
        true,
        0.89
    )    
);

var polyIonsList = new Array();
polyIonsList.push(
    new Ion(
        [elementList[6], elementList[0]],
        [1, 4],
        [-3, 1],
        [],
        [],
        "ammonium",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[0], elementList[7]],
        [3, 1],
        [1, -2],
        [],
        [],
        "hydronium",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[5], elementList[0], elementList[7]],
        [1, 1, 3, 2],
        [-4, 4, 1, -2],
        [],
        [],
        "acetate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[6], elementList[6]],
        [1, 2],
        [1, -1], //Yes, I know it is [1, -2], but that will cause problems with the generator
        [],
        [],
        "azide",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[5], elementList[0], elementList[7]],
        [6, 1, 5, 2],
        [-1, 4, 1, -2],
        [],
        [],
        "benzoate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[34], elementList[7]],
        [1, 2],
        [3, -2],
        [],
        [],
        "bromite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[34], elementList[7]],
        [1, 3],
        [5, -2],
        [],
        [],
        "bromate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[16], elementList[7]],
        [1, 1],
        [1, -2],
        [],
        [],
        "hypochlorite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[16], elementList[7]],
        [1, 2],
        [3, -2],
        [],
        [],
        "chlorite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[16], elementList[7]],
        [1, 3],
        [5, -2],
        [],
        [],
        "chlorate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[16], elementList[7]],
        [1, 4],
        [7, -2],
        [],
        [],
        "perchlorate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[23], elementList[7]],
        [1, 4],
        [6, -2],
        [],
        [],
        "chromate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[23], elementList[7]],
        [2, 7],
        [6, -2],
        [],
        [],
        "dichromate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[7], elementList[5], elementList[6]],
        [1, 1, 1],
        [-2, -2, 3],
        [],
        [],
        "cyanate",
        true
    )    
);
polyIonsList.push(
    new Ion( //Will not be a candidate for forming ionic compounds
        [elementList[5], elementList[6]],
        [1, 1],
        [2, -3],
        [],
        [],
        "cyanide",
        true
    )      
);
polyIonsList.push(
    new Ion(
        [elementList[7], elementList[0]],
        [1, 1],
        [-2, 1],
        [],
        [],
        "hydroxide",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[52], elementList[7]],
        [1, 3],
        [5, -2],
        [],
        [],
        "iodate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[24], elementList[7]],
        [1, 4],
        [6, -2],
        [],
        [],
        "manganate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[24], elementList[7]],
        [1, 4],
        [7, -2],
        [],
        [],
        "permanganate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[6], elementList[7]],
        [1, 2],
        [3, -2],
        [],
        [],
        "nitrite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[6], elementList[7]],
        [1, 3],
        [5, -2],
        [],
        [],
        "nitrate",
        true
    )    
);
polyIonsList.push( //Incorect oxidation states?
    new Ion(
        [elementList[15], elementList[5], elementList[6]],
        [1, 1, 1],
        [-2, -2, 3],
        [],
        [],
        "thiocyanate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[52], elementList[52]],
        [2, 1],
        [0, -1],
        [],
        [],
        "triiodide",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[7]],
        [1, 3],
        [4, -2],
        [],
        [],
        "carbonate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[13], elementList[7]],
        [1, 3],
        [4, -2],
        [],
        [],
        "metasilicate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[7]],
        [2, 4],
        [3, -2],
        [],
        [],
        "oxalate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[7]],
        [2],
        [-1],
        [],
        [],
        "peroxide",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[15], elementList[7], elementList[7]],
        [2, 6, 2],
        [6, -2, -1],
        [],
        [],
        "peroxidisulfate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[5], elementList[0], elementList[7]],
        [6, 2, 4, 4],
        [-1, 4, 1, -2],
        [],
        [],
        "phthalate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[15], elementList[7]],
        [2, 7],
        [6, -2],
        [],
        [],
        "pyrosulfate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[15], elementList[7]],
        [1, 3],
        [4, -2],
        [],
        [],
        "sulfite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[15], elementList[7]],
        [1, 4],
        [6, -2],
        [],
        [],
        "sulfate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[5], elementList[0], elementList[7]],
        [2, 2, 4, 6],
        [1, 2, 1, -2],
        [],
        [],
        "tartrate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[4], elementList[7]],
        [4, 7],
        [3, -2],
        [],
        [],
        "tetraborate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[15], elementList[7]],
        [2, 3],
        [2, -2],
        [],
        [],
        "thiosulfate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[32], elementList[7]],
        [1, 4],
        [5, -2],
        [],
        [],
        "arsenate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[4], elementList[7]],
        [1, 3],
        [3, -2],
        [],
        [],
        "borate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[5], elementList[0], elementList[7]],
        [6, 5, 7],
        [1, 1, -2],
        [],
        [],
        "citrate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[14], elementList[7]],
        [1, 3],
        [3, -2],
        [],
        [],
        "phosphite",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[14], elementList[7]],
        [1, 4],
        [5, -2],
        [],
        [],
        "phosphate",
        true
    )    
);
polyIonsList.push(
    new Ion(
        [elementList[13], elementList[7]],
        [1, 4],
        [4, -2],
        [],
        [],
        "silicate",
        true
    )    
);

var collisionPolyAtomicIons = new Array(); //Array of elements like peroxide, which are elements that have their formula inside of part of another ion's formula.  Another example is Cyanide and Thiocyanate
for(var i = 0; i < polyIonsList.length; i++){
	for(var j = i + 1; j < polyIonsList.length; j++){ //check all ions against each other to see if they collide
		if(polyIonsList[i].formulaNoCharge.indexOf(polyIonsList[j].formulaNoCharge) > -1 && !collisionPolyAtomicIons.includes(polyIonsList[j])){
			collisionPolyAtomicIons.push(polyIonsList[j]);
		}
		if(polyIonsList[j].formulaNoCharge.indexOf(polyIonsList[i].formulaNoCharge) > -1 && !collisionPolyAtomicIons.includes(polyIonsList[i])){
			collisionPolyAtomicIons.push(polyIonsList[i]);
		}
	}
}
var ligands = new Array(); //A list of ligands, ordered by strength
var ligandTeeth = new Array();
ligands.push(
    new Compound(//Carbon monoxide
        [ 
            new Ion(
                [elementList[5]],
                [1],
                [2],
                [],
                [],
                "carbon",
                true
            ),
            new Ion(
                [elementList[7]],
                [1],
                [-2],
                [],
                [],
                "oxide",
                true
            )
        ],
        [1, 1]
    )
);
ligandTeeth.push(1);
ligands.push(polyIonsList[polyIonsListIndexOf("cyanide")]);
ligandTeeth.push(1);
ligands.push(polyIonsList[polyIonsListIndexOf("nitrite")]);
ligandTeeth.push(1);
ligands.push(
    new Compound(
        [
            new Ion(
                [elementList[6]],
                [1],
                [-3],
                [],
                [],
                "nitride",
                true
            ),
            new Ion(
                [elementList[0]],
                [1],
                [1],
                [],
                [],
                "hydrogen",
                true
            )
        ],
        [1, 3]
    )    
);
ligandTeeth.push(1);
ligands.push(
    new Compound(
        [
            new Ion(
                [elementList[0]],
                [1],
                [1],
                [],
                [],
                "hydrogen",
                true
            ),
            new Ion(
                [elementList[7]],
                [1],
                [-2],
                [],
                [],
                "oxide",
                true
            )
        ],
        [2, 1]
    )
);
ligandTeeth.push(1);
ligands.push(polyIonsList[polyIonsListIndexOf("oxalate")]);
ligandTeeth.push(2);
ligands.push(polyIonsList[polyIonsListIndexOf("hydroxide")]);
ligandTeeth.push(1);
ligands.push(
    new Ion(
        [elementList[8]],
        [1],
        [-1],
        [],
        [],
        "fluoride",
        true
    )    
);
ligandTeeth.push(1);
ligands.push(polyIonsList[polyIonsListIndexOf("azide")]);
ligandTeeth.push(1);
ligands.push(
    new Ion(
        [elementList[16]],
        [1],
        [-1],
        [],
        [],
        "chloride",
        true
    )    
);
ligandTeeth.push(1);
ligands.push(polyIonsList[polyIonsListIndexOf("thiocyanate")]);
ligandTeeth.push(1);
ligands.push(
    new Ion(
        [elementList[34]],
        [1],
        [-1],
        [],
        [],
        "bromide",
        true
    )    
);
ligandTeeth.push(1);
ligands.push(
    new Ion(
        [elementList[52]],
        [1],
        [-1],
        [],
        [],
        "iodide",
        true
    )    
);
ligandTeeth.push(1);
var ideToO = new Array();
ideToO.push("fluoride");
ideToO.push("chloride");
ideToO.push("bromide");
ideToO.push("iodide");
ideToO.push("oxide");
ideToO.push("cyanide");
ideToO.push("hydroxide");

var vowels = ["a", "e", "i", "o", "u", "y"]; //Y is included because its presence in the list fixes more cases of naming negative ions

var allPoly = new Array();
for(i = 0; i < polyIonsList.length; i++){
    allPoly.push(polyIonsList[i]);
}
allPoly.splice(allPoly.indexOf(polyIonsList[polyIonsListIndexOf("cyanide")]), 1);
allPoly.splice(allPoly.indexOf(polyIonsList[polyIonsListIndexOf("hydronium")]), 1);
allPoly.splice(allPoly.indexOf(polyIonsList[polyIonsListIndexOf("thiocyanate")]), 1);
allPoly.splice(allPoly.indexOf(polyIonsList[polyIonsListIndexOf("cyanate")]), 1);

var acceptableRandElemList = new Array();
var count = 0;
var index = 0;
while(count < 6 && index < elementList.length){ //add most elements in group 1
    if (elementList[index].groupNumber == 1){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
count = 0;
index = 0;
while(count < 5 && index < elementList.length){ //add most elements in group 2
    if (elementList[index].groupNumber == 2){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
//transition metals
index = 21;
while(index <= 31){
    if(elementList[index].number != 23){ //Vanadium is weird
        acceptableRandElemList.push(elementList[index]);
    }
    index++;
}
count = 0;
index = 0;
while(count < 2 && index < elementList.length){ //add some elements in group 13
    if (elementList[index].groupNumber == 13){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
count = 0;
index = 0;
while(count < 5 && index < elementList.length){ //add most elements in group 14
    if (elementList[index].groupNumber == 14){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
count = 0;
index = 0;
while(count < 3 && index < elementList.length){ //add some elements in group 15
    if (elementList[index].groupNumber == 15){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
count = 0;
index = 0;
while(count < 4 && index < elementList.length){ //add most elements in group 16
    if (elementList[index].groupNumber == 16){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
count = 0;
index = 0;
while(count < 4 && index < elementList.length){ //add most elements in group 17
    if (elementList[index].groupNumber == 17){
        acceptableRandElemList.push(elementList[index]);
        count++;
    }
    index++;
}
acceptableRandElemList.push(elementList[46]); //Silver
acceptableRandElemList.push(elementList[47]); //Cadmium
acceptableRandElemList.push(elementList[53]); //add xenon
