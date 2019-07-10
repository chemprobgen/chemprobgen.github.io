function loadSections(){
	var headFile = "head.html";
	var headID = "loadHead";
	var footFile = "foot.html";
	var footID = "loadFoot";
	loadSection(headFile, headID);
	loadSection(footFile, footID);
}

function loadSection(file, id){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			//console.log(this.responseText);
			document.getElementById(id).innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", file, true);
	xhttp.send();	
}