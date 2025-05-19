function screen_on_load()
{
	
}    

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}

function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld_LP.setfocus();
	sld_LP.moveprev();
	sld.moveprev();
}

function btn_Call_on_mouseup(objInst)
{
	this.screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}

function btn_ord_on_mouseup(objInst)
{
//	 // 부모 화면 가져오기
    let parentScr = this.screen.getparent();
    console.log("현재 부모 화면은 : " + (parentScr ? parentScr.getname() : "없음"));

    // 부모 화면에서 슬라이드뷰 가져오기
    let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
    let sld = parentScr.getinstancebyname("SV_Template");

    // 현재 슬라이드뷰의 다음 인덱스 가져오기
    let nNextIdx_LP = sld_LP.getitemfocus() + 1;
    let nNextIdx = sld.getitemfocus() + 1;

//    // 다음 화면 경로 추정하여 출력
//    let nextScreenUrl = currentUrl.replace(/(\d{8})$/, (match, p1) => {
//        let nextIndex = parseInt(p1) + 1;
//        return nextIndex.toString().padStart(8, '0');  // 8자리로 패딩하여 다음 인덱스를 생성
//    });
//    console.log("다음 화면 경로는: " + nextScreenUrl);  // 다음 화면 경로 출력

    // 10204004 화면에서 인스턴스 가져오기
    let oScrBiz = SYSUtil.fn_getBizScreen(this, nNextIdx, false);
    console.log("oScrBiz 멤버 확인: ", oScrBiz.getmembers()); // oScrBiz의 멤버 로그 출력

    let oScrBiz_LP = SYSUtil.fn_getBizScreen(this, nNextIdx_LP, true);
    console.log("oScrBiz 멤버 확인: ", oScrBiz_LP.getmembers()); 

    // oScrBiz에서 필드 값 가져오기
    let objTxt2 = oScrBiz.getmembers().fld_Pay_2;
    let objTxt2_LP = oScrBiz_LP.getmembers().fld_Pay_2;

    // 입력 값 가져오기
    objTxt2.settext(this.fld_Pay_1.gettext());
    objTxt2_LP.settext(this.fld_Pay_1.gettext());

    // 슬라이드뷰 포커스 및 이동
    sld_LP.setfocus();
    sld_LP.movenext();
    sld.movenext();

	// 10204007 화면 인덱스 계산
	let nNextNextIdx = sld.getitemfocus() + 2;
	let oScrBizNext = SYSUtil.fn_getBizScreen(this, nNextNextIdx); // 10204007 화면에서 BizScreen 가져오기
	oScrBizNext.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false); 
	
	let nNextNextIdx_LP = sld_LP.getitemfocus() + 2;
	let oScrBizNext_LP = SYSUtil.fn_getBizScreen(this, nNextNextIdx_LP, true); // 10204007 화면에서 BizScreen 가져오기
	oScrBizNext_LP.getxdataset("DS_ORDER").clone(this.DS_ORDER, "", false); 	
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
	let list_count = Math.floor((dataset_count-1)/4) + 1;
	
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

    // 2. 총 수량(fld_Qua_1)에서 수량 차감
    let totalQuantity = Number(this.screen.getinstancebyname("fld_Qua_1").gettext());
    this.screen.getinstancebyname("fld_Qua_1").settext(Math.max(totalQuantity - count, 0));

    // 3. 총 금액(fld_Mon_1)에서 가격 차감
    let totalAmount = Number(this.screen.getinstancebyname("fld_Mon_1").gettext());
    this.screen.getinstancebyname("fld_Mon_1").settext(Math.max(totalAmount - (count * cost), 0));

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
    this.screen.getinstancebyname("fld_Qua_1").settext(totalQuantityUpdated.toString());
    this.screen.getinstancebyname("fld_Mon_1").settext(totalAmountUpdated.toString());
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
	let list_count = Math.floor((dataset_count-1)/4) + 1;
	this.txt_down.settext(list_count);
	
	this.fn_setPanelHeight();
}

function fn_setPanelHeight()
{
	let panel_height = this.pnl_Menu.getheight();
	
	let count = this.DS_ORDER.getrowcount();
	let page_count = Math.floor((count-1)/4) + 1;	// 총 페이지 갯수
	
	this.pnl_Menu.setpanelheight(page_count*panel_height);
	
	let item_height = this.list_Menu.getitemheight(0);
	
	if(count > 4) {
		this.list_Menu.setheight(count * item_height);
	}
	else {
		this.list_Menu.setheight(654);
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


    // 데이터셋에서 상품 수량(count) 가져오기
    let itemCount = this.DS_ORDER.getrowcount();

    // txt_1에 동적으로 텍스트 설정
    let message = `선택하신 <font class="TX_104_Yellow" color = "#8A4813">${itemCount}개의 상품</font>을 확인하시고`;
    this.screen.getinstancebyname("txt_1").settext(message);
}