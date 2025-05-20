// xFrame Engine 실행 환경 정보 및 xFrame Application에서 사용하는 전역 변수 설정
// 화면에서는 factory.gethtmlparam 함수를 통해서 값을 구할 수 있음
var _xf_param = {
	// Engine정보와 기본적인 실행관련 환경 정의
	LICENSE_KEY: [],
    APPNAME: 'kiosk',	
	APPID: 'kiosk',	
    ENGINEHTMLURL: './kiosk.html',
	MAINFRAMESCREEN: '',
	
	// 리소스 관련 기본 URL 
    SCREENBASEURL: './screen',
    IMAGEBASEURL: './image',							
    PICKLISTBASEURL: './picklist',					
    STYLEBASEURL: './style',					        
    COMMONXDATASETBASEURL: './common_xdataset',	
    COMMONMODULEBASEURL: './common_module',	
	
	// XDataSet 통신 및 XEXCEL 관련 URL 설정	
	XDATASET_BASEURL: 'http://127.0.0.1:8080/xframe5/',
    XEXCEL_UPLOAD_URL: 'http://127.0.0.1:8080/xframe5/XExcelUpload',
    XEXCEL_DOWNLOAD_URL: 'http://127.0.0.1:8080/xframe5/XExcelDownload',
	
	// 화면 로드 및 화면 제어 관련 이벤트 제어 관련 설정
    EVENTFIRE_BEFORE_SCREENONLOAD: false,
	EVENTFIRE_SYNC_SCREENONLOAD: true,
	EVENTFIRE_SYNC_PORTLETONLOAD: true,

	// 확장 실행 환경
    ENGINEURL: '../../xf5',	
	RUNMODE: 'DEBUG',
    USE_CACHE: true,
	CACHE_TYPE: 1,	
	XEXCEL_DOWNLOAD_AJAX: true,	
	
	// 그리드(GRID) 처리 관련 설정
	MULTIGRID_EXCEL_LOADORDER: 1,
	TREEGRID_DROPMENU_TYPE: 1,
    GRID_DBLCLICKEDIT: false,
	GRID_MOUSEWHEEL_ACTIVEALWAYS: false,
    GRID_EXCELDOWNLOAD_ITEMSTYLE: true,
    GRID_EXCELDOWNLOAD_FORECOLOR: true,
    GRID_EXCELDOWNLOAD_ITEMMERGE: true,
	GRID_EXCELDOWNLOAD_ITEMMERGE: true,
	GRID_COPY_DATA_TYPE: 2
};

/************************************************************************
 * 처음시작시에 초기 로드용 컴퍼넌트 라이브러리 성능을 및 최적화를 위해서 조정 필요
 * 비동기로 배열에 정의된 컴포넌트 라이브러리를 다운로드 하기 때문에 파일 크기가 큰 라이브러리 순서로 지정하는 것을 권고
 * 아래에 지정되지 않은 컴포넌트인 경우, 화면에서 최초로 사용될 때, 동적으로 로드함
 * 'XF_TAB', 'XF_GRID', 'XF_BUTTON', 'XF_CALENDAR', 'XF_CHECKBOX', 'XF_COMBOBOX', 'XF_DATE', 
 * 'XF_FIELD', 'XF_HANGUL', 'XF_IMAGE', 'XF_MULTILINE', 'XF_NUMBER', 'XF_PANEL', 
 * 'XF_RADIO', 'XF_TABLE', 'XF_TEXT'
 ************************************************************************/
var _xf_source_lib_name_arr = [ 
	'XF_TAB', 'XF_TEXT', 'XF_FIELD', 'XF_HANGUL', 'XF_BUTTON', 'XF_PANEL', 'XF_TABLEVIEW' 
];

/************************************************************************
 * 화면을 로드하기 이전에 호출되는 함수로 사이트별로 커스트마이징 대상임
 * @returns {boolean} 화면 로드 진행 여부
 * @private
 ************************************************************************/
function _xf_beforeloadscreen() {
	/************************************************************************
	 * 국제화 정보 오브젝트의 언어 값이 화면 개발 기준 언어와 다른 경우,
	 * xFrame5 엔진에서 메타 다국어 처리를 위한 리소스 경로(META_RESOURCE_URL)를 설정 하는 것에 대한 예시입니다.
	 * _xf_param.META_RESOURCE_URL 값이 공백 문자열인 경우,
	 * 엔진에서 리소스를 로딩하여 화면 자동 변환 작업을 하지 않습니다.
	 ************************************************************************/
	/*
	if (_xf_param['META_RESOURCE_URL' + '_' + _xf_param.USER_LANGUAGE]) {
		_xf_param.META_RESOURCE_URL = _xf_param['META_RESOURCE_URL' + '_' + _xf_param.USER_LANGUAGE];
	}
	*/
	
	/************************************************************************
	 * 국제화 정보 오브젝트의 언어 값이 화면 개발 기준 언어와 다른 경우,
	 * 코드 파일이 언어별로 디렉토리를 구분하여 생성되어 있는 경우
	 * 코드 파일을 로딩하기 위한 기본 URL 정보 변경 처리를 수행하는 것에 대한 예시입니다.
	 ************************************************************************/
	/*
	if (_xf_param['PICKLISTBASEURL' + '_' + _xf_param.USER_LANGUAGE]) {
		_xf_param.PICKLISTBASEURL = _xf_param['PICKLISTBASEURL' + '_' + _xf_param.USER_LANGUAGE];
	}
	*/
}

