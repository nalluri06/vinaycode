	if (typeof (SiebelAppFacade.AlternateColorsApplet) === "undefined"){

	SiebelJS.Namespace("SiebelAppFacade.AlternateColorsApplet");
	
	define("siebel/custom/AlternateColorsApplet", ["siebel/jqgridrenderer"],function () {
		SiebelAppFacade.AlternateColorsApplet = (function () {
			
			function AlternateColorsApplet(pm) {
				SiebelAppFacade.AlternateColorsApplet.superclass.constructor.call(this, pm);

			}

			SiebelJS.Extend(AlternateColorsApplet, SiebelAppFacade.JQGridRenderer);
			
			AlternateColorsApplet.prototype.Init = function(){
				SiebelAppFacade.AlternateColorsApplet.superclass.Init.call( this );
			};
			
			AlternateColorsApplet.prototype.ShowUI = function(){
				SiebelAppFacade.AlternateColorsApplet.superclass.ShowUI.call( this );				
				
			};

			AlternateColorsApplet.prototype.BindData = function( bRefresh ){
				SiebelAppFacade.AlternateColorsApplet.superclass.BindData.call(this, bRefresh);
				
				var appId = this.GetPM().Get("GetFullId"); //S_A2
				var appPosition = appId.charAt(3); //2
				var tableId = "#s_"+appPosition+"_l"; //s_2_l
				
				var recordSet = this.GetPM().Get("GetRecordSet");
				$(tableId+' tbody tr').each(function(row, tr){
					if(row <= 9){
					var sStatus = recordSet[row]["Status"]
					var row1 = row + 1;
					//if(row1%2 == 0)
					if (sStatus == "Closed")
						$(tableId+' tbody tr[id='+row1+']').css("background", "green");
					}
				})
				
			};
			
			return AlternateColorsApplet;
			}()
		);
	return "SiebelAppFacade.AlternateColorsApplet";
	});
}