function screen_on_load(objInst)
{
	
}

function btn_next_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setfocus();
	sld.movenext();
	sld_LP.movenext();
}

// 이전 버튼 
function btn_Prev_on_mouseup(objInst)
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

function TX_1_on_change(objInst, event_type)
{
    let fare = this.TX_1.gettext();  // 결제 금액

    // TX_3에서 전력량 가져오기
    let power = this.TX_3.gettext();  // 전력량

    // 전력량에서 'kWh'를 제외한 숫자 값만 추출 (전력량 값이 'kWh' 포함될 수 있음)
    let powerValue = parseFloat(power.replace('kWh', '').trim());

    // 금액에서 쉼표 제거 후 숫자 값으로 변환
    let fareValue = parseInt(fare.replace(/,/g, ''), 10);

    // 충전 단가 계산 (결제 금액 / 전력량)
    let unitCost = fareValue / powerValue;

    // 계산된 단가는 "원/kWh" 형식으로 TX_4에 설정
    this.TX_4.settext(unitCost.toFixed(0) + "원/kWh");
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true/*, this.screen*/);
}