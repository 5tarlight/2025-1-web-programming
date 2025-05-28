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
  
    const avatarClass = chat.type === "team"
    ? "chat-text-avatar private-avatar"
    : "chat-text-avatar";

    const avatar = chat.avatar
    ? `<img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">`
    : `<div class="${avatarClass}">${chat.name.charAt(0)}</div>`;


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

  document.querySelector(".send-button").addEventListener("click", sendMessage);
  document.querySelector(".chat-input").addEventListener("keydown", (e) => {
    if (e.isComposing || e.key === "Process") return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
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
  chatContent.scrollTop = chatContent.scrollHeight;
}

const replyPhrases = {
  start: [
    "아 진짜요?",
    "오, 그런 일이?",
    "헐 대박…",
    "ㅋㅋ 맞아요 맞아요.",
    "음 그건 말이죠…",
    "아 저도요!",
    "그랬군요!",
    "오호, 흥미롭네요.",
    "이런 경우는 처음 봐요.",
    "와, 신기하네요.",
    "정말요?",
    "어머나!",
    "헉, 그럴수가?",
    "그게 정말 사실이에요?",
    "오오~ 신기하네요.",
    "진심이에요?",
    "어떻게 그런 일이!",
    "에이 설마요~",
    "아 그렇구나!",
    "그랬었구나!",
  ],
  middle: [
    "저도 비슷한 경험 있어요.",
    "그건 좀 생각해볼 문제 같아요.",
    "저는 그렇게 생각 안 했는데, 흥미롭네요.",
    "저도 궁금했는데요.",
    "이런 경우가 꽤 있죠.",
    "저도 공감해요.",
    "그런 일 자주 생기죠.",
    "어쩌면 예상된 결과일 수도 있어요.",
    "다들 그렇게 생각하더라고요.",
    "경험이 많은 사람이면 다르게 볼 수도 있어요.",
    "그렇게 볼 수도 있겠네요.",
    "여러가지 의견이 있겠죠.",
    "그런 상황 많이들 겪죠.",
    "저도 비슷하게 생각해요.",
    "예전에도 그런 경우가 있었어요.",
    "그건 확실히 중요한 포인트예요.",
    "그렇게 말하니 이해되네요.",
    "공감 가는 얘기네요.",
    "맞아요, 고민되죠.",
    "같은 생각했어요.",
  ],
  end: [
    "알려줘서 고마워요!",
    "함께 고민해봐요 :)",
    "다음에 꼭 같이 해봐요!",
    "재밌는 이야기네요.",
    "좋은 정보 감사합니다!",
    "그럴 수도 있겠네요!",
    "앞으로도 기대되네요.",
    "더 알아보고 이야기해요.",
    "저도 좀 더 생각해볼게요.",
    "언제 한 번 자세히 얘기해요!",
    "앞으로도 잘 부탁드려요!",
    "오늘도 즐거운 하루 되세요!",
    "더 얘기 나눠봐요.",
    "그럼 이만!",
    "좋은 하루 보내세요!",
    "다음에 또 이야기해요!",
    "계속 응원할게요.",
    "곧 다시 이야기해요!",
    "참고할게요~",
    "또 공유해 주세요!",
  ],
};

function getRandomReplySet() {
  const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 replies
  const replies = [];
  for (let i = 0; i < count; i++) {
    const start =
      replyPhrases.start[Math.floor(Math.random() * replyPhrases.start.length)];
    const middle =
      replyPhrases.middle[
        Math.floor(Math.random() * replyPhrases.middle.length)
      ];
    const end =
      replyPhrases.end[Math.floor(Math.random() * replyPhrases.end.length)];
    replies.push(`${start} ${middle} ${end}`);
  }
  return replies;
}

function sendMessage() {
  const input = document.querySelector(".chat-input");
  const content = input.value.trim();
  if (!content) return;

  const chat = chats.find((chat) => chat.id === currentChatId);
  if (!chat) return;

  chat.messages.push({
    sender: "me",
    content,
    timestamp: new Date().toISOString(),
  });

  input.value = "";
  renderChatContent(chat);
  document.querySelector(".chat-content").scrollTop =
    document.querySelector(".chat-content").scrollHeight;
  lastSeenMsg[currentChatId] = chat.messages.length;
  renderChatList();

  if (window.replyTimeout) clearTimeout(window.replyTimeout);
  window.replyTimeout = setTimeout(() => {
    const replyMessages = getRandomReplySet();
    const sender = getRandomOtherMember(chat.members);
    replyMessages.forEach((reply, index) => {
      const delay = 1000 * (index + 1) + Math.floor(Math.random() * 1000);
      setTimeout(() => {
        chat.messages.push({
          sender,
          content: reply,
          timestamp: new Date().toISOString(),
        });

        if (chat.id === currentChatId) {
          lastSeenMsg[currentChatId] = chat.messages.length;
          renderChatContent(chat);
        }

        renderChatList();
      }, delay);
    });
  }, 2000);
}

function getRandomOtherMember(members) {
  const others = members.filter((m) => m !== "me");
  return others[Math.floor(Math.random() * others.length)];
}
