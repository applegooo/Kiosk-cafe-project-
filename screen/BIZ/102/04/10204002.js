// 화면이 로드될 때 실행되는 함수 (빈 함수로 정의됨)
function screen_on_load()
{
	
}

// 직원 호출 버튼 클릭 시 메시지 박스 표시
function btn_Call_on_mouseup(objInst)
{
	// "직원호출중입니다. 잠시만기다려주세요" 메시지 표시
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

// 처음으로 버튼 클릭 시 페이지 새로 고침
function btn_Home_on_mouseup(objInst)
{
	// 페이지 리로드
	window.location.reload();
}

// 주문 버튼 클릭 시 슬라이드 및 필드 포커스 이동
function btn_ord_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	// 부모 화면 객체 가져오기
	let sld = parentScr.getinstancebyname("SV_Template"); // 부모 화면에서 "SV_Template" 인스턴스 가져오기
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); // 부모 화면에서 "SV_Template_LP" 인스턴스 가져오기
	sld.setzorder(0)	// 슬라이드 z-index를 0으로 설정
	
	sld.setfocus();	// 슬라이드에 포커스를 설정
	sld.movenext();	// 슬라이드에서 다음 화면으로 이동
	sld_LP.movenext(); // "SV_Template_LP"에서 다음 화면으로 이동
}

// 이전 버튼 클릭 시 슬라이드 포커스 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent(); // 부모 화면 객체 가져오기
	let sld = parentScr.getinstancebyname("SV_Template"); // "SV_Template" 인스턴스 가져오기
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); // "SV_Template_LP" 인스턴스 가져오기
	
	sld.setfocus(); // 슬라이드에 포커스를 설정
	sld.moveprev(); // 슬라이드에서 이전 화면으로 이동
	sld_LP.movenext(); // "SV_Template_LP"에서 다음 화면으로 이동
}

// 접근성 팝업 버튼 클릭 시 접근성 팝업 로드
function btn_Acc_on_mouseup(objInst)
{
	// "접근성(팝업)" 팝업 로드
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);		
}
