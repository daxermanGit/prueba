function makeCloud(json){
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chartCloudDiv", am4plugins_wordCloud.WordCloud);
	chart.fontFamily = "Courier New";
	var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
	series.randomness = 0.1;
	series.rotationThreshold = 0.5;

	series.data = json; 

	series.dataFields.word = "tag";
	series.dataFields.value = "count";

	series.heatRules.push({
	 "target": series.labels.template,
	 "property": "fill",
	 "min": am4core.color("#0000CC"),
	 "max": am4core.color("#CC00CC"),
	 "dataField": "value"
	});

	series.events.on("arrangeended", function loadDoc() {
		  var xhttp = new XMLHttpRequest();
		  var url = "../statics/cloud.html";//La url que se carga
		  xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		     document.getElementById("demo").innerHTML = this.responseText;
		    }
		  };
		  xhttp.open("POST", url, true);
		  xhttp.send();
		});
	series.labels.template.urlTarget = "_blank";
	series.labels.template.tooltipText = "{word}: {value}";

	var hoverState = series.labels.template.states.create("hover");
	hoverState.properties.fill = am4core.color("#FF0000");

	//var subtitle = chart.titles.create();
	//subtitle.text = "(click to open)";

	var title = chart.titles.create();
	title.text = "Most Popular Tags @ StackOverflow";
	title.fontSize = 20;
	title.fontWeight = "800";

	}); // end am4core.ready()
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var url = "../statics/cloud.html";//La url que se carga
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("chartCloudDiv").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", url, true);
  xhttp.send();
}