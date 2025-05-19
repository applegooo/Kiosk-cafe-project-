function screen_on_load()
{
	
}

// 금액에 따른 시간 계산
function timeFare(fareText) {
    // 금액 문자열에서 쉼표 제거 후 숫자로 변환
    let fare = parseInt(fareText.replace(/,/g, ''), 10);

    // 총 초 계산 (5000원 = 10분 = 600초 기준)
    let totalSeconds = fare * (600 / 5000);

    // 시간, 분, 초 계산
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    // 2자리 형식으로 포맷팅
    let formattedTime =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;

    return formattedTime; // 결과 반환
}

// 금액에 따른 전력량 계산
function calculatePower(fareText) {
    // 금액 문자열에서 쉼표 제거 후 숫자로 변환
    let fare = parseInt(fareText.replace(/,/g, ''), 10);

    // 전력량 계산 (1원당 0.003kWh)
    let powerInKWh = fare * 0.003;

    // 소수점 0자리로 반환
    return powerInKWh.toFixed(0) + "kWh";
}

// 시간 단가 계산 함수
function calculateUnitCost(fareText, timeText) {
    // 금액 문자열에서 쉼표 제거 후 숫자로 변환
    let fare = parseInt(fareText.replace(/,/g, ''), 10);

    // 시간 문자열에서 시간, 분, 초를 분리하여 초로 변환
    let timeParts = timeText.split(':');
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    let seconds = parseInt(timeParts[2], 10);

    // 시간을 초 단위로 변환
    let totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

    // 시간 단가 계산 (금액 / 시간(초) = 단위 시간당 비용)
    let unitCost = fare / (totalTimeInSeconds / 3600); // 초를 시간으로 변환하여 계산

    // 계산된 단가는 "원/시간" 형식으로 반환
    return unitCost.toFixed(0) + "원/시간";
}

function btn_fare_on_mouseup(objInst)
{
		// 클릭된 버튼의 텍스트 가져오기
    let fareText = objInst.gettext();

    // 가져온 텍스트를 "fld_fare_1" 필드에 설정
    this.fld_fare.settext(fareText);

    // TX_Time 값 계산 및 설정
    let timeValue = this.timeFare(fareText);
    this.TX_Time.settext(timeValue);

    // TX_power_1 값 계산 및 설정
    let powerValue = this.calculatePower(fareText);
    this.TX_power.settext(powerValue);
}

function btn_clo_on_mouseup(objInst)
{
		 // 초기 금액 설정
    let initialFare = "5,000";

    // "fld_fare" 필드 텍스트를 초기 금액으로 설정
    this.fld_fare.settext(initialFare);

    // 초기 금액에 따른 충전 예상 시간 계산 및 설정
    let timeValue = this.timeFare(initialFare);
    this.TX_Time.settext(timeValue);

    // 초기 금액에 따른 전력량 계산 및 설정
    let powerValue = this.calculatePower(initialFare);
    this.TX_power.settext(powerValue);
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
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}

function btn_prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();
	sld.moveprev();
	sld_LP.moveprev();
}

function btn_ok_on_mouseup(objInst)
{
	// 현재 화면의 부모 화면 가져오기
	let parentScr = this.screen.getparent();
	console.log("현재 부모 화면은 : " + (parentScr ? parentScr.getname() : "없음"));
	
    // 부모 화면에서 슬라이드뷰 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 현재 슬라이드뷰의 다음 인덱스 가져오기
    let nNextIdx = sld.getitemfocus() + 1;
    //let nNextIdx_1 = sld_LP.getitemfocus() + 1;

    // 해당 인덱스의 BizScreen 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
	let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);

    // BizScreen에서 "TX_1", "TX_2", "TX_3" 멤버 객체 가져오기
    let objTxt1 = oScrBiz.getmembers().TX_1;
    let objTxt2 = oScrBiz.getmembers().TX_2;
    let objTxt3 = oScrBiz.getmembers().TX_3;
	let objTxt1LP = oScrBizLP.getmembers().TX_1;
	let objTxt2LP = oScrBizLP.getmembers().TX_2;
	let objTxt3LP = oScrBizLP.getmembers().TX_3;
    //let objTxt4 = oScrBiz.getmembers().TX_4; 

    // 입력 값 가져오기
    let won = this.fld_fare.gettext();

    // 쉼표 추가: 숫자일 경우만 포맷
    let formattedWon = parseInt(won.replace(/,/g, ''), 10).toLocaleString();

    // 충전 예상 시간 계산
    let timeValue = this.timeFare(won);

    // 전력량 계산
    let powerValue = this.calculatePower(won);

    // 슬라이드뷰 포커스 및 이동
	sld.setfocus();   
    sld.movenext();
    sld_LP.movenext();
	
    // 포맷된 값을 TX_1에 설정
    objTxt1.settext(formattedWon);
    // 충전 예상 시간을 TX_2에 설정
    objTxt2.settext(timeValue);
    // 전력량을 TX_3에 설정
    objTxt3.settext(powerValue);

   // 포맷된 값을 TX_1에 설정
    objTxt1LP.settext(formattedWon);
    // 충전 예상 시간을 TX_2에 설정
    objTxt2LP.settext(timeValue);
    // 전력량을 TX_3에 설정
    objTxt3LP.settext(powerValue);

	   
    // 해당 화면에서 "TX_Time" 객체를 가져와서 설정 (이 화면에서 시간도 전송)
    let oScrTime = oScrBiz.getmembers().TX_Time;
    if (oScrTime) {
        oScrTime.settext(timeValue);
    }

    // 해당 화면에서 "TX_Power" 객체를 가져와서 설정 (이 화면에서 전력량도 전송)
    let oScrPower = oScrBiz.getmembers().TX_power;
    if (oScrPower) {
        oScrPower.settext(powerValue);
    }

    // 해당 화면에서 "TX_Time" 객체를 가져와서 설정 (이 화면에서 시간도 전송)
    let oScrTime_LP = oScrBizLP.getmembers().TX_Time;
    if (oScrTime_LP) {
        oScrTime_LP.settext(timeValue);
    }

    // 해당 화면에서 "TX_Power" 객체를 가져와서 설정 (이 화면에서 전력량도 전송)
    let oScrPower_LP = oScrBizLP.getmembers().TX_power;
    if (oScrPower_LP) {
        oScrPower_LP.settext(powerValue);
    }
}