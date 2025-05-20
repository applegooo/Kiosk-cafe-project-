// 홈 버튼 클릭 시 호출되는 이벤트
function btn_Home_on_mouseup(objInst)
{
    window.location.reload();  // 페이지를 새로 고침하여 홈 화면으로 리셋
}

// 접근성 버튼 클릭 시 호출되는 이벤트
function btn_Acc_on_mouseup(objInst)
{
    let rowData = this.DS_ORDER;  // 주문 데이터셋 가져오기
    // 팝업을 호출하여 "접근성(팝업)" 화면을 표시
    this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

// 직원 호출 버튼 클릭 시 호출되는 이벤트
function btn_Call_on_mouseup(objInst)
{
    // "직원호출중입니다. 잠시만 기다려 주세요" 메시지를 화면에 표시
    this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

// 이전 버튼 클릭 시 호출되는 이벤트
function btn_Pre_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_num.gettext());  // 현재 텍스트 값 가져오기
    
    // 값이 1보다 클 경우에만 감소
    if (currentValue > 1) {
        currentValue -= 1;  // 1 감소
    }
    
    this.txt_num.settext(currentValue.toString());  // 텍스트 필드에 새로운 값 설정
    
    // 스크롤 이동
    let nHeight = this.pnl_Menu.getheight();  // 패널 높이 가져오기
    this.pnl_Menu.scroll(0, -nHeight);  // 패널을 위로 스크롤
}

// 다음 버튼 클릭 시 호출되는 이벤트
function btn_Next_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_num.gettext());  // 현재 페이지 값 가져오기
    
    // 2. 리스트뷰 우측 메뉴의 총 페이지 수 계산
    let dataset_count = this.DS_ORDER.getrowcount();  // 데이터셋의 행 개수 가져오기
    let list_count = Math.floor((dataset_count - 1) / 4) + 1;  // 한 페이지에 4개의 항목을 나누어 총 페이지 수 계산
    
    // 현재 페이지가 마지막 페이지보다 작은 경우 페이지를 1 증가시킴
    if (currentValue < list_count) {
        currentValue += 1;
    }
    
    // 새로운 페이지 번호를 텍스트 필드에 설정
    this.txt_num.settext(currentValue.toString());
    
    // 스크롤 이동: 메뉴 패널을 아래로 스크롤
    let nHeight = this.pnl_Menu.getheight();  // 패널의 높이 가져오기
    this.pnl_Menu.scroll(0, nHeight);  // 패널을 아래로 스크롤
}

// 종료 버튼 클릭 시 호출되는 이벤트
function btn_Clo_on_mouseup(objInst)
{
    // 초기화할 필드 목록 정의
    var fulldel = [this.fld_Mon, this.fld_Qua, this.fld_dis, this.fld_Pay, this.fld_Qua_1, this.fld_Mon_1, this.fld_dis_1, this.fld_Pay_1];
    
    // 리스트뷰에서 모든 항목 삭제
    this.list_Menu.deleteallitem();
    
    // 총 수량, 금액, 할인, 결제 필드를 0으로 설정하여 초기화
    this.screen.getinstancebyname("fld_Qua_1").settext("0");
    this.screen.getinstancebyname("fld_Mon_1").settext("0");
    this.screen.getinstancebyname("fld_dis_1").settext("0");
    this.screen.getinstancebyname("fld_Pay_1").settext("0");
}

// 마이너스 버튼 클릭 시 호출되는 이벤트
function btn_minus_on_mouseup(objInst, index)
{
    // 1. 필드 'fld_Cir'에 변동된 가격 세팅
    // 1.1. 변수 세팅
    let count, cost;
    
    // 1.2. 감소하기 전 음료 갯수 가져오기
    count = Number(this.DS_ORDER.getdatabyname(index, "count"));
    
    // 1.3. 갯수가 1개 미만일 경우 감소 불가
    if (count <= 1) {
        console.log("수량이 1일 경우에는 감소하지 않습니다.");
        return -1;  // 처리 중단
    }
    
    // 1.4. -버튼을 눌러 음료 갯수 감소
    count = count - 1;
    
    // 1.5. 감소된 갯수 세팅
    this.DS_ORDER.setdatabyname(index, "count", count);
    
    // 1.6. 사이즈 가격이 포함된 단품 메뉴 가격 가져오기
    cost = Number(this.DS_ORDER.getdatabyname(index, "cost"));
    
    // 1.7. 옵션값이 반영된 메뉴의 가격 계산 (단품 가격 × 수량)
    let nMenuCost = cost * count;
    
    // 1.8. 'total_cost'에 변경된 금액 설정
    this.DS_ORDER.setdatabyname(index, "total_cost", nMenuCost);
    
    // 2. 총수량과 총금액 업데이트
    this.fn_setTotalText();
}

