function screen_on_load() {
    // 부모 화면의 부모 화면을 가져옴 (즉, 두 단계 위의 화면)
    let grandParentScr = this.screen.getparent()?.getparent();  // 부모 화면의 부모 화면을 가져오기
    console.log("부모 화면의 부모 화면: ", grandParentScr);

    // grandParentScr이 존재하면 아래 코드 실행
    if (grandParentScr) {
        let mBizMain = grandParentScr.getmembers(); // 'BizMain'의 멤버
        let isCk3Checked = mBizMain.chkBox.getcheck();
        let isCk4Checked = mBizMain.chkBox_audio.getcheck();
        
        this.ck_3.setcheck(isCk3Checked);
        this.ck_4.setcheck(isCk4Checked);

         // 전달받은 데이터 가져오기  
        let rowData = this.screen.getextradata(); // 현재 화면에 전달된 데이터 가져오기

        SYSUtil.fn_showDataset(rowData); // 전달받은 데이터를 디버깅용으로 출력
        
        let dataset_count = rowData.getrowcount(); // "DS_ORDER" 데이터셋의 행 개수 가져오기 (주문된 항목 수)
        
       this.DS_ORDER.init();
		let newIdx;
        // 복제된 데이터셋을 순차적으로 돌며 각 항목을 현재 화면에 설정
		for(let i=0; i<dataset_count; i++) {
			
	        let menuName = rowData.getdatabyname(i, "menuName");
	        let cost = rowData.getdatabyname(i, "cost");
	        let count = rowData.getdatabyname(i, "count");
	        let total_cost = rowData.getdatabyname(i, "total_cost");
	        let url = rowData.getdatabyname(i, "url");
	        let Tem = rowData.getdatabyname(i, "Tem");
	        let Size = rowData.getdatabyname(i, "Size");
	        let TemSize =rowData.getdatabyname(i, "TemSize");
	        let menuNameTemSize = rowData.getdatabyname(i, "menuNameTemSize");
			newIdx = this.DS_ORDER.addrow();
	        // 가져온 데이터를 팝업에 설정 (각 행의 데이터를 팝업에 설정)
	        this.DS_ORDER.setdatabyname(newIdx, "menuName", menuName);
	        this.DS_ORDER.setdatabyname(newIdx, "cost", cost);
	        this.DS_ORDER.setdatabyname(newIdx, "count", count);
	        this.DS_ORDER.setdatabyname(newIdx, "total_cost", total_cost);
	        this.DS_ORDER.setdatabyname(newIdx, "url", url);
	        this.DS_ORDER.setdatabyname(newIdx, "Tem", Tem);
	        this.DS_ORDER.setdatabyname(newIdx, "Size", Size);
	        this.DS_ORDER.setdatabyname(newIdx, "TemSize", TemSize);
	        this.DS_ORDER.setdatabyname(newIdx, "menuNameTemSize", menuNameTemSize);
		}
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

function btn_ok_on_mouseup(objInst) {
    // 접근성 팝업을 닫는 함수 호출
    this.screen.unloadpopup();

    // 현재 화면에서 "ck_1", "ck_2", "ck_3", "ck_4", "ck_5" 버튼의 상태를 가져옴
    let ck1Button = this.screen.getinstancebyname("ck_1");
    let ck2Button = this.screen.getinstancebyname("ck_2");
    let ck3Button = this.screen.getinstancebyname("ck_3");
    let ck4Button = this.screen.getinstancebyname("ck_4");
    let ck5Button = this.screen.getinstancebyname("ck_5");

    let isCk1Checked = ck1Button?.getcheck();
    let isCk2Checked = ck2Button?.getcheck();
    let isCk3Checked = ck3Button?.getcheck();
    let isCk4Checked = ck4Button?.getcheck();
    let isCk5Checked = ck5Button?.getcheck();

    let grandParentScr = this.screen.getparent()?.getparent();


if (grandParentScr) {
    let targetDataset = grandParentScr.getxdataset("DS_ORDER"); // 부모의 부모 화면의 데이터셋 가져오기
    let sourceDataset = this.DS_ORDER; // 현재 화면의 데이터셋
    
    if (targetDataset && sourceDataset) {
        targetDataset.clone(sourceDataset, "", true); // 데이터 복제
        SYSUtil.fn_showDataset(sourceDataset) ;
        console.log("데이터가 성공적으로 복제되었습니다.");
    } else {
        console.log("데이터셋을 가져오지 못했습니다.");
    }
}

    if (grandParentScr) {
        let mBizMain = grandParentScr.getmembers();
        mBizMain.chkBox.setcheck(isCk3Checked);
        mBizMain.chkBox_audio.setcheck(isCk4Checked);

        // "ck_1" 버튼이 체크된 경우
        if (isCk1Checked) {
            let sld_Template = grandParentScr.getinstancebyname("SV_Template");
            if (sld_Template) {
                mBizMain.pn_Video.settop(222);
                mBizMain.PN_Sl.settop(230);
                sld_Template.setzorder(0);
                sld_Template.setfocus();

                // "TB_template" 템플릿 인스턴스 1부터 11까지 반복 처리
                for (let i = 1; i <= 11; i++) {
                    let templateName = `TB_template${i}`;  // 동적으로 템플릿 이름 생성
                    let templateInstance = sld_Template.getchildinstancebyname(i, templateName);  // 템플릿 인스턴스 가져오기

                    if (templateInstance) {
                        let screenInstance = templateInstance.getchildscreeninstance(0);  // 첫 번째 화면 인스턴스를 가져옴
                        if (screenInstance) {
                            let targetDataset = screenInstance.getxdataset("DS_ORDER");  // "DS_ORDER" 데이터셋 가져오기
                            if (targetDataset) {
                                targetDataset.clone(this.screen.getxdataset("DS_ORDER"), "", true);  // 데이터셋 복사
                            }
                        }
                    }
                }
            }
        }

        // "ck_5" 버튼이 체크된 경우
        if (isCk5Checked) {
            let sld_Lp = grandParentScr.getinstancebyname("SV_Template_LP");
            if (sld_Lp) {
                mBizMain.pn_Video.settop(932);
                mBizMain.PN_Sl.settop(940);
                sld_Lp.setzorder(0);
                sld_Lp.setfocus();

                // 1부터 11까지 반복하며 템플릿 인스턴스 이름을 동적으로 변경하고 "DS_ORDER" 데이터셋을 복사
                for (let i = 1; i <= 11; i++) {
                    let templateName = `TB_template_LP${i}`;  // 동적으로 템플릿 이름 생성
                    let templateInstance = sld_Lp.getchildinstancebyname(i, templateName);  // 템플릿 인스턴스 가져오기

                    if (templateInstance) {
                        let screenInstance = templateInstance.getchildscreeninstance(0);  // 첫 번째 화면 인스턴스를 가져옴
                        if (screenInstance) {
                            let targetDataset = screenInstance.getxdataset("DS_ORDER");  // "DS_ORDER" 데이터셋 가져오기
                            if (targetDataset) {
                                targetDataset.clone(this.screen.getxdataset("DS_ORDER"), "", true);  // 데이터셋 복사
                            }
                        }
                    }
                }
            }
        }

        // "ck_2" 버튼이 눌렸을 경우 HC 모드 적용
        if (isCk2Checked) {
            this.fn_setCssMode("hc");
        } else {
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