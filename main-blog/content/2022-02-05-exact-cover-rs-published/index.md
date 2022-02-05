---
title: Rust 라이브러리 exact-cover 공개!
slug: exact-cover-rs-published
date: 2022-02-05T23:00:00+09:00
summary: >-
  개인 프로젝트로 만들고 있는, exact cover 문제를 푸는 라이브러리를 배포했습니다. 간단한 개발기를 공유합니다.
category: Development
tags:
  - exact-cover
  - puzzle
---

개인 프로젝트로 만들던 Rust 라이브러리 exact-cover를 이번 설 연휴에 crates.io에 배포했습니다! 🎉 아직 원하는 수준의 기능들이 완성되진 않았지만, 기본적인 exact cover 문제를 풀 수는 있기 때문에 우선 라이브러리 이름을 먹어두려고 + 뭔가 완성했다는 기분을 내고 싶어서 배포했습니다. 첫 Rust 프로젝트이자 첫 라이브러리 개발이라 성취감이 큽니다.

- [레포지토리 (GitHub)](https://github.com/queuedq/exact-cover-rs)
- [Crate 정보 (crates.io)](https://crates.io/crates/exact-cover)
- [도큐멘테이션 (docs.rs)](https://docs.rs/exact-cover)

## 무엇을 하는 라이브러리인가요?
폴리오미노 타일링, 스도쿠, N-퀸 문제 등 많은 퍼즐 문제들은 [exact cover](https://en.wikipedia.org/wiki/Exact_cover) 문제로 모델링할 수 있습니다. exact cover 문제는 NP-complete이기 때문에, 백트래킹을 통해 완전탐색을 하는 방식으로 답을 찾습니다. 이 백트래킹 알고리즘을 [Knuth’s Algorithm X](https://en.wikipedia.org/wiki/Knuth%27s_Algorithm_X)라고 부르고, 마찬가지로 Donald Knuth가 개발한 [dancing links (DLX)](https://en.wikipedia.org/wiki/Dancing_Links)라는 테크닉을 이용하면 더 효율적으로 백트래킹을 수행할 수 있습니다. exact-cover 라이브러리는 이러한 exact cover 문제를 푸는 알고리즘을 사용하기 편리한 API의 형태로 제공해 주는 라이브러리입니다.

## 개발 동기
라이브러리를 개발하게 된 동기는 제가 디자인한 퍼즐들을 검증하기 위해서였습니다. 퍼즐계에서는 이런 용도로 [Burr Tools](http://burrtools.sourceforge.net/)라는 오픈 소스 프로그램이 가장 널리 사용됩니다. Burr Tools는 다양한 기능을 제공하는 최고의 프로그램이지만, 아무래도 일반적인 조건 하에서만 문제를 해결해 주기 때문에 저만의 새로운 조건을 추가한 퍼즐을 검증하기에는 어려움이 있었습니다. 그래서 저는 제 퍼즐의 기본 틀을 exact cover로 모델링한 뒤 답 중 조건에 맞는 것들만 골라내는 방식으로 해결하기로 했습니다. Exact cover 문제를 푸는 라이브러리는 많지만, 제 필요에 맞는 API를 디자인하고 싶었고 직접 한번 구현도 해보고 싶어서 이 라이브러리를 만들게 되었습니다.

## Rust를 선택한 이유
왜 하필 Rust로 만들었냐구요? Dancing links가 효율적인 알고리즘이라고 하더라도, 기본적으로 실행에 exponential한 시간이 드는 백트래킹 알고리즘이기 때문에 문제의 크기가 조금만 커져도 해결하는 시간이 오래 걸립니다. 그래서 성능을 최우선으로 고려했습니다. 또한 실행 시간이 오래 걸리기 때문에, 알고리즘의 실행 도중 일시정지하거나 진행도를 받아오는 기능도 상당히 중요하다고 생각했습니다. 이를 위해서는 알고리즘을 별도의 스레드에서 실행하는 비동기 API가 필요했고, 스레드 안정성을 보장해 주는 Rust가 제격이라고 생각했습니다.

그 외에도 평소에 Rust를 강력 추천하고 다니는 러스토랑스 친구 [김유진 (yujingaya)](https://github.com/yujingaya)의 영향으로, 한번쯤 공부해 보고 싶었기 때문이기도 합니다. 기본적인 higher-order function 뿐만 아니라 immutability by default, null safety, ADT와 pattern matching, type class의 경량화 버전인 trait 등 모던 함수형 언어 기능들을 두루 갖추고 있다는 점에 끌렸거든요. 모든 Rust 초심자들이 그렇듯 ownership과 lifetime의 개념이 생소해서 배우는 데 어려움이 있긴 했지만, [공식 안내서](https://doc.rust-lang.org/book/)와 컴파일러와 유진이가 친절하게 알려 줘서 금방 적응할 수 있었습니다. 코드를 대충 작성하면 컴파일이 안 된다는 점은 오히려 제 코드의 안전성을 실시간으로 보장해 준다는 느낌을 줘서 안정감 있는 코딩이 가능했습니다.

## 개발 현황
생각날 때마다 틈틈이 진행한 프로젝트라서 개발 진행은 듬성듬성 이루어졌습니다.

- 2020/05 : 처음으로 dancing links 알고리즘을 구현했습니다.
- 2021/03 : 간단한 API를 만들었습니다.
- 2021/04 : 비동기 API의 디자인을 구상하고, 알고리즘을 별도의 스레드에서 실행하는 솔버를 작성했습니다.
- 2021/12 : 폴리오미노 타일링 문제를 구현했습니다.
- 2022/01 : 이번 설 연휴 동안에는 몇 가지 자잘한 구현과 API 수정을 하고 간단한 documentation을 작성해서 crates.io에 배포했습니다.

앞으로 구현해야 할 기능이 많습니다. 가장 우선순위가 높은 일은, 같은 부분집합을 여러 번 사용할 수 있는 exact cover의 일반화 문제를 해결하는 것입니다. The Art of Computer Programming에서는 이를 multiplicity의 앞글자를 따서 Algorithm M이라고 부릅니다. 그 외에도 Algorithm C (color), 진행도 계산하기, 대칭 전처리 등 중요한 기능들이 남아있습니다.

또한 비동기 API가 메인 목표 중 하나라고 이야기했는데, 지금도 알고리즘이 별도 스레드에서 돌아가기는 하지만 현재는 동기 API만 사용 가능합니다. 아직 구체적인 API의 형태가 잡히지 않았고 위 기능들에 비하면 우선순위가 상대적으로 낮기 때문에 천천히 구현할 생각입니다. 나중에 비동기 API가 완성되면 어떤 고민을 했고 어떻게 디자인했는지를 이야기해보고 싶습니다.

---

처음 구상한 것보다 규모가 크고 챌린징한 프로젝트가 되었지만, 목적이 확실하고 재미도 있었던 덕분에 여기까지 올 수 있었던 것 같습니다. Rust와 동시성 프로그래밍에 대한 공부가 되어서 유익한 시간이었습니다. 지금까지 Rust로 약 1000줄의 코드를 작성했는데, 이 정도면 저도 Rust 프로그래머라고 당당히 이야기할 수 있지 않을까요? ✌️

![exact-cover Rust 코드 줄 수: 1057 (tokei 프로그램 사용)](exact-cover-tokei.png)

라이브러리를 구현할 때 [Burr Tools의 코드](https://github.com/burr-tools/burr-tools)를 많이 뜯어보고 참고하고 있습니다. Burr Tools에 기여한 과거의 퍼즐러들과, 제 Rust 질문 세례를 받아준 유진이에게 작은 감사를 남깁니다.
