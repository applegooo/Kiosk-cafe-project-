function btn_Pre_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP")
	sld.setfocus();
	sld.moveprev();
	sld_LP.moveprev();
}

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

function btn_next_on_mouseup(objInst)
{	
	let parentScr = this.screen.getparent();	 
	let sld = parentScr.getinstancebyname("SV_Template"); 
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	
	let nNextIdx_2 = sld.getitemfocus() + 1 ;
	let nNextIdx_2_LP = sld_LP.getitemfocus() + 1 ;
	
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    
	let objTime  = oScrBiz.getmembers().time;   
			
	let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx_2_LP);    
	let objTimeLP  = oScrBizLP.getmembers().time;   

//	oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);  
//	oScrBizLP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false); 
		
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
	
	let obj_10 = objTime.getenable(); 	
	objTime.setenable(true);   
	
	let obj_11 = objTimeLP.getenable();	
	objTimeLP.setenable(true);
}
