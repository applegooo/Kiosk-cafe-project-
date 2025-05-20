function screen_on_load()
{
	
}    

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
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

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}

function btn_Pay_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");	
	
	sld_LP.setfocus();	
	sld.movenext();
	sld_LP.movenext();	
}

function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}