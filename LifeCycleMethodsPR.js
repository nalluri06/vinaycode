if (typeof(SiebelAppFacade.LifeCycleMethodsPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.LifeCycleMethodsPR");
 define("siebel/custom/LifeCycleMethodsPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.LifeCycleMethodsPR = (function () {

    function LifeCycleMethodsPR(pm) {
     SiebelAppFacade.LifeCycleMethodsPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(LifeCycleMethodsPR, SiebelAppFacade.JQGridRenderer);

    LifeCycleMethodsPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.LifeCycleMethodsPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      Init method reached.");
	 // Add code here that should happen after default processing
    }

    LifeCycleMethodsPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      ShowUI method reached.");
	 $("#a_1 [data-display='Update Commerce App']").hide();
     SiebelAppFacade.LifeCycleMethodsPR.superclass.ShowUI.apply(this, arguments);
	 //added the <button> tag
	  // Add code here that should happen after default processing
    }

    LifeCycleMethodsPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      BindData method reached.");
     SiebelAppFacade.LifeCycleMethodsPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    

    LifeCycleMethodsPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      EndLife method reached.");
     SiebelAppFacade.LifeCycleMethodsPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return LifeCycleMethodsPR;
   }()
  );
  return "SiebelAppFacade.LifeCycleMethodsPR";
 })
}
