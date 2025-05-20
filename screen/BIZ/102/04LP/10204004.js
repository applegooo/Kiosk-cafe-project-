function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}

function btn_Prev_on_mouseup(objInst)
{
    // 1. 부모 화면 가져오기
    let parentScr = this.screen.getparent();

    // 2. 부모 화면에서 슬라이드뷰 인스턴스 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 3. 현재 슬라이드뷰의 포커스 인덱스 가져오기
    let nCurrentIdx = sld.getitemfocus();
    let nCurrentIdx_LP = sld_LP.getitemfocus();

    // 4. 이전 슬라이드뷰 인덱스 계산
    let nPrevIdx = nCurrentIdx - 1;
    let nPrevIdx_LP = nCurrentIdx_LP - 1;

    // 5. 현재 화면의 총 수량과 총 금액 갱신
    this.fn_setTotalText();

    // 6. 이전 화면 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nPrevIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nPrevIdx_LP, true);

    // 7. 현재 화면 데이터 가져오기
    let currentDataset = this.DS_ORDER;
    let currentTxtDown = this.txt_down.gettext();

    // 8. 이전 화면 데이터셋에 복제
    oScrBiz.getxdataset("DS_ORDER").clone(currentDataset, "", false);
    oScrBiz_LP.getxdataset("DS_ORDER").clone(currentDataset, "", false);

    // 9. 이전 화면의 추가 필드 동기화
    let txtdown = oScrBiz.getmembers().txt_down;
    let txtdown_LP = oScrBiz_LP.getmembers().txt_down;
    txtdown.settext(currentTxtDown);
    txtdown_LP.settext(currentTxtDown);

    // 10. 이전 화면의 패널 및 리스트뷰 오브젝트 가져오기
    let prevPanel_LP = oScrBiz_LP.getmembers().pnl_Menu;
    let prevList_LP = oScrBiz_LP.getmembers().list_Menu;

    // 11. 패널의 너비를 강제로 750으로 설정
    prevPanel_LP.setwidth(750);  // 동일하게 설정

    // 페이지 수에 맞는 패널의 총 너비 계산
    let count = this.DS_ORDER.getrowcount();
    let page_count = Math.floor((count - 1) / 3) + 1; // 총 페이지 수 계산
    let totalPanelWidth = page_count * 750;  // 패널 너비는 750으로 고정

    // 패널 및 리스트뷰의 너비 동기화
    prevPanel_LP.setpanelwidth(totalPanelWidth);
    prevList_LP.setwidth(totalPanelWidth);

    // 12. 슬라이드뷰 이동
    sld_LP.setfocus();
    sld.moveprev();
    sld_LP.moveprev();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}

function btn_ord_on_mouseup(objInst)
{
    // 1. 부모 화면 가져오기
    let parentScr = this.screen.getparent();
    
    // 2. 부모 화면에서 슬라이드뷰 가져오기
    let sld = parentScr.getinstancebyname("SV_Template"); 
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP"); 
    
    // 3. 현재 슬라이드뷰의 인덱스 가져오기
    let currentIdx = sld.getitemfocus();    
    let currentIdx_LP = sld_LP.getitemfocus();    
    
    // 4. 총 슬라이드뷰의 아이템 개수 확인
    let totalItems = sld.getitemcount();
    let totalItems_LP = sld_LP.getitemcount();
    
    // 5. 현재 화면의 데이터 복제 실행
    for (let i = currentIdx + 1; i < totalItems; i++) {
        let oScrBiz = SYSUtil.fn_getBizScreen(this, i, false);
        
        // 5-1. i가 3일 때 fld_Pay_2 값 가져오고 fld_Pay_1 값 설정
        if (i === 3) {
            let objTxt2 = oScrBiz.getmembers().fld_Pay_2;
            objTxt2.settext(this.fld_Pay_1.gettext()); // fld_Pay_1 값 설정
        }
        
        // 5-2. 데이터셋 복제 및 디버깅용 출력
        oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
        SYSUtil.fn_showDataset(this.DS_ORDER);
    }
    
    // 6. LP 화면에 대한 데이터 복제
    for (let i = currentIdx_LP + 1; i < totalItems_LP; i++) {
        let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, i, true);
        
        // 6-1. i가 3일 때 fld_Pay_2 값 가져오고 fld_Pay_1 값 설정
        if (i === 3) {
            let objTxt2_LP = oScrBiz_LP.getmembers().fld_Pay_2;
            objTxt2_LP.settext(this.fld_Pay_1.gettext()); // fld_Pay_1 값 설정
        }
        
        // 6-2. 데이터셋 복제
        oScrBiz_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
    }
    
    // 7. 슬라이드뷰 이동
    sld_LP.setfocus();            // LP 슬라이드뷰 포커스 설정
    sld.movenext();               // 기존 슬라이드뷰 다음 페이지로 이동
    sld_LP.movenext();            // LP 슬라이드뷰 다음 페이지로 이동  
}

