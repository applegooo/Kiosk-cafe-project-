function screen_on_load()
{
	this.TB_Start.addportlettab("BizMain",1,60,"/SYS/BizMain","BizMain");
	//kmj 커밋
}

function TB_Start_on_itemcreate(objInst, itemindex)
{
	let addTabNm = this.TB_Start.gettabitemportletname(itemindex);
	switch(addTabNm){
		case "MainSample":
		
			break;
	}
}