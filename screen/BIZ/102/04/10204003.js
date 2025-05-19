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

// 이전버튼 클릭시 동작 
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	
	sld.setfocus();
	sld.moveprev();
	sld_LP.moveprev();
}

//전체삭제 버튼 클릭시 동작 
function btn_Clo_on_mouseup(objInst,index)
{
	// 변수 초기화
	clickCount = 0;
	totalAmount = 0;
	
	// 화면 필드 초기화 (수량, 금액을 0으로 설정)
	var fulldel = [this.fld_Mon, this.fld_Qua];
	fulldel.forEach(field => field.settext("0"));
	
	// 리스트에서 선택된 항목 삭제
	this.list_Menu.deleteallitem(index);

	// 패널 높이 설정
	this.fn_setPanelHeight();
}

// 다음페이지 버튼
function btn_Next_on_mouseup(objInst)
{
	// 현재 값 가져오기
    var currentValue = parseInt(this.txt_num.gettext());
    
    if (currentValue < 3) {
        currentValue += 1;
    }
    
    this.txt_num.settext(currentValue.toString());
}

//이전페이지 버튼
function btn_pre_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_num.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_num.settext(currentValue.toString());
}


function btn_up_on_mouseup(objInst)
{
	// 숫자 세팅
    var currentValue = parseInt(this.txt_up.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_up.settext(currentValue.toString());
	
	// 스크롤 이동 (패널 높이만큼)
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, -nHeight);
}

function btn_down_on_mouseup(objInst)
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
	let nHeight = this.pnl_Menu.getheight();
	this.pnl_Menu.scroll(0, nHeight);
}

// 주문하기 버튼 클릭시 동작
function btn_ord_on_mouseup(objInst)
{
	// 음료 선택을 요청하는 메시지 출력
	if(this.DS_ORDER.getrowcount() == 0) {
		this.screen.messagebox("음료를 선택해 주세요", "음료선택", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
		
		return -1;
	}
	
    // 부모 화면 가져오기
    let parentScr = this.screen.getparent();
    console.log("현재 부모 화면은 : " + (parentScr ? parentScr.getname() : "없음"));

    // 부모 화면에서 슬라이드뷰 가져오기
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");

    // 현재 슬라이드뷰의 포커스 인덱스 가져오기
    let nCurrentIdx = sld.getitemfocus();
    console.log("현재 슬라이드뷰 인덱스: " + nCurrentIdx); // 현재 인덱스 로그 출력
    let nCurrentIdx_LP = sld_LP.getitemfocus();

    // 다음 슬라이드뷰 인덱스 계산
    let nNextIdx = nCurrentIdx + 1;
   // let nNextIdx_LP = nCurrentIdx_LP + 1;
    console.log("다음 인덱스: " + nNextIdx); // 다음 인덱스 로그 출력

    // 현재 화면의 URL 출력 (URL 형식)
    let currentUrl = this.screen.getscreenurl();
    console.log("현재 화면 경로는: " + currentUrl);  // 현재 화면 경로 로그 출력

    // 다음 화면 경로 추정 (인덱스 번호만 증가시키기)
    let nextScreenUrl = currentUrl.replace(/(\d{8})$/, (match, p1) => {
        let nextIndex = parseInt(p1) + 1;
        return nextIndex.toString().padStart(8, '0');  // 8자리로 패딩하여 다음 인덱스를 생성
    });
    console.log("다음 화면 경로는: " + nextScreenUrl);  // 추정된 다음 화면 경로 출력

    // 10204004 화면에서 인스턴스를 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);
    console.log("oScrBiz 멤버 확인: ", oScrBiz.getmembers()); // oScrBiz의 멤버 로그 출력

    // oScrBiz에서 필드 값 가져오기
    let objTxt1 = oScrBiz.getmembers().fld_Qua_1;	// 총 수량
    let objTxt2 = oScrBiz.getmembers().fld_Mon_1;	// 구매금액
    let objTxt1_LP = oScrBiz_LP.getmembers().fld_Qua_1;	// 총 수량
    let objTxt2_LP = oScrBiz_LP.getmembers().fld_Mon_1;	// 구매금액

    // 필드 값 반환 받아서 설정
    objTxt1.settext(this.fld_Qua.gettext());  // fld_Qua_1 필드에 값 설정
    objTxt2.settext(this.fld_Mon.gettext()); // fld_Mon_1 필드에 값 설정
    objTxt1_LP.settext(this.fld_Qua.gettext());  // fld_Qua_1 필드에 값 설정
    objTxt2_LP.settext(this.fld_Mon.gettext()); // fld_Mon_1 필드에 값 설정
	
	// oScrBiz에서 "DS_ORDER" 데이터셋을 가져와서 현재 화면의 "DS_ORDER" 데이터셋을 복제
	oScrBiz.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
	oScrBiz_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false);
	// oScrBiz에서 'fn_setTotalText' 메서드를 호출하여 총 수량과 총 금액을 다시 계산하여 화면에 반영
	oScrBiz.getmembers().fn_setTotalText();
	oScrBiz_LP.getmembers().fn_setTotalText();
	
    // 슬라이드뷰 포커스 및 이동
    sld.setfocus();    // 슬라이드뷰에 포커스 설정
    sld.movenext();    // 슬라이드뷰를 다음 항목으로 이동
    sld_LP.movenext();    // 슬라이드뷰를 다음 항목으로 이동
}