function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

function btn_Pre_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_num.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_num.settext(currentValue.toString());
	
	// 스크롤 이동
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, -nHeight);
}

function btn_Next_on_mouseup(objInst)
{
	var currentValue = parseInt(this.txt_num.gettext());
	
	// 2. 리스트뷰 우측 메뉴 총 페이지 수 설정
	let dataset_count = this.DS_ORDER.getrowcount();
	let list_count = Math.floor((dataset_count-1)/3) + 1;
	
	if (currentValue < list_count) {
		currentValue += 1;
	}
	
	this.txt_num.settext(currentValue.toString());
	
	// 스크롤 이동
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, nHeight);
}

function btn_X_on_mouseup(objInst, index)
{
	// 1. DS_ORDER에서 해당 메뉴의 수량과 가격을 가져오기
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");
    let count = Number(this.DS_ORDER.getdatabyname(index, "count"));
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");
    let cost = Number(this.DS_MENU.getdatabyname(menuRow, "cost"));

	// 삭제전 데이터 셋 정보
	SYSUtil.fn_showDataset(this.DS_ORDER);

    // 2. 리스트뷰에서 해당 항목을 삭제 
    this.list_Menu.deleteitem(index);

	// 삭제후 데이터 셋 정보
	SYSUtil.fn_showDataset(this.DS_ORDER);

    // 3. 총수량과 총금액을 다시 계산하여 화면에 반영 (fn_setTotalText 호출)
    this.fn_setTotalText();  // 총수량과 총금액을 재계산하고 화면에 반영
}

function btn_Clo_on_mouseup(objInst)
{
   // 초기화할 필드 목록
    var fulldel = [this.fld_Mon, this.fld_Qua, this.fld_dis, this.fld_Pay, this.fld_Qua_1, this.fld_Mon_1, this.fld_dis_1, this.fld_Pay_1];


    // 리스트뷰의 모든 항목 삭제
    this.list_Menu.deleteallitem();

    // 총 수량과 총 금액을 0으로 설정
    this.screen.getinstancebyname("fld_Qua_1").settext("0");
    this.screen.getinstancebyname("fld_Mon_1").settext("0");
    this.screen.getinstancebyname("fld_dis_1").settext("0");
    this.screen.getinstancebyname("fld_Pay_1").settext("0");
}

function btn_minus_on_mouseup(objInst, index)
{
	// 1. 필드 'fld_Cir'에 변동된 가격 세팅
	// 1-1. 변수 세팅
	let count, cost;
	
	// 1-2. 감소하기전 음료 갯수
	count = Number(this.DS_ORDER.getdatabyname(index, "count"));
	
	// 1-3. 갯수가 1개 미만일때는 뺄수 없음
	if(count <= 1) {
		console.log("수량이 1일 경우에는 감소하지 않습니다.");
		
		return -1;
	}
	
	// 1-4. -버튼을 눌러 갯수 감소
	count = count-1;
	
	// 1-4. 추가된 갯수 세팅
	this.DS_ORDER.setdatabyname(index, "count", count);
	
	// 1-5. 사이즈 가격이 포함된 메뉴 가격(단품)
	cost = Number(this.DS_ORDER.getdatabyname(index, "cost"));
	
	// 1-6. 옵션값이 반영된 메뉴의 가격(cost) * 갯수(count)
	let nMenuCost = cost*count;;
	
	// 1-8. 'total_cost' 세팅
	this.DS_ORDER.setdatabyname(index, "total_cost", nMenuCost)
		
	// 2. 총수량 & 총금액 세팅
	this.fn_setTotalText();
}

