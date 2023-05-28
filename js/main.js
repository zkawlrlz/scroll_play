/*
  동적으로 DOM생성
  부모요소.innerHTML= "집어넣을 태그를 문자열";
  --> 기존 부모안쪽의 자식요소를 모두 제거하고 새로 생성

  부모요소.affend(DOM node);
  --> 인수로 생성할 태그의 문자열이 아닌 노드를 생성해서 삽입

  새로운 DOM노드 생성방법
  document.createElement('dom이름')
*/

const main = document.querySelector('main');
const loading = document.querySelector('aside');
const logo = document.querySelector('p img');

// 이미지 DOM 생성 , main 태그에 추가
for(let i=0; i<200; i++){
  const imgNode = document.createElement('img');
  imgNode.setAttribute('src', `img/pic${i}.jpg`);
  main.append(imgNode);
}

imageLoaded();

// 마우스 X축 스크롤 이벤트
window.addEventListener('mousemove', e=>{
  let x = e.pageX; //현재 X축 커서 위치값
  let y = e.pageY; //현재 Y축 커서 위치값
  let cx = -x/10; // X축 값을 10으로 나누기, 음수사용으로 좌우반전
  let cy = -y/10;// Y축 값을 10으로 나누기, 음수사용으로 상하반전

  
  logo.style.transform = `translate(${cx}px, ${cy}px)`;

  let wid = window.innerWidth; //브라우저의 가로폭값
  let percent = parseInt((x/wid)*200); //브라우저의 가로폭을 200분율로 변경
  const imgs = document.querySelectorAll('main img'); //다시 이미지 불러오기

  for(let img of imgs) img.style.display = 'none';//200개의 이미지 안보이게 처리
  imgs[percent].style.display = 'block'; //현재 커서위치값 

  
})

// 로드이벤트 추가
function imageLoaded(){
  const imgs = document.querySelectorAll('img');
  const len = imgs.length;
  let total = 0;
  let percent = 0;

// 로드이벤트 갯수, 백분율 추가
imgs.forEach(img=>{
  img.addEventListener('load',()=>{
    total++
    percent = parseInt((total/len)*100);
    loading.innerText = `${total} / ${len} (${percent}%)`;

    // aside 사라지는 효과
    if(total === len){
      main.classList.add('on');
      loading.classList.add('off');

      setTimeout(()=>{
        loading.remove();
      },convertSpeed(loading))
    }
  })
})

}

// aside transition 속도값 변경값 함수
function convertSpeed(el){
  let speed = getComputedStyle(el).transitionDuration;
  speed = parseFloat(speed)*1000;
  return speed;
}


