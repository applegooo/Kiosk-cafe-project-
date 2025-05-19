function screen_on_load()
{
	// 서비스가 없으므로 임시로 `screen_on_load()`에 배치
	//this.fn_trancomplete();
	
	this.createPanelsFromDataset();
}

function fn_trancomplete()
{
	for(let i=0; i<this.DS_MENU.getrowcount(); i++)
	{
		let strBtn = "btn_Menu_"+(i+1);
		let strFld = "fld_Amount_"+(i+1);
		let strImg = "img_"+(i+1);
		
		// 각각 오브젝트 찾기
		let objBtn = this.screen.getinstancebyname(strBtn);
		let objFld = this.screen.getinstancebyname(strFld);
		let objImg = this.screen.getinstancebyname(strImg);
		
		objBtn.settext(this.DS_MENU.getdatabyname(i, "menuName"));
		objFld.settext(this.DS_MENU.getdatabyname(i, "cost"));
		objImg.setbackimage(this.DS_MENU.getdatabyname(i, "url"));
	}
}

// 메뉴 클릭 시
function btn_Menu_on_mouseup(objInst)
{
	let clickRow = Number(objInst.getname().replaceAll("btn_Menu_", ""))-1;	// ex)0, 1, 2
	let clickMenu = this.DS_MENU.getdatabyname(clickRow, "menuName");
//	console.log(nRow);
	
	// 데이터가 있는지 검증
	let arrFindOpt = [];
	arrFindOpt.push("menuName:=:\""+clickMenu+"\":1:&");
	let nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(","));	// nFindRow: -1(못찾음), 0이상(찾음 == 존재)
	
	// 1. 신규 추가
	if(nFindRow == -1)
	{
		let addRow = this.DS_ORDER.addrow();
		this.DS_ORDER.setdatabyname(addRow, "menuName", this.DS_MENU.getdatabyname(clickRow, "menuName"));	// 아메리카노, 카페라떼, 카페모카
		this.DS_ORDER.setdatabyname(addRow, "count", 1);
	}
	// 2. 기존 메뉴에 추가
	else
	{
		let cnt = Number(this.DS_ORDER.getdatabyname(nFindRow, "count"));
		this.DS_ORDER.setdatabyname(nFindRow, "count", cnt+1);
	}
}


// 패널 동적 생성
function createPanelsFromDataset() {
    var rowCount = this.DS_ORDER.getrowcount(); // DS_ORDER 데이터셋의 행 수 가져오기
    var panelGap = 36;  // 패널 간 간격 (36px)

    for (var i = 0; i < rowCount; i++) {
        // 각 패널에 필요한 데이터 가져오기
        var menuName = this.DS_ORDER.getdatabyname(i, "menuName");
        var menuCount = this.DS_ORDER.getdatabyname(i, "count");
        var menuUrl = this.DS_ORDER.getdatabyname(i, "url");
        var menuTemSize = this.DS_ORDER.getdatabyname(i, "TemSize");

        // 동적 패널 속성 설정
        var objProp = {
            x: 127 + (i * (252 + panelGap)), // 각 패널의 x 위치를 36px 간격으로 설정 (252는 패널의 너비)
            y: 184, 
            width: 252,
            height: 270
        };

        // 패널 동적 생성
        var instNewPanel = this.screen.createobjectex(XFD_CTRLKIND_PANEL, objProp);
    }
}