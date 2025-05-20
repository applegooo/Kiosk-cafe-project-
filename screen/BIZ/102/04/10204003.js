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

// 변경하기 버튼 클릭시 현재 선택된 행 팝업창으로 값 넘기기
function btn_Cha_on_mouseup(objInst, index)
{	
	// 1. 클릭한 행
	let clickRowOrd = index;
	
	// 2. 팝업 호출
	this.screen.loadportletpopup("pop_changeOpt", "/BIZ/102/04/POP/102041", "온도", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, clickRowOrd);
}

// 1. 이전 버튼 클릭 시 동작을 정의하는 함수 
function btn_Prev_on_mouseup(objInst)
{
	// 2. 현재 화면의 부모 스크린 객체를 가져옴
	let parentScr = this.screen.getparent();
	// 3. "SV_Template"라는 이름의 인스턴스를 부모 스크린에서 가져옴
	let sld = parentScr.getinstancebyname("SV_Template");
	// 4. "SV_Template_LP"라는 이름의 인스턴스를 부모 스크린에서 가져옴
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

	// 5. "sld" 객체에 포커스를 설정함
	sld.setfocus();
	// 6. "sld" 객체를 이전 슬라이드로 이동시킴
	sld.moveprev();
	// 7. "sld_LP" 객체를 이전 슬라이드로 이동시킴
	sld_LP.moveprev();
}

// 1. 다음 페이지 버튼 클릭 시 동작을 정의하는 함수
function btn_Next_on_mouseup(objInst)
{
	// 2. 현재 값을 텍스트에서 가져와 정수로 변환
	var currentValue = parseInt(this.txt_num.gettext());
	
	// 3. 현재 값이 3보다 작으면 값을 1 증가시킴
	if (currentValue < 3) {
		currentValue += 1;
	}
	
	// 4. 증가된 값을 문자열로 변환하여 텍스트에 설정
	this.txt_num.settext(currentValue.toString());
}

// 1. 이전 페이지 버튼 클릭 시 동작을 정의하는 함수
function btn_pre_on_mouseup(objInst) {
	// 2. 현재 값을 텍스트에서 가져와 정수로 변환
	var currentValue = parseInt(this.txt_num.gettext());
	
	// 3. 현재 값이 1보다 크면 값을 1 감소시킴
	if (currentValue > 1) {
		currentValue -= 1;
	}
	
	// 4. 감소된 값을 문자열로 변환하여 텍스트에 설정
	this.txt_num.settext(currentValue.toString());
}

// 리스트뷰 우측 메뉴 버튼
function btn_up_on_mouseup(objInst)
{
	// 1. 텍스트에서 현재 값 가져오기
	var currentValue = parseInt(this.txt_up.gettext());

	// 2. 현재 값이 1보다 크다면 값을 1 감소
	if (currentValue > 1) {
		currentValue -= 1;
	}

	// 3. 감소된 값을 텍스트에 설정
	this.txt_up.settext(currentValue.toString());

	// 4. 패널의 높이를 가져와 스크롤 이동 (높이만큼 위로)
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, -nHeight);

	// 5. 패널 높이 재설정 함수 호출
	this.fn_setPanelHeight();
}

// 리스트뷰 우측 메뉴 버튼
function btn_down_on_mouseup(objInst)
{
	// 1. 텍스트에서 현재 페이지 값 가져오기
	var currentValue = parseInt(this.txt_up.gettext());

	// 2. 리스트뷰의 총 페이지 수 계산
	let dataset_count = this.DS_ORDER.getrowcount(); // 데이터셋의 총 행 수 가져오기
	let list_count = Math.floor((dataset_count - 1) / 3) + 1; // 페이지 수 계산

	// 3. 현재 값이 총 페이지 수보다 작으면 값을 증가
	if (currentValue < list_count) {
		currentValue += 1;
	}

	// 4. 증가된 값을 텍스트에 설정
	this.txt_up.settext(currentValue.toString());

	// 5. 스크롤 이동 (패널 높이만큼 아래로 이동)
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, nHeight);

	// 6. 총 페이지 수를 텍스트에 설정
	this.txt_down.settext(list_count);

	// 7. 패널 높이 재설정 함수 호출
	this.fn_setPanelHeight(); 	
}

