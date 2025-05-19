function screen_on_load()
{		
	let clickRow = this.screen.getextradata();	// 화면'10204003'에서 클릭한 메뉴 행(DS_MENU)
	let oScr = this.screen.getparent(); // 화면'10204003' 객체
	let mScr = oScr.getmembers();       // 화면'10204003' 멤버
	let porlet_name = this.screen.getportletname();
	let dataset, menu, cost, url, temp, size;
	
	switch(porlet_name) {
		// (신규)옵션선택
		case "pop_selectOpt":
			dataset = mScr.DS_MENU;        // 데이터셋'DS_MENU' 객체
			menu = dataset.getdatabyname(clickRow, "menuName");
			cost = dataset.getdatabyname(clickRow, "cost");
			url  = dataset.getdatabyname(clickRow, "url");
			
			this.DS_ORDER.setdatabyname(0, "menuName", menu);
			this.DS_ORDER.setdatabyname(0, "cost", cost);
			this.DS_ORDER.setdatabyname(0, "url", url);
			
			break;
		// (수정)옵션변경
		case "pop_changeOpt":
			dataset = mScr.DS_ORDER;        // 데이터셋'DS_MENU' 객체
			
			menu = dataset.getdatabyname(clickRow, "menuName");
			cost = dataset.getdatabyname(clickRow, "cost");
			url  = dataset.getdatabyname(clickRow, "url");
			temp = dataset.getdatabyname(clickRow, "Tem");
			size = dataset.getdatabyname(clickRow, "Size");
			
			if(temp == "뜨겁게") {
				temp = true;
				this.RD_H.setcheck(true);
			} else {
				temp = false;
				this.RD_C.setcheck(true);
			}
			
			switch(size) {
	            case "작은컵":
					size = 0;
					this.RD_S.setcheck(true);
	                break;
	            case "중간컵":
					size = 1;
					this.RD_M.setcheck(true);
	                break;
	            case "큰컵":
					size = 2;
					this.RD_L.setcheck(true);
	                break;
	        }
			
			this.DS_ORDER.setdatabyname(0, "menuName", menu);
			this.DS_ORDER.setdatabyname(0, "cost", cost);
			this.DS_ORDER.setdatabyname(0, "url", url);
			this.DS_ORDER.setdatabyname(0, "Tem", temp);
			this.DS_ORDER.setdatabyname(0, "Size", size);
			
			break;
	}	
}

function btn_clo_on_mouseup(objInst, index)
{
		if(index == 0) {
		this.screen.unloadpopup();
	}
	else {
		this.tab_pop.settabitemfocus(0);
		this.txt_step.settext("1 / 2");
	}
}

function btn_Next_on_mouseup(objInst)
{
		// 뜨겁게: true / 차갑게: false
	let isHotChecked = this.RD_H.getcheck();
	let isColdChecked = this.RD_C.getcheck();
	
	// 음료 온도 선택 여부 확인
	if (!isHotChecked && !isColdChecked) {
		this.screen.messagebox("음료의 온도를 선택해 주세요", "온도선택", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
		return;  // 다음 화면으로 이동하지 않음
	}

	// 선택된 온도 값 저장
	let bHot = isHotChecked ? true : false;
	this.DS_ORDER.setdatabyname(0, "Tem", bHot);
	
	this.tab_pop.settabitemfocus(1);
	this.txt_step.settext("2 / 2");
}


function btn_order_on_mouseup(objInst)
{
	let nSize;
	
	// 작은컵: 0 / 중간컵: 1 / 큰컵: 2
	let isSmallChecked = this.RD_S.getcheck();
	let isMediumChecked = this.RD_M.getcheck();
	let isLargeChecked = this.RD_L.getcheck();
	
	// 컵 크기 선택 여부 확인
	if (!isSmallChecked && !isMediumChecked && !isLargeChecked) {
		this.screen.messagebox("컵 크기를 선택해 주세요", "컵크기", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
		
		return;  // 팝업 닫기 중단
	}

	// 선택된 컵 크기 값 저장
	if (isSmallChecked) {
		nSize = 0;
	} else if (isMediumChecked) {
		nSize = 1;
	} else {
		nSize = 2;
	}
	
	this.DS_ORDER.setdatabyname(0, "Size", nSize);
	
	// 
	let clickRow = this.screen.getextradata();	// 화면'10204003'에서 클릭한 메뉴 행(DS_MENU)
	let oScr = this.screen.getparent(); // 화면'10204003' 객체
	let mScr = oScr.getmembers();       // 화면'10204003' 멤버
	let porlet_name = this.screen.getportletname();
	
	// 메뉴 수정일 때 부모화면에서 장바구니에 있던 원래 메뉴 삭제
	if(porlet_name == "pop_changeOpt") {
		let dataset = mScr.DS_ORDER;
		dataset.deleterow(clickRow);
	}
	
	this.screen.unloadpopup(this.DS_ORDER);
}