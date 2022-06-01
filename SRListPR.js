if (typeof(SiebelAppFacade.SRListPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SRListPR");
 define("siebel/custom/SRListPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.SRListPR = (function () {

    function SRListPR(pm) {
     SiebelAppFacade.SRListPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SRListPR, SiebelAppFacade.JQGridRenderer);

    SRListPR.prototype.Init = function () {
         SiebelAppFacade.SRListPR.superclass.Init.apply(this, arguments);
		 this.AttachPMBinding( "Show_btn", HideAppletControl );
		 
		 //this.GetPM().SetProperty("defaultAppletDisplayMode", "collapsed");
    }

    SRListPR.prototype.ShowUI = function () {
		SiebelAppFacade.SRListPR.superclass.ShowUI.apply(this, arguments);
		var a = this.GetPM().Get( "GetFullId");
		//$('#'+a).draggable();
		$('#'+a+' tr.AppletButtons button[title="Service Requests:Query"]').after('<button class="appletButton" type="button" id="custom" title="Show/Hide">Show/Hide</button>');
		 var pm = this.GetPM();
		 var placeHolder = pm.Get("GetPlaceholder");
		 var chart_html = "<div id='custom_chart' style='height:250px;width:400px'>" +  "</div>";
		 $('#' + placeHolder + 'd').append(chart_html);
		 var PR = this;
		 require(["http://www.google.com/jsapi"], function () {
		  PR.GoogleJSAPILoaded.call(PR);
		 });
    }
	
	SRListPR.prototype.ShowSelection = function () {
	    SiebelAppFacade.SRListPR.superclass.ShowSelection.call(this);
		var sview = SiebelApp.S_App.GetActiveView();
		var sApplet = sview.GetApplet("Service Request List Applet");
		var selrow = sApplet.GetSelection(); 
		var row = selrow + 1;
			
		//get the records that are being displayed on UI			
		var recordSet = this.GetPM().Get( "GetRecordSet" );
		var colValue = recordSet[selrow]; //Selected Row
		var sSRType = colValue["SR Type"];
		
		if (sSRType == "Incident")
			this.GetPM().SetProperty("Show_btn", "Y");
		else
			this.GetPM().SetProperty("Show_btn", "N");
	};

    SRListPR.prototype.BindData = function (bRefresh) {
    	 SiebelAppFacade.SRListPR.superclass.BindData.apply(this, arguments);
		 var probVal = this.GetPM().Get("PriorityValue");
		 var recordSet = this.GetPM().Get("GetRecordSet");
		 var data = new google.visualization.DataTable();
		 data.addColumn('string', 'Label');
		 data.addColumn('number', 'Value');
		var a = 0; 
		var b = 0;
		var c = 0;		
		var d = 0;
		
		for (record in recordSet) {
			var PriorityVal = $("#"+this.GetPM().Get("GetPlaceholder")).find("tr[id="+(Number(record)+1)+"]").find("td[id*=l_Priority]");
			var val = recordSet[record]["Priority"];
			
			switch (val) {
				case ("1-ASAP"):
					PriorityVal.css("background-color","blue");
					a = a + 1;
					break;
				case ("2-High"):
					PriorityVal.css({"background-color":"red", "color":"white"});
					b = b + 1;
					break;
				case ("3-Medium"):
					PriorityVal.css("background-color","orange"); 
					c = c + 1;
					break;
				default:
					PriorityVal.css("background-color","green");
					d = d + 1;
			}
		}
		
		data.addRow(["1-ASAP", a]);
		data.addRow(["2-High", b]);
		data.addRow(["3-Medium", c]);
		data.addRow(["Others", d]);
		
		var options = {
		  title:  'SR Status',
		  pieHole: 0.4
		 };
		 chart = new google.visualization.PieChart(document.getElementById('custom_chart'));
		 chart.draw(data, options);
    }

    SRListPR.prototype.BindEvents = function () {
		SiebelAppFacade.SRListPR.superclass.BindEvents.apply(this, arguments);
		
		//$('#custom').on("click", _ModdifyLayout);
		$('#custom')[0].addEventListener('click', ModdifyLayout);
    }

    SRListPR.prototype.EndLife = function () {
        SiebelAppFacade.SRListPR.superclass.EndLife.apply(this, arguments);
    }
	
	function ModdifyLayout()
	{	
		//$('#S_A1').slideToggle();
		$('#custom_chart').fadeToggle();
	}
	function HideAppletControl() {

			var bShowbtn = this.GetPM().Get("Show_btn");					
			if (bShowbtn == "N")
				$('#custom').hide();						
			else
				$('#custom').show();
	}
	SRListPR.prototype.GoogleJSAPILoaded = function() {
	 var PR = this;
	 google.load('visualization', '1', {
	    'callback' : PR.GoogleVisualizationPackageLoaded(PR),
  		'packages' : ['corechart']});
	 return false;
	}

	SRListPR.prototype.GoogleVisualizationPackageLoaded = function(PR) {
	 if (!google.visualization || typeof(google.visualization.DataTable) != "function") {
	  setTimeout(function () {
	   PR.GoogleVisualizationPackageLoaded(PR)
	  }, 5);
	 } 
	 else {
	//  PR.BindData(true)
	 }
	return false; // stop event propagation
	}

    return SRListPR;
   }()
  );
  return "SiebelAppFacade.SRListPR";
 })
}
