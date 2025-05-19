function screen_on_load()
{
	// 24.12.26 18:16 박해성
	// 부모 화면의 부모 화면을 가져옴 (즉, 두 단계 위의 화면)
	let grandParentScr = this.screen.getparent()?.getparent();  // 부모 화면의 부모 화면을 가져오기
	
	// grandParentScr이 존재하면 아래 코드 실행
	if (grandParentScr) {
		let mBizMain = grandParentScr.getmembers();	// 'BizMain'의 멤버
		let isCk3Checked = mBizMain.chkBox.getcheck();
		let isCk4Checked = mBizMain.chkBox_audio.getcheck();
		
		this.ck_3.setcheck(isCk3Checked);
		this.ck_4.setcheck(isCk4Checked);
		
		// 전달받은 데이터 가져오기 
		let clickAccRow = grandParentScr.getextradata();
		
		let menuName = this.DS_ORDER.getdatabyname(clickAccRow, "menuName");
		let cost = this.DS_ORDER.getdatabyname(clickAccRow, "cost");
		let count = this.DS_ORDER.getdatabyname(clickAccRow, "count");
		let total_cost = this.DS_ORDER.getdatabyname(clickAccRow, "total_cost");
		let url = this.DS_ORDER.getdatabyname(clickAccRow, "url");
		let Tem = this.DS_ORDER.getdatabyname(clickAccRow, "Tem");
		let Size = this.DS_ORDER.getdatabyname(clickAccRow, "Size");
		let TemSize = this.DS_ORDER.getdatabyname(clickAccRow, "TemSize");
		let menuNameTemSize = this.DS_ORDER.getdatabyname(clickAccRow, "menuNameTemSize");
		

			
		this.DS_ORDER.setdatabyname(0, "menuName", menuName);
		this.DS_ORDER.setdatabyname(0, "cost", cost);
		this.DS_ORDER.setdatabyname(0, "count", count);
		this.DS_ORDER.setdatabyname(0, "total_cost", total_cost);
		this.DS_ORDER.setdatabyname(0, "url", url);
		this.DS_ORDER.setdatabyname(0, "Tem", Tem);
		this.DS_ORDER.setdatabyname(0, "Size", Size);
		this.DS_ORDER.setdatabyname(0, "TemSize", TemSize);
		this.DS_ORDER.setdatabyname(0, "menuNameTemSize", menuNameTemSize);
	}
}

//팝업 닫기
function btn_Close_on_mouseup(objInst)
{
	//this.factory.closepopup("접근성(팝업)");
	this.screen.unloadpopup();
}

function btn_clo_on_mouseup(objInst)
{
	//this.factory.closepopup("접근성(팝업)");
		this.screen.unloadpopup();
}

function onCheckboxClick(clickedCheckbox) {
	// 24.12.26 18:07 박해성
    // 모든 체크박스 ID를 배열로 나열
//	let checkboxes = [this.ck_1, this.ck_2, this.ck_3, this.ck_4, this.ck_5];
	let checkboxes = [this.ck_1, this.ck_5];

    // 클릭된 체크박스를 제외한 나머지 체크박스들 처리
    checkboxes.forEach(function(checkbox) {
        if (checkbox !== clickedCheckbox) {
			let checkboxes = arguments[2];
			if(checkboxes.includes(clickedCheckbox)) {
            	checkbox.settext(checkbox.getfalsevalue()); // 체크 해제
			}
        }
    });
	
    // 클릭된 체크박스는 체크 상태 유지
	if(checkboxes.includes(clickedCheckbox)) {
    	clickedCheckbox.settext(clickedCheckbox.gettruevalue());
	}
}

