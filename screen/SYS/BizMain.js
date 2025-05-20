//====================================================================================================================
// 화면 초기 설정 START
//====================================================================================================================
/*
유통 
1. 전기차충전기
2. 무인상품판매기
3. 즉석사진인화기

주문
4. 무인카페
5. 음식점

발권 
6.무인발권기
*/
//= 유통
let JsonMenu = {
	Circulation :  {
		id : "101",
		nm : "유통",
		menu : [
			{
				middleMenuNm  : "전기차충전기"
				,middleMenuUrl : "01"
				,subMenuArray  : [
					{scrId : "10101001",scrNm : "전기차충전소_사용시작안내"}
					,{scrId : "10101002",scrNm : "전기차충전소_결제선택"}
					,{scrId : "10101003",scrNm : "전기차충전소_카드리더기 접촉"}
					,{scrId : "10101004",scrNm : "전기차충전소_충전량"}
					,{scrId : "10101005",scrNm : "전기차충전소_결제하기"}
					,{scrId : "10101006",scrNm : "전기차충전소_카드투입구"}
					,{scrId : "10101007",scrNm : "전기차충전소_커넥터충전"}
					,{scrId : "10101008",scrNm : "전기차충전소_충전중"}
					,{scrId : "10101009",scrNm : "전기차충전소_충전완료"}
					,{scrId : "10101010",scrNm : "전기차충전소_영수증출력"}
					,{scrId : "10101011",scrNm : "전기차충전소_마무리인사"}
					,{scrId : "10101012",scrNm : "전기차충전소_마무리인사(2)"}
				]
				,subMenuArrayLP : [
					{scrId : "10101001",scrNm : "[저]전기차충전소_사용시작안내"}
					,{scrId : "10101002",scrNm : "[저]전기차충전기_결제방법"}
					,{scrId : "10101003",scrNm : "[저]전기차충전기_카드리더기 접촉"}
					,{scrId : "10101004",scrNm : "[저]전기차충전기_충전량"}
					,{scrId : "10101005",scrNm : "[저]전기차충전기_결제하기"}
					,{scrId : "10101006",scrNm : "[저]전기차충전기_카드투입구"}
					,{scrId : "10101007",scrNm : "[저]전기차충전기_커넥터충전"}
					,{scrId : "10101008",scrNm : "[저]전기차충전기_충전중"}
					,{scrId : "10101009",scrNm : "[저]전기차충전기_충전완료"}
					,{scrId : "10101010",scrNm : "[저]전기차충전기_영수증출력"}
					,{scrId : "10101011",scrNm : "[저]전기차충전기_마무리인사"}
					,{scrId : "10101012",scrNm : "[저]전기차충전기_마무리인사(2)"}
				]
			}
			,{
				middleMenuNm  : "무인상품판매기",
				middleMenuUrl : "02",
				subMenuArray  : [
					{scrId : "10102001",scrNm : "무인상품판매기_사용시작안내"}
					,{scrId : "10102002",scrNm : "무인상품판매기_바코드"}
					,{scrId : "10102003",scrNm : "무인상품판매기_바코드(2)"}
					,{scrId : "10102004",scrNm : "무인상품판매기_수량(1)"}
					,{scrId : "10102005",scrNm : "무인상품판매기_수량(2)"}
					,{scrId : "10102006",scrNm : "무인상품판매기_포장봉투"}
					,{scrId : "10102007",scrNm : "무인상품판매기_결제방법"}
					,{scrId : "10102008",scrNm : "무인상품판매기_카드투입구"}
					,{scrId : "10102009",scrNm : "무인상품판매기_영수증출력"}
					,{scrId : "10102010",scrNm : "무인상품판매기_마무리인사"}
					,{scrId : "10102011",scrNm : "무인상품판매기_마무리인사(2)"}
				]
				,subMenuArrayLP : [
					{scrId : "10102001",scrNm : "[저]무인주차정산기_사용시작안내"}
					,{scrId : "10102002",scrNm : "[저]무인상품판매기_바코드"}
					,{scrId : "10102003",scrNm : "[저]무인상품판매기_바코드(2)"}
					,{scrId : "10102004",scrNm : "[저]무인상품판매기_포장봉투"}
					,{scrId : "10102005",scrNm : "[저]무인상품판매기_결제방법"}
					,{scrId : "10102006",scrNm : "[저]무인상품판매기_카드투입구"}
					,{scrId : "10102007",scrNm : "[저]무인상품판매기_영수증출력"}
					,{scrId : "10102008",scrNm : "[저]무인상품판매기_결제완료"}
					,{scrId : "10102009",scrNm : "[저]무인상품판매기_영수증출력중"}
				]
			}
			,{
				middleMenuNm  : "즉석사진인화기",
				middleMenuUrl : "03",
				subMenuArray  : [
					{scrId : "10103001",scrNm : "즉석사진인화기_사용시작안내"}
					,{scrId : "10103002",scrNm : "즉석사진인화기_사진컷"}
					,{scrId : "10103003",scrNm : "즉석사진인화기_수진수량"}
					,{scrId : "10103004",scrNm : "즉석사진인화기_결제방법"}
					,{scrId : "10103005",scrNm : "즉석사진인화기_카드투입구"}
					,{scrId : "10103006",scrNm : "즉석사진인화기_촬영"}
					,{scrId : "10103007",scrNm : "즉석사진인화기_촬영중"}
					,{scrId : "10103008",scrNm : "즉석사진인화기_사진고르기"}
					,{scrId : "10103009",scrNm : "즉석사진인화기_사진고르기(2)"}
					,{scrId : "10103010",scrNm : "즉석사진인화기_꾸미기"}
					,{scrId : "10103011",scrNm : "즉석사진인화기_꾸미기(2)"}
					,{scrId : "10103012",scrNm : "즉석사진인화기_사진인화중"}									
				]
				,subMenuArrayLP : [
					{scrId : "10103001",scrNm : "[저]무인주차정산기_사용시작안내"}
					,{scrId : "10103002",scrNm : "[저]무인주차정산기_기본선택(입력)"}
				]
			}
		]
	},Order :  {
		id : "102",
		nm : "주문",
		menu : [
			{
				middleMenuNm  : "무인카페",
				middleMenuUrl : "04",
				subMenuArray  : [
					 {scrId : "10204001",scrNm : "무인카페_사용시작안내"}
					//,{scrId : "10204002",scrNm : "무인카페_메뉴선택"}
					,{scrId : "10204003",scrNm : "무인카페_메뉴선택"}
					,{scrId : "10204004",scrNm : "무인카페_내역확인"}
					,{scrId : "10204005",scrNm : "무인카페_결제방법선택"}
					,{scrId : "10204006",scrNm : "무인카페_결제하기"}
					,{scrId : "10204007",scrNm : "무인카페_음료제조중"}
					,{scrId : "10204008",scrNm : "무인카페_음료제조완료"}
					//,{scrId : "10204009",scrNm : "무인카페_음료제조(3)"}
					//,{scrId : "10204010",scrNm : "무인카페_음료제조(4)"}
					,{scrId : "10204011",scrNm : "무인카페_제조완료"}
				]
				,subMenuArrayLP : [
					 {scrId : "10204001",scrNm : "[저]무인카페_사용시작안내"}
					//,{scrId : "10204002",scrNm : "[저]무인카페_메뉴선택"}
					,{scrId : "10204003",scrNm : "[저]무인카페_메뉴선택"}
					,{scrId : "10204004",scrNm : "[저]무인카페_내역확인"}
					,{scrId : "10204005",scrNm : "[저]무인카페_결제방법선택"}
					,{scrId : "10204006",scrNm : "[저]무인카페_결제하기"}
					,{scrId : "10204007",scrNm : "[저]무인카페_음료제조중"}
					,{scrId : "10204008",scrNm : "[저]무인카페_음료제조완료"}
					//,{scrId : "10204009",scrNm : "[저]무인카페_음료제조(3)"}
					//,{scrId : "10204010",scrNm : "[저]무인카페_음료제조(4)"}
					,{scrId : "10204011",scrNm : "[저]무인카페_제조완료"}
				]
			}
			,{
				middleMenuNm  : "음식점",
				middleMenuUrl : "05",
				subMenuArray  : [
					{scrId : "10205001",scrNm : "음식점_사용시작안내"}
					,{scrId : "10205002",scrNm : "음식점_주문방법"}
					,{scrId : "10205003",scrNm : "음식점_메뉴선택"}
					,{scrId : "10205004",scrNm : "음식점_메뉴선택(2)"}
					,{scrId : "10205005",scrNm : "음식점_내역확인"}
					,{scrId : "10205006",scrNm : "음식점_포인트적립"}
					,{scrId : "10205007",scrNm : "음식점_휴대폰적립"}
					,{scrId : "10205008",scrNm : "음식점_휴대폰적립(2)"}
					,{scrId : "10205009",scrNm : "음식점_결제하기"}
					,{scrId : "10205010",scrNm : "음식점_카드투입구"}
					,{scrId : "10205011",scrNm : "음식점_주문완료"}
					,{scrId : "10205012",scrNm : "음식점_영수증"}
					,{scrId : "10205013",scrNm : "음식점_마무리인사"}
					,{scrId : "10205014",scrNm : "마무리인사(2)"}
				]
				,subMenuArrayLP : [
					{scrId : "10205001",scrNm : "[저]음식점_사용시작안내"}
					,{scrId : "10205002",scrNm : "[저]음식점_주문방법"}
					,{scrId : "10205003",scrNm : "[저]음식점_메뉴선택"}
					,{scrId : "10205004",scrNm : "[저]음식점_메뉴선택(2)"}
					,{scrId : "10205005",scrNm : "[저]음식점_내역확인"}
					,{scrId : "10205006",scrNm : "[저]음식점_포인트적립"}
					,{scrId : "10205007",scrNm : "[저]음식점_휴대폰적립"}
					,{scrId : "10205008",scrNm : "[저]음식점_휴대폰적립(2)"}
					,{scrId : "10205009",scrNm : "[저]음식점_결제하기"}
					,{scrId : "10205010",scrNm : "[저]음식점_카드투입구"}
					,{scrId : "10205011",scrNm : "[저]음식점_주문완료"}
					,{scrId : "10205012",scrNm : "[저]음식점_영수증"}
					,{scrId : "10205013",scrNm : "[저]음식점_마무리인사"}
					,{scrId : "10205014",scrNm : "[저]마무리인사(2)"}
				]
			}
		]
	},Ticket :  {
		id : "103",
		nm : "발권",
		menu : [
			{
				middleMenuNm  : "기차",
				middleMenuUrl : "06",
				subMenuArray  : [
					{scrId : "10306001",scrNm : "무인발권기_사용시작안내"}
					,{scrId : "10306002",scrNm : "무인발권기_도착지"}
					,{scrId : "10306003",scrNm : "무인발권기_출발일"}
					,{scrId : "10306004",scrNm : "무인발권기_인원"}
					,{scrId : "10306005",scrNm : "무인발권기_출발시간"}
					,{scrId : "10306006",scrNm : "무인발권기_좌석등급"}
					,{scrId : "10306007",scrNm : "무인발권기_좌석"}
					,{scrId : "10306008",scrNm : "무인발권기_좌석(2)"}
					,{scrId : "10306009",scrNm : "무인발권기_내역확인"}
					,{scrId : "10306010",scrNm : "무인발권기_결제방법"}
					,{scrId : "10306011",scrNm : "무인발권기_카드투입구"}
					,{scrId : "10306012",scrNm : "무인발권기_발권완료"}
					,{scrId : "10306013",scrNm : "무인발권기_영수증"}
					,{scrId : "10306014",scrNm : "무인발권기_마무리인사"}
					,{scrId : "10306015",scrNm : "무인발권기_마무리인사(2)"}
				]
				,subMenuArrayLP : [
					{scrId : "10308001",scrNm : "[저]무인민원발급기_1"}
					,{scrId : "10308002",scrNm : "[저]무인민원발급기_2"}
				]
			},
      ]
   },
	Information :  {
		id : "104",
		nm : "안내",
		menu : [
			{
				middleMenuNm  : "위치정보시스템(관광안내)",
				middleMenuUrl : "14",
				subMenuArray  : [
					{scrId : "10414001",scrNm : "종합정보시스템_사용시작안내"}
					,{scrId : "10414002",scrNm : "종합정보시스템_층별안내"}
				],
				subMenuArrayLP : [
					{scrId : "10414001",scrNm : "[저]종합정보시스템_사용시작안내"}
					,{scrId : "10414002",scrNm : "[저]종합정보시스템_층별안내"}
				]
			}, {
				middleMenuNm  : "길안내로봇(박물관)",
				middleMenuUrl : "15",
				subMenuArray  : [
					{scrId : "10415001",scrNm : "위치정보시스템_사용시작안내"}
					,{scrId : "10415002",scrNm : "위치정보시스템_인기명소안내"}
				],
				subMenuArrayLP : [
					{scrId : "10415001",scrNm : "[저]위치정보시스템_사용시작안내"}
					,{scrId : "10415002",scrNm : "[저]위치정보시스템_인기명소안내"}
				]
			}, {
				middleMenuNm  : "병원진료예약키오스크",
				middleMenuUrl : "16",
				subMenuArray  : [
					{scrId : "10416001",scrNm : "위치정보시스템_사용시작안내"}
					,{scrId : "10416002",scrNm : "위치정보시스템_인기명소안내"}
				],
				subMenuArrayLP : [
					{scrId : "10416001",scrNm : "[저]위치정보시스템_사용시작안내"}
					,{scrId : "10416002",scrNm : "[저]위치정보시스템_인기명소안내"}
				]
			}
		]
   }
};

