if (typeof(SiebelAppFacade.SRListPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SRListPM");
 define("siebel/custom/SRListPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.SRListPM = (function () {

    function SRListPM(pm) {
     SiebelAppFacade.SRListPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SRListPM, SiebelAppFacade.ListPresentationModel);

    SRListPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.SRListPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
	 this.AddProperty("PriorityValue","");
	 this.AddProperty("Show_btn", "");
   //  this.AddMethod("ShowSelection", SelectionChange,{sequence: false, scope: this});
	 this.AddMethod('FieldChange',this.OnFieldChange, {sequence:false, scope:this});
	
    }

    SRListPM.prototype.Setup = function (propSet) {
         SiebelAppFacade.SRListPM.superclass.Setup.apply(this, arguments);
    }
	
	/*function SelectionChange()
	{
		var sview = SiebelApp.S_App.GetActiveView();
		var sApplet = sview.GetApplet("Service Request List Applet");
		var selrow = sApplet.GetSelection(); 
		var row = selrow + 1;
			
		//get the records that are being displayed on UI			
		var recordSet = this.Get( "GetRecordSet" );
		var colValue = recordSet[selrow]; //Selected Row
		var sSRType = colValue["SR Type"];
		
		if (sSRType == "Incident")
			this.SetProperty("Show_btn", "Y");
		else
			this.SetProperty("Show_btn", "N");
	}*/
	
	SRListPM.prototype.OnFieldChange=function(control,value){
	 var fieldName = control.GetName();
	 if (fieldName == "Priority") {
			this.SetProperty("PriorityValue",value);
		}
	 if (fieldName == "SR Type") {
		 if (value == "Incident")
			this.SetProperty("Show_btn","Y");
		else
			this.SetProperty("Show_btn", "N");
		}
	}

    return SRListPM;
   }()
  );
  return "SiebelAppFacade.SRListPM";
 })
}
