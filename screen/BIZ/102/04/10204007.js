
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
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

// 1. time_on_time 함수 - 타이머의 시간을 1초씩 감소시키고, 시간이 1초 이하일 경우 타이머를 중지하고 화면을 이동시킴
function time_on_time(objInst)
{		
    // 2. 현재 time_txt 값에서 숫자 부분만 추출하여 숫자로 변환
    var currentTimeStr = this.time_txt.gettext();  // 예: "30초 남음"
    var currentTime = Number(currentTimeStr.match(/\d+/)[0]);  // 숫자만 추출 후 변환

    // 3. 시간이 1초 감소하여 텍스트 갱신
    this.time_txt.settext((currentTime - 1) + "초 남음");

    // 4. 시간이 1초 이하가 되면 타이머 중지 및 텍스트 필드를 비활성화하고 숨김 처리
    if (currentTime <= 1) {
        // 5. 타이머 중지 및 비활성화 처리
        this.time.setinterval(0);    // 타이머 중지
        this.time.setenable(false);  // 타이머 비활성화
        this.time_txt.setenable(false);  // 텍스트 필드 비활성화
        this.time_txt.setvisible(false);  // 텍스트 숨김 처리

        // 6. 부모 화면과 슬라이드뷰 인스턴스 가져오기
        let parentScr = this.screen.getparent();  // 부모 화면 가져오기
        let sld = parentScr.getinstancebyname("SV_Template");  // 슬라이드뷰 인스턴스 가져오기

        // 7. 다음 화면 인덱스 계산
        let nNextIdx_2 = sld.getitemfocus() + 1;  // 다음 화면 인덱스 계산

        // 8. 비즈니스 화면 인스턴스 가져오기
        let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2, false);   

        // 9. 다음 화면에서 타이머 활성화
        let objTime = oScrBiz.getmembers().time_1;
        objTime.setenable(true);  // 다음 화면의 타이머 활성화

        // 10. DS_ORDER 데이터셋 복제
        let nNextNextIdx = sld.getitemfocus() + 1;
        let oScrBizNext = SYSUtil.fn_getBizScreen(this, nNextNextIdx, false); 
        oScrBizNext.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false); 

        // 11. 타이머와 텍스트 초기화
        this.time_txt.settext("5초 남음");  // 초기 텍스트로 설정
        this.time.setinterval(1000);  // 타이머 1초 간격으로 설정
        this.time_txt.setenable(true);  // 텍스트 필드 활성화
        this.time_txt.setvisible(true);  // 텍스트 보이기

        // 12. 슬라이드뷰 이동: 다음 화면으로
        sld.setfocus(); 
        sld.movenext();  // 슬라이드를 다음 항목으로 이동
    }
}

// time_txt_on_change 함수 - DS_ORDER 데이터셋을 바인딩하고 각 항목의 값을 업데이트하는 함수
function time_txt_on_change(objInst, event_type)
{	
    // 1. DS_ORDER 데이터셋의 행 수 가져오기
    let rowCount = this.DS_ORDER.getrowcount(); 
    
    // 2. 각 행에 대해 데이터를 가져와서 DS_ORDER 데이터셋에 설정
    for (let i = 0; i < rowCount; i++) {
        let menuName = this.DS_ORDER.getdatabyname(i, "menuName");  // 메뉴 이름
        let menuCount = this.DS_ORDER.getdatabyname(i, "count");    // 메뉴 수량
        let menuUrl = this.DS_ORDER.getdatabyname(i, "url");        // 메뉴 URL
        let menuTem = this.DS_ORDER.getdatabyname(i, "Tem");        // 메뉴의 Tem
        let menuSize = this.DS_ORDER.getdatabyname(i, "Size");      // 메뉴의 Size
        let menuTemSize = this.DS_ORDER.getdatabyname(i, "TemSize");// 메뉴의 TemSize
        let menuNameTemSize = this.DS_ORDER.getdatabyname(i, "menuNameTemSize");  // 메뉴의 NameTemSize
        
        // 3. 각 메뉴의 데이터를 DS_ORDER 데이터셋에 업데이트
        this.DS_ORDER.setdatabyname(i, "menuName", menuName);  // 메뉴 이름 설정
        this.DS_ORDER.setdatabyname(i, "count", menuCount);    // 메뉴 수량 설정
        this.DS_ORDER.setdatabyname(i, "url", menuUrl);        // 메뉴 URL 설정
        this.DS_ORDER.setdatabyname(i, "Tem", menuTem);        // Tem 설정
        this.DS_ORDER.setdatabyname(i, "Size", menuSize);      // Size 설정
        this.DS_ORDER.setdatabyname(i, "TemSize", menuTemSize);// TemSize 설정
        this.DS_ORDER.setdatabyname(i, "NameTemSize", menuNameTemSize);  // NameTemSize 설정
    }
}

function btn_Next_on_mouseup(objInst)
{
    // 1. 현재 페이지 번호 가져오기
    var currentValue = parseInt(this.txt_up.gettext());  // 현재 페이지 번호를 텍스트 필드에서 가져오기
    
    // 2. 총 페이지 수 계산 (데이터셋의 행 수 기준으로 3개씩 나누어 페이지 수 결정)
    let dataset_count = this.DS_ORDER.getrowcount();  // 데이터셋의 총 행 수 가져오기
    let list_count = Math.floor((dataset_count - 1) / 3) + 1;  // 한 페이지당 3개의 항목을 표시한다고 가정하여 총 페이지 수 계산
    
    // 3. 현재 페이지가 총 페이지 수보다 작을 때만 페이지 증가
    if (currentValue < list_count) {
        currentValue += 1;  // 현재 페이지가 총 페이지 수보다 적으면 페이지 번호를 1 증가
    }
    
    // 4. 증가된 페이지 번호를 텍스트 필드에 설정
    this.txt_up.settext(currentValue.toString());  
    
    // 5. 패널 너비만큼 이동 (스크롤)
    let nWidth = this.pnl_Menu.getwidth(); 
    this.pnl_Menu.scroll(nWidth, 0);  
    
    // 6. 페이지 번호에 따른 상태 업데이트 함수 호출
    this.fn_setNumbercount();  
}

function btn_Pre_on_mouseup(objInst)
{
    // 1. 현재 페이지 번호 가져오기
    var currentValue = parseInt(this.txt_up.gettext());  
    
    // 2. 현재 페이지가 1보다 클 때만 페이지 감소
    if (currentValue > 1) {
        currentValue -= 1;  
    }
    
    // 3. 감소된 페이지 번호를 텍스트 필드에 설정
    this.txt_up.settext(currentValue.toString()); 
    
    // 4. 패널 너비만큼 이동 (스크롤)
    let nWidth = this.pnl_Menu.getwidth();  
    this.pnl_Menu.scroll(-nWidth, 0);  
    
    // 5. 페이지 번호에 따른 상태 업데이트 함수 호출
    this.fn_setNumbercount();  
}

function fn_setNumbercount()
{   
    // 1. 데이터셋의 총 항목 수 가져오기
    let dataset_count = this.DS_ORDER.getrowcount();  
    
    // 2. 총 페이지 수 계산 (항목을 3개씩 나누어 페이지 수 결정)
    let list_count = Math.floor((dataset_count - 1) / 3) + 1;  
    
    // 3. 총 페이지 수를 텍스트에 설정
    this.txt_down.settext(list_count);  
    
    // 4. 패널 너비를 재설정하는 함수 호출
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