let largeMenu = "";
let _menuMode = "";

let bMedia = false;
let bAudio = false;

//====================================================================================================================
// 화면 초기 설정 END
//====================================================================================================================

//====================================================================================================================
// 이벤트 START
//====================================================================================================================
/**
 * 화면 on_load 이벤트
 */
function screen_on_load()
{
	console.log("현재 화면 경로는 = " + this.screen.getscreenurl());
		
//	debugger;
	//메뉴 아코디언용
	this.AC_Vert.additem("PN_MiddleMenu", false, 0, 199);
	this.AC_Vert.refresh();
	this.fn_lKindSet();
//	this.fn_modeChange();
	

	bMedia = this.chkBox.getcheck();
	bAudio = this.chkBox_audio.getcheck();
}

function fn_lKindSet()
{

	
	
	for (let key in JsonMenu) {
		SYSUtil.fn_debug(this, "key 이름은 " + key);
	    if (JsonMenu.hasOwnProperty(key)) {
			pbObj = this.screen.getinstancebyname("PB_" + key);
			txObj = this.screen.getinstancebyname("TX_" + key);
			pbObj.settext(JsonMenu[key].nm);
			txObj.settext(JsonMenu[key].nm);
			let keyCode = key.substr(0,3);
			this.fn_mKindSet(keyCode, JsonMenu[key].menu);
	    }
	}

}
function fn_mKindSet(keyCode, mKind)
{
	let i = 0;
	let mKindObj, menuLen;
	for (let key in mKind) {
    	if (mKind.hasOwnProperty(key)) {
			mKindObj = this.screen.getinstancebyname(keyCode + "_" + i);
			mKindObj.settext(mKind[key].middleMenuNm); 
			mKindObj.setuserdata(i + "|" + factory.jsonstringify(mKind[key])); 
			mKindObj.setdescription(mKind[key].middleMenuUrl); 
			mKindObj.registerevent("on_mouseup", "this.PB_Menu_on_mouseup(objInst)");
			i++;
	    }
	}
}