function btn_X_on_mouseup(objInst, index)
{
    // 1. DS_ORDER에서 해당 메뉴의 수량과 가격을 가져오기
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");
    let count = Number(this.DS_ORDER.getdatabyname(index, "count"));
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");
    let cost = Number(this.DS_MENU.getdatabyname(menuRow, "cost"));

    // 2. 총 수량(fld_Qua_1)에서 수량 차감
    let totalQuantity = Number(this.screen.getinstancebyname("fld_Qua").gettext());
    this.screen.getinstancebyname("fld_Qua").settext(Math.max(totalQuantity - count, 0));

    // 3. 총 금액(fld_Mon_1)에서 가격 차감
    let totalAmount = Number(this.screen.getinstancebyname("fld_Mon").gettext());
    this.screen.getinstancebyname("fld_Mon").settext(Math.max(totalAmount - (count * cost), 0));

    // 4. 리스트뷰에서 해당 항목을 삭제 (UI에서만 삭제, 데이터셋은 유지)
    this.list_Menu.deleteitem(index);

    // 5. 데이터셋에서 해당 행은 삭제하지 않고 유지 (UI에서만 삭제)
    // this.DS_ORDER.deleterow(index); // 데이터셋 삭제는 하지 않음

    // 6. 총 수량과 총 금액을 다시 계산하여 화면에 반영
    let totalQuantityUpdated = 0;
    let totalAmountUpdated = 0;

    for (let i = 0; i < this.DS_ORDER.getrowcount(); i++) {
        let count = Number(this.DS_ORDER.getdatabyname(i, "count"));
        let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + this.DS_ORDER.getdatabyname(i, "menuName") + "\":1:&");
        let cost = Number(this.DS_MENU.getdatabyname(menuRow, "cost"));

        totalQuantityUpdated += count;
        totalAmountUpdated += count * cost;
    }

    // 7. 화면에 업데이트된 총 수량과 총 금액을 반영
    this.screen.getinstancebyname("fld_Qua").settext(totalQuantityUpdated.toString());
    this.screen.getinstancebyname("fld_Mon").settext(totalAmountUpdated.toString());
}

function fn_trancomplete()
{
    for (let i = 0; i < this.DS_MENU.getrowcount(); i++) // DS_MENU 데이터셋의 행 개수만큼 반복
    {  
        let strBtn = "btn_Menu_" + (i + 1);                // i+1 번째 버튼 이름 생성 ("btn_Menu_1", "btn_Menu_2" 등)
        let strFld = "fld_Amount_" + (i + 1);              // i+1 번째 필드 이름 생성 ("fld_Amount_1", "fld_Amount_2" 등)
        let strImg = "img_" + (i + 1);                     // i+1 번째 이미지 이름 생성 ("img_1", "img_2" 등)
        
        // 각각 오브젝트 찾기
        let objBtn = this.screen.getinstancebyname(strBtn); // 화면에서 버튼 객체 찾기
        let objFld = this.screen.getinstancebyname(strFld); // 화면에서 필드 객체 찾기
        let objImg = this.screen.getinstancebyname(strImg); // 화면에서 이미지 객체 찾기
        
        objBtn.settext(this.DS_MENU.getdatabyname(i, "menuName")); // 버튼에 메뉴 이름 설정
        objFld.settext(this.DS_MENU.getdatabyname(i, "cost"));     // 필드에 메뉴 가격 설정
        objImg.setbackimage(this.DS_MENU.getdatabyname(i, "url")); // 이미지에 메뉴 이미지 설정
    }  
}

