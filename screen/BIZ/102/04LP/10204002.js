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
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");
	let sld_LP = parentScr.getinstancebyname("SV_Template_LP");
	sld.setzorder(0)	
	
	sld_LP.setfocus();	
	sld.movenext();
	sld_LP.movenext();
}

function btn_Acc_on_mouseup(objInst)
{
	this.screen.loadportletpopup("접근성(팝업)", "/BIZ/101/01/POP/101013", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);		
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

function btn_minus_on_mouseup(objInst, index)
{
    // 버튼과 연결된 메뉴 이름 및 가격 가져오기
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");

    // DS_MENU에서 해당 메뉴의 가격 가져오기
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");
    let menuCost = Number(this.DS_MENU.getdatabyname(menuRow, "cost")); // 메뉴 가격 가져오기

    // DS_ORDER에서 해당 메뉴의 행 찾기
    let arrFindOpt = [];
    arrFindOpt.push("menuName:=:\"" + menuName + "\":1:&"); // 메뉴 이름으로 검색 조건 추가
    let nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // 조건에 맞는 행 검색

    if (nFindRow != -1) { // 메뉴가 존재할 경우
        // 1. 수량 가져오기
        let cnt = Number(this.DS_ORDER.getdatabyname(nFindRow, "count"));

        // 2. 수량이 1 이상일 경우에만 감소
        if (cnt > 1) {
            this.DS_ORDER.setdatabyname(nFindRow, "count", cnt - 1); // 수량 감소

            // 3. 총 수량(fld_Qua) 감소
            let totalQuantity = Number(this.screen.getinstancebyname("fld_Qua").gettext());
            if (totalQuantity > 0) {
                this.screen.getinstancebyname("fld_Qua").settext(totalQuantity - 1); // 총 수량 1 감소
            }

            // 4. 총 금액(fld_Mon) 감소
            let totalAmount = Number(this.screen.getinstancebyname("fld_Mon").gettext());
            if (totalAmount >= menuCost) {
                this.screen.getinstancebyname("fld_Mon").settext(totalAmount - menuCost); // 총 금액 감소
            }
        } else {
            console.log("수량이 1일 경우에는 감소하지 않습니다."); // 1 이하로 수량이 감소하지 않도록
        }
    }
}

function btn_plus_on_mouseup(objInst, index)
{
   // 버튼과 연결된 메뉴 이름 및 가격 가져오기
    let menuName = this.DS_ORDER.getdatabyname(index, "menuName");

    // DS_MENU에서 해당 메뉴의 가격 가져오기
    let menuRow = this.DS_MENU.findrowbyname(0, "menuName:=:\"" + menuName + "\":1:&");
    let menuCost = Number(this.DS_MENU.getdatabyname(menuRow, "cost")); // 메뉴 가격 가져오기

    // DS_ORDER에서 해당 메뉴의 행 찾기
    let arrFindOpt = [];
    arrFindOpt.push("menuName:=:\"" + menuName + "\":1:&"); // 메뉴 이름으로 검색 조건 추가
    let nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // 조건에 맞는 행 검색

    if (nFindRow != -1) { // 메뉴가 존재할 경우
        // 1. 수량 가져오기
        let cnt = Number(this.DS_ORDER.getdatabyname(nFindRow, "count"));

        // 수량이 10 이상이면 증가하지 않도록 설정
        if (cnt < 10) {
            this.DS_ORDER.setdatabyname(nFindRow, "count", cnt + 1); // 수량 증가

            // 2. 총 수량(fld_Qua) 증가
            let totalQuantity = Number(this.screen.getinstancebyname("fld_Qua").gettext());
            this.screen.getinstancebyname("fld_Qua").settext(totalQuantity + 1); // 총 수량 1 증가

            // 3. 총 금액(fld_Mon) 누적
            let totalAmount = Number(this.screen.getinstancebyname("fld_Mon").gettext());
            this.screen.getinstancebyname("fld_Mon").settext(totalAmount + menuCost); // 총 금액 누적
        } else {
            // 수량이 10 이상일 때 메시지 표시 (옵션)
            console.log("수량은 10을 초과할 수 없습니다.");
        }
    }
}

function btn_up_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_up.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_up.settext(currentValue.toString());
}