/**
 * 대분류 버튼 이벤트
 */
function PB_on_mouseup(objInst)
{
	let objNm = objInst.getname();
	let menuArray;
	menuArray = JsonMenu[objNm.substr(3, objNm.length - 3)];
	largeMenu = objInst.getdescription();
	this.fn_MiddleMenuSet(objInst, menuArray);
	
	if(objNm == "PB_Ticket"){
		this.fn_ChangImage();
	} else {
		this.PB_0.setimagenormal("/SYS/circle_bt.png");
	}
}

/**
 * 중분류 버튼 이벤트 //현재 코드는 mode 값에 따라 SV_Template 또는 SV_Template_LP 중 하나를 호출하도록 설계
 */
async function PB_Menu_on_mouseup(objInst)
{
  // objInst.getdescription()을 통해 버튼의 설명을 가져옴
    let desc   = objInst.getdescription();
    
    // 메뉴에 해당하는 URL을 생성
    let bizUrl = "/BIZ/" + largeMenu + "/" + desc + "/";
    
    // 버튼 텍스트를 가져옴
    let nm = objInst.gettext();
    
    // userdata에서 메뉴 정보(JSON 형식)를 파싱하여 arrTmp에 저장
    let arrTmp = JSON.parse(objInst.getuserdata().split("|")[1]);
    
    // 디버그용 로그 출력
    SYSUtil.fn_debug(this, "nm:" + nm);
    SYSUtil.fn_debug(this, "arrTmp:" + arrTmp, arrTmp);
    
    // 현재 모드를 가져옴
    let mode = this.RD_Normal.gettext();
    SYSUtil.fn_debug(this, "mode:" + mode);
    
    // 모드에 따라 서브 메뉴 배열을 설정
    let arrTmp2;
    if (mode == "1" || mode == "2") {
        arrTmp2 = arrTmp.subMenuArray;
    } else if (mode == "3") {
        arrTmp2 = arrTmp.subMenuArrayLP;
    }
    
    // 디버그용 로그 출력
    SYSUtil.fn_debug(this, "arrTmp2:", arrTmp2);
    
    // 슬라이드 객체와 화면 객체 선언
    let objSld, objScreen;

    // 기존 템플릿 항목 삭제
    this.SV_Template.deleteallitem();
    this.SV_Template_LP.deleteallitem();
    
    // 기타 변수 선언
    let i, svIdx, svIdx_LP, templateObj, bizNm, bizNmLP, bizTUrl;
    let objProp = {
        x: 0, 
        y: 0, 
        width: 1080, 
        height: 1920,
        width_unit: 1,
        height_unit: 1,
        tabitem_hidden: true,
        tabitem_scrollbtnhidden: true,
        border: 0
    };
    
    // 템플릿 객체, 서브 폴더, 항목 종류 및 탭 템플릿 객체 선언
    let sv_templateObj, subFd, lKind, tb_templateObj, tb_templateObj_LP;
    let sv_templateObj_LP;  // 여기서만 선언해야 함 (중복 선언 제거)

    // 모드에 따라 템플릿 객체를 설정
    switch (mode) {
        // 모드 1
    case "1":
        sv_templateObj = this.SV_Template;  // 기본으로 SV_Template 사용
        subFd = "";
        _menuMode = "";            

        // SV_Template_LP 객체를 설정
        sv_templateObj_LP = this.SV_Template_LP; // SV_Template_LP 객체 설정
        sv_templateObj_LP.setzorder(1);  // SV_Template_LP를 뒤로 보냄
        break;
        
        // 모드 2
        case "2":
            sv_templateObj = this.SV_Template;  // SV_Template 사용
            subFd = "";
            if (mode == "2") {
                this.fn_setCssMode("hc"); // CSS 모드 설정
            }
            _menuMode = "hc";  // HC 모드
            break;
        
        // 모드 3
        case "3":
            // 모드 3에서는 기본적으로 SV_Template_LP를 사용하고, 추가로 SV_Template도 열기
            sv_templateObj = this.SV_Template_LP;  // 기본으로 SV_Template_LP 사용
            sv_templateObj_LP = this.SV_Template; // 추가로 SV_Template도 사용
            _menuMode = "lp";  // LP 모드
            subFd = "LP";  // LP 서브 폴더 설정
            break;
    }

    // 만약 서브 메뉴 배열이 비어 있다면, 공사 중 메시지를 표시
    if (arrTmp2.length == 0) {
        this.screen.messagebox("템플릿 화면이 공사 진행중입니다.", "안내", XFD_MB_INFORMATION, XFD_MB_OK, XFD_MB_FOCUSBUTTON1, "test_messagebox");
        return;
    }
    
    // 첫 번째 스크린 ID의 첫 3자리로 종류를 결정
    lKind = arrTmp2[0].scrId.substr(0, 3);
    
    // 디버그용 로그 출력
    SYSUtil.fn_debug(this, "sv_templateObj:", sv_templateObj);
    SYSUtil.fn_debug(this, "sv_templateObj_LP:", sv_templateObj_LP);

    // 서브 메뉴 항목들에 대해 반복문을 실행
    for (i = 0; i < arrTmp2.length; i++) {
        // 템플릿 객체에 새로운 항목을 추가
        svIdx = sv_templateObj.additem("", false);
        svIdx_LP = sv_templateObj_LP.additem("", false);  // 이 부분을 반복문 안에서 초기화

        // 디버그용 로그 출력
        SYSUtil.fn_debug(this, "svIdx:", svIdx);
        
        // 비즈니스 이름 및 URL 설정
        bizNm = arrTmp2[i].scrNm;
		bizNmLP = "[저]"+arrTmp2[i].scrNm;
        bizUrl = "/BIZ/" + lKind + "/" + desc + subFd + "/";
        bizTUrl = bizUrl + arrTmp2[i].scrId;

		// LP URL 생성
		let bizUrlLP = "/BIZ/" + lKind + "/" + desc + "LP/";
		let bizTUrlLP = bizUrlLP + arrTmp2[i].scrId;
		
		// 디버그용 로그 출력
		SYSUtil.fn_debug(this, "bizTUrl:", bizTUrl);
		SYSUtil.fn_debug(this, "bizTUrlLP:", bizTUrlLP);


        // 템플릿 객체에서 새로운 탭 객체를 생성
        tb_templateObj = sv_templateObj.createobjectex(svIdx, XFD_CTRLKIND_TAB, objProp);
        tb_templateObj_LP = sv_templateObj_LP.createobjectex(svIdx_LP, XFD_CTRLKIND_TAB, objProp);
        
        // 탭 이름을 설정
        tb_templateObj.setname("TB_template" + i);  // 'TB_template' + 인덱스 설정
        tb_templateObj_LP.setname("TB_template_LP" + i);  // 'TB_template_LP' + 인덱스 설정
        
        // 디버그용 로그 출력
        SYSUtil.fn_debug(this, "tb_templateObj:", tb_templateObj);
        SYSUtil.fn_debug(this, "tb_templateObj_LP:", tb_templateObj_LP);
        
        // 포틀릿 탭을 추가
		//let _bizTUrl = bizTUrl.replaceAll("/01/","/01LP/");
        let tabIdx = await tb_templateObj.addportlettabsync(bizNm, 1, 60, bizTUrl, bizNm, true, null, false, false);
        let tabIdx_LP = await tb_templateObj_LP.addportlettabsync(bizNmLP, 1, 60, bizTUrlLP, bizNmLP, true, null, false, false);
        
        // 디버그용 로그 출력
        SYSUtil.fn_debug(this, "tabIdx:", tabIdx);
		SYSUtil.fn_debug(this, "tabIdx_LP:", tabIdx_LP);
        
        // 탭 추가가 실패하면 에러 메시지 출력
        if (tabIdx == -2) {
            this.screen.messagebox("템플릿 정보가 올바르지 않습니다.", "에러", XFD_MB_ERROR, XFD_MB_OK, XFD_MB_FOCUSBUTTON1, "test_messagebox");
            return;
        }
        
        // 템플릿 항목을 화면에 표시
        sv_templateObj.setitemhidden(svIdx, false);
        sv_templateObj_LP.setitemhidden(svIdx_LP, false);
    }
    
    // 비즈니스 화면에 첫 번째 항목에 포커스를 설정
    this.SV_Biz.setitemfocus(1);
    
    // 템플릿 객체의 z-순서를 설정
    sv_templateObj.setzorder(0);
    sv_templateObj_LP.setzorder(1);
    
    // 첫 번째 항목에 포커스를 설정
    sv_templateObj.setitemfocus(0);
    sv_templateObj_LP.setitemfocus(0);
    
    // 버튼들을 표시
    this.PB_Prev.setvisible(true);
    this.PB_Next.setvisible(true);
    this.PB_Refresh.setvisible(true);
    this.PB_HighColor.setvisible(true);
}

