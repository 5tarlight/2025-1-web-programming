# Preliminaries

팀플을 위한 기본적인 정리 노트.

## 필요 프로그램

[Figma](https://www.figma.com/) 설치 후 로그인. Figma는 Drag & Drop으로 UI/UX
디자인을 할 수 있는 툴이다. 팀원들과 함께 디자인을 공유하고 수정할 수 있다.
만들 페이지의 디자인을 데스크탑, 모바일, 태블릿 등으로 나누어 디자인하고
HTML/CSS/JS로 구현한다.

[Trello](https://trello.com/) 웹에서 To-Do 리스트를 관리할 수 있는 툴이다.
하지만, Github을 사용할 예정이고 최대한 적은 외부 툴을 사용하기 위해 패스.

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

## Git 사용 가이드

Git은 여러 사람이 협업하여 코드를 작성할 수 있도록 도와주는 툴이다(버전 관리 시스템, VCS).
Git을 사용하면 코드의 변경 이력을 관리할 수 있고, 여러 사람이 동시에 작업해 생기는 코드 충돌을
해결할 수 있다.

### repository

프로젝트 단위로 repository(줄여서 repo)를 만들어 관리한다. 각자 개인 컴퓨터(local)에서 작업해
서버(remote)로 코드를 올린다. 여기서 서버는 여러 종류가 있는데, 가장 대중적이고 널리 사용하는
Github을 사용할 것이다. 기업을 위한 Gitlab, 또는 직접 만들(!) 수도 있다.

다른 사람이 remote에 코드 업데이트를 했다면, 그걸 local로 가져와야 한다. 이것을 pull이라고
부르고(fetch라고도 함). 아래 명령어로 처리할 수 있다.

```bash
git pull origin <branch>
```

만약 pull 과정 중에 local changes와 remote changes간에 충돌이 발생했다면, 로컬에서 merge를
수행해야 한다.

<br /><br /><br />

### branch

여러 사람이 같은 코드를 동시에 수정하면 충돌(conflict)가 발생할 수 있으므로 브랜치(branch)를
만들어 관리한다. 레포를 처음 만들면 생기는 기본 브랜치는 main이다(예전엔 master).
레포 관리 정책에 따라 다르지만 main에서 파생되는 브랜치를 만들어서 작업하고 main에 합치는(merge)
방식이다. 큰 프로젝트에서는 dev 브랜치를 두고 main에 합쳐지기 전 미리 합쳐서 QA등을
진행하기도 한다. 브랜치의 이름은 `type/feature` 형식으로 짓는다. 예를 들어, 로그인 UI를 만드는
브랜치라면 `feature/login-ui` 형식이다. 사용하는 type은 아래와 같다.

- feat : 신기능
- fix : 버그 수정
- hotfix : 급하게 수정해야 하는 기능
- style : 코드 스타일 수정 (세미콜론, 들여쓰기 등)
- refactor : 코드 리팩토링
- test : 테스트 코드 작성
- docs : 문서 수정
- chore : 빌드, 패키지 메니저 수정 등 기타 잡다한 일

<br /><br /><br />

### Pull Requests

작업한 브랜치를 main으로 합치려면 merge를 수행해야 하는데, 마음대로 main에 합치면 안되고 Pull
Request(PR)을 열어야 한다.

<img width="1267" alt="image" src="https://github.com/user-attachments/assets/005bf66a-6112-4831-8738-c7d489ba8571" />

위 스크린샷을 보면 `custom-nickname` 브랜치에서 `dev` 브랜치로 가는 PR임을 알 수 있다. 간결히
제목을 적고 내용에 자세한 설명을 적는다. 바뀐 내용, 주의할 점, 리뷰어에게 설명할 내용 등을
적는다. 스크린샷(붙여넣기로 첨부 가능)을 첨부하는 것도 굉장히 좋다. 특히 웹페이지 디자인은 스크린샷으로
보여주는게 설명하기보다 더 좋다. 적절히 설명을 적고 PR을 올린다.

등록된 PR은 code review를 받아야 한다. Approve 리뷰 없이는 merge될 수 없다.

<img width="934" alt="image" src="https://github.com/user-attachments/assets/c9c9c986-e9fa-4038-915c-75e6e384683a" />

만약 궁금한 내용이나 의견 교환이 필요하면 코드에 댓글을 달아 대화할 수 있다.

<img width="988" alt="image" src="https://github.com/user-attachments/assets/b95b3ff2-3c57-4acb-ba6a-1023b1434fa7" />

리뷰어는 코드에 수정해야 할 부분, 이해하기 어렵거나 질이 낮은 코드 등이 있으면 Request Changes
리뷰를 남겨 PR을 반려할 수 있다. 문제가 되는 부분을 댓글로 설명하고 PR 작성자는 문제를 고치고
다시 리뷰를 요청해야 한다.

<img width="980" alt="image" src="https://github.com/user-attachments/assets/812f0ef7-1bb4-4c77-914d-6fe0269c18f1" />
