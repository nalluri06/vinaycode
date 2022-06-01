if (typeof(SiebelAppFacade.ContactGoogleMapPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ContactGoogleMapPR");
 define("siebel/custom/ContactGoogleMapPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ContactGoogleMapPR = (function () {

    function ContactGoogleMapPR(pm) {
     SiebelAppFacade.ContactGoogleMapPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ContactGoogleMapPR, SiebelAppFacade.PhysicalRenderer);

    ContactGoogleMapPR.prototype.Init = function () {
     SiebelAppFacade.ContactGoogleMapPR.superclass.Init.apply(this, arguments);
	 this.AttachPMBinding( "ContactAddress", OpenMap );
    }
	
	 ContactGoogleMapPR.prototype.ShowUI = function () {
		SiebelAppFacade.ContactGoogleMapPR.superclass.ShowUI.apply(this, arguments);
		var a = this.GetPM().Get("GetFullId");
		$('#'+a+' tr.AppletBack button[title="Contact:Query"]').after('<button class="appletButton" id="GoogleMap" type="button" name="GoogleMap">Google Map</button>');
	}

	function OpenMap(){
		 var sContAddr = this.GetPM().Get("ContactAddress");
		 sContAddr = sContAddr.replace(/ /g,"+");
		 var sMapAddr ='https://www.google.com/maps?t=m&q='+sContAddr;
		 $("#GoogleMap").on("click",  function(){
			window.open(sMapAddr,'Google Map','width=600,height=600');
		  });
	}

    return ContactGoogleMapPR;
   }()
  );
  return "SiebelAppFacade.ContactGoogleMapPR";
 })
}