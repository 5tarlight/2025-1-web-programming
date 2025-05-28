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
      {
        sender: "user1",
        content: "안녕하세요!",
        timestamp: "2025-05-03T09:12:00Z",
      },
      {
        sender: "user2",
        content: "안녕하세요! 반갑습니다.",
        timestamp: "2025-05-03T09:45:00Z",
      },
      {
        sender: "user3",
        content: "안녕하세요! 모두 잘 지내시나요?",
        timestamp: "2025-05-04T10:30:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "웹 프로그래밍",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "웹 프로그래밍"],
    members: ["user1", "user2"],
    messages: [
      {
        sender: "user1",
        content: "웹 프로그래밍 수업 어떻게 생각하세요?",
        timestamp: "2025-05-05T14:20:00Z",
      },
      {
        sender: "user2",
        content: "재밌어요! 실습이 많아서 좋아요.",
        timestamp: "2025-05-05T14:55:00Z",
      },
    ],
  },
  {
    id: 3,
    name: "인공지능 수학",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "인공지능 수학"],
    members: ["user1", "user2", "user3", "user4"],
    messages: [
      {
        sender: "user1",
        content: "인공지능 수학 과제 언제까지 제출이죠?",
        timestamp: "2025-05-06T08:15:00Z",
      },
      {
        sender: "user2",
        content: "다음 주 월요일까지요.",
        timestamp: "2025-05-06T08:45:00Z",
      },
      {
        sender: "user3",
        content: "저는 아직 시작도 못했어요.",
        timestamp: "2025-05-07T09:00:00Z",
      },
      {
        sender: "user4",
        content: "같이 스터디 할까요?",
        timestamp: "2025-05-07T09:30:00Z",
      },
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
      {
        sender: "user1",
        content: "프론트엔드 프로젝트 진행 상황은 어때요?",
        timestamp: "2025-05-08T11:10:00Z",
      },
      {
        sender: "user2",
        content: "저는 거의 다 끝났어요.",
        timestamp: "2025-05-08T11:40:00Z",
      },
      {
        sender: "user3",
        content: "저도 거의 완료했어요.",
        timestamp: "2025-05-08T12:05:00Z",
      },
      {
        sender: "user4",
        content: "저는 아직 시작도 못했어요.",
        timestamp: "2025-05-09T13:20:00Z",
      },
    ],
  },
];

const lastSeenMsg = {};

let currentChatId = 1;

function renderChatRoomPreview(chat) {
  const chatElement = document.createElement("div");
  chatElement.className =
    "chat" + (chat.id === currentChatId ? " chat-active" : "");
  const avatar = chat.avatar
    ? `<img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">`
    : `<div class="chat-text-avatar">${chat.name.charAt(0)}</div>`;

  if (!lastSeenMsg[chat.id]) {
    lastSeenMsg[chat.id] = 0;
  }

  chatElement.innerHTML = `
    ${avatar}
    <div class="chat-detail">
      <div class="chat-header">
        <div class="chat-title-container">
          <span class="chat-title">${chat.name}</span>
          ${
            chat.messages.length > lastSeenMsg[chat.id]
              ? `<span class="unread-count">${
                  chat.messages.length - lastSeenMsg[chat.id]
                }</span>`
              : ""
          }
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
  chatListContainer.innerHTML = "";

  chats.forEach((chat) => {
    const chatElement = renderChatRoomPreview(chat);
    chatListContainer.appendChild(chatElement);
  });
}

function changeChat(chatId) {
  currentChatId = chatId;
  markRead(chatId);
  renderChatList();
}

function markRead(chatId) {
  lastSeenMsg[chatId] = chats.find(
    (chat) => chat.id === chatId
  ).messages.length;
}

afterLoad(() => {
  markRead(currentChatId);
  renderChatList();
});
