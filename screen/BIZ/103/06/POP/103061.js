function screen_on_load()
{
	
}    
function btn_clo_on_mouseup(objInst)
{
	this.screen.unloadpopup();	
}

function btn_1_on_click(objInst)
{
	this.screen.loadportletpopup("결제방법선택", "/BIZ/103/06/POP/103062", "요금",true,XFD_BORDER_NONE, 90, 252,0,0, false,true,false);
}