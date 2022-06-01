if (typeof(SiebelAppFacade.ContactGoogleMapPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ContactGoogleMapPM");
 define("siebel/custom/ContactGoogleMapPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ContactGoogleMapPM = (function () {

    function ContactGoogleMapPM(pm) {
     SiebelAppFacade.ContactGoogleMapPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ContactGoogleMapPM, SiebelAppFacade.PresentationModel);

    ContactGoogleMapPM.prototype.Init = function () {
     SiebelAppFacade.ContactGoogleMapPM.superclass.Init.apply(this, arguments);
	 this.AddMethod("ShowSelection", OnChangeRecord, {sequence:false, scope:this });
     this.AddProperty("ContactAddress", "");
    }

	function OnChangeRecord() {
		 var controls = this.Get("GetControls");
		 var street= this.ExecuteMethod("GetFieldValue", controls["Personal Address"]);
		 var city=this.ExecuteMethod("GetFieldValue", controls["Personal City"]);
		 var state=this.ExecuteMethod("GetFieldValue", controls["Personal State"]);
		 var address = street + " " + city + " " + state;
		 this.SetProperty("ContactAddress",address);
	}

    return ContactGoogleMapPM;
   }()
  );
  return "SiebelAppFacade.ContactGoogleMapPM";
 })
}
