/**
 * 채팅방 리스트
 */
const chats = [
  {
    id: 1,
    name: "AI응용학과",
    type: "department",
    hierarchy: ["창의융합대학", "AI응용학과"],
    members: ["김민수", "이서연", "박지훈", "최예은", "정우진"],
    messages: [
      {
        sender: "김민수",
        content: "안녕하세요!",
        timestamp: "2025-05-24T18:12:00+09:00",
      },
      {
        sender: "이서연",
        content: "안녕하세요! 반갑습니다.",
        timestamp: "2025-05-24T18:45:00+09:00",
      },
      {
        sender: "김민수",
        content: "모두 잘 지내시나요?",
        timestamp: "2025-05-25T19:30:00+09:00",
      },
    ],
  },
  {
    id: 2,
    name: "웹 프로그래밍",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "웹 프로그래밍"],
    members: ["김민수", "이서연", "정유나"],
    messages: [
      {
        sender: "정유나",
        content: "웹 프로그래밍 수업 어떻게 생각하세요?",
        timestamp: "2025-05-25T23:20:00+09:00",
      },
      {
        sender: "이서연",
        content: "재밌어요! 실습이 많아서 좋아요.",
        timestamp: "2025-05-25T23:55:00+09:00",
      },
      {
        sender: "김민수",
        content: "저도 실습이 많아서 만족하고 있어요.",
        timestamp: "2025-05-26T00:10:00+09:00",
      },
    ],
  },
  {
    id: 3,
    name: "인공지능 수학",
    type: "class",
    hierarchy: ["창의융합대학", "AI응용학과", "인공지능 수학"],
    members: ["김민수", "이서연", "박지훈", "최예은", "정우진", "정유나"],
    messages: [
      {
        sender: "박지훈",
        content: "인공지능 수학 과제 언제까지 제출이죠?",
        timestamp: "2025-05-26T17:15:00+09:00",
      },
      {
        sender: "정우진",
        content: "다음 주 월요일까지요.",
        timestamp: "2025-05-26T17:45:00+09:00",
      },
      {
        sender: "최예은",
        content: "저는 아직 시작도 못했어요.",
        timestamp: "2025-05-27T18:00:00+09:00",
      },
      {
        sender: "정유나",
        content: "같이 스터디 할까요?",
        timestamp: "2025-05-27T18:30:00+09:00",
      },
      {
        sender: "최예은",
        content: "좋아요! 언제 모일까요?",
        timestamp: "2025-05-27T18:45:00+09:00",
      },
    ],
  },
  {
    id: 4,
    name: "프론트엔드 팀",
    type: "team",
    hierarchy: ["창의융합대학", "AI응용학과", "웹 프로그래밍", "프론트엔드 팀"],
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    members: ["김민수", "이서연", "박지훈", "최예은", "정우진"],
    messages: [
      {
        sender: "이서연",
        content: "프론트엔드 프로젝트 진행 상황은 어때요?",
        timestamp: "2025-05-27T20:10:00+09:00",
      },
      {
        sender: "이서연",
        content: "디자인 시스템은 제가 맞춰볼게요.",
        timestamp: "2025-05-27T20:11:00+09:00",
      },
      {
        sender: "박지훈",
        content: "저는 거의 다 끝났어요.",
        timestamp: "2025-05-27T20:40:00+09:00",
      },
      {
        sender: "정우진",
        content: "저도 거의 완료했어요.",
        timestamp: "2025-05-27T21:05:00+09:00",
      },
      {
        sender: "최예은",
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

function updateHeader(chat) {
  const hierarchyContainer = document.querySelector(".class-hierarchy");
  const userCountContainer = document.querySelector(".user-count");

  if (hierarchyContainer && userCountContainer) {
    hierarchyContainer.innerHTML = chat.hierarchy
      .map((item, index) =>
        index < chat.hierarchy.length - 1
          ? `<span>${item}</span><span>&gt;</span>`
          : `<span>${item}</span>`
      )
      .join("");
    userCountContainer.textContent = `${chat.members.length}명 참여 중`;
  }
}

function changeChat(chatId) {
  currentChatId = chatId;
  const chat = chats.find((chat) => chat.id === chatId);
  if (chat) {
    markRead(chatId);
    updateHeader(chat);
    renderChatList();
    renderChatContent(chat);
  }
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
  const chat = chats.find((chat) => chat.id === currentChatId);
  updateHeader(chat);
  renderChatList();
  renderChatContent(chat);
});

function renderChatContent(chat) {
  const chatContent = document.querySelector(".chat-content");
  chatContent.innerHTML = "";

  let prevSender = null;
  let group = null;

  chat.messages.forEach((msg, i) => {
    if (msg.sender === "me") {
      const sentEl = document.createElement("div");
      sentEl.className = "message sent";
      sentEl.innerHTML = `<div class="message-bubble">${msg.content}</div>`;
      chatContent.appendChild(sentEl);
      prevSender = null;
      group = null;
    } else {
      if (msg.sender !== prevSender) {
        group = document.createElement("div");
        group.className = "message-group received";
        group.innerHTML = `
          <div class="message-meta">
            <div class="profile-image">${msg.sender.charAt(0)}</div>
            <div class="sender-info">
              <div class="sender-name">${msg.sender}</div>
              <div class="send-time">${new Date(
                msg.timestamp
              ).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}</div>
            </div>
          </div>
        `;
        chatContent.appendChild(group);
      }
      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      bubble.textContent = msg.content;
      group.appendChild(bubble);
      prevSender = msg.sender;
    }
  });
}
