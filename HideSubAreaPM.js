if (typeof(SiebelAppFacade.HideSubAreaPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.HideSubAreaPM");
 define("siebel/custom/HideSubAreaPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.HideSubAreaPM = (function () {

    function HideSubAreaPM(pm) {
     SiebelAppFacade.HideSubAreaPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(HideSubAreaPM, SiebelAppFacade.PresentationModel);

    HideSubAreaPM.prototype.Init = function () {
   
     SiebelAppFacade.HideSubAreaPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": "+this.constructor.name+":      Init method reached.");
     this.AddProperty("HideField","");
	 this.AddProperty("TypeVal","");
	 this.AddMethod("ShowSelection", ChangeRec, {sequence:false, scope:this});
	 this.AddMethod("FieldChange", OnFieldUpdate, {sequence:false, scope:this});
    }
	function ChangeRec(){
		var ctrls = this.Get("GetControls");
		var oType = ctrls["INS Product"];
		var value = this.ExecuteMethod("GetFieldValue", oType);
		
		var value1 = $('[aria-labelledby="INS_Product_Label"]').val();
		if(value!= "")
		{
			this.SetProperty("HideField", false);
			this.SetProperty("TypeVal", value);
		}
		else
		{
			this.SetProperty("HideField", true);
			this.SetProperty("TypeVal", "");
		}
	
	}
	
	function OnFieldUpdate(control, value){
	
		if(control.GetName() == "INS Product"){
		if(value!= "")
		{
			this.SetProperty("HideField", false);
			this.SetProperty("TypeVal", value);
		}
		else
		{
			this.SetProperty("HideField", true);
			this.SetProperty("TypeVal", "");
		}
	
		}
		
	}
	
	
    return HideSubAreaPM;
   }()
  );
  return "SiebelAppFacade.HideSubAreaPM";
 })
}