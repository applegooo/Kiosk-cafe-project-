function screen_on_load()
{
	
}    

function btn_start_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld_Lp = parentScr.getinstancebyname("SV_Template_LP");
	let sld = parentScr.getinstancebyname("SV_Template");
	console.log("현재 오브젝트 이름 : " + sld_Lp.getname());
	
	sld_Lp.setfocus();
	sld_Lp.movenext();
	sld.movenext();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성버튼", "/BIZ/101/01/POP/101013", "접근성",true,XFD_BORDER_NONE, 90, 252,0,0, false,true,false);
}