//====================================================================================================================
// 이벤트 END
//====================================================================================================================


//====================================================================================================================
// 추가 함수 START
//====================================================================================================================
/**
 *
 */

/**
 * 메뉴 구성
 * @param largeMenuObj 대분류 버튼 오브젝트
 * @param menuArray    JSON 메뉴정보 
 */
function fn_MiddleMenuSet(largeMenuObj, menuArray)
{
	this.fn_MiddleMenuHidden();
	if(menuArray == undefined) return;
	let isexpand = this.AC_Vert.isitemexpanded(0);
	let isACDesc = this.AC_Vert.getdescription();
	
	if(!isexpand) {
		this.AC_Vert.setdescription(largeMenuObj.getname());
		this.AC_Vert.expanditem(0, null, 1);
		
		let menuCnt = menuArray.menu.length;
		let i, objInst;
		
		for(i = 0; i < menuCnt; i++) {
			objInst = this.screen.getinstancebyname("PB_" + i);
			objInst.setuserdata(i + "|" + factory.jsonstringify(menuArray.menu[i]));
			objInst.setvisible(true);
			objInst.settext(menuArray.menu[i].middleMenuNm);
			objInst.setdescription(menuArray.menu[i].middleMenuUrl);
		}
	} else {
		if(isACDesc == largeMenuObj.getname()){
			this.AC_Vert.setdescription("");
			this.fn_MiddleMenuHidden();
			this.AC_Vert.expanditem(0, null, 0);	
		} else {
			this.fn_MiddleMenuHidden();
			this.AC_Vert.setdescription(largeMenuObj.getname());
			this.AC_Vert.expanditem(0, null, 1);
			
			let menuCnt = menuArray.menu.length;
			let i, objInst;
			
			for(i = 0; i < menuCnt; i++) {
				objInst = this.screen.getinstancebyname("PB_" + i);
				objInst.setuserdata(i + "|" + factory.jsonstringify(menuArray.menu[i]));
				objInst.setvisible(true);
				objInst.settext(menuArray.menu[i].middleMenuNm);
				objInst.setdescription(menuArray.menu[i].middleMenuUrl);
			}			
		}
	}
}

