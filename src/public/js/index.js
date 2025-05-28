/**
 * 채팅방 리스트
 */
const chats = [
  {
    id: 1,
    name: "AI응용학과",
    type: "department",
    hierarchy: ["창의융합대학", "AI응용학과"],
    members: ["user1", "user2", "user3"],
    messages: [
      { sender: "user1", content: "안녕하세요!" },
      { sender: "user2", content: "안녕하세요! 반갑습니다." },
      { sender: "user3", content: "안녕하세요! 모두 잘 지내시나요?" },
    ],
  },
  {
    id: 2,
    name: "웹 프로그래밍",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "웹 프로그래밍"],
    members: ["user1", "user2"],
    messages: [
      { sender: "user1", content: "웹 프로그래밍 수업 어떻게 생각하세요?" },
      { sender: "user2", content: "재밌어요! 실습이 많아서 좋아요." },
    ],
  },
  {
    id: 3,
    name: "인공지능 수학",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "인공지능 수학"],
    members: ["user1", "user2", "user3", "user4"],
    messages: [
      { sender: "user1", content: "인공지능 수학 과제 언제까지 제출이죠?" },
      { sender: "user2", content: "다음 주 월요일까지요." },
      { sender: "user3", content: "저는 아직 시작도 못했어요." },
      { sender: "user4", content: "같이 스터디 할까요?" },
    ],
  },
  {
    id: 4,
    name: "프론트엔드 팀",
    type: "team",
    hierarchy: ["창의융합대학", "AI응용학과", "웹 프로그래밍", "프론트엔드 팀"],
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    members: ["user1", "user2", "user3", "user4"],
    messages: [
      { sender: "user1", content: "프론트엔드 프로젝트 진행 상황은 어때요?" },
      { sender: "user2", content: "저는 거의 다 끝났어요." },
      { sender: "user3", content: "저도 거의 완료했어요." },
      { sender: "user4", content: "저는 아직 시작도 못했어요." },
    ],
  },
];

let currentChatId = 1;

function renderChatRoomPreview(chat) {
  const chatElement = document.createElement("div");
  chatElement.className =
    "chat" + (chat.id === currentChatId ? " chat-active" : "");
  const avatar = chat.avatar
    ? `<img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">`
    : `<div class="chat-text-avatar">${chat.name.charAt(0)}</div>`;

  chatElement.innerHTML = `
    ${avatar}
    <div class="chat-detail">
      <div class="chat-header">
        <div class="chat-title-container">
          <span class="chat-title">${chat.name}</span>
          <span class="unread-count">${chat.messages.length}</span>
        </div>
        <span class="chat-time">7일 전</span>
      </div>
      <span class="chat-depart">
        ${chat.hierarchy.slice(-3).join(" > ")}
      </span>
      <span class="chat-preview">
        ${
          chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1].content
            : ""
        }
      </span>
    </div>
  `;

  if (chat.id !== currentChatId) {
    chatElement.addEventListener("click", () => changeChat(chat.id));
  }

  return chatElement;
}

function renderChatList() {
  const chatListContainer = document.querySelector(".chat-list");
  chatListContainer.innerHTML = ""; // Clear existing content

  chats.forEach((chat) => {
    const chatElement = renderChatRoomPreview(chat);
    chatListContainer.appendChild(chatElement);
  });
}

function changeChat(chatId) {
  currentChatId = chatId;
  renderChatList();
}

afterLoad(() => {
  renderChatList();
});
