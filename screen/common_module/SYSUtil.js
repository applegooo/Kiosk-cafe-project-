function fn_debug(oThis, debugMsg, obj)
{
	// 'scrNm' 변수에 현재 화면 ID를 저장 (oThis 객체의 screen 속성에서 가져옴)
	let scrNm = oThis.screen.getscreenid();
	
	// 'date' 변수에 현재 시스템 시간을 지정된 포맷으로 저장 ("%Y%M%D-%h:%m:%s %ms" 형식)
	let date = factory.getsystemtime("%Y%M%D-%h:%m:%s %ms");
	
	// 콘솔에 [화면 ID][현재 시간] 메시지와 함께 디버그 메시지와 객체 정보 출력
	console.log("["+scrNm+"]["+date+"]" + debugMsg, obj);
	
	// factory 객체를 통해 [화면 ID][현재 시간] 메시지와 함께 디버그 메시지를 출력
	factory.consoleprint("["+scrNm+"]["+date+"]" + debugMsg);
}

function fn_setCssMode(oThis,mode)
{
	let oScr = oThis.screen;
	switch(mode)
	{
		case "hc":
			oScr.unloadcss("/xf5/css/kiosk_custom.css");
			oScr.loadcss("/xf5/css/kiosk_custom_hc.css");
			break;
		case "normal":
			oScr.unloadcss("/xf5/css/kiosk_custom_hc.css");
			oScr.loadcss("/xf5/css/kiosk_custom.css");
			break;
		
	}
}

// bLP(boolean) = true/false;
 function fn_getBizScreen(oThis, index, bLP)
{
	let oMainScr, oBizMain, oTab, oBizScr;

	// 1. 메인화면 인스턴스를 구하기
	// factory 객체를 사용하여 현재 메인 화면 인스턴스를 가져옴 (예: '화면 StartMain' 또는 '화면 BizMain')
	oMainScr = factory.getmainscrinstance(); 
	console.log("1. 메인화면 인스턴스:", oMainScr);  // 메인화면 인스턴스 로그 출력

	// 2. BizMain 화면 인스턴스를 구하기
	// 현재 화면 ID에 따라 "StartMain"이면 TB_Start의 첫 번째 자식 화면을, 아니면 oMainScr을 반환
	oBizMain = (oMainScr.getscreenid() == "StartMain") ? oMainScr.getmembers().TB_Start.getchildscreeninstance(0) : oMainScr;
	console.log("2. BizMain 화면 인스턴스:", oBizMain);  // BizMain 화면 인스턴스 로그 출력
	
	let strTBname;
	// 3. bLP 값에 따라 탭 이름을 결정
	if (bLP) {
		strTBname = "TB_template_LP" + index;  // bLP가 true이면 "TB_template_LP"와 인덱스를 결합한 이름
	} else {
		strTBname = "TB_template" + index;  // bLP가 false이면 "TB_template"과 인덱스를 결합한 이름
	}
	
	// 4. 업무 화면이 위치할 부모 탭을 구하기
	// oBizMain 화면에서 strTBname에 해당하는 이름의 탭 인스턴스를 가져옴
	oTab = oBizMain.getinstancebyname(strTBname);   
	
	console.log(oTab.getname());  // 탭 이름 로그 출력
	
	// 4-1. 해당 인덱스의 탭을 찾지 못했을 경우
	if (oTab == null) {
    	return -1;   // 탭을 찾지 못하면 -1을 반환
	}

	// 4-2. 탭을 찾았을 경우
	else {
    	// 탭에서 첫 번째 자식 화면 인스턴스를 가져옴
    	oBizScr = oTab.getchildscreeninstance(0);   
    	return oBizScr;   // 구한 업무 화면 인스턴스를 반환
	}
}

