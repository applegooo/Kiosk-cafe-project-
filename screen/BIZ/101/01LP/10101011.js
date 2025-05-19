function screen_on_load()
{
	
}

function timeLeft_on_time(objInst)
{
	// 현재 txt 값 가져와서 숫자로 변환 후 1 감소
  var currentTime = Number(this.txt.gettext());
  this.txt.settext(currentTime - 1);

  // 시간이 1 이하가 되면 타이머 중지 및 텍스트 비활성화
  if (currentTime <= 0) {
    this.timeLeft.setinterval(0);    // 타이머 중지
    this.timeLeft.setenable(false);  // 타이머 비활성화
    this.txt.setenable(false);   // 텍스트 필드 비활성화
    this.txt.setvisible(false);      // 텍스트 숨김 처리
	}
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}