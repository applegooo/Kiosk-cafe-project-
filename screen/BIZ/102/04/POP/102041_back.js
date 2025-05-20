function screen_on_load()
{
	let clickRow = this.screen.getextradata();	// 화면'10204003'에서 클릭한 메뉴 행(DS_MENU)
	
	let oScr = this.screen.getparent(); // 화면'10204003' 객체
	let mScr = oScr.getmembers();       // 화면'10204003' 멤버
	let dataset = mScr.DS_MENU;        // 데이터셋'DS_MENU' 객체
	
	this.DS_ORDER.clonerow(dataset, clickRow, false);
}

function btn_clo_on_mouseup(objInst)
{
	this.screen.unloadpopup();
}

function btn_Next_on_mouseup(objInst)
{
//    let Tem = "";  
//    
//    // 버튼의 이름에 따라 한글 텍스트 값 가져오기
//    if (objInst.getname() === "btn_tem_1") { 
//        Tem = this.screen.getinstancebyname("RD_C").gettext(); // RD_C에서 한글 텍스트 가져오기 (예: "차갑게")
//    } else if (objInst.getname() === "btn_tem_2") { 
//        Tem = this.screen.getinstancebyname("RD_H").gettext(); // RD_H에서 한글 텍스트 가져오기 (예: "뜨겁게")
//    }
//
//    let menuName = this.args.menuName; // 전달받은 메뉴 이름
//
//    // DS_ORDER에서 해당 메뉴 찾기
//    let arrFindOpt = [];
//    arrFindOpt.push("menuName:=:\"" + menuName + "\":1:&");
//    let nFindRow = this.DS_ORDER.findrowbyname(0, arrFindOpt.join(","));
//
//    if (nFindRow != -1) {
//        this.DS_ORDER.setdatabyname(nFindRow, "Tem", Tem); // 선택한 온도(한글 텍스트) 반영
//    }
//

	this.screen.loadportletpopup("음료선택", "/BIZ/102/04/POP/102042", "음료선택", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, this.screen);
}

function screen_on_popupdestroy(popup_screen, popup_name, result)
{
	this.screen.unloadpopup();
}

function btn_tem_on_click(objInst, bPrevCheckState, bCurCheckState)
{

}