// 주문하기 버튼 클릭시 동작
function btn_ord_on_mouseup(objInst)
{
	// 음료를 선택하지 않았으면 경고 메시지를 띄운다.
	if (this.DS_ORDER.getrowcount() == 0) {
		// 음료를 선택하라는 경고 메시지 표시
		this.screen.messagebox("음료를 선택해 주세요", "음료선택", XFD_MB_ERROR, XFD_MB_OK);
		// 음료가 선택되지 않으면 함수 종료
		return -1;
	}

	// 부모 화면을 가져옴 (현재 화면의 부모 화면)
	let parentScr = this.screen.getparent();

	// 부모 화면에서 "SV_Template"라는 이름을 가진 슬라이드뷰 인스턴스를 가져옴
	let sld = parentScr.getinstancebyname("SV_Template");
	// 부모 화면에서 "SV_Template_LP"라는 이름을 가진 또 다른 슬라이드뷰 인스턴스를 가져옴
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

	// 현재 "SV_Template" 슬라이드뷰의 포커스가 있는 항목의 인덱스를 가져옴
	let nCurrentIdx = sld.getitemfocus();
	// "SV_Template_LP" 슬라이드뷰의 포커스가 있는 항목의 인덱스를 가져옴
	let nCurrentIdx_LP = sld_LP.getitemfocus();

	// 다음 슬라이드뷰의 인덱스를 계산 (현재 인덱스에 +1)
	let nNextIdx = nCurrentIdx + 1;

	// 10204004 화면에서 "nNextIdx" 인덱스를 이용하여 비즈니스 스크린 인스턴스를 가져옴
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
	// 10204004 화면에서 "nNextIdx" 인덱스를 이용하여 비즈니스 스크린의 LP 버전 인스턴스를 가져옴
	let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);

	// "oScrBiz" 스크린에서 "fld_Qua_1" 필드를 가져옴 (총 수량)
	let objTxt1 = oScrBiz.getmembers().fld_Qua_1;
	// "oScrBiz" 스크린에서 "fld_Mon_1" 필드를 가져옴 (구매 금액)
	let objTxt2 = oScrBiz.getmembers().fld_Mon_1;
	// "oScrBiz_LP" 스크린에서 "fld_Qua_1" 필드를 가져옴 (총 수량)
	let objTxt1_LP = oScrBiz_LP.getmembers().fld_Qua_1;
	// "oScrBiz_LP" 스크린에서 "fld_Mon_1" 필드를 가져옴 (구매 금액)
	let objTxt2_LP = oScrBiz_LP.getmembers().fld_Mon_1;

	// 현재 화면의 "fld_Qua" (총 수량) 값을 가져와서 "oScrBiz"와 "oScrBiz_LP"의 "fld_Qua_1" 필드에 설정
	objTxt1.settext(this.fld_Qua.gettext());
	objTxt1_LP.settext(this.fld_Qua.gettext());
	
	// 현재 화면의 "fld_Mon" (구매 금액) 값을 가져와서 "oScrBiz"와 "oScrBiz_LP"의 "fld_Mon_1" 필드에 설정
	objTxt2.settext(this.fld_Mon.gettext());
	objTxt2_LP.settext(this.fld_Mon.gettext());

	// "oScrBiz"와 "oScrBiz_LP" 스크린에서 "DS_ORDER" 데이터셋을 가져와 현재 화면의 "DS_ORDER" 데이터셋을 복제
	oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
	oScrBiz_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);

	// "oScrBiz"와 "oScrBiz_LP" 스크린에서 'fn_setTotalText' 메서드를 호출하여 총 수량과 금액을 재계산
	oScrBiz.getmembers().fn_setTotalText();
	oScrBiz_LP.getmembers().fn_setTotalText();

	// "SV_Template" 슬라이드뷰에 포커스를 설정
	sld.setfocus();
	// "SV_Template" 슬라이드뷰를 다음 항목으로 이동
	sld.movenext();
	// "SV_Template_LP" 슬라이드뷰를 다음 항목으로 이동
	sld_LP.movenext();
}

