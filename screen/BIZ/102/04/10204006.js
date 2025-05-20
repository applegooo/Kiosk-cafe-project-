// 이전 화면으로 이동하는 함수
function btn_Pre_on_mouseup(objInst)
{
    // 부모 화면을 가져옴
    let parentScr = this.screen.getparent();
    
    // 부모 화면에서 슬라이드뷰 인스턴스를 가져옴
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
    
    // 슬라이드뷰에 포커스를 맞추고 이전 페이지로 이동
    sld.setfocus();
    sld.moveprev();  // 슬라이드뷰의 이전 페이지로 이동
    sld_LP.moveprev();  // 동일한 작업을 다른 슬라이드뷰에 대해 실행
}

// 홈 화면으로 이동하고 페이지를 새로고침하는 함수
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

// 직원 호출 기능을 수행하는 함수
function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

// 접근성 관련 팝업을 호출하는 함수
function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

// 1. 다음 화면으로 이동하는 함수
function btn_next_on_mouseup(objInst)
{	
    // 2. 부모 화면 가져오기
    let parentScr = this.screen.getparent();     

    // 3. 부모 화면에서 슬라이드뷰 인스턴스 가져오기
    let sld = parentScr.getinstancebyname("SV_Template"); 
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
    
    // 4. 현재 슬라이드뷰의 다음 인덱스를 계산
    let nNextIdx_2 = sld.getitemfocus() + 1 ;
    let nNextIdx_2_LP = sld_LP.getitemfocus() + 1 ;
    
    // 5. 비즈니스 화면 인스턴스를 가져와서 'time' 필드를 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    
    let objTime  = oScrBiz.getmembers().time;   

    let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNextIdx_2_LP, true);    
    let objTimeLP  = oScrBizLP.getmembers().time;   
    
    // 6. 슬라이드뷰에 포커스를 맞추고 다음 페이지로 이동
    sld.setfocus();    
    sld.movenext(); // 슬라이드뷰의 다음 페이지로 이동
    sld_LP.movenext(); // 동일한 작업을 다른 슬라이드뷰에 대해 실행
    
    // 7. 'time' 필드 활성화
    let obj_10 = objTime.getenable();    
    objTime.setenable(true); // 'time' 필드를 활성화
    
    let obj_11 = objTimeLP.getenable();    
    objTimeLP.setenable(true); // LP 화면의 'time' 필드를 활성화
}