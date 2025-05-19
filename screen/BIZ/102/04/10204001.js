function screen_on_load()
{
	
}    

// 시작하기 버튼 클릭시 화면 전환
function btn_Start_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setzorder(0)	
	
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, screen*/);		
}