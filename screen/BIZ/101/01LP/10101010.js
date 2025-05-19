function screen_on_load()
{
	
}

function btn_yes_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	 // 현재 화면의 부모 화면을 가져옴 (BizMain의 화면을 의미)
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); // 부모 화면에서 이름이 "SV_Template"인 인스턴스를 슬라이드뷰로 가져옴
	let sld = parentScr.getinstancebyname("SV_Template");	
	let nNextIdx = sld_LP.getitemfocus() + 2;	    // 현재 슬라이드뷰에서 포커스된 아이템의 다음 인덱스를 가져옴
	
	// 슬라이드뷰 포커스를 설정하고, 다음 화면으로 이동
	
	sld_LP.setitemfocus(nNextIdx);                 
	sld_LP.movenext();
	sld.movenext();
}

function btn_no_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	 // 현재 화면의 부모 화면을 가져옴 (BizMain의 화면을 의미)
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); // 부모 화면에서 이름이 "SV_Template_LP"인 인스턴스를 슬라이드뷰로 가져옴
	
	// 현재 슬라이드뷰에서 포커스된 아이템의 다음 인덱스를 가져옴
	let nNextIdx = sld_LP.getitemfocus() + 1 ;
	

	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);    // nNextIdx_2 해당하는 비즈니스 화면(BizScreen) 인스턴스를 가져옴
	let objTime  = oScrBiz.getmembers().timeLeft;   // 가져온 BizScreen에서 "timeLeft_2"이라는 멤버 객체를 objTime에 할당
	
	let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    
	let objTimeLP  = oScrBizLP.getmembers().timeLeft;   
	
	// 슬라이드뷰 포커스를 설정하고, 다음 화면으로 이동
	sld_LP.setfocus();	
	sld_LP.movenext();
	sld.movenext();
	
	let obj_10 = objTime.getenable();	// 현재 화면에서 "timeLeft_2" 타이머 활성화 상태를 time 에 저장 	
	objTime.setenable(true);      // BizScreen에서 가져온 objTime 객체에 time 값을 설정합니다.
	
	let obj_11 = objTimeLP.getenable();	
	objTimeLP.setenable(true); 
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}