// 플러스 버튼 클릭 시 호출되는 이벤트
function btn_plus_on_mouseup(objInst, index)
{
    // 1. 필드 'fld_Cir'에 변동된 가격 세팅
    // 1.1. 변수 세팅
    let count, cost;
    
    // 1.2. 증가하기 전 음료 갯수 가져오기
    count = Number(this.DS_ORDER.getdatabyname(index, "count"));
    
    // 1.3. +버튼을 눌러 음료 갯수 증가
    count = count + 1;
    
    // 1.4. 증가된 갯수 세팅
    this.DS_ORDER.setdatabyname(index, "count", count);
    
    // 1.5. 사이즈 가격이 포함된 단품 메뉴 가격 가져오기
    cost = Number(this.DS_ORDER.getdatabyname(index, "cost"));
    
    // 1.6. 옵션값이 반영된 메뉴의 가격 계산 (단품 가격 × 수량)
    let nMenuCost = cost * count;
    
    // 1.7. 'total_cost'에 변경된 금액 설정
    this.DS_ORDER.setdatabyname(index, "total_cost", nMenuCost);
    
    // 2. 총수량과 총금액 업데이트
    this.fn_setTotalText();
}

// 총수량 & 총금액 세팅
function fn_setTotalText()
{
	// 1. 초기값 설정
	let total_count = 0;  // 총 수량 초기화
	let total_cost = 0;   // 총 금액 초기화
	
	// 2. 주문된 목록을 반복문 돌려 총수량과 총금액 계산
	let dataset_count = this.DS_ORDER.getrowcount();  // 데이터셋에 있는 주문 항목 수
	for (let i = 0; i < dataset_count; i++) {
		// 2.1. 단품 가격 가져오기
		let single_cost = Number(this.DS_ORDER.getdatabyname(i, "cost"));
		
		// 2.2. 메뉴 수량 가져오기
		let menu_count = Number(this.DS_ORDER.getdatabyname(i, "count"));
		
		// 2.3. 해당 메뉴의 총 금액 계산 (단품 가격 × 수량)
		let menu_cost = single_cost * menu_count;
		
		// 2.4. 총 수량 누적
		total_count = total_count + menu_count;
		
		// 2.5. 총 금액 누적
		total_cost = total_cost + menu_cost;
	}
	
	// 3. 총수량과 총금액을 화면 필드에 세팅
	this.fld_Qua_1.settext(total_count);  // 총 수량 필드
	this.fld_Mon_1.settext(total_cost);   // 총 금액 필드
	
	// 4. 리스트뷰 우측 메뉴 총 페이지 수 설정
	// 4.1. 페이지당 4개 항목씩 나누어 페이지 수 계산
	let list_count = Math.floor((dataset_count - 1) / 4) + 1;
	this.txt_down.settext(list_count);  // 페이지 수 필드에 설정
	
	// 5. 패널 높이를 조정
	this.fn_setPanelHeight();  // 패널 높이 재조정
}

// 패널 높이 조정
function fn_setPanelHeight()
{
	// 1. 메뉴 패널의 현재 높이 가져오기
	let panel_height = this.pnl_Menu.getheight();
	
	// 2. 현재 주문된 항목 수 가져오기
	let count = this.DS_ORDER.getrowcount();
	
	// 3. 총 페이지 수 계산 (4개 항목씩 페이지 나누기)
	let page_count = Math.floor((count - 1) / 4) + 1;
	
	// 4. 메뉴 패널의 높이를 페이지 수에 맞게 조정
	this.pnl_Menu.setpanelheight(page_count * panel_height);
	
	// 5. 각 항목의 높이 가져오기
	let item_height = this.list_Menu.getitemheight(0);
	
	// 6. 항목 수에 따라 리스트 높이 조정
	if (count > 4) {
		// 6.1. 항목이 4개 이상일 경우 항목 수에 비례해 리스트 높이 설정
		this.list_Menu.setheight(count * item_height);
	} else {
		// 6.2. 항목이 4개 이하일 경우 고정된 높이로 설정
		this.list_Menu.setheight(654);
	}
}

