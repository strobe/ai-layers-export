﻿$.writeln("==================");  $.writeln("Begin... ");   var folder = Folder.selectDialog();var options = new ExportOptionsPNG24();	options.horizontalScale = 100;	options.verticalScale = 100;	options.antiAliasing = true;	options.transparency = true;	options.artBoardClipping = true;var document = app.activeDocument;if(document && folder)	parseLayer(document, "", 1);function parseLayer(layer, base, depth) {		var slides = [];	var popups = [];		var takeShots = true;		log(depth, "parsing " + layer.name);		for(var i=0; i<layer.layers.length; i++)	{		var l = layer.layers[i];		var name = l.name;				var subLayer = true;				if (name.indexOf("(+)")!=-1) {			l.visible = true;			subLayer = false;			log(depth+1, name + " : always on");		} 		else 		if (name.indexOf("(-)")!=-1) {			l.visible = false;			subLayer = false;			log(depth+1, name + " : always off");		}		else		if (name.indexOf("(~)")!=-1) {			l.visible = false;			subLayer = false;			popups.push(l);		}		else		{			slides.push(l);		}	}	log(depth, "slides = " + slides);	// hide all popups	for(var i = 0; i<popups.length; i++)		popups[i].visible = false;	for(var i = 0; i<slides.length; i++) {		var l = slides[i];				// show current slide, hide all the others		for(var j = 0; j<slides.length; j++) {			slides[j].visible = i==j;						log(depth, "setting " + slides[j].name + " visibility = " + (i==j));		}		parseLayer(l, base+ (base=="" ? "" : "-") +l.name, depth+1);				takeShots = false;	}	// hide all slides	for(var i = 0; i<slides.length; i++)		slides[i].visible = false;		// capture popups	for(var i=0; i<popups.length; i++) {		var l = popups[i];		l.visible = true;		var fname = base + "-" + l.name + ".png";		var file = new File(folder.fsName+"/"+fname);		log(depth, " capture <"+fname + ">");		document.exportFile(file, ExportType.PNG24, options);		l.visible = false;	}	if (takeShots) {		var fname = base + ".png";		var file = new File(folder.fsName+"/"+fname);			log(depth, " capture <"+fname + ">");		document.exportFile(file, ExportType.PNG24, options);	}}function log(depth, t) {	for(var j=0; j<depth; j++)			$.write("----");	$.writeln(t);}