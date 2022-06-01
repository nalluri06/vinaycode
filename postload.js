if (typeof (SiebelAppFacade.Postload) == "undefined") {
    Namespace('SiebelAppFacade.Postload');

    (function(){
        SiebelApp.EventManager.addListner( "postload", OnPostload, this );
        function OnPostload(){
					if(SiebelApp.S_App.GetActiveView().GetName() == "Home Page View (WCC)")
					{
						var loginName = SiebelApp.S_App.GetProfileAttr("Login Name");
						var sDate = Date();
						var a = "Welcome"+" "+loginName+" "+"Today Date is"+" "+sDate;
						$('.AppletBlock').parent().hide();
						$('.AppletBlock').parent().parent().append('<div id="sal" style="border:2px solid #ccc; height: 15px; width: 938px; color: red; padding: 10px; border-radius: 10px; margin-bottom: 10px "></div>');
						$('#sal').append(a);
					}
					if($('#logoff').length == 0)
					{
						$('.siebui-toolbar').append('<li id="logoff" data-cmd="#58" role="button" title="LogOff" name="LogOff" tabindex="-1"><img src="images/login77_d.gif" class="ToolbarButtonOn"></li>');
						$('#logoff').click(function(){
							var sConfirm = confirm("Do You really want to log off ?");
							if (sConfirm)
								SiebelApp.S_App.InvokeMethod("Logoff");
						});
					}
					$('.ui-tabs-nav:first').sortable({axis: "x",snap: true});
        }
    }());
}
