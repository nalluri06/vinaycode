if (typeof(SiebelAppFacade.CustOppListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.CustOppListAppletPR");
 define("siebel/custom/CustOppListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.CustOppListAppletPR = (function () {

    function CustOppListAppletPR(pm) {
     SiebelAppFacade.CustOppListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(CustOppListAppletPR, SiebelAppFacade.JQGridRenderer);

    CustOppListAppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    CustOppListAppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 var pm = this.GetPM();
	 var placeHolder = pm.Get("GetPlaceholder");
	 var markup = "<div id='mychart' style='height:250px;width:400px'>" +  "</div>";
	 $('#' + placeHolder + 'd').append(markup);
	 var PR = this;
	 require(["http://www.google.com/jsapi"], function () {
	  PR.GoogleJSAPILoaded.call(PR);
	 });
	}

    CustOppListAppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
	 var pm = this.GetPM();
	 var recordSet = pm.Get("GetRecordSet"); 
	 data = new google.visualization.DataTable();
	 data.addColumn('string', 'Label');
	 data.addColumn('number', 'Value');
	 for (var i = 0; i < recordSet.length; i++) {
	  var value = recordSet[i]["Primary Revenue Amount"];
	  // Strip out any non-numbers (except the decimal point)
	  var numVal = Number(value.replace(/[^0-9\.]+/g, ""));
	  data.addRow([recordSet[i]["Name"], {v:numVal, f:value}]);
	 }
	 var options = {
	  title:  'Opportunities Currently Displayed'
	 };
	 chart = new google.visualization.PieChart(document.getElementById('mychart'));
	 chart.draw(data, options);
    }

    CustOppListAppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    CustOppListAppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

	CustOppListAppletPR.prototype.GoogleJSAPILoaded = function() {
	 var PR = this;
	 google.load('visualization', '1', {
	    'callback' : PR.GoogleVisualizationPackageLoaded(PR),
  		'packages' : ['corechart']});
	 return false; // stop event propagation
	}

	CustOppListAppletPR.prototype.GoogleVisualizationPackageLoaded = function(PR) {
	 if (!google.visualization || typeof(google.visualization.DataTable) != "function") {
	  setTimeout(function () {
	   PR.GoogleVisualizationPackageLoaded(PR)
	  }, 5);
	 } 
	 else {
	  PR.BindData(true)
	 }
	return false; // stop event propagation
	}

    return CustOppListAppletPR;
   }()
  );
  return "SiebelAppFacade.CustOppListAppletPR";
 })
}
