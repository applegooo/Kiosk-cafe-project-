let bEvent_lock = false;

function screen_on_load()
{
	
}

function HE_1_on_change(objInst)
{
	if(!bEvent_lock)
	{
		bEvent_lock = true;
		
		let txt = this.HE_1.gettext(); // 현재 입력된 텍스트
		let ele = this.HE_1.getdom(); // DOM 요소 가져오기
		
		// ele 변수에서 iframe의 내용을 탐색
		let iframe = ele.querySelector("iframe"); // iframe 요소 가져오기
		
		if (iframe && iframe.contentDocument) {
			let body = iframe.contentDocument.body; // iframe 내부의 body 요소 가져오기
			
			// 커서 위치 저장
			const selection = iframe.contentWindow.getSelection();
			const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			
			// 기존 텍스트 가져오기 및 숫자만 필터링
			let phoneText = body.textContent.replace(/[^0-9]/g, ""); // 숫자만 유지
			const maxLength = 11; // 최대 길이: 11자리 (010-9999-9999)
			
			// 최대 길이 초과 방지
			if(phoneText.length > maxLength) {
				phoneText = phoneText.slice(0, maxLength);
			}
			
			// 실시간 마스킹 처리
			let maskedPhone = phoneText.replace(
				/^(\d{3})(\d{0,4})?(\d{0,4})?$/,
				(match, p1, p2, p3) => {
					let result = p1;
					if (p2) result += `-${p2}`;
					if (p3) result += `-${p3}`;
					
					return result;
				}
			);
			
			// 마지막 입력된 문자에 스타일 적용
			let lastChar = maskedPhone.slice(-1);
			let plainText = maskedPhone.slice(0, -1);
			
			// body 업데이트
			body.innerHTML = `${plainText}<span style="color: #1674D2;">${lastChar}</span>`;
			
			// 커서 위치를 맨 우측으로 복원
			if (range) {
				const newRange = document.createRange();
				newRange.selectNodeContents(body); // body의 모든 내용을 범위로 지정
				newRange.collapse(false); // 범위를 맨 끝으로 이동
				selection.removeAllRanges(); // 기존 범위 제거
				selection.addRange(newRange); // 새로운 범위 설정
			}
			
			setTimeout(function () {
				bEvent_lock = false;
			}, 10);
			
//			console.log("Updated content:", body.innerHTML);
		}
		else {
			console.error("Iframe or its content could not be accessed.");
		}
	}
}