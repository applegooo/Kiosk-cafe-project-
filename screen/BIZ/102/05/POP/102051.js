function btn_next_on_mouseup(objInst)
{
	this.screen.loadportletpopup("메뉴", "/BIZ/102/05/POP/10205102", "메뉴선택",true,XFD_BORDER_NONE, 90, 252,0,0, false,true,false);
}

function btn_close_on_click(objInst)
{
	this.screen.unloadpopup();
}