function screen_on_load()
{
	
}

function btn_prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	let sld = parentScr.getinstancebyname("SV_Template");
	sld_LP.setfocus();
	sld_LP.moveprev();
	sld.moveprev();
}

function btn_next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	let sld = parentScr.getinstancebyname("SV_Template");
	sld_LP.setfocus();	
	sld_LP.movenext();
	sld.movenext();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}