/**
 * 메뉴 숨김 처리
 */
function fn_MiddleMenuHidden()
{
	let nCount, objInst;
	let arrInst = this.PN_MiddleMenu.getinstanceall(0);
	
	for(nCount = 0; nCount < arrInst.length; nCount++) {
		objInst = arrInst[nCount];
		if(objInst == null) {
			continue;
		}
		objInst.setvisible(false);
	}
}

//====================================================================================================================
// 추가 함수 END
//====================================================================================================================

function PB_Prev_on_mouseup(objInst)
{
	let templateObj = this.SV_Template;
	let templateObjLp = this.SV_Template_LP;
	
	templateObjLp.moveprev();
	templateObj.moveprev();
}

function PB_Next_on_mouseup(objInst)
{
	
	SYSUtil.fn_debug(this, "_menuMode:"+_menuMode);

	let templateObj = this.SV_Template;
	let templateObjlp = this.SV_Template_LP;

	SYSUtil.fn_debug(this, "templateObj:",templateObj);
	for(let i = 0; i < templateObj.getitemcount(); i++)
	{
		SYSUtil.fn_debug(this, i + "번째:" + templateObj.getitemhidden(i));
	}
	let ret = templateObj.movenext();
	let ret1 = templateObjlp.movenext();
	
	SYSUtil.fn_debug(this, "ret:"+ret);
	SYSUtil.fn_debug(this, "ret1:"+ret1);
}

