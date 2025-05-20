// 직원 호출 메시지 표시 
function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

// 처음으로 버튼 클릭시 동작
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

//접근성팝업 버튼
function btn_Acc_on_mouseup(objInst)
{
	let rowData = this.DS_ORDER
	// 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

// 주문하기 버튼 클릭시 동작
function btn_ord_on_mouseup(objInst)
{
    // 1. 음료 선택을 요청하는 메시지 출력
    if(this.DS_ORDER.getrowcount() == 0) {
        this.screen.messagebox("음료를 선택해 주세요", "음료선택", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
        return -1;  // 음료가 선택되지 않으면 함수 종료
    }
    
    // 2. 부모 화면 가져오기
    let parentScr = this.screen.getparent();

    // 3. 부모 화면에서 슬라이드뷰 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 4. 다음 슬라이드뷰 인덱스 계산
    let nNextIdx =  sld.getitemfocus() + 1;
    let nNextIdx_LP = sld_LP.getitemfocus() + 1;

    // 5. 10204004 화면에서 인스턴스를 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx_LP, true);

    // 6. oScrBiz에서 필드 값 가져오기
    let objTxt1 = oScrBiz.getmembers().fld_Qua_1;
    let objTxt2 = oScrBiz.getmembers().fld_Mon_1;
    let objTxt1_LP = oScrBiz_LP.getmembers().fld_Qua_1;
    let objTxt2_LP = oScrBiz_LP.getmembers().fld_Mon_1;

    // 7. 필드 값 반환 받아서 설정
    objTxt1.settext(this.fld_Qua.gettext());    
    objTxt2.settext(this.fld_Mon.gettext());    
    objTxt1_LP.settext(this.fld_Qua.gettext()); 
    objTxt2_LP.settext(this.fld_Mon.gettext()); 
    
    // 8. oScrBiz에서 "DS_ORDER" 데이터셋을 가져와서 현재 화면의 "DS_ORDER" 데이터셋을 복제
    oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
    oScrBiz_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
    
    // 9. oScrBiz에서 'fn_setTotalText' 메서드를 호출하여 총 수량과 총 금액을 다시 계산하여 화면에 반영
    oScrBiz.getmembers().fn_setTotalText();
    oScrBiz_LP.getmembers().fn_setTotalText();
    
    // 10. 슬라이드뷰 포커스 및 이동
    sld_LP.setfocus();
    sld_LP.movenext();  // LP 슬라이드뷰 이동
    sld.movenext();     // 기본 슬라이드뷰 이동
}

// 이전버튼 클릭시 동작 
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	
	sld_LP.setfocus();
	sld_LP.moveprev();
	sld.moveprev();
}

// 다음페이지 버튼
function btn_Next_on_mouseup(objInst)
{
    // 1. 현재 값 가져오기
    var currentValue = parseInt(this.txt_num.gettext());
    
    // 2. 현재 값이 6보다 작은 경우 1 증가
    if (currentValue < 6) {
        currentValue += 1;
    }
    
    // 3. 증가된 페이지 번호를 텍스트에 설정
    this.txt_num.settext(currentValue.toString());
}

//이전페이지 버튼
function btn_pre_on_mouseup(objInst)
{
    // 1. 현재 값 가져오기
    var currentValue = parseInt(this.txt_num.gettext());
    
    // 2. 현재 값이 1보다 큰 경우 1 감소
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    // 3. 감소된 페이지 번호를 텍스트에 설정
    this.txt_num.settext(currentValue.toString());
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

function btn_Menu_on_mouseup(objInst)
{    
	// 1. 클릭한 행
	let clickRow = Number(objInst.getname().match(/\d+/)[0]) - 1;
	
	// 2. 팝업 호출
	this.screen.loadportletpopup("pop_selectOpt", "/BIZ/102/04LP/POP/102041", "온도", true, XFD_BORDER_NONE, 90, 600, 900, 1035, false, false, false, clickRow);
}

function screen_on_popupdestroy(popup_screen, popup_name, result)
{	
	// 1. 현재 화면에서 전달된 추가 데이터 가져오기
	let rowData = this.screen.getextradata();
	
	// 2. 결과 값이 존재하는 경우
	if(result) {
		let menu, temp, size, img, cost, strTemp, strSize;    // 메뉴명, 온도, 컵크기, 이미지, 가격

		// 3. 선택한 메뉴정보 가져오기
		// 3-1. 메뉴 이름
		menu = result.getdatabyname(0, "menuName"); // 클릭한 버튼에 해당하는 메뉴 이름 가져오기(아메리카노, 카페라떼, ..)
		
		// 3-2. 온도
		temp = result.getdatabyname(0, "Tem");      // 클릭한 메뉴의 온도 가져오기(뜨겁게: true / 차갑게: false)
		temp = factory.jsonparse(temp);
		// 3-2(2). 온도를 문자열로 치환
		strTemp = (temp == true)? "뜨겁게": "차갑게";
		
		// 3-3. 사이즈
		size = result.getdatabyname(0, "Size");     // 클릭한 메뉴의 사이즈 가져오기(작은컵: 0/중간컵: 1/큰컵: 2)
		let arrFindOpt = [];
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴 이름으로 검색 조건 추가
		let nFindRow = this.DS_MENU.findrowbyname(0, arrFindOpt.join(","));
		
		// 3-4. 메뉴가 없을 경우 오류 메시지 출력
		if (nFindRow === -1) {
			console.error("메뉴를 찾을 수 없습니다: " + menu);
		}
		
		// 3-5. 이미지
		img  = this.DS_MENU.getdatabyname(nFindRow, "url");
		
		// 3-6. 가격
		cost = Number(this.DS_MENU.getdatabyname(nFindRow, "cost"));
		// 3-6(2). 컵 크기에 따른 가격 조정
		switch(size) {
			case "0":
				strSize = "작은컵";
				cost = cost - 600;
				break;
			case "1":
				strSize = "중간컵";
				break;
			case "2":
				strSize = "큰컵";
				cost = cost + 600;
				break;
		}
		
		// 4. 장바구니에 메뉴 추가/중복 체크
		// 4-1. 검색 조건 설정
		arrFindOpt = []; // 검색 조건 배열 생성
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴 조건: 메뉴명
		arrFindOpt.push("Tem:=:\"" + strTemp + "\":1:&");      // 메뉴 조건: 온도
		arrFindOpt.push("Size:=:\"" + strSize + "\":1:&");     // 메뉴 조건: 컵 크기
		
		nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // DS_ORDER에서 메뉴 이름으로 행 검색
		
		// 4-2. 신규 추가 (메뉴가 DS_ORDER에 없을 경우)
		if(nFindRow == -1)
		{
			let addRow = this.DS_ORDER.addrow();   // 새로운 행 추가
			this.DS_ORDER.setdatabyname(addRow, "menuName", menu);  // 메뉴 이름 설정
			this.DS_ORDER.setdatabyname(addRow, "cost", cost);      // 가격 설정
			this.DS_ORDER.setdatabyname(addRow, "count", 1);        // 수량을 1로 설정
			this.DS_ORDER.setdatabyname(addRow, "url", img);        // 이미지 설정
			this.DS_ORDER.setdatabyname(addRow, "Tem", strTemp);    // 온도 설정
			this.DS_ORDER.setdatabyname(addRow, "Size", strSize);   // 사이즈 설정
			this.DS_ORDER.setdatabyname(addRow, "TemSize", strTemp + "/" + strSize);  // 온도와 사이즈 합친 값 설정
			this.DS_ORDER.setdatabyname(addRow, "menuNameTemSize", menu + "(" + strTemp + "/" + strSize +")");  
			
			// 4-3. "fld_Cir" 배열에서 새로 추가된 행에 메뉴 가격 설정
			this.fld_Cir[addRow].settext(cost);
		}
		// 4-4. 중복 메뉴가 있을 경우 수량 증가
		else
		{
			let objInst = this.btn_plus[nFindRow];
			let index   = nFindRow;
			
			this.btn_plus_on_mouseup(objInst, index);
		}
	}
	
	// 5. 부모 화면과 슬라이드 인스턴스 가져오기
	let parentScr = this.screen.getparent();
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	let nNextIdx = sld_LP.getitemfocus();
		
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx, false);
	
	// 6. 총 금액 및 수량 업데이트
	oScrBiz.getmembers().fn_setTotalText();
	
	// 7. 현재 화면의 총 금액 및 수량 업데이트
	this.fn_setTotalText();
}

function btn_minus_on_mouseup(objInst, index)
{
	// 1. 필드 'fld_Cir'에 변동된 가격 설정
	// 1-1. 변수 설정
	let count, cost;
	
	// 1-2. 현재 음료 수량 가져오기
	count = Number(this.DS_ORDER.getdatabyname(index, "count"));
	
	// 1-3. 수량이 1개 미만일 경우 감소할 수 없음
	if(count <= 1) {
		console.log("수량이 1일 경우에는 감소하지 않습니다.");
		return -1;
	}
	
	// 1-4. 수량 감소
	count = count - 1;
	
	// 1-5. 감소한 수량을 데이터셋에 설정
	this.DS_ORDER.setdatabyname(index, "count", count);
	
	// 1-6. 사이즈가 반영된 메뉴 가격 가져오기
	cost = Number(this.DS_ORDER.getdatabyname(index, "cost"));
	
	// 1-7. 최종 가격 계산 (단품 가격 * 수량)
	let nMenuCost = cost * count;
	
	// 1-8. 빨간색 필드에 최종 가격 설정
	this.fld_Cir[index].settext(nMenuCost);
	
	// 2. 총수량 및 총금액 갱신
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
	
	// 1-7. 빨간색 필드에 총 가격 세팅
	this.fld_Cir[index].settext(nMenuCost);
	
	// 2. 총수량 & 총금액 세팅
	this.fn_setTotalText();
}

// 총수량 & 총금액 세팅
function fn_setTotalText()
{
	// 1. 초기값 설정
	let total_count = 0;  // 총 수량
	let total_cost = 0;   // 총 금액
	
	// 2. 주문 목록을 순차적으로 돌면서 총 수량과 총 금액 계산
	let dataset_count = this.DS_ORDER.getrowcount(); // 주문된 항목 수
	for(let i = 0; i < dataset_count; i++) {
		// 2-1. 해당 메뉴의 단품 가격과 수량 가져오기
		let single_cost = Number(this.DS_ORDER.getdatabyname(i, "cost"));
		let menu_count  = Number(this.DS_ORDER.getdatabyname(i, "count"));
		
		// 2-2. 해당 메뉴의 총 금액 계산
		let menu_cost = single_cost * menu_count;
		
		// 2-3. 메뉴의 총 금액을 DS_ORDER 데이터셋에 설정
		this.DS_ORDER.setdatabyname(i, "total_cost", menu_cost);
		
		// 2-4. 총 수량과 총 금액 누적 합산
		total_count += menu_count;
		total_cost  += menu_cost;
	}
	
	// 3. 부모 화면 가져오기
	let parentScr = this.screen.getparent();
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");    
	let nNextIdx = sld_LP.getitemfocus();
	
	// 4. 각 화면에 총 수량과 총 금액 설정
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx);	
	
	// 4-1. 총 수량 및 총 금액 필드에 값 설정
	this.fld_Qua.settext(total_count);
	this.fld_Mon.settext(total_cost);
	oScrBiz.getmembers().fld_Qua.settext(total_count);
	oScrBiz.getmembers().fld_Mon.settext(total_cost);
	oScrBiz_LP.getmembers().fld_Qua.settext(total_count);
	oScrBiz_LP.getmembers().fld_Mon.settext(total_cost);
	
	// 5. 리스트뷰 우측 메뉴 총 페이지 수 계산
	let list_count = Math.floor((dataset_count - 1) / 3) + 1;  // 페이지 수 계산 (3개 항목 기준)
	this.txt_down.settext(list_count);                         // 총 페이지 수 설정
	
	// 6. 패널 너비 설정
	this.fn_setPanelwidth(); 
}

