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