//버튼 X 이벤트
function btn_X_on_mouseup(objInst, index)
{
	// 1. DS_ORDER에서 해당 메뉴의 수량과 가격을 가져오기
    // "index"에 해당하는 메뉴의 이름과 수량을 DS_ORDER에서 가져옴
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");  // 메뉴 이름
    let count = Number(this.DS_ORDER.getdatabyname(index, "count"));  // 수량을 숫자로 변환하여 가져옴
    
    // 메뉴 이름에 해당하는 행을 DS_MENU에서 찾아 가격을 가져옴
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");  // 메뉴 이름을 이용해 행 찾기
    let cost = Number(this.DS_MENU.getdatabyname(menuRow, "cost"));  // 해당 메뉴의 가격을 가져옴

	// 리스트뷰에서 삭제 전 데이터셋 상태를 디버깅 화면에 출력 (삭제 전 상태를 확인)
	SYSUtil.fn_showDataset(this.DS_ORDER);

    // 2. 리스트뷰에서 해당 항목을 삭제 
    // 리스트뷰에서 index에 해당하는 항목을 삭제함
    this.list_Menu.deleteitem(index);

	// 삭제 후 데이터셋 상태를 디버깅 화면에 출력 (삭제 후 상태 확인)
	SYSUtil.fn_showDataset(this.DS_ORDER);

    // 3. 총수량과 총금액을 다시 계산하여 화면에 반영
    // 메뉴 항목이 삭제된 후, 총 수량과 금액을 다시 계산하여 화면에 갱신
    this.fn_setTotalText();   
}

// 메뉴 버튼 이벤트
function btn_Menu_on_mouseup(objInst)
{    
	// 1. 클릭한 행 objInst.getname()에서 이름에서 숫자 추출 (\d+ 사용)하여 해당 숫자 -1을 계산하여 클릭된 행 번호를 구함
	let clickRow = Number(objInst.getname().match(/\d+/)[0]) - 1; 
	
	// 2. 팝업 호출
	this.screen.loadportletpopup("pop_selectOpt", "/BIZ/102/04/POP/102041", "온도", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, clickRow);
}

