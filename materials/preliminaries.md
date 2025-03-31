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

브랜치는 local에 만들고 나중에 remote로 올리게 된다. 브랜치를 만드는 명령어는

```bash
git branch <name>      # 새로운 브랜치 생성, 하지만 checkout 하지 않음
git checkout <name>    # 직접 checkout해야 함

# or

git checkout -b <name> #  브랜치를 만들고 바로 checkout
```

당연히 동시에 여러 브랜치가 존재할 수 있다. 작업을 하면서 여러 브랜치를 동시에 사용할 경우
브랜치를 왔다갔다 해야 하는데 이것을 checkout이라고 한다. 서로 내용이 다른 브랜치를
체크아웃할 경우 자동으로 로컬 파일이 바뀐다. 없던 파일이면 생기고 파일 내용까지
바뀐다. Github Desktop같은 GUI 툴을 쓴다면 브랜치 메뉴에서 바꿀 수 있다.

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


<br /><br /><br />

### commits

커밋은 코드 변경 내역을 담고 있는 기본 단위이다. 작업의 순서는 다음과 같다.

1. local에서 코드를 수정한다.
2. commit을 작성한다.
3. push한다.

변경(create, modify, delete, rename)된 파일을 선택해 커밋을 할 수 있다.
커밋을 할 때 변경된 내용을 담는 커밋 메세지를 적어야 한다. 메세지를 적을 때
첫 줄(제목)에 간략하게 동사로 시작하는(영어 기준) 메세지를 적고 다음 줄에 자세한
부가 설명을 적는다. 커밋 메세지는 다음과 같은 구조를 가진다.

```
type: subject

body

footer
```

type은 위의 브랜치 네이밍에서 살펴본 타입과 동일하다. body에는 자세한 설명을 적는다.
다만 가로 길이가 80자가 넘어가지 않도록 적절히 줄바꿈을 해야 한다. footer는 optional로써
필요한 경우 적는다. 이슈 트래커 ID를 적는다. 우리는 Github Issues를 사용할 예정이니
`Fixes #42 Related to #12` 처럼 적으면 된다. 커밋 메시지를 어떻게 쓸 지는 회사, 팀마다
다르다. 이를 commit convention이라고 하고 통일된 규칙을 따르는 것이 좋다. 아래는 커밋
메시지의 예시이다(참고로 UnrealEngine 소스코드가 담긴 레포이다). 적당히 알아보게만
쓰자.

<img width="1232" alt="image" src="https://github.com/user-attachments/assets/3a1cf01b-307d-4ecb-b9a2-21d0d6aa5d3f" />

위 스크린샷을 보면 오른쪽에 16진수 코드(hash)를 볼 수 있는데 커밋의 id를 의미한다.
특수한 경우에 특정 커밋만을 선택해야 할 때가 있는데 id를 사용해서 선택하게 된다.
위 커밋의 id는 `b039aaa`이다. 참고로 저 7글자 id는 단축형으로 실제 id는
`b039aaa93dad7e597c76f1923a936707d452dc42`이다.

<br />

그럼 이제 직접 커밋을 써보자. 우선 로컬 레포에 변화를 만든다. 파일을 수정하거나,
파일을 만들거나 삭제하거나 이름을 바꿀 수 있다. VSCode와 같은 현대 IDE에서는
아래 사진과 같이 git과 연동되어 어떻게 바뀌었는지 보여주기도 한다(M은 Modified를 의미).

<img width="317" alt="image" src="https://github.com/user-attachments/assets/56cd4436-dc3d-4e91-a206-542fc71bdf64" />

커밋을 하기 전에는 어떤 파일들을 커밋에 포함할지 등록해야 한다. 참고로 파일의 부분만을
등록하는 것은 불가능하다. 한 파일에 여러 부분이 변경되었으면 한 커밋에 담기게
된다는 의미이다. 등록하는 과정을 add라고 한다. 명령어로는 다음과 같다.

```bash
git add .
```

`.`을 사용해서 모든 파일을 선택해 주었고, 특정 파일만 고르고 싶다면 `.`대신
파일의 이름을 적어 선택할 수 있다. Github Desktop같은 GUI 툴을 사용한다면
직접 파일을 선택하면 된다. 아래는 [lazygit](https://github.com/jesseduffield/lazygit)이라는 CUI툴이다.

<img width="1082" alt="image" src="https://github.com/user-attachments/assets/29ccd533-ff6e-42ee-9647-3e67ecaf2645" />

이제 파일들을 골랐으니 커밋을 하자. 명령어로는 다음과 같다.

```bash
git commit -m "Short Commit Message" # 상세한 커밋 메세지를 적지 않을 때
git commit                           # vim이 열리고 상세한 커밋 메세지를 적을 수 있다.
```

Desktop같은 CUI 툴을 쓴다면 그저 메세지를 적고 커밋 버튼을 눌러주면 된다.

지금 작성한 커밋은 local 환경에 있다. 커밋을 이제 remote에 올려야 한다.
이것을 push라고 부른다. remote 레포의 위치를 origin이라고 한다.
(이건 한 git 프로젝트에 여러 remote 레포가 있을 수 있어서인데 잘 사용하지 않는다.
일반적으로 remote = origin 이라고 생각해도 된다)

```bash
git push origin <branch>
```

remote에 브랜치가 없다면 해당 이름으로 생기고 자신의 local 브랜치와 서로
이어지게 된다. 이제 충분히 커밋을 진행하고 작업이 완료되었다면 PR을 올리러 가면 된다.

너무 많은 변경사항을 한 커밋에 몰아넣는 것은 좋지 않다. 커밋은 한 단위의 작업만
담는 것이 좋다. 특정 커밋만 merge하는 경우도 있고 특정 커밋만 돌리는(revert) 경우도 있다(cherry-pick
이라고 한다). 이럴 때 한 커밋에 너무 많은 내용이 있다면 커밋을 찢는 PR을 해야 한다.
제목도 적기 어려워지니 적절히 쪼개도록 하자. 아래는 커밋의 예시이다.

<img width="879" alt="image" src="https://github.com/user-attachments/assets/915026b2-f104-41d0-b917-e9d21d760606" />
