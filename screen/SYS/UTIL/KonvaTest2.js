stage = "";
function screen_on_load()
{
	let container = this.div.getdom();
	stage = new Konva.Stage({
	  container: container,
	  width: 1000,
	  height: 500
	});
	// 레이어 생성
	const layer = new Konva.Layer();
	stage.add(layer);
	
	// 좌석 데이터
	const seats = [
	  ['7A', '8A', '9A', '10A', '11A', '12A', '13A'],
	  ['7B', '8B', '9B', '10B', '11B', '12B', '13B']
	];
	
	// 좌석 크기와 간격 설정
	const seatWidth = 50;
	const seatHeight = 40;
	const rowGap = 20;
	const colGap = 50;
	
	// 좌석 그리기 함수
	function drawSeats(startX, startY, seats) {
	  seats.forEach((row, rowIndex) => {
	    row.forEach((seat, colIndex) => {
	      const x = startX + colIndex * (seatWidth + colGap);
	      const y = startY + rowIndex * (seatHeight + rowGap);
	
	      const group = new Konva.Group({
	        x: x,
	        y: y,
	        draggable: false
	      });
	
	      // 텍스트용 메인 사각형 생성
	      const rect = new Konva.Rect({
	        width: seatWidth - 20,
	        height: seatHeight,
	        fill: '#fff',
	        stroke: '#333',
	        strokeWidth: 2
	      });
	
	      // 오른쪽에 D자 모양 덮개 생성
	      const arc = new Konva.Shape({
	        sceneFunc: function (context, shape) {
	          context.beginPath();
	          context.moveTo(seatWidth - 20, -5);
	          context.lineTo(seatWidth - 20, seatHeight + 5);
	          context.arc(seatWidth - 20, seatHeight / 2, seatHeight / 2 + 5, Math.PI / 2, -Math.PI / 2, true);
	          context.closePath();
	          context.fillStrokeShape(shape);
	        },
	        fill: '#fff',
	        stroke: '#333',
	        strokeWidth: 2
	      });
	
	      const text = new Konva.Text({
	        text: seat,
	        fontSize: 16,
	        align: 'center',
	        verticalAlign: 'middle',
	        width: rect.width(),
	        height: rect.height()
	      });
	
	      group.add(rect);
	      group.add(arc);
	      group.add(text);
	      layer.add(group);
	
	      // 클릭 이벤트 추가
	      group.on('click', () => {
	        const isSelected = rect.fill() === '#00f';
	        rect.fill(isSelected ? '#fff' : '#00f');
	        arc.fill(isSelected ? '#fff' : '#00f');
	        layer.draw();
	      });
	    });
	  });
	}
	
	// 좌석 그리기
	drawSeats(50, 50, seats);
	
	// 레이어 그리기
	layer.draw();
}

function PB_plus_on_mouseup(objInst)
{
	const scaleBy = 1.1;
	const oldScale = stage.scaleX();	
	stage.scale({ x: oldScale * scaleBy, y: oldScale * scaleBy });
	stage.batchDraw();
}

function PB_minus_on_mouseup(objInst)
{
	const scaleBy = 1.1;
	const oldScale = stage.scaleX();	
	stage.scale({ x: oldScale / scaleBy, y: oldScale / scaleBy });
	stage.batchDraw();
}