function btn_up_on_mouseup(objInst)
{
	// 숫자 세팅: 현재 숫자를 가져와서 1 감소
    var currentValue = parseInt(this.txt_up.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    this.txt_up.settext(currentValue.toString());
	
	// 스크롤 이동: 패널 너비만큼 왼쪽으로 스크롤
	let nwidth = this.pnl_Menu.getwidth();
	this.pnl_Menu.scroll(-nwidth, 0);
}

function btn_down_on_mouseup(objInst)
{		
	// 숫자 세팅: 현재 숫자를 가져와서 1 증가
    var currentValue = parseInt(this.txt_up.gettext());

    let dataset_count = this.DS_ORDER.getrowcount();
	let list_count = Math.floor((dataset_count - 1) / 3) + 1;  // 총 페이지 갯수 계산
	
    if (currentValue < list_count) {
        currentValue += 1;
    }

    this.txt_up.settext(currentValue.toString());
	
	// 스크롤 이동: 패널 너비만큼 오른쪽으로 스크롤
	let nwidth = this.pnl_Menu.getwidth();
	this.pnl_Menu.scroll(nwidth, 0);
}

function fn_setPanelwidth()
{
	// 1. 패널의 현재 너비를 가져옴
	let panel_width = this.pnl_Menu.getwidth();
	
	// 2. 주문 항목 수에 따른 페이지 수 계산
	let count = this.DS_ORDER.getrowcount();
	let page_count = Math.floor((count - 1) / 3) + 1;  // 항목을 3개씩 페이지로 나누기
	
	// 3. 패널의 전체 너비를 페이지 수에 맞게 설정
	this.pnl_Menu.setpanelwidth(page_count * panel_width);
	
	// 4. 항목 너비를 가져와서 리스트 너비를 조정
	let item_width = this.list_Menu.getitemwidth(0);
	
	// 5. 주문 항목 수에 따라 리스트 너비를 다르게 설정
	if(count > 3) {
		this.list_Menu.setwidth(count * item_width);  // 항목이 3개보다 많으면, 항목 수에 맞게 리스트 너비 설정
	}
	else {
		this.list_Menu.setwidth(750);  // 항목이 3개 이하일 경우 고정 너비 설정
	}
}

function btn_del_on_mouseup(objInst, index)
{
	// 변수 초기화
	clickCount = 0;
	totalAmount = 0;
	
	// 화면 필드 초기화 (수량, 금액을 0으로 설정)
	var fulldel = [this.fld_Mon, this.fld_Qua];
	fulldel.forEach(field => field.settext("0"));
	
	// 리스트에서 선택된 항목 삭제
	this.list_Menu.deleteallitem(index);

	// 패널 너바 설정
	this.fn_setPanelwidth();
}