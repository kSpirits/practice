window.onload = function () { buildCalendar(); };    // 웹 페이지가 로드되면 buildCalendar 실행

var nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
var today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

var datevar = '';
var str = datevar.replaceAll(/&#034;/g, '');

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

  var firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
  var lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

  var tbody_Calendar = document.querySelector(".schedule > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
  document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

  while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  var nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가    

  for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
    var nowColumn = nowRow.insertCell();        // 열 추가
  }

  for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

    var nowColumn = nowRow.insertCell();        // 새 열을 추가하고
    nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력

    if (str.indexOf(leftPad(nowDay.getDate())) > 0) {
      nowColumn.style.cssText = "background:url(/site/www_2019/images/main/main_schedule_circle3.png) no-repeat center;";
      nowColumn.setAttribute('class', 'on');
      //nowColumn.setAttribute('aria-label', '전시행사일정있음');
    }
    if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
      nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
    }

    if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
      nowColumn.style.cssText = "background:url(/site/www_2019/images/main/main_schedule_circle2.png) no-repeat center;";
      nowColumn.setAttribute('class', 'on2');
      //nowColumn.setAttribute('aria-label', '오늘, 전시행사일정있음');
    }
  }
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}