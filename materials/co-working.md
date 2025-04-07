# Co-Work

여러 사람이 협업할 때에는 모두가 일반적으로 따르는 규칙(convention, 관습)이 있다.
Convention은 팀마다 다르지만 전반적으로 비슷하다. 어떤 컨벤션이던 모두가
따르고 일관된 high-quality 코드베이스를 유지하는 것이 중요하다.
만약 코드의 퀄리티가 낮다면 PR의 리뷰어가 이를 개선, 지적해야 한다.

## Code Style

코드 스타일은 어떤 식으로 코드가 작성되어야 하는지를 의미한다. 아래 코드를 보자.

```cpp
#include<iostream>
#include<vector>
float f(std::vector<int>v){int s=0;for(int i=0;i<v.size();i++)s+=v[i];return (float)s/v.size();}
```

```cpp
#include <iostream>
#include <vector>

float calculateAverage(const std::vector<int>& numbers) {
    int sum = 0;
    for (int number : numbers) {
        sum += number;
    }
    return static_cast<float>(sum) / numbers.size();
}
```

위 두 코드는 전부 같은 동작을 하는 C++ 코드이다. 당연히 두 번째 코드가
가독성이 좋고 이해하기 쉽다.

1. 함수, 변수명은 의미가 있어야 한다. 변수명, 클래스명만 보고도 대강 어떤 역할을 하는지
   알 수 있어야 한다. 첫 번째 코드의 `f`는 어떤 역할을 하는지 알 수 없다.
   두 번째 코드의 `calculateAverage`는 평균을 계산하는 함수라는 것을 이름만 보고
   알 수 있다. 변수명도 마찬가지.
2. 코드는 적당히 줄바꿈을 한다. 가로로 길어지지 않도록 하자. 보통 가로로 80자 이상
   오지 않게 한다. 서로 다른 코드라면 분리하는 것이 좋다. VSCode와 같은 현대 IDE에서는
   80번째 자리에 세로줄을 그어준다.
3. 코드의 들여쓰기를 통일한다. 언어마다 다른 편이지만, HTML/CSS/JS에서는 스페이스를
   사용한다. IDE에 적절히 설정해두도록 하자.
4. 적절히 띄어쓰기를 한다. `a+b` 보다 `a + b`가 가독성이 좋다.
   - `if (...) { ... }` 처럼 소괄호 앞에 띄어쓰기를 한다.
   - 단, `func(...)` 처럼 함수 호출에서는 띄지 않는다.
   - 중괄호는 내려쓰지 않는다. 다만, C#에서는 내려쓰는 것이 일반적이다.
   - 클래스, 인터페이스, enum의 이름은 대문자로 시작한다—`ExampleClass`.
   - 메서드, 변수, 파라미터의 이름은 소문자로 시작한다—`exampleVariable`.
   - 상수는 대문자로 작성한다. 단어 사이에는 `_`를 넣는다—`EXAMPLE_CONSTANT`.
   - `switch`는 되도록 `if`로 대체한다. `switch`는 가독성이 떨어지고 느려지기 쉽다.
5. 주석을 적절히 사용한다. 특히, Javascript의 `/** ... */` 주석을 사용하면
   IDE에서 설명을 읽을 수 있다. 너무 과도한 주석은 오히려 가독성을 떨어뜨린다.
6. single-quote 보단 double-quote를 사용한다.
7. `==` 보단 `===`를 사용한다. `==`는 검사가 느슨해 잘못된 결과를 낳을 수 있다.
8. 이런 코드 컨벤션을 직접 신경쓰기 힘들다면 자동 포맷팅을 사용하자. VSCode에서
   Prettier를 통해 자동 포맷팅을 받을 수 있다.

<br /><br /><br />

## Issue Management

앞으로 추가해야 할 기능, 버그, 개선점 등을 효율적으로 관리해야 한다.
같은 일을 여러 명이 동시에 작업하는 사고를 피해야 한다. 또, 우선순위가
높은 작업부터 먼저 처리해야 한다. 이것을 위해 여러 Issue Tracking Tool이 있다.
예를 들어, Github Issues, Jira, Trello 등이 있다. 우리는 프로젝트의 규모,
학습 난이도를 고려해 Github Issues를 사용한다. 레포 페이지에서 Issue탭으로
이동해 새로운 issue를 열 수 있다. 간략한 제목과 상세한 설명을 적는다.

<img width="956" alt="image" src="https://github.com/user-attachments/assets/1de8a2e5-558f-42a4-b0e8-29a70a0e4c6d" />

label을 붙여 어떤 issue인지 알 수 있도록 정리한다.

<img width="442" alt="image" src="https://github.com/user-attachments/assets/ad6e4e1d-9222-4e90-b5f5-b8472e8cdd58" />

필요한 경우에는 issue에서 서로 토론, 회의를 통해 건전한 피드백을 할 수 있다.

<img width="941" alt="image" src="https://github.com/user-attachments/assets/65250e36-fec8-4adc-9fc8-0ace438339fa" />


이제 각 개발자는 처리해야 할 issue 목록을 살펴보며 어떤 이슈를 처리할지 정한다.
담당자를 Assign 함으로써 여러 사람이 동시에 한 이슈에 매달리는 사고를 방지할 수 있다.
만약 issue가 너무 커서 혼자 해결하기 어려운 경우에는 sub-issue로 분리해
분업할 수 있다.

<img width="383" alt="image" src="https://github.com/user-attachments/assets/b2d64592-c3af-4ed6-81f0-999b25e5cef4" />

이제 관련한 브랜치를 만들고 작업을 처리한다. 처리가 완료되면 PR을 올려 반영할 준비를 한다.
이때, PR에 `fixes #id` 처럼 이슈를 언급하거나 `development`에 추가해 PR과 이슈를
서로 연결할 수 있다.

<img width="327" alt="image" src="https://github.com/user-attachments/assets/03771b6f-01bc-4abb-a83d-9897e71e2585" />

PR이 머지되고 작업이 종료되면 issue도 `completed` 상태로 닫힌다. 또는,
아예 작업이 무산되었다면 `closed` 상태로 닫힐 수 있다. label과 제목을
깔끔하게 유지하면 한눈에 할 일을 볼 수 있다.

<img width="1217" alt="image" src="https://github.com/user-attachments/assets/4766c561-3fec-4cbd-b174-f79b591c83ab" />