function btn_Menu_on_mouseup(objInst)
{    
	// 1. 클릭한 행
	let clickRow = Number(objInst.getname().replaceAll("btn_Menu_", "")) - 1; // 클릭한 버튼의 번호에서 1을 빼서 데이터셋의 행 번호로 변환
	
	// 2. 팝업 호출
	this.screen.loadportletpopup("pop_selectOpt", "/BIZ/102/04/POP/102041", "온도", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, clickRow);
}

function screen_on_popupdestroy(popup_screen, popup_name, result)
{	
	  // 전달받은 데이터 가져오기  
        let rowData = this.screen.getextradata(); // 현재 화면에 전달된 데이터 가져오기


	if(result) {
		let menu, temp, size, img, cost;    // 메뉴명, 온도, 컵크기, 이미지, 가격
		let strTemp, strSize;
		
		// 1. 선택한 메뉴정보 가져오기
		// 1-1. 메뉴이름
		menu = result.getdatabyname(0, "menuName"); // 클릭한 버튼에 해당하는 메뉴 이름 가져오기(아메리카노, 카페라떼, ..)
		console.log("Menu selected: " + menu); // 디버그 로그 추가
		
		// 1-2. 온도
		temp = result.getdatabyname(0, "Tem");      // 클릭한 메뉴의 온도 가져오기(뜨겁게: true / 차갑게: false)
		temp = factory.jsonparse(temp);
		// 1-2(2). 온도를 문자열로 치환
		strTemp = (temp == true)? "뜨겁게": "차갑게";
		
		// 1-3. 사이즈
		size = result.getdatabyname(0, "Size");     // 클릭한 메뉴의 사이즈 가져오기(작은컵: 0/중간컵: 1/큰컵: 2)
		let arrFindOpt = [];
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴 이름으로 검색 조건 추가
		let nFindRow = this.DS_MENU.findrowbyname(0, arrFindOpt.join(","));
		
		// 메뉴 이름으로 검색이 실패할 경우 디버깅 메시지 출력
		if (nFindRow === -1) {
			console.error("메뉴를 찾을 수 없습니다: " + menu);
		}
		
		// 1-4. 이미지
		img  = this.DS_MENU.getdatabyname(nFindRow, "url");
		console.log("Image URL: " + img); // 디버그 로그 추가
		
		// 1-5. 가격
		cost = Number(this.DS_MENU.getdatabyname(nFindRow, "cost"));
		// 1-5(2). 컵 크기에 따른 가격 재계산
		switch(size) {
			case "0":
				strSize = "작은컵";
				cost = cost - 600;
				break;
			case "1":
				strSize = "중간컵";
				//cost = cost;  굳이 안써도 됨
				break;
			case "2":
				strSize = "큰컵";
				cost = cost + 600;
				break;
		}
		
		// 2. 장바구니에 담은 메뉴랑 중복되는 메뉴 체크
		// 2-1. 검색조건등록
		arrFindOpt = []; // 검색 조건 배열 생성
		arrFindOpt.push("menuName:=:\"" + menu + "\":1:&"); // 메뉴조건: 메뉴명
		arrFindOpt.push("Tem:=:\"" + strTemp + "\":1:&");      // 메뉴조건: 온도
		arrFindOpt.push("Size:=:\"" + strSize + "\":1:&");     // 메뉴조건: 컵크기
		
		nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // DS_ORDER에서 메뉴 이름으로 행 검색 (-1: 못 찾음, 0 이상: 찾음)
		
		// 2-2-1. 신규추가(메뉴가 DS_ORDER에 없을 경우)
		if(nFindRow == -1) {
			let addRow = this.DS_ORDER.addrow();   // 새로운 행 추가
			this.DS_ORDER.setdatabyname(addRow, "menuName", menu);  // 메뉴 이름 설정
			this.DS_ORDER.setdatabyname(addRow, "cost", cost);      // 가격 설정
			this.DS_ORDER.setdatabyname(addRow, "count", 1);        // 수량을 1로 설정
			this.DS_ORDER.setdatabyname(addRow, "url", img);        // 이미지 설정
			this.DS_ORDER.setdatabyname(addRow, "Tem", strTemp);    // 온도 설정
			this.DS_ORDER.setdatabyname(addRow, "Size", strSize);   // 사이즈 설정
			this.DS_ORDER.setdatabyname(addRow, "TemSize", strTemp + "/" + strSize);  // 온도와 사이즈 합친 값 설정
			this.DS_ORDER.setdatabyname(addRow, "menuNameTemSize", menu + "(" + strTemp + "/" + strSize +")"); 			

			// "fld_Cir" 배열에서 새로 추가된 행(addRow)에 해당하는 인덱스를 사용하여 해당 필드에 메뉴 가격(cost)을 설정
			this.fld_Cir[addRow].settext(cost);
			
		}
		// 2-2-2. 중복추가(메뉴가 이미 DS_ORDER에 있을 경우)
		else {
			let objInst = this.btn_plus[nFindRow];
			let index   = nFindRow;
			
			this.btn_plus_on_mouseup(objInst, index);
		}
		this.fn_setTotalText();
	}
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
	let nMenuCost = cost*count;
	
	// 1-7. 빨간색 필드에 총 가격 세팅
	this.fld_Cir[index].settext(nMenuCost);
	
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
	
	// 1-7. 빨간색 필드에 총 가격 세팅
	this.fld_Cir[index].settext(nMenuCost);
	
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
	let dataset_count = this.DS_ORDER.getrowcount(); // DS_ORDER 데이터셋의 행 개수 (주문된 항목 수)
	for(let i=0; i<dataset_count; i++) {
		let single_cost = Number(this.DS_ORDER.getdatabyname(i, "cost"));  // 옵션 포함된 단품가격
		let menu_count  = Number(this.DS_ORDER.getdatabyname(i, "count")); // 옵션 포함된 메뉴갯수
		
		// 해당 메뉴의 총 금액 계산
		let menu_cost   = single_cost * menu_count;	// 리스트뷰 한줄 메뉴의 총 가격
		
		// 각 메뉴의 총 금액을 DS_ORDER 데이터셋에 설정
		this.DS_ORDER.setdatabyname(i, "total_cost", menu_cost);
		
		// 총 수량과 총 금액을 누적 합산
		total_count = total_count+menu_count;
		total_cost  = total_cost+menu_cost;
	}
	
	let parentScr = this.screen.getparent();
    let sld = parentScr.getinstancebyname("SV_Template");
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");    
	let nCurrentIdx = sld.getitemfocus();
    console.log("현재 슬라이드뷰 인덱스: " + nCurrentIdx); // 현재 인덱스 로그 출력

    // 다음 슬라이드뷰 인덱스 계산
    let nNextIdx = nCurrentIdx ;    
	let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx);
    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx, true);	
	
	// 3. 총수량과 총금액 세팅
	this.fld_Qua.settext(total_count); // 총 수량 필드에 값 설정
	this.fld_Mon.settext(total_cost);  // 총 금액 필드에 값 설정
	oScrBiz_LP.getmembers().fld_Qua.settext(total_count);
	oScrBiz_LP.getmembers().fld_Mon.settext(total_cost);
	
	// 4. 리스트뷰 우측 메뉴 총 페이지 수 설정
	let list_count = Math.floor((dataset_count-1)/3) + 1;  // 리스트뷰 항목을 3개씩 나누어 페이지 수 계산
	this.txt_down.settext(list_count);                     // 총 페이지 수 필드에 값 설정
	
	// 5. 패널 높이를 다시 설정
	this.fn_setPanelHeight();  
}