//팝업창이 닫힌 후 호출되는 이벤트
function screen_on_popupdestroy(popup_screen, popup_name, result)
{	
	// 1. 전달받은 데이터 가져오기 (음료 옵션 선택 팝업에서 데이터 가져오기)
	let rowData = this.screen.getextradata();

	// 2. 결과값이 true인 경우 (사용자가 메뉴를 선택한 경우)
	if (result) {
		let menu, temp, size, img, cost, strTemp, strSize;   // 메뉴명(menu), 온도(temp), 컵크기(size), 이미지(img), 가격(cost), 온도 문자열(strTemp), 컵크기 문자열(strSize)

		// 3. 선택한 메뉴 정보를 가져오기
		// 3-1. 메뉴 이름
		menu = result.getdatabyname(0, "menuName"); // 클릭한 버튼에 해당하는 메뉴 이름을 가져옴
		console.log("Menu selected: " + menu); // 디버그 로그로 메뉴명 출력
		
		// 3-2. 온도 정보 가져오기
		temp = result.getdatabyname(0, "Tem"); // 클릭한 메뉴의 온도 가져오기 (뜨겁게: true / 차갑게: false)
		temp = factory.jsonparse(temp); // JSON 파싱하여 값 변환
		// 3-2(2). 온도를 문자열로 치환
		strTemp = (temp == true) ? "뜨겁게" : "차갑게"; // 온도 값을 문자열로 변환
		
		// 3-3. 사이즈 정보 가져오기
		size = result.getdatabyname(0, "Size"); // 클릭한 메뉴의 사이즈 가져오기 (작은컵: 0, 중간컵: 1, 큰컵: 2)
		let arrFindOpt = [];
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴 이름을 기준으로 검색 조건 추가
		let nFindRow = this.DS_MENU.findrowbyname(0, arrFindOpt.join(",")); // DS_MENU에서 메뉴 이름으로 행 찾기
		
		// 3-4. 메뉴 이름으로 검색이 실패할 경우 디버깅 메시지 출력
		if (nFindRow === -1) {
			console.error("메뉴를 찾을 수 없습니다: " + menu); // 메뉴를 찾을 수 없으면 오류 메시지 출력
		}
		
		// 3-5. 이미지 URL 가져오기
		img = this.DS_MENU.getdatabyname(nFindRow, "url"); // 메뉴 이미지 URL 가져오기

		// 3-6. 가격 정보 가져오기
		cost = Number(this.DS_MENU.getdatabyname(nFindRow, "cost")); // 가격을 숫자로 변환하여 가져오기
		
		// 3-7. 사이즈에 따른 가격 재조정
		switch (size) {
			case "0": // 작은컵
				strSize = "작은컵"; 
				cost = cost - 600; // 작은컵은 600원 차감
				break;
			case "1": // 중간컵
				strSize = "중간컵"; 
				// 추가 변경 없음 (기본 가격 사용)
				break;
			case "2": // 큰컵
				strSize = "큰컵"; 
				cost = cost + 600; // 큰컵은 600원 추가
				break;
		}
		
		// 4. 장바구니에 담긴 메뉴와 중복되는 메뉴가 있는지 체크
		// 4-1. 검색 조건 배열 생성
		arrFindOpt = []; 
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴 이름으로 조건 추가
		arrFindOpt.push("Tem:=:\"" + strTemp + "\":1:&");   // 온도로 조건 추가
		arrFindOpt.push("Size:=:\"" + strSize + "\":1:&");  // 사이즈로 조건 추가
		
		nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // DS_ORDER에서 조건에 맞는 행 찾기
		
		// 4-2-1. 신규 추가 (메뉴가 DS_ORDER에 없을 경우)
		if (nFindRow == -1) {
			let addRow = this.DS_ORDER.addrow(); // 새로운 행 추가
			// 새로운 행에 데이터 설정
			this.DS_ORDER.setdatabyname(addRow, "menuName", menu); 
			this.DS_ORDER.setdatabyname(addRow, "cost", cost);
			this.DS_ORDER.setdatabyname(addRow, "count", 1); // 수량 1로 설정
			this.DS_ORDER.setdatabyname(addRow, "url", img);
			this.DS_ORDER.setdatabyname(addRow, "Tem", strTemp); 
			this.DS_ORDER.setdatabyname(addRow, "Size", strSize); 
			this.DS_ORDER.setdatabyname(addRow, "TemSize", strTemp + "/" + strSize); // 온도와 사이즈 합친 값 설정
			this.DS_ORDER.setdatabyname(addRow, "menuNameTemSize", menu + "(" + strTemp + "/" + strSize +")"); 
			
			// fld_Cir 배열에서 새로 추가된 행의 인덱스를 사용하여 메뉴 가격 설정
			this.fld_Cir[addRow].settext(cost);
		}
		// 4-2-2. 중복 추가 (메뉴가 이미 DS_ORDER에 있을 경우)
		else {
			let objInst = this.btn_plus[nFindRow]; // 이미 존재하는 메뉴의 추가 버튼 인스턴스 가져오기
			let index = nFindRow; // 해당 메뉴의 인덱스 가져오기
			
			this.btn_plus_on_mouseup(objInst, index); // 수량 증가 함수 호출
		}
		// 5. 총 금액 및 수량 업데이트
		this.fn_setTotalText();
	}

	// 6. 부모 화면에서 인스턴스를 가져와서 총 합계 계산
	let parentScr = this.screen.getparent();
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	let nNextIdx = sld.getitemfocus(); // 현재 슬라이드 뷰의 인덱스 가져오기
	
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);
	
	// 7. 저자세 화면에서 fn_setTotalText 함수 호출하여 총 합계 반영
	oScrBiz_LP.getmembers().fn_setTotalText();
	
	// 8. 일반 화면에서 총 합계 반영
	this.fn_setTotalText();
}

// 마이너스 버튼 이벤트
function btn_minus_on_mouseup(objInst, index)
{
    // 1. 필드 'fld_Cir'에 변동된 가격 설정
    // 1.1. 변수 초기화 (수량, 가격 변수)
    let count, cost;
    
    // 1.2. 감소하기 전 음료 수량 가져오기
    count = Number(this.DS_ORDER.getdatabyname(index, "count")); // 'count' 필드에서 음료 수량을 숫자로 가져옵니다.
    
    // 1.3. 음료 수량이 1개 이하일 경우 감소 금지
    if (count <= 1) {
        console.log("수량이 1일 경우에는 감소하지 않습니다."); // 수량이 1이면 더 이상 감소할 수 없다는 메시지 출력
        return -1; // 수량이 1 이하일 경우 함수 실행을 중지하고 종료
    }
    
    // 1.4. 음료 수량 감소
    count = count - 1; // 음료 수량을 1 감소시킴
    
    // 1.5. 감소된 음료 수량 설정
    this.DS_ORDER.setdatabyname(index, "count", count); // 변경된 수량을 데이터셋에 다시 저장
    
    // 1.6. 사이즈 가격이 포함된 단품 메뉴 가격 가져오기
    cost = Number(this.DS_ORDER.getdatabyname(index, "cost")); // 해당 메뉴의 가격을 가져옴
    
    // 1.7. 옵션값이 반영된 메뉴의 총 가격 계산 (단품 가격 × 수량)
    let nMenuCost = cost * count; // 가격에 수량을 곱하여 총 가격 계산
    
    // 1.8. 빨간색 필드에 총 가격 설정
    this.fld_Cir[index].settext(nMenuCost); // 'fld_Cir' 필드에 계산된 총 가격을 반영
    
    // 2. 총 수량과 총 금액 설정
    this.fn_setTotalText(); // 화면의 총 수량과 총 금액을 갱신
}

