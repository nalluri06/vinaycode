if(typeof(SiebelAppFacade.AppletFocusViewPR)=== "undefined"){
	SiebelJS.Namespace('SiebelAppFacade.AppletFocusViewPR');
	define("siebel/custom/AppletFocusViewPR",["order!siebel/viewpr"], function(){
	SiebelAppFacade.AppletFocusViewPR = ( function(){
		function AppletFocusViewPR(){
			SiebelAppFacade.AppletFocusViewPR.superclass.constructor.apply(this,arguments);
			}

			SiebelJS.Extend(AppletFocusViewPR, SiebelAppFacade.ViewPR);

			AppletFocusViewPR.prototype.Init=function(){
				SiebelAppFacade.AppletFocusViewPR.superclass.Init.apply(arguments);
			}

			AppletFocusViewPR.prototype.Setup = function(){
			}

			AppletFocusViewPR.prototype.SetRenderer = function(){
				
				SiebelJS.Log("Inside Render method");
				var sview = SiebelApp.S_App.GetActiveView();
				var sviewName = sview.GetName();
				SiebelJS.Log(sviewName);
				if(sviewName === "Personal Service Request List View")
				{
					var acapplet = sview.GetApplet("Service Request Detail Applet");
					var appletId = "s_" + acapplet.GetFullId() + "_div";
					SiebelJS.Log(appletId);
					//document.getElementById(appletId).scrollIntoView();
					$('#'+appletId+' tr.AppletButtons').css("background", "#9bfad9");
				}
			}
			
			AppletFocusViewPR.prototype.EndLife=function(){
			};

			return AppletFocusViewPR;
		}());

		return SiebelAppFacade.AppletFocusViewPR;
	});
}