function btn_down_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_up.gettext());
    
    if (currentValue < 3) {
        currentValue += 1;
    }
    
    this.txt_up.settext(currentValue.toString());
}



function btn_Next_on_mouseup(objInst)
{
    var currentValue = parseInt(this.txt_num.gettext());
    
    if (currentValue < 6) {
        currentValue += 1;
    }
    
    this.txt_num.settext(currentValue.toString());
}

function btn_Pre_on_mouseup(objInst)
{
	var currentValue = parseInt(this.txt_num.gettext());
    
    if (currentValue > 1) {
        currentValue -= 1;
    }
    
    this.txt_num.settext(currentValue.toString());
}

function btn_Menu_on_mouseup(objInst)
{
    this.fn_trancomplete(); // 화면의 버튼, 필드, 이미지 등을 초기화하는 함수 호출
    
    let clickRow = Number(objInst.getname().replaceAll("btn_Menu_", "")) - 1; // 클릭한 버튼의 번호에서 1을 빼서 데이터셋의 행 번호로 변환
    let clickMenu = this.DS_MENU.getdatabyname(clickRow, "menuName");        // 클릭한 버튼에 해당하는 메뉴 이름 가져오기
	let clickMenuImg = this.DS_MENU.getdatabyname(clickRow, "url");        // 클릭한 버튼에 해당하는 메뉴 이름 가져오기
    let menuCost = Number(this.DS_MENU.getdatabyname(clickRow, "cost"));     // 클릭한 메뉴의 가격 가져오기
    
    // 1. 신규 추가
    let arrFindOpt = []; // 검색 조건 배열 생성
    arrFindOpt.push("menuName:=:\"" + clickMenu + "\":1:&"); // 메뉴 이름으로 검색 조건 추가
    let nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(",")); // DS_ORDER에서 메뉴 이름으로 행 검색 (-1: 못 찾음, 0 이상: 찾음)

    if (nFindRow == -1) // 메뉴가 DS_ORDER에 없을 경우
    {
        let addRow = this.DS_ORDER.addrow(); // 새로운 행 추가
        this.DS_ORDER.setdatabyname(addRow, "menuName", clickMenu); // 메뉴 이름 설정
		this.DS_ORDER.setdatabyname(addRow, "cost", menuCost);            // 수량을 1로 설정
        this.DS_ORDER.setdatabyname(addRow, "count", 1);            // 수량을 1로 설정
        this.DS_ORDER.setdatabyname(addRow, "url", clickMenuImg);            // 수량을 1로 설정
    }
    else // 메뉴가 이미 DS_ORDER에 있을 경우
    {
        let cnt = Number(this.DS_ORDER.getdatabyname(nFindRow, "count")); // 기존 수량 가져오기
        this.DS_ORDER.setdatabyname(nFindRow, "count", cnt + 1);          // 수량을 1 증가시켜 설정
    }

    // 2. 총 수량(fld_Qua) 증가
    let totalQuantity = Number(this.screen.getinstancebyname("fld_Qua").gettext()); // 현재 총 수량 가져오기
    this.screen.getinstancebyname("fld_Qua").settext(totalQuantity + 1);            // 총 수량 1 증가 후 설정

    // 3. 총 금액(fld_Mon) 누적
    let totalAmount = Number(this.screen.getinstancebyname("fld_Mon").gettext()); // 현재 총 금액 가져오기
    this.screen.getinstancebyname("fld_Mon").settext(totalAmount + menuCost);     // 클릭된 메뉴 가격 누적 후 설정	
}