function btn_plus_on_mouseup(objInst, index)
{
	// 1. 필드 'fld_Cir'에 변동된 가격 설정
    // 1.1. 변수 초기화 (수량, 가격 변수)
	let count, cost;
    
    // 1.2. 증가하기 전 음료 수량 가져오기
    count = Number(this.DS_ORDER.getdatabyname(index, "count")); // 'count' 필드에서 음료 수량을 숫자로 가져옴
    
    // 1.3. + 버튼을 눌러 음료 수량 증가
    count = count + 1; // 음료 수량을 1 증가시킴
    
    // 1.4. 증가된 음료 수량 설정
    this.DS_ORDER.setdatabyname(index, "count", count); // 변경된 수량을 데이터셋에 저장
    
    // 1.5. 사이즈 가격이 포함된 단품 메뉴 가격 가져오기
    cost = Number(this.DS_ORDER.getdatabyname(index, "cost")); // 해당 메뉴의 가격을 가져옴
    
    // 1.6. 옵션값이 반영된 메뉴의 총 가격 계산 (단품 가격 × 수량)
    let nMenuCost = cost * count; // 가격에 수량을 곱하여 총 가격 계산
    
    // 1.7. 빨간색 필드에 총 가격 설정
    this.fld_Cir[index].settext(nMenuCost); // 'fld_Cir' 필드에 계산된 총 가격을 반영
    
    // 2. 총 수량과 총 금액 설정
    this.fn_setTotalText(); // 화면의 총 수량과 총 금액을 갱신
}

// 총수량 & 총금액 세팅
function fn_setTotalText()
{
	// 1. 초기값 설정
	let total_count = 0; // 총 수량 초기화
	let total_cost = 0;  // 총 금액 초기화
	
	// 2. 주문된 목록을 반복문 돌려 총수량과 총금액 계산
	// 2.1. 데이터셋 행 개수 가져오기 (주문된 항목 수)
	let dataset_count = this.DS_ORDER.getrowcount(); 
	
	// 2.2. 각 항목에 대해 가격과 수량을 계산
	for (let i = 0; i < dataset_count; i++) {
		// 2.3. 옵션 포함된 단품 가격 가져오기
		let single_cost = Number(this.DS_ORDER.getdatabyname(i, "cost"));
		
		// 2.4. 해당 메뉴의 수량 가져오기
		let menu_count = Number(this.DS_ORDER.getdatabyname(i, "count"));
		
		// 2.5. 해당 메뉴의 총 금액 계산 (단품 가격 × 수량)
		let menu_cost = single_cost * menu_count;
		
		// 2.6. 각 메뉴의 총 금액을 데이터셋에 설정
		this.DS_ORDER.setdatabyname(i, "total_cost", menu_cost);
		
		// 2.7. 총 수량과 총 금액 누적 합산
		total_count = total_count + menu_count;  // 총 수량 누적
		total_cost = total_cost + menu_cost;    // 총 금액 누적
	}
	
	// 3. 부모 화면 객체 가져오기
	let parentScr = this.screen.getparent();  // 부모 화면 객체를 가져옴
	let sld = parentScr.getinstancebyname("SV_Template");  // 슬라이드뷰 객체 가져오기
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");  // 다른 슬라이드뷰 객체 가져오기
	
	// 3.1. 현재 슬라이드뷰 인덱스 가져오기
	let nCurrentIdx = sld.getitemfocus();  // 현재 포커스된 슬라이드뷰 인덱스 가져오기
	
	// 3.2. 다음 슬라이드뷰 인덱스 계산
	let nNextIdx = nCurrentIdx; 
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);  
	let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);  
	
	// 4. 총수량과 총금액 화면에 세팅
	this.fld_Qua.settext(total_count); // 총 수량 필드에 값 설정
	this.fld_Mon.settext(total_cost);  // 총 금액 필드에 값 설정
	oScrBiz_LP.getmembers().fld_Qua.settext(total_count); // 다른 화면에도 총 수량 설정
	oScrBiz_LP.getmembers().fld_Mon.settext(total_cost); // 다른 화면에도 총 금액 설정
	
	// 5. 리스트뷰 우측 메뉴 총 페이지 수 설정
	// 5.1. 리스트뷰 페이지 수 계산 (3개씩 나누어 페이지 수 구하기)
	let list_count = Math.floor((dataset_count - 1) / 3) + 1;
	
	// 5.2. 총 페이지 수 필드에 값 설정
	this.txt_down.settext(list_count);  
	
	// 6. 패널 높이를 다시 설정
	this.fn_setPanelHeight(); 
}

