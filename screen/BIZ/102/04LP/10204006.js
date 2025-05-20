function screen_on_load()
{
	
}    

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	
	sld_LP.setfocus();
	sld_LP.moveprev();
	sld.moveprev();	
}
function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

function btn_Next_on_mouseup(objInst)
{
    // 1. 부모 화면 가져오기
    let parentScr = this.screen.getparent(); 
    
    // 2. 부모 화면에서 슬라이드뷰 인스턴스 가져오기
    let sld = parentScr.getinstancebyname("SV_Template"); 
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 3. 현재 슬라이드뷰의 포커스 인덱스 가져오기
    let nNextIdx_2 = sld.getitemfocus() + 1;  // 다음 인덱스
    let nNextIdx_2_LP = sld_LP.getitemfocus() + 1;  // 다음 인덱스 (LP)

    // 4. 다음 화면 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2);
    let objTime = oScrBiz.getmembers().time;  // 'time' 객체 가져오기

    let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx_2_LP, true);
    let objTimeLP = oScrBizLP.getmembers().time;  // 'time' 객체 가져오기 (LP)

    // 5. 슬라이드뷰 이동
    sld_LP.setfocus();
    sld.movenext();
    sld_LP.movenext();

    // 6. 'time' 객체의 enable 상태 설정
    let obj_10 = objTime.getenable();  // 기존 enable 상태 저장
    objTime.setenable(true);  // 'time' 객체 활성화

    let obj_11 = objTimeLP.getenable();  // 기존 enable 상태 저장
    objTimeLP.setenable(true);  // 'time' 객체 (LP) 활성화
}

   