function PB_Refresh_on_mouseup(objInst)
{
	window.location.reload();
}

function fn_ChangImage()
{
	let PB = this.PB_0.gettext();
	if(PB == "발급기"){
		this.PB_0.setimagenormal("/SYS/KakaoTalk.png");
	}
}

let videoTF = false;
function SV_Template_on_afteritemchange(objInst, itemPrevIndex, itemCurrIndex)
{
	let resPr = this.SV_Template.getcustomprop("resPr");
	
	if(this.chkBox.getcheck() == true) {
		let count = 0;
		
		let intervalId = setInterval(() => {
			count++;
			let tabObj = this.SV_Template.getchildinstancefirst(itemCurrIndex);
			let videoUrl = "";
			videoTF = true;
			if (tabObj != null) {
				this.PN_Sl.setzorder(0);

				this.pn_Video.setzorder(0);
				
				this.PN_Sl.setvisible(true);
				this.pn_Video.setvisible(true);
				
				videoUrl = "./project/media" + tabObj.getinnerscreenurl(0) + ".mp4";
				
				let cls = factory.httpexistfile(videoUrl, true);
				
				if(cls.nresult == 0) {
					this.PN_Sl.setvisible(false);
					this.pn_Video.setvisible(false);
					clearInterval(intervalId);
					
					return;
				}
				
				// Sucess: 비디오(*.mp4) 파일 존재 == 재생
				this.VD_Sl.setsource(videoUrl);
				this.VD_Sl.play();
				let intervalId2 = setInterval(() => {
					let chromaKeyTF = this.fn_ChromaKey(this.VD_Sl,this.CV_Sl);
					if (!chromaKeyTF) {
						clearInterval(intervalId2);
					}
				}, 60);
				videoTF = false;
				clearInterval(intervalId);
			} else {
				this.PN_Sl.setvisible(false);
				this.pn_Video.setvisible(false);
			}
		}, 1000);
	}
	if(this.chkBox_audio.getcheck() == true) {
		this.fn_audioPlay(itemCurrIndex);
	}
}

