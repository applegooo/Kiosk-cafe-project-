function btn_pay_on_mouseup(objInst)
{
    // 부모 화면을 가져옴
    let parentScr = this.screen.getparent();
    
    // 부모 화면에서 슬라이드뷰 인스턴스를 가져옴
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
    
    // 슬라이드뷰에 포커스를 맞추고 다음 페이지로 이동
    sld.setfocus();
    sld.movenext();
    sld_LP.movenext();  // 동일한 작업을 다른 슬라이드뷰에 대해 실행
}

function btn_Prev_on_mouseup(objInst)
{
    // 부모 화면을 가져옴
    let parentScr = this.screen.getparent();
    
    // 부모 화면에서 슬라이드뷰 인스턴스를 가져옴
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");  
    
    // 슬라이드뷰에 포커스를 맞추고 이전 페이지로 이동
    sld.setfocus();
    sld.moveprev();
    sld_LP.moveprev();  // 동일한 작업을 다른 슬라이드뷰에 대해 실행
}

// 홈 버튼 클릭 시 화면 새로고침하는 함수
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

// 직원 호출 기능을 수행하는 함수
function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

// 접근성 팝업을 호출하는 함수
function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER;
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}