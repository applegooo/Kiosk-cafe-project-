function screen_on_load()
{
	
}    

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

function btn_Next_on_mouseup(objInst)
{
     // 현재 페이지 번호 가져오기
    var currentValue = parseInt(this.txt_up.gettext());
    
    // 총 페이지 수 계산 (데이터셋의 행 수 기준으로 3개씩 나누어 페이지 수 결정)
    let dataset_count = this.DS_ORDER.getrowcount();
    let list_count = Math.floor((dataset_count - 1) / 3) + 1;
    
    // 현재 페이지가 총 페이지 수보다 작을 때만 페이지 증가
    if (currentValue < list_count) {
        currentValue += 1;
    }
    
    // 증가된 페이지 번호를 텍스트에 설정
    this.txt_up.settext(currentValue.toString());
    
    // 패널 너비만큼 이동
    let nWidth = this.pnl_Menu.getwidth(); // 패널의 너비 가져오기 (864)
    this.pnl_Menu.scroll(nWidth, 0);
    
    // 페이지 번호에 따른 상태 업데이트 함수 호출
    this.fn_setNumbercount(); 
}

function btn_Prev_on_mouseup(objInst)
{
    // 현재 페이지 번호 가져오기
    var currentValue = parseInt(this.txt_up.gettext());
    
    // 현재 페이지가 1보다 클 때만 페이지 감소
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    // 감소된 페이지 번호를 텍스트에 설정
    this.txt_up.settext(currentValue.toString());
    
    // 패널 너비만큼 이동
    let nWidth = this.pnl_Menu.getwidth(); // 패널의 너비 가져오기
    this.pnl_Menu.scroll(-nWidth, 0);
    
    // 페이지 번호에 따른 상태 업데이트 함수 호출
    this.fn_setNumbercount();  
}

function fn_setNumbercount()
{   
    // 데이터셋의 총 항목 수 가져오기
    let dataset_count = this.DS_ORDER.getrowcount();
    
    // 총 페이지 수 계산 (항목을 3개씩 나누어 페이지 수 결정)
    let list_count = Math.floor((dataset_count - 1) / 3) + 1;
    
    // 총 페이지 수를 텍스트에 설정
    this.txt_down.settext(list_count);
    
    // 패널 너비를 재설정하는 함수 호출
    this.fn_setPanelWidth();  
}

function fn_setPanelWidth()
{
    // 패널의 현재 너비를 가져옴 (가로 기준으로 설정 시 필요)
    let panel_width = this.pnl_Menu.getwidth();
    
    // 데이터셋의 총 항목 수와 페이지 수 계산
    let count = this.DS_ORDER.getrowcount(); // 데이터셋의 행 수 가져오기
    let page_count = Math.floor((count - 1) / 3) + 1; // 페이지 수 계산
    
    // 패널의 전체 너비를 페이지 수에 맞춰 설정 (페이지 수 * 패널 높이)
    this.pnl_Menu.setpanelwidth(page_count * panel_width);
    
    // 리스트 항목의 너비를 가져옴
    let item_width = this.list_Menu.getitemwidth(0);
    
    // 항목 수에 따른 리스트 너비 설정
    if(count > 3) {
        // 항목 수가 3개보다 많을 경우, 항목 수에 비례하여 리스트 너비 설정
        this.list_Menu.setwidth(count * item_width);
    }
    else {
        // 항목 수가 3개 이하일 경우, 고정 너비 292로 설정
        this.list_Menu.setwidth(292);
    }
}

function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

function time_on_time(objInst)
{
    // 1. 현재 time_txt 값에서 숫자 부분만 추출 후 숫자로 변환
    var currentTimeStr = this.time_txt.gettext(); // 예: "30초 남음"
    var currentTime = Number(currentTimeStr.match(/\d+/)[0]); // 숫자만 추출 후 변환

    // 2. 시간 1초 감소 후 다시 설정
    this.time_txt.settext((currentTime - 1) + "초 남음");

    // 3. 시간이 1초 이하가 되면 타이머 중지 및 텍스트 비활성화
    if (currentTime <= 1) {
        // 3-1. 타이머 중지 및 비활성화
        this.time.setinterval(0);    // 타이머 중지
        this.time.setenable(false);  // 타이머 비활성화
        this.time_txt.setenable(false);   // 텍스트 필드 비활성화
        this.time_txt.setvisible(false);  // 텍스트 숨김 처리

        // 3-2. 이전 화면으로 자동 이동
        let parentScr = this.screen.getparent();      // 부모 화면 가져오기
        let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); // LP 슬라이더 인스턴스 가져오기

        // 3-3. 다음 화면에서 타이머 객체 가져오기
        let nNextIdx_2_LP = sld_LP.getitemfocus() + 1;  // 다음 화면 인덱스 계산
        let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx_2_LP, true);  // 해당 화면 인스턴스 가져오기

        // 3-4. 다음 화면의 타이머 활성화
        let objTime_LP = oScrBiz_LP.getmembers().time_1;
        objTime_LP.setenable(true);  // 다음 화면 타이머 활성화

        // 3-5. 주문 데이터셋 복제
        let nNextNextIdx_LP = sld_LP.getitemfocus() + 1;
        let oScrBizNext_LP = SYSUtil.fn_getBizScreen(this, nNextNextIdx_LP, true); 
        oScrBizNext_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);  // 주문 데이터 복제

        // 3-6. 타이머와 텍스트 초기화
        this.time_txt.settext("5초 남음");  // 초기 텍스트로 설정
        this.time.setinterval(1000);  // 타이머를 1초 간격으로 설정
        this.time_txt.setenable(true); // 텍스트 필드 활성화
        this.time_txt.setvisible(true); // 텍스트 보이기

        // 3-7. 슬라이드 이동: 다음 화면으로
        sld_LP.setfocus(); // LP 슬라이드뷰에 포커스 설정
        sld_LP.movenext();  // LP 슬라이드 이동
    }
}

function time_txt_on_change(objInst, event_type)
{
	// DS_ORDER 데이터셋 복제 후, 해당 데이터를 화면에 바인딩
    let rowCount = this.DS_ORDER.getrowcount(); // DS_ORDER 데이터셋의 행 수 가져오기
    for (let i = 0; i < rowCount; i++) {
        let menuName = this.DS_ORDER.getdatabyname(i, "menuName");
        let menuCount = this.DS_ORDER.getdatabyname(i, "count");
        let menuUrl = this.DS_ORDER.getdatabyname(i, "url");
        let menuTem = this.DS_ORDER.getdatabyname(i, "Tem");
        let menuSize = this.DS_ORDER.getdatabyname(i, "Size");
        let menuTemSize = this.DS_ORDER.getdatabyname(i, "TemSize");
        let menuNameTemSize = this.DS_ORDER.getdatabyname(i, "menuNameTemSize");

		// 각 메뉴의 총 금액을 DS_ORDER 데이터셋에 설정
		this.DS_ORDER.setdatabyname(i, "menuName", menuName);
		this.DS_ORDER.setdatabyname(i, "count", menuCount);
		this.DS_ORDER.setdatabyname(i, "url", menuUrl);
		this.DS_ORDER.setdatabyname(i, "Tem", menuTem);
		this.DS_ORDER.setdatabyname(i, "Size", menuSize);
		this.DS_ORDER.setdatabyname(i, "TemSize", menuTemSize);
		this.DS_ORDER.setdatabyname(i, "NameTemSize", menuNameTemSize);  // NameTemSize 값 설정
	}
}