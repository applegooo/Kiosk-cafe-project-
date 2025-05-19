function screen_on_load()
{
}

//처음으로
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

function btn_next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
//	SYSUtil.fn_debug(this,parentScr.getscreenurl());
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

//이전버튼
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, this.screen);
}