// 오디오 재생
function fn_audioPlay(itemCurrIndex)
{
	if(bAudio) {
		let tabObj = this.SV_Template.getchildinstancefirst(itemCurrIndex);
		let audioUrl = "./project/audio" + tabObj.getinnerscreenurl(0) + ".wav";
		let cls = factory.httpexistfile(audioUrl, true);
		
		// Fail: 오디오(*.wav) 파일이 존재하지않으면 반환
		if(cls.nresult == 0) {
			return;
		}
		
		// Sucess: 오디오(*.wav) 파일 존재 == 재생
		this.AU_Sl.setsource(audioUrl);
		this.AU_Sl.play();
	}
}

// 캔버스에 크로마키 적용해서 비디오 재생
function fn_ChromaKey(vdoObj, cvsObj)
{
	let ctx_1, image_width, image_height;
	let i, frame, frame_data_length, r, g, b;
	let canvas_dom_1, video_dom;
	
	video_dom = vdoObj.getdom();
	
	// 동영상이 멈춤이나 재생 완료 상태인 경우 리턴
    if (video_dom.paused || video_dom.ended) {
        return true;
    }

	image_width = vdoObj.getwidth() - 2; // border 제외
	image_height = vdoObj.getheight() - 2; // border 제외

	canvas_dom_1 = cvsObj.getdom();
	
	// 캔버스 1의 Context를 구하고, 비디오의 이미지를 표시
	ctx_1 = canvas_dom_1.getContext("2d");
    ctx_1.drawImage(video_dom, 0, 0, image_width, image_height);

	// 캔버스 1의 이미지 데이터를 구함
    frame = ctx_1.getImageData(0, 0, image_width, image_height);

	// 캔버스 1의 이미지 데이터 Looping
    frame_data_length = frame.data.length / 4;
    for (i = 0; i < frame_data_length; i++) {
        r = frame.data[i * 4 + 0];
        g = frame.data[i * 4 + 1];
        b = frame.data[i * 4 + 2];

		// [주의] 색상 기준은 동영상의 배경 색상을 기준으로 변경해야 함
		// 색상이 특정 기준을 만족하면 투명 처리
		if (this.isSimilarColor([r, g, b], [0, 255, 0], 200)) {
			frame.data[i * 4 + 3] = 0;
		}
    }

	// 캔버스 1의 이미지 데이터 표시
	ctx_1.putImageData(frame, 0, 0);
	return true;
}

function isSimilarColor(color1, color2, threshold) {
    const dr = color1[0] - color2[0];
    const dg = color1[1] - color2[1];
    const db = color1[2] - color2[2];
    const distanceSquared = dr * dr + dg * dg + db * db;
    return distanceSquared < threshold * threshold;
}

//체크박스 클릭시 뜨는 알림창

function chkBox_on_click(objInst)
{
	//this.screen.messagebox("수어는 발급기에서만 사용할 수 있습니다.", "수어안내", 1, 2);
}

// 1. 수어(bMedia)
function chkBox_on_itemchange(objInst, prev_value, curr_value, event_type)
{
	bMedia = this.chkBox.getcheck();
}

