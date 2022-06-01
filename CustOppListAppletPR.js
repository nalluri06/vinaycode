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
    }

    CustOppListAppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
	 var probVal = this.GetPM().Get("ProbabilityValue");
	 if (probVal === "100%") {
		$("<div id='dialog' title='100% Probability'> Please verify" + 
			" that this <strong>opportunity</strong> is now " +
			"<span style='color:red'>certain</span></div>").dialog({
				buttons: [
					{text: "Yes",click:function(){$(this).dialog("close");}},
					{text: "No",click:function(){
						$("<div>Please change value to less than 100% to indicate" + 
							" that this opportunity is not yet certain.</div>").dialog();
						$(this).dialog("close");
					}}
				]}
			);
		}
	 this.IdentifyProbabilities();
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

	CustOppListAppletPR.prototype.IdentifyProbabilities = function(){
		var recordSet = this.GetPM().Get("GetRecordSet");
		for (record in recordSet) {
			var cell = $("#"+this.GetPM().Get("GetPlaceholder")).find("tr[id="+(Number(record)+1)+"]").find("td[id*=Primary_Revenue_Win_Probability]");
			var val = recordSet[record]["Primary Revenue Win Probability"];
			
			switch (val) {
				case ("100%"):
					cell.css("background-color","chartreuse"); 
					break;
				case ("0%"):
					cell.css({"background-color":"red", "color":"white"});
					break;
				default:
					cell.css("background-color","yellow");
			}
		}
	}

    return CustOppListAppletPR;
   }()
  );
  return "SiebelAppFacade.CustOppListAppletPR";
 })
}