function fn_setPanelHeight()
{
	// 1. 패널의 현재 높이를 가져옴
	let panel_height = this.pnl_Menu.getheight();
	
	// 2. 주문 항목의 개수와 총 페이지 수 계산
	let count = this.DS_ORDER.getrowcount();
	let page_count = Math.floor((count-1)/3) + 1;	// 총 페이지 갯수
	
	// 3. 패널의 전체 높이를 페이지 수에 맞춰 설정
	this.pnl_Menu.setpanelheight(page_count*panel_height);
	
	// 4. 항목의 높이를 가져와서 리스트 높이를 조정
	let item_height = this.list_Menu.getitemheight(0);
	
	// 5. 주문 항목 수에 따라 리스트 높이를 다르게 설정
	if(count > 3) {
		this.list_Menu.setheight(count * item_height); // 항목이 3개보다 많으면, 항목 수에 비례하여 리스트 높이 설정
	}
	else {
		this.list_Menu.setheight(330);       // 항목이 3개 이하일 경우, 고정 높이인 330으로 설정
	}
}

function btn_Acc_on_mouseup(objInst, index)
{ 
		let rowData = this.DS_ORDER
        // 팝업 호출
        this.screen.loadportletpopup("접근성(팝업)", "/BIZ/102/04/POP/102042", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, rowData);
}