// 2. 음성(bAudio)
function chkBox_audio_on_itemchange(objInst, prev_value, curr_value, event_type)
{
	bAudio = this.chkBox_audio.getcheck();
}

//비디오 배속 설정
function btn_Speed_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	let radioNm = objInst.getname();	// rd_Speed05x, rd_Speed1x, rd_Speed15x
	switch(radioNm) {
		// 1.5배
		case "rd_Speed15x":
			this.VD_Sl.setplaybackrate(1.5);
			break;
		// 0.5배
		case "rd_Speed05x":
			this.VD_Sl.setplaybackrate(0.5);
			break;
		// 1.0배
		case "rd_Speed1x":
			this.VD_Sl.setplaybackrate(1);
			break;
	}
}

//비디오 일시정지 여부
function chk_Pause_on_click(objInst)
{
   let ps = this.chk_Pause.getcheck();

   if(ps == true){
      this.VD_Sl.pause();
   } else {
	  this.VD_Sl.play();
   }
}

function getParameter(param) {
    let url = unescape(location.href); // 현재 주소를 decoding
    let paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&"); // 파라미터만 자르고, 다시 &그분자를 잘라..
	let i,temp;
    for(i = 0 ; i < paramArr.length ; i++){
        temp = paramArr[i].split("="); // 파라미터 변수명과 값을 나눠줌

        if(temp[0].toUpperCase() == param.toUpperCase()){
            return temp[1]; // 변수명과 일치할 경우 데이터 삽입
        }
    }
}

function fn_modeChange()
{
	let pgmMode = this.getParameter("pgmMode");
	if(pgmMode == undefined) return ;
	let largeMenuId = pgmMode.substr(0,3);
	let middleMenuId = pgmMode.substr(3,2);
	switch(largeMenuId){
		case "101":
			this.PB_on_mouseup(this.PB_Circulation);
			break;
		case "102":
			this.PB_on_mouseup(this.PB_Order);
			break;
		case "103":
			this.PB_on_mouseup(this.PB_Ticket);
			break;
		case "104":
			this.PB_on_mouseup(this.PB_Information);
			break;
		default :
//			return;
			break;
	}
	
	// 패널에 생성된 순서대로 콤포넌트 Array를 얻는다.
	let arrInst = this.PN_MiddleMenu.getinstanceall(0);
	let nCount,instObj, middleMenuObj;
	for(nCount = 0;nCount < arrInst.length;nCount++) {
		instObj = arrInst[nCount];
		if(instObj == null) {
			continue;
		}
		if(instObj.getdescription() == middleMenuId){
			this.PB_Menu_on_mouseup(instObj);
			return;
		}
	}
}

function screen_on_keydown(keycode, bctrldown, bshiftdown, baltdown, bnumpadkey)
{
	
	return 0;
}

function PB_HighColor_on_mouseup(objInst)
{
	if(objInst.getcustomprop("mode") == "")
	{
		objInst.setcustomprop("mode","normal");
	}
	let mode = objInst.getcustomprop("mode");
	console.log("mode:"+mode);
	this.fn_setCssMode(mode);
	if(mode == "normal")
	{
		objInst.setcustomprop("mode","hc");
	} else if(mode == "hc") {
		objInst.setcustomprop("mode","normal");
	}
	
}

function fn_setCssMode(mode)
{
	switch(mode)
	{
		case "hc":
			this.screen.unloadcss("/xf5/css/kiosk_custom.css");
			this.screen.loadcss("/xf5/css/kiosk_custom_hc.css");
			break;
		case "normal":
			this.screen.unloadcss("/xf5/css/kiosk_custom_hc.css");
			this.screen.loadcss("/xf5/css/kiosk_custom.css");
			break;
		
	}
}

function TB_hcMode_on_change(objInst, bState)
{
	if(bState=="1"){
		SYSUtil.fn_setCssMode(this,"hc");
	} else {
		SYSUtil.fn_setCssMode(this,"normal");
	}
	
}

function RD_HC_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	if(bCurCheckState){
		this.TB_hcMode.setstate(true);
	} else {
		this.TB_hcMode.setstate(false);
	}
}

function RD_Normal_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	if(bCurCheckState){
		this.TB_hcMode.setstate(false);
	} else {
		this.TB_hcMode.setstate(true);
	}
}

function RD_LP_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	if(bCurCheckState){
		this.TB_hcMode.setstate(false);
	} else {
		this.TB_hcMode.setstate(true);
	}
}

function btn_data_on_mouseup(objInst)
{
	//xdataset 데이터를 json형식으로 변환코드
	let datasetArray = [];
	SYSUtil.datasetToJSON(this.datasetMenu,datasetArray);
	console.table(datasetArray);
}