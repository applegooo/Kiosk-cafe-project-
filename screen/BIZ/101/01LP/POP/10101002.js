function screen_on_load()
{
	
}

function clearBtn_on_click(objInst)
{
	this.fld_Num.settext("");
}

function delBtn_on_click(objInst)
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



function btn_nun_1_on_mouseup(objInst)
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

function btn_ok_on_mouseup(objInst)
{
	const phoneNumber = this.fld_Num.gettext();

    // 유효성 검사 호출
    if (SYSUtil.fn_PhoneNumber(phoneNumber, this)) {
        // 유효하면 팝업 닫기 
        this.screen.unloadpopup();
    }
}

function btn_clo_on_click(objInst)
{
	this.screen.unloadpopup();
}