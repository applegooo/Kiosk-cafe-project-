function screen_on_load()
{
	
}

function popup_on_click(objInst)
{	
	this.screen.loadportletpopup("충전완료", "/BIZ/101/01/POP/101011", "충전완료", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, this.screen);
}

// 팝업창 닫으면 호출
function screen_on_popupdestroy(popup_screen, popup_name, result)
{  
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();
	sld.movenext();
	sld_LP.movenext();
}

// 이전버튼
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();
	sld.moveprev();
	sld_LP.moveprev();
}

//처음으로
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

//직원호출
function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}


function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, this.screen);
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