function btn_ok_on_mouseup(objInst)
{
     // 접근성 팝업을 닫는 함수 호출
    this.screen.unloadpopup();

    // 24.12.26 18:14 박해성
    // 현재 화면에서 "ck_1", "ck_2", "ck_3", "ck_4", "ck_5" 버튼의 상태를 가져옴
    let ck1Button = this.screen.getinstancebyname("ck_1");  // "ck_1" 버튼 인스턴스 가져오기
    let ck2Button = this.screen.getinstancebyname("ck_2");  // "ck_2" 버튼 인스턴스 가져오기
    let ck3Button = this.screen.getinstancebyname("ck_3");  // "ck_3" 버튼 인스턴스 가져오기(수어)
    let ck4Button = this.screen.getinstancebyname("ck_4");  // "ck_4" 버튼 인스턴스 가져오기(음성)
    let ck5Button = this.screen.getinstancebyname("ck_5");  // "ck_5" 버튼 인스턴스 가져오기

    // "ck_1", "ck_2", "ck_3", "ck_4", "ck_5" 버튼의 체크 상태를 확인
    let isCk1Checked = ck1Button?.getcheck();  // "ck_1" 버튼의 체크 상태
    let isCk2Checked = ck2Button?.getcheck();  // "ck_2" 버튼의 체크 상태 (HC 모드)
    let isCk3Checked = ck3Button?.getcheck();  // "ck_3" 버튼의 체크 상태
    let isCk4Checked = ck4Button?.getcheck();  // "ck_4" 버튼의 체크 상태
    let isCk5Checked = ck5Button?.getcheck();  // "ck_5" 버튼의 체크 상태

    // 부모 화면의 부모 화면을 가져옴 (즉, 두 단계 위의 화면)
    let grandParentScr = this.screen.getparent()?.getparent();  // 부모 화면의 부모 화면을 가져오기

    // grandParentScr이 존재하면 아래 코드 실행
    if (grandParentScr) {
        let mBizMain = grandParentScr.getmembers();  // 'BizMain'의 멤버
        mBizMain.chkBox.setcheck(isCk3Checked);
        mBizMain.chkBox_audio.setcheck(isCk4Checked);

        // "ck_1" 버튼이 체크된 경우
        if (isCk1Checked) {
            let sld_Template = grandParentScr.getinstancebyname("SV_Template");  // "SV_Template" 슬라이드뷰 인스턴스를 가져옴
            if (sld_Template) {  // 슬라이드뷰 인스턴스가 존재하면
                // 24.12.31 13:45 박해성
                // media 상단 위치 세팅
                mBizMain.pn_Video.settop(222);
                mBizMain.PN_Sl.settop(230);
                
                sld_Template.setzorder(0);  // 슬라이드뷰의 z-order를 0으로 설정하여 화면에서 보이게 함
                sld_Template.setfocus();  // 슬라이드뷰에 포커스를 설정
            }
        }

        // "ck_5" 버튼이 체크된 경우
        if (isCk5Checked) {
            let sld_Lp = grandParentScr.getinstancebyname("SV_Template_LP");  // "SV_Template_LP" 슬라이드뷰 인스턴스를 가져옴
            if (sld_Lp) {  // 슬라이드뷰 인스턴스가 존재하면
                // 24.12.31 13:47 박해성
                // media 상단 위치 세팅
                mBizMain.pn_Video.settop(932);
                mBizMain.PN_Sl.settop(940);
                
                sld_Lp.setzorder(0);  // 슬라이드뷰의 z-order를 0으로 설정하여 화면에서 보이게 함
                sld_Lp.setfocus();  // 슬라이드뷰에 포커스를 설정
            }
        }

        // "ck_2" 버튼이 눌렸을 경우 HC 모드 적용
        if (isCk2Checked) {
            // HC 모드 적용
            this.fn_setCssMode("hc");
        }

        // "ck_2"가 눌리지 않으면 HC 모드 해제
        else {
            this.fn_setCssMode("normal");
        }
    }
}

// HC 모드 적용 함수
function fn_setCssMode(mode) {
    switch(mode) {
        case "hc":
            // HC 모드 스타일시트를 로드하고 일반 모드 스타일시트를 언로드
            this.screen.unloadcss("/xf5/css/kiosk_custom.css");
            this.screen.loadcss("/xf5/css/kiosk_custom_hc.css");
            break;
        case "normal":
            // 일반 모드 스타일시트를 로드하고 HC 모드 스타일시트를 언로드
            this.screen.unloadcss("/xf5/css/kiosk_custom_hc.css");
            this.screen.loadcss("/xf5/css/kiosk_custom.css");
            break;
    }
}