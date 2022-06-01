if (typeof(SiebelAppFacade.HideSubAreaPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.HideSubAreaPR");
 define("siebel/custom/HideSubAreaPR", ["Order!siebel/phyrenderer"],
  function () {
   SiebelAppFacade.HideSubAreaPR = (function () {

    function HideSubAreaPR(pm) {
     SiebelAppFacade.HideSubAreaPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(HideSubAreaPR, SiebelAppFacade.PhysicalRenderer);

    HideSubAreaPR.prototype.Init = function () {
     SiebelAppFacade.HideSubAreaPR.superclass.Init.apply(this, arguments);
	 this.AttachPMBinding("HideField", ModifyLayout);
	 this.AttachPMBinding("TypeVal", ModifyLayout);
	 //$('[data-display="Popup"]').parent().hide();
	 var consts = SiebelJS.Dependency("SiebelApp.Constants");
	 this.GetPM().AttachEventHandler(consts.get("PHYEVENT_APPLET_FOCUS"), function() {
		$('[aria-label="Last Name"]').focus();
		$('[aria-label="Last Name"]').on("blur", function(){
			$('[aria-label="Area"]').focus();		
		});
	 });
    }
	HideSubAreaPR.prototype.ShowUI = function () {
    //$('[data-display="Popup"]').parent().hide();
	SiebelAppFacade.HideSubAreaPR.superclass.ShowUI.apply(this, arguments);
		$('[data-display="Popup"]').parent().hide();
		$('[data-display="Popup"]').parent().after('<td><input type="button" name="Slide" class="appletButton" id="slideup" value="SlideUP"></input></td>');
		$('#slideup').on("click", function(){
			$('#a_1 tr td div#a_1').toggle();
		
		});
	}
/*	HideSubAreaPR.prototype.BindEvents = function () {
    SiebelAppFacade.HideSubAreaPR.superclass.BindEvents.apply(this, arguments);
		$('#slideup').click(function(){
			$('#a_1 tr td div#a_1').toggle();
		
		});
    }*/
	function ModifyLayout(){
	 
	 var sHide = this.GetPM().Get("HideField");
	 if(sHide)
	 {
		$('[aria-label="Subarea"]').parent().hide();
		$('#Sub-Area_Label').parent().hide();
	 }
	 else
	 {
		$('[aria-label="Subarea"]').parent().show();
		$('#Sub-Area_Label').parent().show();
	 }
	 if(this.GetPM().Get("TypeVal") != "")
	 {
		$('[aria-label="Type"]').css("background", "green");
	 }
	 else
	 {
		$('[aria-label="Type"]').css("background", "red");
	 }
	 
	}
    return HideSubAreaPR;
   }()
  );
  return "SiebelAppFacade.HideSubAreaPR";
 })
}