function time_on_time(objInst)
{
    // 현재 time_txt 값 가져와서 숫자로 변환
    var currentTimeStr = this.time_txt.gettext(); // time_txt에서 텍스트 가져오기
    var currentTime = Number(currentTimeStr); // 숫자로 변환

    // 시간을 1 감소시킴
    currentTime -= 1;

    // 시간이 0 이하가 되면 타이머 중지 및 텍스트 비활성화
    if (currentTime <= 0) {
        // 타이머 중지 및 비활성화
        this.time.setinterval(0);    // 타이머 중지
        this.time.setenable(false);  // 타이머 비활성화
        this.time_txt.setenable(false);   // 텍스트 필드 비활성화
        this.time_txt.setvisible(false);  // 텍스트 숨김 처리

        // 페이지 새로고침
        window.location.reload();  
    } else {
        // 시간을 갱신
        this.time_txt.settext(currentTime);  // 갱신된 시간을 텍스트 필드에 설정
    }
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Acc_on_mouseup(objInst)
{
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}