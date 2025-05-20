function screen_on_load()
{
    let clickRow = this.screen.getextradata();  // 클릭한 메뉴 행 (DS_MENU)
    let oScr = this.screen.getparent(); // 부모 화면 객체
    let mScr = oScr.getmembers(); // 부모 화면 멤버 객체
    let porlet_name = this.screen.getportletname();  // 현재 포틀릿 이름
    let dataset, menu, cost, url, temp, size;

    // 포틀릿 이름에 따른 처리 분기
    switch(porlet_name) {
        // (신규) 옵션선택
        case "pop_selectOpt":
            dataset = mScr.DS_MENU;  // 'DS_MENU' 데이터셋 객체
            menu = dataset.getdatabyname(clickRow, "menuName");  // 메뉴 이름
            cost = dataset.getdatabyname(clickRow, "cost");  // 가격
            url = dataset.getdatabyname(clickRow, "url");  // URL

            // 주문 데이터셋에 선택된 메뉴 정보 설정
            this.DS_ORDER.setdatabyname(0, "menuName", menu);
            this.DS_ORDER.setdatabyname(0, "cost", cost);
            this.DS_ORDER.setdatabyname(0, "url", url);
            break;

        // (수정) 옵션변경
        case "pop_changeOpt":
            dataset = mScr.DS_ORDER;  // 'DS_ORDER' 데이터셋 객체
            
            menu = dataset.getdatabyname(clickRow, "menuName");  // 메뉴 이름
            cost = dataset.getdatabyname(clickRow, "cost");  // 가격
            url = dataset.getdatabyname(clickRow, "url");  // URL
            temp = dataset.getdatabyname(clickRow, "Tem");  // 온도
            size = dataset.getdatabyname(clickRow, "Size");  // 컵 크기

            // 온도에 따른 라디오 버튼 설정
            if (temp == "뜨겁게") {
                temp = true;
                this.RD_H.setcheck(true);  // 뜨겁게 라디오 버튼 선택
            } else {
                temp = false;
                this.RD_C.setcheck(true);  // 차갑게 라디오 버튼 선택
            }

            // 컵 크기 설정
            switch (size) {
                case "작은컵":
                    size = 0;
                    this.RD_S.setcheck(true);  // 작은컵 라디오 버튼 선택
                    break;
                case "중간컵":
                    size = 1;
                    this.RD_M.setcheck(true);  // 중간컵 라디오 버튼 선택
                    break;
                case "큰컵":
                    size = 2;
                    this.RD_L.setcheck(true);  // 큰컵 라디오 버튼 선택
                    break;
            }

            // 수정된 값들을 주문 데이터셋에 설정
            this.DS_ORDER.setdatabyname(0, "menuName", menu);
            this.DS_ORDER.setdatabyname(0, "cost", cost);
            this.DS_ORDER.setdatabyname(0, "url", url);
            this.DS_ORDER.setdatabyname(0, "Tem", temp);
            this.DS_ORDER.setdatabyname(0, "Size", size);
            break;
    }
}

// 메뉴 취소
function btn_clo_on_mouseup(objInst, index)
{
    // 1. 인덱스가 0일 경우 팝업 종료
    if(index == 0) {
        this.screen.unloadpopup();  // 팝업을 종료
    }
    // 2. 인덱스가 1일 경우 첫 번째 탭으로 돌아가고 단계 텍스트 업데이트
    else {
        this.tab_pop.settabitemfocus(0);  // 첫 번째 탭으로 포커스 이동
        this.txt_step.settext("1 / 2");  // 단계 텍스트를 "1 / 2"로 설정
    }
}

// 다음 옵션 선택
function btn_Next_on_mouseup(objInst)
{
    // 뜨겁게: true / 차갑게: false
    let isHotChecked = this.RD_H.getcheck();  // 뜨겁게 선택 여부
    let isColdChecked = this.RD_C.getcheck();  // 차갑게 선택 여부

    // 1. 음료 온도 선택 여부 확인
    if (!isHotChecked && !isColdChecked) {
        this.screen.messagebox("음료의 온도를 선택해 주세요", "온도선택", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
        return;  // 온도 선택이 안되었으면 다음 화면으로 이동하지 않음
    }

    // 2. 선택된 온도 값 저장
    let bHot = isHotChecked ? true : false;  // 온도 값 설정
    this.DS_ORDER.setdatabyname(0, "Tem", bHot);  // DS_ORDER에 온도 값 저장

    // 3. 탭 이동: 다음 탭으로 이동
    this.tab_pop.settabitemfocus(1);  // 탭 1번 항목에 포커스 이동

    // 4. 단계 업데이트: 2/2로 설정
    this.txt_step.settext("2 / 2");  // 단계 텍스트 업데이트
}

// 팝업 닫기(메뉴옵션 선택완료)
function btn_order_on_mouseup(objInst)
{
    let nSize;

    // 작은컵: 0 / 중간컵: 1 / 큰컵: 2
    let isSmallChecked = this.RD_S.getcheck();
    let isMediumChecked = this.RD_M.getcheck();
    let isLargeChecked = this.RD_L.getcheck();

    // 1. 컵 크기 선택 여부 확인
    if (!isSmallChecked && !isMediumChecked && !isLargeChecked) {
        this.screen.messagebox("컵 크기를 선택해 주세요", "컵크기", XFD_MB_ERROR, XFD_MB_OK);  // 경고 메시지 표시
        return;  // 팝업 닫기 중단
    }

    // 2. 선택된 컵 크기 값 저장
    if (isSmallChecked) {
        nSize = 0;  // 작은컵
    } else if (isMediumChecked) {
        nSize = 1;  // 중간컵
    } else {
        nSize = 2;  // 큰컵
    }

    // 3. 주문 데이터셋에 컵 크기 저장
    this.DS_ORDER.setdatabyname(0, "Size", nSize);

    // 4. 클릭한 메뉴 행 데이터 가져오기
    let clickRow = this.screen.getextradata();  // 화면에서 클릭한 메뉴 행
    let oScr = this.screen.getparent();  // 부모 화면 객체
    let mScr = oScr.getmembers();  // 부모 화면 멤버들
    let porlet_name = this.screen.getportletname();  // 현재 화면 포틀릿 이름

    // 5. 메뉴 수정일 때 부모 화면에서 장바구니에 있던 원래 메뉴 삭제
    if (porlet_name == "pop_changeOpt") {
        let dataset = mScr.DS_ORDER;
        dataset.deleterow(clickRow);  // 해당 행 삭제
    }

    // 6. 팝업 종료
    this.screen.unloadpopup(this.DS_ORDER);
}