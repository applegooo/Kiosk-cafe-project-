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

function btn_Next_on_mouseup(objInst)
{
	// 숫자 세팅
    var currentValue = parseInt(this.txt_up.gettext());
	
	// 2. 리스트뷰 우측 메뉴 총 페이지 수 설정
	let dataset_count = this.DS_ORDER.getrowcount();
	let list_count = Math.floor((dataset_count-1)/3) + 1;
	
    if (currentValue < list_count) {
        currentValue += 1;
    }
    
    this.txt_up.settext(currentValue.toString());
	
	// 스크롤 이동
	let nWidth = this.pnl_Menu.getwidth(); 
	this.pnl_Menu.scroll(nWidth, 0);
	
	this.fn_setNumbercount(); 
}

function btn_Pre_on_mouseup(objInst)
{
		// 숫자 세팅
    var currentValue = parseInt(this.txt_up.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_up.settext(currentValue.toString());
	
	// 스크롤 이동 (패널 너비만큼)
	let nWidth = this.pnl_Menu.getwidth();
	this.pnl_Menu.scroll(-nWidth , 0);
	
	this.fn_setNumbercount(); 
}

function fn_setNumbercount()
{	
    let dataset_count = this.DS_ORDER.getrowcount();  // dataset_count 변수 선언
    let list_count = Math.floor((dataset_count - 1) / 3) + 1;  // 리스트뷰 항목을 3개씩 나누어 페이지 수 계산
    this.txt_down.settext(list_count);  // 총 페이지 수 필드에 값 설정
	
    // 5. 패널 너비를 다시 설정
    this.fn_setPanelWidth();  
}

function fn_setPanelWidth()
{
    // 1. 패널의 현재 너비를 가져옴
    let panel_width = this.pnl_Menu.getwidth();
	
    // 2. 주문 항목의 개수와 총 페이지 수 계산
    let count = this.DS_ORDER.getrowcount(); // DS_ORDER의 행 수 가져오기
    let page_count = Math.floor((count - 1) / 3) + 1;  // 총 페이지 갯수
	
    // 3. 패널의 전체 너비를 페이지 수에 맞춰 설정
    this.pnl_Menu.setpanelwidth(page_count * panel_width);
	
    // 4. 항목의 너비를 가져와서 리스트 높이를 조정
    let item_width = this.list_Menu_1.getitemwidth(0);
	
    // 5. 주문 항목 수에 따라 리스트 너비를 다르게 설정
    if(count > 3) {
        this.list_Menu_1.setwidth(count * item_width);  // 항목이 3개보다 많으면, 항목 수에 비례하여 리스트 높이 설정
    }
    else {
        this.list_Menu_1.setwidth(292);  // 항목이 3개 이하일 경우, 고정 너비인 292으로 설정
    }
}

function time_on_time(objInst)
{
    // 1. 현재 time_txt 값 가져와서 숫자 부분만 추출 후 숫자로 변환
    var currentTimeStr = this.time_txt.gettext(); // "3초뒤 창 닫힘"과 같은 텍스트에서 숫자만 추출
    var currentTime = Number(currentTimeStr.match(/\d+/)[0]); // 숫자만 추출하여 숫자로 변환

    // 2. 시간 1 감소 후 다시 설정
    this.time_txt.settext((currentTime - 1) + "초뒤 창 닫힘");  // 감소된 시간을 텍스트에 설정

    // 3. 시간이 1 이하가 되면 타이머 중지 및 텍스트 비활성화
    if (currentTime <= 1) {
        // 3.1 타이머 중지 및 비활성화
        this.time_1.setinterval(0);    // 타이머 중지
        this.time_1.setenable(false);  // 타이머 비활성화
        this.time_txt.setenable(false);   // 텍스트 필드 비활성화
        this.time_txt.setvisible(false);  // 텍스트 숨김 처리

        // 3.2 리스트뷰의 첫 번째 아이템 삭제
        let rowCount = this.DS_ORDER.getrowcount();
        if (rowCount > 0) {
            this.DS_ORDER.deleterow(0); // 첫 번째 행 삭제
        }

        // 3.3 UI 갱신 (페이지 수와 패널 너비 재설정)
        this.fn_setNumbercount();

        // 3.4 리스트가 비어 있으면 다음 화면으로 이동
        if (this.DS_ORDER.getrowcount() === 0) {
            let parentScr = this.screen.getparent();      // 현재 화면의 부모 화면 가져오기
            let sld = parentScr.getinstancebyname("SV_Template"); // 슬라이더 인스턴스 가져오기

            // 3.5 다음 화면에서 time 객체 가져오기
            let nNextIdx_2 = sld.getitemfocus() + 1;  // 다음 화면 인덱스 계산
            let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx_2);    

            // 3.6 타이머 객체가 유효한지 확인
            let objTime = oScrBiz.getmembers().time;
            objTime.setenable(true);  // 다음 화면의 타이머 활성화

            // 3.7 슬라이드 이동: 다음 화면으로
            sld.setfocus(); 
            sld.movenext();  // 슬라이드를 다음 항목으로 이동
        } else {
            // 3.8 리스트가 비어 있지 않으면 이전 화면으로 이동
            let parentScr = this.screen.getparent();      // 현재 화면의 부모 화면 가져오기
            let sld = parentScr.getinstancebyname("SV_Template"); // 슬라이더 인스턴스 가져오기

            // 3.9 이전 화면에서 time 객체 가져오기
            let nPrevIdx_2 = sld.getitemfocus() - 1;  // 이전 화면 인덱스 계산
            let oScrBiz = SYSUtil.fn_getBizScreen(this, nPrevIdx_2);    

            // 3.10 타이머 객체가 유효한지 확인
            let objTime = oScrBiz.getmembers().time;
            objTime.setenable(true);  // 이전 화면의 타이머 활성화

            // 3.11 데이터셋 복제
            oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);  

            // 3.12 타이머와 텍스트 초기화
            let mScrBiz = oScrBiz.getmembers();
            mScrBiz.time.setenable(true);  // 타이머 활성화

            // 3.13 슬라이드 이동: 이전 화면으로
            sld.setfocus(); 
            sld.moveprev();  // 슬라이드를 이전 항목으로 이동
        }

        // 4. 타이머와 텍스트 초기화
        this.time_txt.settext("5초뒤 창 닫힘");  // 초기 텍스트 설정
        this.time_1.setinterval(1000);  // 타이머를 1초 간격으로 설정
        this.time_txt.setenable(true); // 텍스트 필드 활성화
        this.time_txt.setvisible(true); // 텍스트 보이기
    }
}

//time_txt 필드 변경 시 DS_ORDER 데이터셋 갱신하는 함수
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
		this.DS_ORDER.setdatabyname(i, "NameTemSize", menuNameTemSize);  
    }
}