function btn_plus_on_mouseup(objInst, index)
{
	// 1. 필드 'fld_Cir'에 변동된 가격 세팅
	// 1-1. 변수 세팅
	let count, cost;
	
	// 1-2. 추가되기전 음료 갯수
	count = Number(this.DS_ORDER.getdatabyname(index, "count"));
	
	// 1-3. +버튼을 눌러 갯수 증가
	count = count+1;
	
	// 1-4. 추가된 갯수 세팅
	this.DS_ORDER.setdatabyname(index, "count", count);
	
	// 1-5. 사이즈 가격이 포함된 메뉴 가격(단품)
	cost = Number(this.DS_ORDER.getdatabyname(index, "cost"));
	
	// 1-6. 옵션값이 반영된 메뉴의 가격(cost) * 갯수(count)
	let nMenuCost = cost*count;
	
	// 1-8. 'total_cost' 세팅
	this.DS_ORDER.setdatabyname(index, "total_cost", nMenuCost)
	
	// 2. 총수량 & 총금액 세팅
	this.fn_setTotalText();
}

// 총수량 & 총금액 세팅
function fn_setTotalText()
{
	// 1. 초기값 세팅
	let total_count = 0;
	let total_cost = 0;
	
	// 2. 주문된 목록을 반복문 돌려 총수량과 총금액 계산 실행
	let dataset_count = this.DS_ORDER.getrowcount();
	for(let i=0; i<dataset_count; i++) {
		let single_cost = Number(this.DS_ORDER.getdatabyname(i, "cost"));  // 옵션 포함된 단품가격
		let menu_count  = Number(this.DS_ORDER.getdatabyname(i, "count")); // 옵션 포함된 메뉴갯수
		
		let menu_cost   = single_cost * menu_count;	// 리스트뷰 한줄 메뉴의 총 가격
		
		total_count = total_count+menu_count; // 총 수량
		total_cost  = total_cost+menu_cost;   // 구매금액
	}
	
	// 3. 총수량과 총금액 세팅
	this.fld_Qua_1.settext(total_count); // 총 수량
	this.fld_Mon_1.settext(total_cost);  // 구매금액
	
	// 4. 리스트뷰 우측 메뉴 총 페이지 수 설정
	let list_count = Math.floor((dataset_count-1)/3) + 1;
	this.txt_down.settext(list_count);
	
	this.fn_setPanelHeight();
}

function fn_setPanelHeight()
{
    // 1. 패널의 현재 높이 가져오기
    let panel_height = this.pnl_Menu.getheight();
    
    // 2. 주문 항목 수 확인
    let count = this.DS_ORDER.getrowcount();
    
    // 3. 총 페이지 수 계산 (항목이 3개씩 표시되는 페이지 기준)
    let page_count = Math.floor((count - 1) / 3) + 1;
    
    // 4. 패널의 전체 높이를 페이지 수에 맞게 설정
    this.pnl_Menu.setpanelheight(page_count * panel_height);
    
    // 5. 항목의 높이를 가져와서 리스트 높이 설정
    let item_height = this.list_Menu.getitemheight(0);
    
    // 6. 항목이 3개보다 많으면 항목 수에 맞춰 리스트 높이 설정
    if(count > 3) {
        this.list_Menu.setheight(count * item_height);
    } 
    // 7. 항목이 3개 이하일 경우, 고정 높이로 설정
    else {
        this.list_Menu.setheight(300);
    }
}

function fld_Mon_1_on_change(objInst, event_type)
{
	// fld_Mon_1 (구매 금액)과 fld_dis_1 (할인 금액)의 값을 가져옴
    let purchaseAmount = Number(this.screen.getinstancebyname("fld_Mon_1").gettext());
    let discountAmount = Number(this.screen.getinstancebyname("fld_dis_1").gettext());

    // fld_Pay_1 (결제 금액)을 계산하여 설정
    let paymentAmount = purchaseAmount - discountAmount;
    
    // fld_Pay_1에 결제 금액 설정
    this.screen.getinstancebyname("fld_Pay_1").settext(paymentAmount.toString());


	// 1. 초기값 세팅
	let total_count = 0;

	// 2. 주문된 목록을 반복문 돌려 총수량과 총금액 계산 실행
	let itemCount = this.DS_ORDER.getrowcount();
	for(let i=0; i<itemCount; i++) {
		let menu_count  = Number(this.DS_ORDER.getdatabyname(i, "count")); // 옵션 포함된 메뉴갯수		
		total_count = total_count+menu_count; // 총 수량
	}
	
	// 3. 총수량과 총금액 세팅
	this.txt_1.settext(`선택하신 <font class="TX_104_Yellow" color="#8A4813">${total_count}개의 상품</font>을 확인하시고`); // 총 수량
}