function btn_Prev_on_mouseup(objInst)
{
   // 1. 부모 화면 객체 가져오기
    let parentScr = this.screen.getparent();

    // 2. 부모 화면에서 슬라이드뷰 인스턴스 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 3. 현재 슬라이드뷰에서 포커스된 인덱스 가져오기
    let nCurrentIdx = sld.getitemfocus();
    let nCurrentIdx_LP = sld_LP.getitemfocus();

    // 4. 이전 슬라이드뷰 인덱스 계산 (현재 인덱스에서 1 감소)
    let nPrevIdx = nCurrentIdx - 1;
    let nPrevIdx_LP = nCurrentIdx_LP - 1;

    // 5. 현재 화면의 총 수량과 총 금액 갱신
    this.fn_setTotalText();

    // 6. 이전 화면 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nPrevIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nPrevIdx_LP, true);

    // 7. 현재 화면의 데이터셋과 텍스트 가져오기
    let currentDataset = this.DS_ORDER;  // 현재 데이터셋
    let currentTxtDown = this.txt_down.gettext();  // 현재 페이지 수 텍스트

    // 8. 이전 화면의 데이터셋에 현재 데이터셋 복제
    oScrBiz.getxdataset("DS_ORDER").clone(currentDataset, "", false);
    oScrBiz_LP.getxdataset("DS_ORDER").clone(currentDataset, "", false);

    // 9. 이전 화면의 텍스트 동기화 (txt_down 필드)
    let txtdown = oScrBiz.getmembers().txt_down;
    let txtdown_LP = oScrBiz_LP.getmembers().txt_down;
    txtdown.settext(currentTxtDown);
    txtdown_LP.settext(currentTxtDown);

    // 10. 이전 화면의 패널 및 리스트뷰 오브젝트 가져오기
    let prevPanel = oScrBiz.getmembers().pnl_Menu;
    let prevPanel_LP = oScrBiz_LP.getmembers().pnl_Menu;
    let prevList = oScrBiz.getmembers().list_Menu;
    let prevList_LP = oScrBiz_LP.getmembers().list_Menu;

    // 11. 패널의 전체 높이 설정
    let panelHeight = prevPanel.getheight();  // 패널 높이 가져오기
    let count = this.DS_ORDER.getrowcount();  // 데이터셋의 항목 개수
    let page_count = Math.floor((count - 1) / 3) + 1;  // 총 페이지 수 계산

    // 패널 및 리스트뷰의 전체 높이 동기화
    let totalPanelHeight = page_count * panelHeight;
    prevPanel.setpanelheight(totalPanelHeight);  // 이전 화면 패널 높이 설정
    prevPanel_LP.setpanelheight(totalPanelHeight);  // LP 화면 패널 높이 설정

    // 리스트뷰 높이를 패널 높이와 동일하게 설정
    prevList.setheight(totalPanelHeight);  // 리스트뷰 높이 설정
    prevList_LP.setheight(totalPanelHeight);  // LP 화면 리스트뷰 높이 설정

    // 12. 슬라이드뷰 이동 (이전 화면으로 이동)
    sld.setfocus();  // 슬라이드뷰 포커스 설정
    sld.moveprev();  // 이전 화면으로 이동
    sld_LP.moveprev();  // LP 화면도 이전으로 이동
}

function btn_X_on_mouseup(objInst, index)
{
    // 1. DS_ORDER에서 해당 메뉴의 수량과 가격을 가져오기
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");  // 메뉴 이름 가져오기
    let count = Number(this.DS_ORDER.getdatabyname(index, "count"));  // 해당 메뉴의 수량 가져오기
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");  // 메뉴 이름으로 DS_MENU에서 해당 행 찾기
    let cost = Number(this.DS_MENU.getdatabyname(menuRow, "cost"));  // 메뉴 가격 가져오기

    // 삭제전 데이터 셋 정보 디버거로 확인
    SYSUtil.fn_showDataset(this.DS_ORDER);  // 데이터셋 디버거로 출력하여 삭제 전 상태 확인

    // 2. 리스트뷰에서 해당 항목을 삭제 
    this.list_Menu.deleteitem(index);  // 리스트뷰에서 해당 항목 삭제

    // 삭제후 데이터 셋 정보 확인
    SYSUtil.fn_showDataset(this.DS_ORDER);  // 삭제 후 데이터셋 확인

    // 3. 총수량과 총금액을 다시 계산하여 화면에 반영
    this.fn_setTotalText();  // 총수량과 총금액 계산하여 화면에 업데이트
}

