function screen_on_load()
{
	let container = this.div.getdom();
	const stage = new Konva.Stage({
	  container: container,
	  width: 1000,
	  height: 500
	});
// Layer 생성
const layer = new Konva.Layer();
stage.add(layer);

// 좌석 데이터 설정
const seats = [
  ['7A', '8A', '9A', '10A', '11A', '12A', '13A', '12D', '11D', '10D', '9D', '8D', '7D'],
  ['7B', '8B', '9B', '10B', '11B', '12B', '13B', '12C', '11C', '10C', '9C', '8C', '7C']
];

// 좌석 크기와 간격 설정
const seatWidth = 60;
const seatHeight = 50;
const rowGap = 20;
const colGap = 15;

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

      // D자 형태의 좌석 만들기
      const rect = new Konva.Rect({
        width: seatWidth - 20,
        height: seatHeight,
        fill: '#ccc',
        stroke: '#333',
        strokeWidth: 2,
        cornerRadius: [0, 30, 30, 0] // 오른쪽만 둥글게 설정
      });

      const semiCircle = new Konva.Arc({
        x: seatWidth - 20,
        y: seatHeight / 2,
        innerRadius: seatHeight / 2,
        outerRadius: seatHeight / 2,
        angle: 180,
        fill: '#ccc',
        stroke: '#333',
        strokeWidth: 2,
        rotationDeg: -90
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
      group.add(semiCircle);
      group.add(text);
      layer.add(group);

      // 클릭 이벤트 추가
      group.on('click', () => {
        const isSelected = rect.fill() === '#00f';
        rect.fill(isSelected ? '#ccc' : '#00f');
        semiCircle.fill(isSelected ? '#ccc' : '#00f');
        layer.draw();
      });
    });
  });
}

// 좌석 그리기
drawSeats(50, 50, seats);

// Layer 그리기
layer.draw();
}