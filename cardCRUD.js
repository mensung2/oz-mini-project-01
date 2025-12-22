const cardContainer = document.getElementById("cardContainer");
const cardTitle = document.getElementById("cardTitle");
const cardText = document.getElementById("cardText");
const cardImg = document.getElementById("cardImg");

// localStorage에서 카드 데이터 불러오기
let cards = JSON.parse(localStorage.getItem("cards")) || [];

// ID 카운터 초기화
let cardIdCounter =
  cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;

function saveToLocalStorage() {
  localStorage.setItem("cards", JSON.stringify(cards));
}

function addCard() {
  // 1. 입력값 수집
  const title = cardTitle.value;
  const text = cardText.value;
  const img = cardImg.value;

  // 2. 유효성 검사
  if (title === "" || text === "") {
    alert("제목과 내용은 필수입니다.");
    return;
  }

  // 3. 카드 객체 생성
  const newCard = {
    id: cardIdCounter,
    title: title,
    text: text,
    img: img,
  };

  // 4. 배열에 추가
  cards.push(newCard);

  // 5. ID 증가
  cardIdCounter++;

  // 6. localStorage 저장
  saveToLocalStorage();

  // 7. 입력창 초기화
  cardTitle.value = "";
  cardText.value = "";
  cardImg.value = "";

  // 8. 화면 갱신
  listCard();
}

function listCard() {
  // 1. 기존 목록 초기화
  cardContainer.innerHTML = "";

  // 2. 카드 배열 순회
  cards.forEach(function (card) {
    // 3. li 생성
    const li = document.createElement("li");
    li.className = "card-item";

    // 4. 카드 내용 구성
    li.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.text}</p>
      ${card.img ? `<img src="${card.img}" alt="">` : ""}
      <button onclick="editCard(${card.id})">수정</button>
      <button onclick="deleteCard(${card.id})">삭제</button>
    `;

    // 5. ul에 추가
    cardContainer.appendChild(li);
  });
}

function editCard(id) {
  // 1. 수정 대상 찾기
  const card = cards.find((card) => card.id === id);

  if (!card) {
    alert("카드를 찾을 수 없습니다.");
    return;
  }

  // 2. 기존 데이터 input에 세팅
  cardTitle.value = card.title;
  cardText.value = card.text;
  cardImg.value = card.img;

  // 3. 기존 카드 삭제
  deleteCard(id);
}

function deleteCard(id) {
  // 1. 삭제 대상 제외
  cards = cards.filter((card) => card.id !== id);

  // 2. localStorage 반영
  saveToLocalStorage();

  // 3. 화면 갱신
  listCard();
}

listCard();