function btn_ord_on_mouseup(objInst)
{
    // 1. 부모 화면 가져오기
    let parentScr = this.screen.getparent();  // 현재 화면의 부모 화면을 가져옴
    
    // 2. 부모 화면에서 슬라이드뷰 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");  // 일반 슬라이드뷰 인스턴스
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");  // LP 슬라이드뷰 인스턴스
    
    // 3. 현재 슬라이드뷰의 인덱스 가져오기
    let currentIdx = sld.getitemfocus();  // 일반 슬라이드뷰에서 현재 포커스된 아이템 인덱스
    let currentIdx_LP = sld_LP.getitemfocus();  // LP 슬라이드뷰에서 현재 포커스된 아이템 인덱스
    
    // 4. 총 슬라이드뷰의 아이템 개수 확인
    let totalItems = sld.getitemcount();  // 일반 슬라이드뷰의 총 아이템 수
    let totalItems_LP = sld_LP.getitemcount();  // LP 슬라이드뷰의 총 아이템 수
    
    // 5. 현재 화면의 데이터 복제 실행
    // 일반 슬라이드뷰에 대해 데이터 복제 (현재 화면 다음 화면부터 시작)
    for (let i = currentIdx + 1; i < totalItems; i++) {
        let oScrBiz = SYSUtil.fn_getBizScreen(this, i, false);  // i번째 비즈니스 화면 인스턴스 가져오기
    
        // i가 3일 때, fld_Pay_2의 값을 fld_Pay_1의 값으로 설정
        if (i === 3) {
            let objTxt2 = oScrBiz.getmembers().fld_Pay_2;
            objTxt2.settext(this.fld_Pay_1.gettext());  // fld_Pay_1 값 설정
        }
    
        // 현재 화면에서의 주문 데이터 복제
        oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);  // DS_ORDER 복제
        SYSUtil.fn_showDataset(this.DS_ORDER);  // 데이터셋 확인
    }
    
    // LP 슬라이드뷰에 대해 데이터 복제 (현재 화면 다음 화면부터 시작)
    for (let i = currentIdx_LP + 1; i < totalItems_LP; i++) {
        let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, i, true);  // i번째 LP 비즈니스 화면 인스턴스 가져오기
    
        // i가 3일 때, fld_Pay_2의 값을 fld_Pay_1의 값으로 설정
        if (i === 3) {
            let objTxt2_LP = oScrBiz_LP.getmembers().fld_Pay_2;
            objTxt2_LP.settext(this.fld_Pay_1.gettext());  // fld_Pay_1 값 설정
        }
    
        // LP 화면에서의 주문 데이터 복제
        oScrBiz_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);  // DS_ORDER 복제
    }
    
    // 6. 슬라이드뷰 이동
    sld.setfocus();  // 일반 슬라이드뷰에 포커스 설정
    sld.movenext();  // 슬라이드뷰를 다음 화면으로 이동
    sld_LP.movenext();  // LP 슬라이드뷰도 다음 화면으로 이동
}

function fld_Mon_1_on_change(objInst, event_type)
{
    // fld_Mon_1 (구매 금액)과 fld_dis_1 (할인 금액)의 값을 가져옴
    let purchaseAmount = Number(this.screen.getinstancebyname("fld_Mon_1").gettext());  // 구매 금액
    let discountAmount = Number(this.screen.getinstancebyname("fld_dis_1").gettext());  // 할인 금액

    // fld_Pay_1 (결제 금액)을 계산하여 설정
    let paymentAmount = purchaseAmount - discountAmount;  // 결제 금액 = 구매 금액 - 할인 금액
    
    // fld_Pay_1에 결제 금액 설정
    this.screen.getinstancebyname("fld_Pay_1").settext(paymentAmount.toString());  // 계산된 결제 금액을 텍스트 필드에 반영
}
