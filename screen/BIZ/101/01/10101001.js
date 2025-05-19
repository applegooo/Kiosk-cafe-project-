function screen_on_load()
{
	console.log("현재 화면 경로는 = " + this.screen.getscreenurl()); //SYS/StartMain'
}    

function btn_Start_on_mouseup(objInst)
{		
	let parentScr = this.screen.getparent();
	SYSUtil.fn_debug(this,parentScr.getscreenurl());
	
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	console.log("현재 부모 화면은 : " + (parentScr ? parentScr.getname() : "없음"));
	sld.setzorder(0)

	// 부모 화면의 부모 화면 가져오기 (getparent를 한 번 더 호출)
	let grandParentScr = parentScr ? parentScr.getparent() : null;
	console.log("부모 화면의 부모 화면은 : " + (grandParentScr ? grandParentScr.getname() : "없음"));
	console.log("현재 오브젝트 이름 : " + sld.getname());	
	
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, screen*/);	
}