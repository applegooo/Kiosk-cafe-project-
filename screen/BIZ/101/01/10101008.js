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

//충전완료시 다음화면으로 이동
function btn_next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

// 타이머 이벤트
function timeLeft_8_on_time(objInst)
{
    // 현재 txt_8 값 가져와서 숫자만 추출 후 6초 증가
    var currentTime = this.txt_8.gettext(); // 예: "11%"
    let newStr = Number(currentTime.replace('%', '')); // 숫자로 변환 ("11" => 11)
    newStr += 6;  // 6초 증가 (기존에 1초씩 증가하는 것을 6초로 변경)

    // newStr가 100을 초과하지 않도록 보정
    if (newStr > 100) {
        newStr = 100;
    }

    // txt_8에 새로운 값 설정 (퍼센트 기호 붙이기)
    this.txt_8.settext(newStr + "%");

    // 시간이 100% 이거나 이상이 되면 타이머 중지 및 텍스트 비활성화
    if (newStr === 100) {  // 100% 딱 맞으면 중지
        this.timeLeft_8.setinterval(0);    // 타이머 중지
        this.timeLeft_8.setenable(false);  // 타이머 비활성화
        this.txt_8.setenable(false);       // 텍스트 필드 비활성화
    }   
}

// 충전중지 버튼 클릭시 타이머 중지
function btn_stop_on_mouseup(objInst)
{
   if (this.timeLeft_8.getenable() === true) {  // 타이머가 작동 중이라면
        // 타이머 중지
        this.timeLeft_8.setinterval(0);        // 타이머 중지
        this.timeLeft_8.setenable(false);      // 타이머 비활성화
        this.txt_8.setenable(false);           // 텍스트 필드 비활성화
    } else {                                   // 타이머가 중지 상태라면
        // 타이머 시작
        this.timeLeft_8.setenable(true);       // 타이머 활성화
        this.timeLeft_8.setinterval(600);      // 타이머 시작 (예: 600ms 간격)
        this.txt_8.setenable(true);            // 텍스트 필드 활성화
    }
}


//금약이 변경되면 충전속도 변경


function TX_2_on_change(objInst, event_type)
{
	// TX_3에서 전력량 가져오기
	let power = this.TX_3.gettext();  // 전력량 (예: "15kWh")

	// TX_2에서 충전 예상 시간 가져오기 (h:mm:ss)
	let time = this.TX_2.gettext();  // 충전 시간 (예: "01:30:00")

	// 전력량에서 'kWh'를 제외한 숫자 값만 추출 (전력량 값이 'kWh' 포함될 수 있음)
	let powerValue = parseFloat(power.replace('kWh', '').trim());

	// 충전 시간에서 시, 분, 초를 분리하여 시간으로 변환
	let timeParts = time.split(':');
	if (timeParts.length !== 3) {
    	console.error("충전 시간 형식이 올바르지 않습니다. (예: h:mm:ss)");
    	return;
	}

	let hours = parseInt(timeParts[0], 10);
	let minutes = parseInt(timeParts[1], 10);
	let seconds = parseInt(timeParts[2], 10);

	// 총 시간을 시간 단위로 변환
	let totalTimeInHours = hours + (minutes / 60) + (seconds / 3600);

	if (totalTimeInHours <= 0) {
    	console.error("충전 시간이 0이거나 음수입니다. 유효한 시간 값을 입력하세요.");
    	return;
	}
	// 충전 속도 계산 (전력량 / 시간)
	let chargingSpeed = powerValue / totalTimeInHours;

	// 계산된 충전 속도를 "kWh" 형식으로 TX_5에 설정
	this.TX_5.settext(chargingSpeed.toFixed(0) + " kWh");
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}