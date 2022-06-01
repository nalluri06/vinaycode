if (typeof(SiebelAppFacade.CustOppListAppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.CustOppListAppletPM");
 define("siebel/custom/CustOppListAppletPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.CustOppListAppletPM = (function () {

    function CustOppListAppletPM(pm) {
     SiebelAppFacade.CustOppListAppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(CustOppListAppletPM, SiebelAppFacade.ListPresentationModel);

    CustOppListAppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
	 this.AddProperty("ProbabilityValue","");
	 this.AddMethod('FieldChange',this.OnFieldChange, {sequence:false, scope:this});

    }

    CustOppListAppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.CustOppListAppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	
	CustOppListAppletPM.prototype.OnFieldChange=function(control,value){
	 var fieldName = control.GetName();
	 if (fieldName == "Primary Revenue Win Probability") {
	  this.SetProperty("ProbabilityValue",value);
     }
	}

    return CustOppListAppletPM;
   }()
  );
  return "SiebelAppFacade.CustOppListAppletPM";
 })
}