// 패널 높이 설정 함수
function fn_setPanelHeight()
{
	// 1. 패널의 현재 높이를 가져옴
	let panel_height = this.pnl_Menu.getheight();  // 메뉴 패널의 높이를 가져옴
	
	// 2. 주문 항목의 개수와 총 페이지 수 계산
	let count = this.DS_ORDER.getrowcount();  // 데이터셋에서 주문된 항목 수 가져오기
	let page_count = Math.floor((count - 1) / 3) + 1;  // 항목을 3개씩 나눠서 페이지 수 계산
	
	// 3. 패널의 전체 높이를 페이지 수에 맞춰 설정
	this.pnl_Menu.setpanelheight(page_count * panel_height);  // 페이지 수에 맞게 패널의 전체 높이를 설정
	
	// 4. 항목의 높이를 가져와서 리스트 높이를 조정
	let item_height = this.list_Menu.getitemheight(0);  // 첫 번째 항목의 높이를 가져옴
	
	// 5. 주문 항목 수에 따라 리스트 높이를 다르게 설정
	if(count > 3) {
		this.list_Menu.setheight(count * item_height);  // 항목이 3개보다 많으면, 항목 수에 비례하여 리스트 높이 설정
	}
	else {
		this.list_Menu.setheight(330);  // 항목이 3개 이하일 경우, 고정 높이인 330으로 설정
	}
}

//접근성 버튼 이벤트
function btn_Acc_on_mouseup(objInst, index)
{
	// 1. 데이터셋 가져오기	
	let rowData = this.DS_ORDER // 현재 주문 데이터셋인 DS_ORDER를 가져옴
	// 2. 팝업 호출
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}

// txt_down 텍스트가 변경될떄 호출되는 이벤트
function txt_down_on_change(objInst, event_type)
{
    // 1. 부모 화면 객체 가져오기
    let parentScr = this.screen.getparent(); 
    
    // 2. 부모 화면에서 이름이 "SV_Template", "SV_Template_LP"인 슬라이드뷰 인스턴스 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");  
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");  
    
    // 3. 현재 슬라이드뷰에서 포커스된 아이템의 인덱스 가져오기
    let nNowIdx = sld.getitemfocus();   
    let nNowIdx_LP = sld_LP.getitemfocus();  
    
    // 4. 현재 인덱스에 해당하는 비즈니스 화면(BizScreen) 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNowIdx);  
    
    // 5. 현재 인덱스에 해당하는 BizScreen LP 화면 인스턴스 가져오기
    let oScrBizLP = SYSUtil.fn_getBizScreen(this, nNowIdx_LP, true); 
    
    // 6. 현재 BizScreen과 BizScreen LP 화면의 txt_down 필드 가져오기
    let txtdown = oScrBiz.getmembers().txt_down; 
    let txtdown_LP = oScrBizLP.getmembers().txt_down;  
    
    // 7. 현재 화면(txt_down)의 텍스트를 BizScreen 및 BizScreen LP 화면의 txt_down에 동기화
    txtdown.settext(this.txt_down.gettext());  
    txtdown_LP.settext(this.txt_down.gettext());  
}

function btn_del_on_mouseup(objInst)
{
	 // 변수 초기화
    clickCount = 0;  // 클릭된 횟수 초기화
    totalAmount = 0; // 총 금액 초기화
    
    // 화면 필드 초기화 (수량, 금액을 0으로 설정)
    var fulldel = [this.fld_Mon, this.fld_Qua];  
    fulldel.forEach(field => field.settext("0"));  
    
    // 리스트에서 선택된 항목 삭제
    this.list_Menu.deleteallitem(index); 
    
    // 패널 높이 설정
    this.fn_setPanelHeight(); 
}