/************************************************************************
 * 화면 DOM을 생성하기 이전에 호출되는 함수로 사이트별로 커스트마이징 대상임
 * @param xf_prop 화면 생성 속성 오브젝트
 * @private
 ************************************************************************/
function _xf_beforecreatescreen(xf_prop) {
    return;
}

/************************************************************************
 * 문서가 로딩 완료 이벤트 처리
 ************************************************************************/
$(document).ready(function() {
    var screen_load_info, screen_url;
    var _xf_menu_btn = $('#_xf_menu_btn');
    var _xf_loader_box = $('#_xf_loader_box');
    var _xf_console_btn = $('#_xf_console_btn');
    var _xf_load_btn = $('#_xf_load_btn');
    var _xf_screen_url = $('#_xf_screen_url');
    var _xf_screen_url_select = $('#_xf_screen_url_select');
    var _xf_language_select = $('#_xf_language_select');
    var _xf_country_select = $('#_xf_country_select');

    // alert('document ready');

    ////////////////////////////////////////////////////////////////////////////////////
    // index.html 이벤트 처리부
    ////////////////////////////////////////////////////////////////////////////////////

    // 메뉴 버튼 클릭 이벤트 처리
    _xf_menu_btn.on('click', function(event) {
        if(_xf_menu_btn.text() == '>') {
            _xf_menu_btn.text('<');
            _xf_loader_box.animate({width: '100%'}, 200);
            _xf_loader_box.css({ borderRight: '0px none' });
        }
        else {
            _xf_menu_btn.text('>');
            _xf_loader_box.animate({width: '40px'}, 200);
            _xf_loader_box.css({ borderRight: '1px dotted darkgray' });
        }
    });

    // 콘솔 표시 버튼 클릭 이벤트 처리
    _xf_console_btn.on('click', function(event) {
        if(window['factory'] !== undefined) {
            window['factory'].showconsoletrace(true);
        }
    });

    // 화면 로드 버튼 클릭 이벤트 처리
    _xf_load_btn.on('click', function(event) {
        // 화면 URL INPUT에서 화면 URL(예:'/SYS/WinMain')에 해당하는 값을 읽어옴
        // 화면 URL INPUT에 값이 없는 경우, 화면 URL SELECT에서 선택된 값을 사용
        screen_url = _xf_screen_url.val();
        if(screen_url.length == 0) {
            screen_url = _xf_screen_url_select.val();
        }

        // 화면 URL 길이 검증
        if(screen_url.length == 0) {
            alert('screen url length is 0');
            _xf_screen_url.focus();
            return;
        }

        _xf_param.USER_LANGUAGE = _xf_language_select.val();
        _xf_param.USER_COUNTRY = _xf_country_select.val();

        _xf_param.SHOW_CONSOLETRACE = screen_load_info.console;          // 콘솔 미리보기 옵션 체크여부
        _xf_param.CONSOLETRACE_SHOWEVENT = screen_load_info.event;       // 콘솔창 이벤트 표시 여부
        _xf_param.CONSOLETRACE_SHOWEVENTPARAM = screen_load_info.param;  // 콘솔창 파라미터 표시 여부

        _xf_beforeloadscreen();

        _xfl_loadscreen(screen_url, screen_load_info.prototype_mode);
    });

    ////////////////////////////////////////////////////////////////////////////////////
    // index.html 이벤트 처리부 끝
    ////////////////////////////////////////////////////////////////////////////////////

    // xf_lib, xf_lib_grid, xf_lib_ext 오브젝트 Prototype 확장
    _xfl_initlib();

    // URL Search 정보를 이용해서 로딩할 화면 정보 오브젝트를 구함
    screen_load_info = _xfl_getscreenloadinfo();

    // URL Search 정보를 기준으로 언어 SELECT 값 설정
    _xf_language_select.val(screen_load_info.language);
    _xf_country_select.val(screen_load_info.country);

    // 화면 경로가 있는 경우, 화면 경로 INPUT에 값을 설정하고,
    // 화면 로그 박스를 숨기고, 화면 로드 버튼 클릭 이벤트 트리거하여 화면 로드 작업 수행
    if(screen_load_info.screen_url.length > 0) {
        _xf_screen_url.val(screen_load_info.screen_url);
        _xf_loader_box.hide();
        _xf_load_btn.trigger('click');
    }
    else {
        _xf_loader_box.show();
    }
	
    _xfl_sethtmlready(true);	
});