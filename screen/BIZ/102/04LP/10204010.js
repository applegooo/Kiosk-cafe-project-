function screen_on_load()
{
	
}    

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	 
	let sld = parentScr.getinstancebyname("SV_Template"); 
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	
	let nNextIdx_2 = sld.getitemfocus() + 1 ;
	
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    
	let objTime  = oScrBiz.getmembers().time;   
	
	let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    
	let objTimeLP  = oScrBizLP.getmembers().time;   
	
	sld_LP.setfocus();	
	sld.movenext();
	sld_LP.movenext();
	
	let obj_10 = objTime.getenable(); 	
	objTime.setenable(true);   
	let obj_11 = objTimeLP.getenable();	
	objTimeLP.setenable(true);
}

function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld_LP.setfocus();
	sld_LP.moveprev();
	sld.moveprev();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);		
}