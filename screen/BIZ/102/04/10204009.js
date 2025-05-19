function btn_Next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setzorder(0)	
	
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

function btn_Pre_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();
	sld.moveprev();
	sld_LP.moveprev();
}

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);		
}

function time_on_time(objInst)
{
  // 현재 time_txt 값 가져와서 숫자 부분만 추출 후 숫자로 변환
  var currentTimeStr = this.time_txt.gettext(); // 예: "30초 남음"
  var currentTime = Number(currentTimeStr.match(/\d+/)[0]); // 숫자만 추출 후 변환

  // 시간 1 감소 후 다시 설정
  this.time_txt.settext((currentTime - 1) + "초 남음");

  // 시간이 1 이하가 되면 타이머 중지 및 텍스트 비활성화
  if (currentTime <= 1) {
    this.time.setinterval(0);    // 타이머 중지
    this.time.setenable(false);  // 타이머 비활성화
    this.time_txt.setenable(false);   // 텍스트 필드 비활성화
    this.time_txt.setvisible(false);  // 텍스트 숨김 처리

    // 다음 화면으로 자동 이동
    let parentScr = this.screen.getparent();      // 현재 화면의 부모 화면 가져오기
    let sld = parentScr.getinstancebyname("SV_Template"); // 슬라이더 인스턴스 가져오기 
	}
}