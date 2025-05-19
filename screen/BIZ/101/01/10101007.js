function screen_on_load()
{
	
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

// 버튼 클릭시 다음화면으로 이동하면서 10101008화면 타이머 작동되게 하기
function btn_next_on_mouseup(objInst)
{
	// 현재 화면의 부모 화면을 가져옴 (BizMain의 화면을 의미)
	let parentScr = this.screen.getparent();  
	
	// 부모 화면에서 이름이 "SV_Template","SV_Template_LP"인 인스턴스를 슬라이드뷰로 가져옴
	let sld = parentScr.getinstancebyname("SV_Template"); 
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");  
	
	// 현재 슬라이드뷰에서 포커스된 아이템의 다음 인덱스를 가져옴
	let nNextIdx = sld.getitemfocus() + 1;   
	
	// 공통함수 안쓰고: 슬라이드뷰의 특정 인스턴스에서 자식 객체를 가져오는 코드
	// let objTab = parentScr.getinstancebyname("TB_template" + nNextIdx);
	// let objTxt = objTab.getchildinstancebyname(0, "TX_1");
	
	// nNextIdx에 해당하는 비즈니스 화면(BizScreen) 인스턴스를 가져옴
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);  
	
	// nNextIdx에 해당하는 BizScreen LP 화면 인스턴스를 가져옴
	let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);
	
	// 가져온 BizScreen에서 "timeLeft_8"이라는 멤버 객체를 objTime에 할당
	let objTime = oScrBiz.getmembers().timeLeft_8;   
	
	// 10101008 화면에서 "TX_2", "TX_3", "TX_4" 멤버 객체 가져오기
	let objTxt2 = oScrBiz.getmembers().TX_2;           
	let objTxt3 = oScrBiz.getmembers().TX_3;
	let objTxt4 = oScrBiz.getmembers().TX_4; 
	
	// BizScreen LP에서 "timeLeft_8"이라는 멤버 객체를 objTimeLP에 할당
	let objTimeLP = oScrBizLP.getmembers().timeLeft_8;   
	
	// 10101008 화면에서 "TX_2", "TX_3", "TX_4" 멤버 객체를 가져옴 (LP 화면)
	let objTxt2LP = oScrBizLP.getmembers().TX_2;           
	let objTxt3LP = oScrBizLP.getmembers().TX_3;
	let objTxt4LP = oScrBizLP.getmembers().TX_4; 
	
	// 현재 화면에서 "timeLeft_8" 타이머 활성화 상태를 obj_7에 저장
	let obj_7 = objTime.getenable();	
	
	// BizScreen에서 가져온 objTime 객체에 타이머 활성화 상태 설정
	objTime.setenable(true);      
	
	// LP 화면에서 "timeLeft_8" 타이머 활성화 상태를 obj_7LP에 저장
	let obj_7LP = objTimeLP.getenable();	
	
	// BizScreen LP에서 가져온 objTime 객체에 타이머 활성화 상태 설정
	objTimeLP.setenable(true);      
	
	// 현재 슬라이드뷰에서 포커스된 아이템의 이전 인덱스를 가져옴 (10101005 화면)
	let nPrevIdx = sld.getitemfocus() - 2; 
	
	// 이전 화면의 BizScreen 인스턴스를 가져옴
	let oScrBiz_1 = SYSUtil.fn_getBizScreen(this, nPrevIdx); 
	
	// 현재 슬라이드뷰에서 포커스된 아이템의 이전 인덱스를 가져옴 (LP 화면)
	let nPrevIdxLP = sld_LP.getitemfocus() - 2; 
	
	// 이전 LP 화면의 BizScreen 인스턴스를 가져옴
	let oScrBiz_1LP = SYSUtil.fn_getBizScreen(this, nPrevIdxLP); 
	
	// 10101005 화면에서 "TX_2", "TX_3", "TX_4" 멤버 객체 가져오기
	let objTxt2_1 = oScrBiz_1.getmembers().TX_2;
	let objTxt3_1 = oScrBiz_1.getmembers().TX_3;
	let objTxt4_1 = oScrBiz_1.getmembers().TX_4;
	
	// 10101005 LP 화면에서 "TX_2", "TX_3", "TX_4" 멤버 객체 가져오기
	let objTxt2_1LP = oScrBiz_1LP.getmembers().TX_2;
	let objTxt3_1LP = oScrBiz_1LP.getmembers().TX_3;
	let objTxt4_1LP = oScrBiz_1LP.getmembers().TX_4;
	
	// 10101008 화면에 10101005 화면에 있는 TX_2, TX_3, TX_4 텍스트 값 설정
	objTxt2.settext(objTxt2_1.gettext()); // TX_2의 텍스트 값
	objTxt3.settext(objTxt3_1.gettext()); // TX_3의 텍스트 값
	objTxt4.settext(objTxt4_1.gettext()); // TX_4의 텍스트 값
	
	// LP 화면에 10101005 화면에 있는 TX_2, TX_3, TX_4 텍스트 값 설정
	objTxt2LP.settext(objTxt2_1LP.gettext()); // TX_2의 텍스트 값
	objTxt3LP.settext(objTxt3_1LP.gettext()); // TX_3의 텍스트 값
	objTxt4LP.settext(objTxt4_1LP.gettext()); // TX_4의 텍스트 값
	
	// 슬라이드뷰 포커스를 설정하고, 다음 화면으로 이동
	sld.setfocus();	
	sld.movenext();	
	sld_LP.movenext();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}