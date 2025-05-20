function screen_on_load() 
{
    // 부모 화면의 부모 화면을 가져옴 (즉, 두 단계 위의 화면)
    let grandParentScr = this.screen.getparent()?.getparent();  // 부모 화면의 부모 화면을 가져오기

    // grandParentScr이 존재하면 아래 코드 실행
    if (grandParentScr) {
        let mBizMain = grandParentScr.getmembers();  // 'BizMain'의 멤버 객체 가져오기
        let isCk3Checked = mBizMain.chkBox.getcheck();  // "ck_3" 체크박스 상태 가져오기
        let isCk4Checked = mBizMain.chkBox_audio.getcheck();  // "ck_4" 체크박스 상태 가져오기
        
        // "ck_3", "ck_4" 체크박스 상태를 현재 화면에 설정
        this.ck_3.setcheck(isCk3Checked);
        this.ck_4.setcheck(isCk4Checked);

        // 전달받은 데이터 가져오기  
        let rowData = this.screen.getextradata();  // 현재 화면에 전달된 데이터 가져오기
        SYSUtil.fn_showDataset(rowData);  // 전달받은 데이터를 디버깅용으로 출력
        
        // "DS_ORDER" 데이터셋의 행 개수 가져오기 (주문된 항목 수)
        let dataset_count = rowData.getrowcount(); 
        
        this.DS_ORDER.init();  // 데이터셋 초기화
        let newIdx;

        // 복제된 데이터셋을 순차적으로 돌며 각 항목을 현재 화면에 설정
        for(let i = 0; i < dataset_count; i++) {
            // 각 행에서 데이터 가져오기
            let menuName = rowData.getdatabyname(i, "menuName");
            let cost = rowData.getdatabyname(i, "cost");
            let count = rowData.getdatabyname(i, "count");
            let total_cost = rowData.getdatabyname(i, "total_cost");
            let url = rowData.getdatabyname(i, "url");
            let Tem = rowData.getdatabyname(i, "Tem");
            let Size = rowData.getdatabyname(i, "Size");
            let TemSize = rowData.getdatabyname(i, "TemSize");
            let menuNameTemSize = rowData.getdatabyname(i, "menuNameTemSize");

            // 새로운 행을 "DS_ORDER" 데이터셋에 추가하고 데이터 설정
            newIdx = this.DS_ORDER.addrow();
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

function btn_ok_on_mouseup(objInst) {
    // 접근성 팝업을 닫는 함수 호출
    this.screen.unloadpopup();  // 팝업을 닫아 접근성 기능을 종료

    // 현재 화면에서 "ck_1", "ck_2", "ck_3", "ck_4", "ck_5" 버튼의 상태를 가져옴
    let ck1Button = this.screen.getinstancebyname("ck_1");  // "ck_1" 버튼 상태 가져오기
    let ck2Button = this.screen.getinstancebyname("ck_2");  // "ck_2" 버튼 상태 가져오기
    let ck3Button = this.screen.getinstancebyname("ck_3");  // "ck_3" 버튼 상태 가져오기
    let ck4Button = this.screen.getinstancebyname("ck_4");  // "ck_4" 버튼 상태 가져오기
    let ck5Button = this.screen.getinstancebyname("ck_5");  // "ck_5" 버튼 상태 가져오기

    // 각 버튼의 체크 여부 확인
    let isCk1Checked = ck1Button?.getcheck();  // "ck_1" 버튼이 체크되었는지 확인
    let isCk2Checked = ck2Button?.getcheck();  // "ck_2" 버튼이 체크되었는지 확인
    let isCk3Checked = ck3Button?.getcheck();  // "ck_3" 버튼이 체크되었는지 확인
    let isCk4Checked = ck4Button?.getcheck();  // "ck_4" 버튼이 체크되었는지 확인
    let isCk5Checked = ck5Button?.getcheck();  // "ck_5" 버튼이 체크되었는지 확인

    // 부모 화면의 부모 객체를 가져옴
    let grandParentScr = this.screen.getparent()?.getparent();  // 부모 화면의 부모 객체

    // 데이터셋 복제
    if (grandParentScr) {
        let targetDataset = grandParentScr.getxdataset("DS_ORDER");  // 부모 화면의 데이터셋 가져오기
        let sourceDataset = this.DS_ORDER;  // 현재 화면의 데이터셋

        // 데이터셋이 존재할 경우 복제 실행
        if (targetDataset && sourceDataset) {
            targetDataset.clone(sourceDataset, "", true);  // 데이터셋 복제
            SYSUtil.fn_showDataset(sourceDataset);  // 복제된 데이터셋 출력
            console.log("데이터가 성공적으로 복제되었습니다.");  // 복제 완료 메시지 출력
        } else {
            console.log("데이터셋을 가져오지 못했습니다.");  // 데이터셋을 가져오지 못한 경우
        }
    }

    // 부모 화면에서 멤버 객체를 가져와 체크박스 상태를 설정
    if (grandParentScr) {
        let mBizMain = grandParentScr.getmembers();  // 부모 화면의 멤버 객체 가져오기
        mBizMain.chkBox.setcheck(isCk3Checked);  // "ck_3" 체크박스 상태 설정
        mBizMain.chkBox_audio.setcheck(isCk4Checked);  // "ck_4" 체크박스 상태 설정

        // "ck_1" 버튼이 체크된 경우 템플릿을 활성화
        if (isCk1Checked) {
            let sld_Template = grandParentScr.getinstancebyname("SV_Template");  // "SV_Template" 인스턴스 가져오기
            if (sld_Template) {
                mBizMain.pn_Video.settop(222);  // 비디오 패널의 위치 설정
                mBizMain.PN_Sl.settop(230);  // 슬라이더 패널의 위치 설정
                sld_Template.setzorder(0);  // 템플릿의 z-index 설정
                sld_Template.setfocus();  // 템플릿에 포커스 설정

                // "TB_template" 템플릿 인스턴스를 1부터 11까지 반복하여 처리
                for (let i = 1; i <= 11; i++) {
                    let templateName = `TB_template${i}`;  // 템플릿 이름을 동적으로 생성
                    let templateInstance = sld_Template.getchildinstancebyname(i, templateName);  // 템플릿 인스턴스 가져오기

                    // 템플릿 인스턴스가 존재하는 경우, 해당 화면 인스턴스를 가져와 데이터셋을 복제
                    if (templateInstance) {
                        let screenInstance = templateInstance.getchildscreeninstance(0);  // 첫 번째 화면 인스턴스 가져오기
                        if (screenInstance) {
                            let targetDataset = screenInstance.getxdataset("DS_ORDER");  // "DS_ORDER" 데이터셋 가져오기
                            if (targetDataset) {
                                targetDataset.clone(this.screen.getxdataset("DS_ORDER"), "", true);  // 데이터셋 복제
                            }
                        }
                    }
                }
            }
        }

        // "ck_5" 버튼이 체크된 경우 LP 템플릿을 활성화
        if (isCk5Checked) {
            let sld_Lp = grandParentScr.getinstancebyname("SV_Template_LP");  // "SV_Template_LP" 인스턴스 가져오기
            if (sld_Lp) {
                mBizMain.pn_Video.settop(932);  // 비디오 패널의 위치 변경
                mBizMain.PN_Sl.settop(940);  // 슬라이더 패널의 위치 변경
                sld_Lp.setzorder(0);  // LP 템플릿의 z-index 설정
                sld_Lp.setfocus();  // LP 템플릿에 포커스 설정

                // "TB_template_LP" 템플릿 인스턴스를 1부터 11까지 반복하여 처리
                for (let i = 1; i <= 11; i++) {
                    let templateName = `TB_template_LP${i}`;  // LP 템플릿 이름을 동적으로 생성
                    let templateInstance = sld_Lp.getchildinstancebyname(i, templateName);  // 템플릿 인스턴스 가져오기

                    // 템플릿 인스턴스가 존재하는 경우, 해당 화면 인스턴스를 가져와 데이터셋을 복제
                    if (templateInstance) {
                        let screenInstance = templateInstance.getchildscreeninstance(0);  // 첫 번째 화면 인스턴스 가져오기
                        if (screenInstance) {
                            let targetDataset = screenInstance.getxdataset("DS_ORDER");  // "DS_ORDER" 데이터셋 가져오기
                            if (targetDataset) {
                                targetDataset.clone(this.screen.getxdataset("DS_ORDER"), "", true);  // 데이터셋 복제
                            }
                        }
                    }
                }
            }
        }

        // "ck_2" 버튼이 눌렸을 경우 HC 모드 적용
        if (isCk2Checked) {
            this.fn_setCssMode("hc");  // HC 모드 활성화
        } else {
            this.fn_setCssMode("normal");  // 일반 모드 활성화
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