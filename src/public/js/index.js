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
        timestamp: "2025-05-24T18:12:00+09:00",
      },
      {
        sender: "user2",
        content: "안녕하세요! 반갑습니다.",
        timestamp: "2025-05-24T18:45:00+09:00",
      },
      {
        sender: "user3",
        content: "안녕하세요! 모두 잘 지내시나요?",
        timestamp: "2025-05-25T19:30:00+09:00",
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
        timestamp: "2025-05-25T23:20:00+09:00",
      },
      {
        sender: "user2",
        content: "재밌어요! 실습이 많아서 좋아요.",
        timestamp: "2025-05-25T23:55:00+09:00",
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
        timestamp: "2025-05-26T17:15:00+09:00",
      },
      {
        sender: "user2",
        content: "다음 주 월요일까지요.",
        timestamp: "2025-05-26T17:45:00+09:00",
      },
      {
        sender: "user3",
        content: "저는 아직 시작도 못했어요.",
        timestamp: "2025-05-27T18:00:00+09:00",
      },
      {
        sender: "user4",
        content: "같이 스터디 할까요?",
        timestamp: "2025-05-27T18:30:00+09:00",
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
        timestamp: "2025-05-27T20:10:00+09:00",
      },
      {
        sender: "user2",
        content: "저는 거의 다 끝났어요.",
        timestamp: "2025-05-27T20:40:00+09:00",
      },
      {
        sender: "user3",
        content: "저도 거의 완료했어요.",
        timestamp: "2025-05-27T21:05:00+09:00",
      },
      {
        sender: "user4",
        content: "저는 아직 시작도 못했어요.",
        timestamp: "2025-05-28T22:20:00+09:00",
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

  const lastMessage = chat.messages[chat.messages.length - 1];
  const timestamp = lastMessage ? lastMessage.timestamp : null;

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
        <span class="chat-time">${timestamp ? getTimeAgo(timestamp) : ""}</span>
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

function getTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = Math.floor((now - date) / 1000 / 60 / 60 / 24); // 일 단위

  if (diff < 1) {
    return "오늘";
  } else if (diff === 1) {
    return "어제";
  } else if (diff < 7) {
    return `${diff}일 전`;
  } else if (diff < 30) {
    return `${Math.floor(diff / 7)}주 전`;
  } else if (diff < 365) {
    return `${Math.floor(diff / 30)}달 전`;
  }

  return date.toLocaleDateString();
}

afterLoad(() => {
  markRead(currentChatId);
  renderChatList();
});