function fn_logBizList(oThis)
{
   let oMainScr, oBizMain, oSld;  // 메인 화면, BizMain 화면, 슬라이드뷰 인스턴스를 담을 변수 선언
   let arrBizList = [];           // 업무 화면 정보를 담을 배열 선언
   
   // 1. 메인화면 구하기 (예: '화면 StartMain' 또는 '화면 BizMain' 구하기)
   oMainScr = factory.getmainscrinstance();  // 현재 메인 화면 인스턴스를 가져옴
   
   // 2. 화면 BizMain 구하기
   // 메인 화면의 ID가 "StartMain"이면 "TB_Start" 탭의 첫 번째 자식 화면을, 아니면 BizMain 화면을 가져옴
   oBizMain = (oMainScr.getscreenid() == "StartMain") ? oMainScr.getmembers().TB_Start.getchildscreeninstance(0) : oMainScr;
   
   // 3. 슬라이드뷰 구하기
   // BizMain 화면에서 이름이 "SV_Template"인 인스턴스를 가져옴
   oSld = oBizMain.getinstancebyname("SV_Template");
   
   // 4. 각각의 업무화면 정보 배열에 담기
   // 슬라이드뷰 내의 모든 아이템에 대해 반복하여 업무 화면 정보를 배열에 추가
   for (let i = 0; i < oSld.getitemcount(); i++) {
      // 각 업무 화면의 정보를 객체로 만들어 배열에 푸시
      let obj = {
          "screenID": this.fn_getBizScreen(oThis, i).getscreenid(),  // 해당 인덱스의 업무 화면 ID 가져오기
          "function": "SYSUtil.fn_getBizScreen(this, " + i + ");",     // 해당 업무 화면을 구하는 함수 문자열
          "oScreen": this.fn_getBizScreen(oThis, i)                    // 해당 업무 화면 인스턴스를 가져오기
      };
      
      arrBizList.push(obj);  // 객체를 arrBizList 배열에 추가
   }
   
   // 5. 콘솔에 결과 출력
   // 업무 화면 목록을 표 형태로 콘솔에 출력
   console.table(arrBizList);
}


// 휴대전화번호 입력시 오류메세지창 출력
function fn_PhoneNumber(phoneNumber, context) {
    const phoneNumberPattern = /^[0-9]{10,11}$/; // 10자리 또는 11자리 숫자만 허용

    if (!phoneNumberPattern.test(phoneNumber)) {
        // 입력 오류 메시지 표시
        context.screen.messagebox("올바른 전화번호 형식이 아닙니다.","전화번호 입력 오류", XFD_MB_ERROR, XFD_MB_OK, XFD_MB_FOCUSBUTTON1);
        return false; // 유효하지 않음
    }

    return true; // 유효함
}
	
/**
오브젝트 속성 : X
오브젝트명 : datasetToJSON
이벤트명 : X
설명 : xdataset 데이터를 json형식으로 변환한다.

   Param01 : ADataset(xdataset 데이터)
   Param02 : AJSON(json 데이터)
   Param03 : ASelRow(선택한 Row)
   return  : AJSON(만들어진 Row를 JSON형태로 반환)
화면ID : X
거래코드 : X
*/
function datasetToJSON(ADataset, AJSON, ASelRow)
{
   if (AJSON == undefined) {
      AJSON = [];
   }
   var iCol;
   if (ASelRow == -1 || ASelRow == undefined) {
      // 전체적으로 만든다.
      for (var iRow = 0;iRow < ADataset.getrowcount();iRow++) {
         var AJSONOneRow = [];
         for (iCol = 0;iCol < ADataset.getcolumncount();iCol++) {
            AJSONOneRow[ADataset.getcolumnid(iCol)] = ADataset.getdata(iRow, iCol);
         }
         AJSON.push(AJSONOneRow);
      }
   }else if(typeof(ASelRow) == "object" && ASelRow.length != undefined) {
      // 다건 선택
      for (var i = 0; i < ASelRow.length; i++) {
         var AJSONOneRow = [];
         for (iCol = 0;iCol < ADataset.getcolumncount();iCol++) {
            AJSONOneRow[ADataset.getcolumnid(iCol)] = ADataset.getdata(ASelRow[i], iCol);
         }
         AJSON.push(AJSONOneRow);
      }
   } else {
      //단건만 처리한다.
      for (iCol = 0;iCol < ADataset.getcolumncount();iCol++) {
         AJSON[ADataset.getcolumnid(iCol)] = ADataset.getdata(ASelRow, iCol);
      }
   }
   return AJSON;
}

/**
오브젝트 속성 : x
오브젝트명 : x
이벤트명 : fn_showDataset
설명 : 데이터셋 정보를 브라우저 Console에 로그
화면ID : 
거래코드 : 
*/
function fn_showDataset(oDataset)
{
   let jsonData = this.fn_datasetToJson(oDataset);
   console.table(jsonData);
}

/**
오브젝트 속성 : X
오브젝트명 : fn_datasetToJson
이벤트명 : X
설명 : dataset을 json으로리턴한다.

   Param01 : oDataSet(xdataset 데이터)
   
   return arrRnt(json 데이터)
화면ID : X
거래코드 : X
*/
function fn_datasetToJson(oDataSet) {
   var arrRnt = [];
   for (var i = 0;i < oDataSet.getrowcount();i++) {
      var objColumnData = {};
      for (var j = 0;j < oDataSet.getcolumncount();j++) {
         objColumnData[oDataSet.getcolumnid(j)] = oDataSet.getdata(i, j);
      }
      arrRnt.push(objColumnData);
   }
   return arrRnt;
}