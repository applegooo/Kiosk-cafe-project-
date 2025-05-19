//전체 지우기
function btn_Clean_on_mouseup(objInst)
{
	this.fld_Num.settext("");
}

//한글자 지우기
function btn_Del_on_mouseup(objInst)
{
	var n = this.fld_Num.gettext().length;
   
   // 패턴 대신 두번째 "-" 처리   
   var strVal ="";
   if (n==15) {
      strVal = this.fld_Num.gettext().substr(0,n-2);
   } else {
      strVal = this.fld_Num.gettext().substr(0,n-1);
   }
   this.fld_Num.settext(strVal);
}

// 알림 생략 버튼
function btn_clo_on_mouseup(objInst)
{
	this.screen.unloadpopup();
}	

// 번호 개별 글자
function btn_num_1_on_mouseup(objInst)
{
	if (objInst == null || this.fld_Num == null) {
    alert("필수 객체가 없습니다.");
    return;
}

	// 버튼의 텍스트 가져오기
	var numTxt = objInst.gettext();
	if (numTxt == null) numTxt = "";

	// 현재 텍스트 필드의 값 가져오기
	var strTmp = this.fld_Num.gettext();
	if (strTmp == null) strTmp = "";

	// 디버깅 출력
	SYSUtil.fn_debug(this, "strTmp: " + strTmp);
	SYSUtil.fn_debug(this, "numTxt: " + numTxt);

	// 텍스트 결합 후 필드 업데이트
	this.fld_Num.settext(strTmp + numTxt);
}

//확인버튼
function btn_ok_on_mouseup(objInst)
{
    const phoneNumber = this.fld_Num.gettext();

    // 유효성 검사 호출
    if (SYSUtil.fn_PhoneNumber(phoneNumber, this)) {
        // 유효하면 팝업 닫기 
        this.screen.unloadpopup();
    }
}


