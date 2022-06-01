if (typeof (SiebelAppFacade.ListAppletTiles) === "undefined"){

    SiebelJS.Namespace("SiebelAppFacade.ListAppletTiles");
    define("siebel/custom/ListAppletTiles", ["order!siebel/jqgridrenderer"] , function (){
		
		SiebelAppFacade.ListAppletTiles = (function (){
			function ListAppletTiles(pm){
				SiebelAppFacade.ListAppletTiles.superclass.constructor.call(this, pm);
				
				// To Hide a List Column on the List Applet
				var oColumns= pm.Get("ListOfColumns");
				var oArray = [];
				for(var i=0;i<oColumns.length;i++){
					if (oColumns[i].name == "Category"){
						oArray.push(i);
					}
				}
				oArray.sort(function(a, b){return b-a});
				for(var j=0;j<oArray.length;j++){
					oColumns.splice(oArray[j],1);
				}
				pm.SetProperty("ListOfColumns", oColumns);
				
				//code ends to hide a list column on the list applet
			}
			
			SiebelJS.Extend( ListAppletTiles, SiebelAppFacade.JQGridRenderer );
			
			ListAppletTiles.prototype.Init = function () {
                SiebelAppFacade.ListAppletTiles.superclass.Init.call(this);
				SiebelJS.Log("Entered Init method");

			};
			
			ListAppletTiles.prototype.ShowUI = function (){
				 SiebelAppFacade.ListAppletTiles.superclass.ShowUI.call(this);
				 SiebelJS.Log("Entered Show UI");
				 
				 //for removing horizontal scroll
					$('.ui-jqgrid-bdiv').css({
						'overflow-x': 'hidden'
				});
					//--- end remove horizontal scroll
					
			var div_id = "s_" + this.GetPM().Get( "GetFullId" ) + "_div";
			//$('#'+div_id+' form > div').css({borderRadius: '0'});
						
			$('#'+div_id+' .AppletButtons').css("display","none");//to hide applet header
			$('#'+div_id+' [role="rowheader"]').css("display","none");
														
 			};
			
			ListAppletTiles.prototype.ShowSelection = function () {
			    SiebelAppFacade.ListAppletTiles.superclass.ShowSelection.call(this);
				SiebelJS.Log("Bind Data Selection");	
					var sview = SiebelApp.S_App.GetActiveView();
					var sApplet = sview.GetApplet("Activity List Applet (WCC Home)");
					var sAppId = sApplet.GetId();
					var selrow = sApplet.GetSelection();
					var row = selrow + 1;
					
					var appID = '#s_'+sAppId+'_l';
					if(appID != undefined){ 
						SiebelJS.Log(appID);
												
						$(appID).parents('.ui-jqgrid-bdiv').addClass('homepage-wrapper');
						
						//get the records that are being displayed on UI
						var recordSet = this.GetPM().Get( "GetRecordSet" );
						var colValue = recordSet[selrow]; //Selected Row
						var sActPriority = colValue["Priority"];
						var sActDetails = colValue["Calc1"];
						
						var sAccountNameIndex = sActDetails.indexOf("#A");
						var sTypeIndex = sActDetails.indexOf("#T");
						var sStatusIndex = sActDetails.indexOf("#S");
						var sAccountName = sActDetails.substring(0, sAccountNameIndex);
						var sType = sActDetails.substring(sAccountNameIndex+2, sTypeIndex);
						var sStatus = sActDetails.substring(sTypeIndex+2, sStatusIndex);
						var sDesc = sActDetails.substring(sStatusIndex+2);
						
						
						// First List Column
						if(row != 0){
							var sPriority;
							if(sActPriority.charAt(0) != "")
								sPriority = 'P'+ sActPriority.charAt(0);
							else
								sPriority = "";
							var sActPri = '#'+row+'_s_'+sAppId+'_l_Priority';
							$(sActPri).text(''); //Making the td value as null
							$(sActPri).css("width", "15px");
							$(sActPri).css("marginLeft", "3px");
							$(sActPri).append('<div style="background: #e5ffe5; padding-top: 50px; padding-left: 42px; color: red; height: 78px; font-weight: bolder; font-size: xx-large">'+sPriority+'</div>');
						}
						
						// Second List Column
						sActDetailsID = '#'+row+'_s_'+sAppId+'_l_Type';
						$(sActDetailsID).text(''); //Making the td value as null	
						$(sActDetailsID).css("width", "100px");
						$(sActDetailsID).append('<div style="padding: 10px; background: #e5ffe5"><p><span style="color: red">Account Name: </span><span style="font-weight: bolder">'+sAccountName+'</span></p><p><span style="color: red">Type: </span><span style="font-weight: bolder">'+sType+'</span></p><p><span style="color: red">Status: </span><span style="font-weight: bolder">'+sStatus+'</span></p><p><span style="color: red">Description: </span><span style="font-weight: bolder">'+sDesc+'</span></p></div>');
					}
			};
			
			ListAppletTiles.prototype.BindData = function( bRefresh ){
				SiebelAppFacade.ListAppletTiles.superclass.BindData.call(this, bRefresh);

					var sAppId = SiebelApp.S_App.GetActiveView().GetApplet("Activity List Applet (WCC Home)").GetId();
					var appID = '#s_'+sAppId+'_l';					
					var sApp = $(appID);
					if(sApp.length > 0){
						SiebelJS.Log(appID);
						var recordSet = this.GetPM().Get( "GetRecordSet" ); //get the records that are being displayed on UI
						$(appID).parents('.ui-jqgrid-bdiv').addClass('homepage-wrapper');
						$(appID+' tbody tr').each(function(row, tr){
						var colValue = recordSet[row];
						
						if (row < 7){
								var sActPriority = colValue["Priority"];
								var sActDetails = colValue["Calc1"];
												
								var sAccountNameIndex = sActDetails.indexOf("#A");
								var sTypeIndex = sActDetails.indexOf("#T");
								var sStatusIndex = sActDetails.indexOf("#S");
								var sAccountName = sActDetails.substring(0, sAccountNameIndex);
								var sType = sActDetails.substring(sAccountNameIndex+2, sTypeIndex);
								var sStatus = sActDetails.substring(sTypeIndex+2, sStatusIndex);
								var sDesc = sActDetails.substring(sStatusIndex+2);
								
								
								// First List Column
								var sRow = row + 1;
								var sPriority;
								if(sActPriority.charAt(0) != "")
									sPriority = 'P'+ sActPriority.charAt(0);
								else
									sPriority = "";
								var sActPri = '#'+sRow+'_s_'+sAppId+'_l_Priority';
								$(sActPri).text(''); //Making the td value as null
								$(sActPri).css("width", "15px");
								$(sActPri).css("marginLeft", "3px");
								$(sActPri).append('<div style="background: #e5ffe5; padding-top: 50px; padding-left: 42px; color: red; height: 78px; font-weight: bolder; font-size: xx-large">'+sPriority+'</div>');
													
								// Second List Column
								sActDetailsID = '#'+sRow+'_s_'+sAppId+'_l_Type';
								$(sActDetailsID).text(''); //Making the td value as null	
								$(sActDetailsID).css("width", "100px");
								$(sActDetailsID).append('<div style="padding: 10px; background: #e5ffe5"><p><span style="color: red">Account Name: </span><span style="font-weight: bolder">'+sAccountName+'</span></p><p><span style="color: red">Type: </span><span style="font-weight: bolder">'+sType+'</span></p><p><span style="color: red">Status: </span><span style="font-weight: bolder">'+sStatus+'</span></p><p><span style="color: red">Description: </span><span style="font-weight: bolder">'+sDesc+'</span></p></div>');
						
							}
						});						
												 
					}
			};

			return ListAppletTiles;
		}());
        return "SiebelAppFacade.ListAppletTiles";
    });
}