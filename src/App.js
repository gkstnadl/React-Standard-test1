import React, { useState } from 'react';
import './App.css';

const App = () => {
  // 과일 배열과 입력값을 위한 상태(state)
  const [fruits, setFruits] = useState(['apple', 'banana', 'cherry', 'date', 'elderberry']);
  const [inputValue, setInputValue] = useState('');
  const [activeResult, setActiveResult] = useState('');

  // input값이 변경될때마다 호출될 함수. 함수는 변경된 입력값을 InputValue에 보냄.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // 1. forEach : 인덱스 값을 포함해서 배열 나열하기
  let forEachResult = '';
  fruits.forEach((fruit, index) => {
    forEachResult += `${index} : ${fruit}, `;
  });

  // 2. filter : 입력한 값만 나오게 하기
  const filterResult = (value) => {
    const filtered = fruits.filter(fruit => fruit.includes(value));
    return filtered.join(', '); // 필터링된 결과를 문자열로 반환
  };

  // 3. map : 대문자로 반환해줌
  const mapResult = () => {
    const mapped = fruits.map(fruit => fruit.toUpperCase());
    return mapped.join(', ');
  };

  // 4. reduce : 값을 다 더하기 해줌
  const reduceResult = () => {
    const reduced = fruits.reduce((acc,cur) => acc + ' + ' + cur);
    return reduced;
  };
  
  // 5. push : 입력값을 추가해줌
  const pushResult = () => {
    const pushed = [...fruits, inputValue]; // 기존 배열에 입력한 값을 추가해서 새 배열 생성
    setFruits(pushed); 
    setInputValue(''); // 입력값 초기화
    setActiveResult('push');
  };

  // 6. pop : 맨 끝에서부터 삭제하는거
  const popResult = () => {
    if (fruits.length > 0) {
      const popped = [...fruits]; // 새 배열 생성
      popped.pop(); // 마지막 요소 제거하는 pop 메서드 실행
      setFruits(popped); // 제거된 상태 업데이트
      setActiveResult('pop'); // 활성화된 결과 (ActiveResult)에 pop 적용
    }
  };

  // 7. slice: 원본배열의 뒤에서 2개 아이템 제거 후 출력
  const sliceResult = fruits.slice(0, -2).join(', ');

  // 8. splice: 원본배열의 가운데 아이템 2번째부터 2개를 "kiwi", "lime"으로 변경
  const spliceResult = () => {
    const fruitsCopy = [...fruits]; // 원본 배열 복사
    fruitsCopy.splice(Math.floor(fruits.length / 2), 2, 'kiwi', 'lime');
    return fruitsCopy.join(', ');
  };

  // 9. indexOf: 입력한 값과 일치하는 값의 index 출력, 없으면 -1 출력
  const indexOfResult = fruits.indexOf(inputValue);

  // 10. includes: 원본배열에 입력한 값과 일치하는 정확한 과일명이 있는지 확인
  const includesResult = fruits.includes(inputValue);

  // 11. find: 원본배열에 입력한 값을 포함하는 과일명 출력, 없으면 "Not Found" 출력
  const findResult = fruits.find(fruit => fruit.includes(inputValue)) || 'Not Found';

  // 12. some: 원본배열에 입력한 값을 포함하는 과일명이 있는지 확인
  const someResult = fruits.some(fruit => fruit.includes(inputValue));

  // 13. every: 모든 과일명이 5글자를 초과하는지 확인
  const everyResult = fruits.every(fruit => fruit.length > 5);

  // 14. sort: 알파벳 내림차순 정렬 후 리스트 명을 ", "로 구분하여 출력
  const sortResult = [...fruits].sort((a, b) => b.localeCompare(a)).join(', ');
  

  // 핸들이 많아지는 것을 막기 위해 핸들용 함수 하나 정의.
  const handleSetActiveResult = (resultType) => {
    setActiveResult(resultType);
  };

  // if문을 쓰다가 switch문이 있는 것을 알고 각 함수 별로 특정값(case)넣으면 return이 출력되도록 해서 하나의 함수에 정리함.
  const displayResult = () => {
    switch (activeResult) {
      case 'forEach':
        return `forEach => ${forEachResult}`;
        case 'filter':
      return `filter => ${filterResult(inputValue)}`; 
      //inputValue(입력값)은 filterResult 함수의 매개변수가 되도록 함.
      case 'map':
        return `map => ${mapResult()}`;
      case 'reduce':
        return `reduce => ${reduceResult()}`;
      case 'push':
        return `push => ${fruits.join(', ')}`;
      case 'pop':
        return `pop => ${fruits.join(', ')}`;
      case 'slice':
        return `slice => ${sliceResult}`;
      case 'splice':
        return `splice => ${spliceResult()}`;
      case 'indexOf':
        return `indexOf => ${indexOfResult}`;
      case 'includes':
        return `includes => ${includesResult ? 'true' : 'false'}`;
      case 'find':
        return `find => ${findResult}`;
      case 'some':
        return `some => ${someResult ? 'true' : 'false'}`;
      case 'every':
        return `every => ${everyResult ? 'true' : 'false'}`;
      case 'sort':
        return `sort => ${sortResult}`;
      default:
        return '결과를 보려면 버튼을 클릭하세요.';
    }
  };

  return (
    <div className='mainStyle'>
      <h1>Standard반 배열 API</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Enter text' />
      <div>
        <button onClick={() => handleSetActiveResult('forEach')}>forEach</button>
        <button onClick={() => handleSetActiveResult('filter')}>filter</button>
        <button onClick={() => handleSetActiveResult('map')}>map</button>
        <button onClick={() => handleSetActiveResult('reduce')}>reduce</button>
        <button onClick={pushResult}>push</button>
        <button onClick={popResult}>pop</button>
        <button onClick={() => handleSetActiveResult('slice')}>slice</button>
        <button onClick={() => handleSetActiveResult('splice')}>splice</button>
        <button onClick={() => handleSetActiveResult('indexOf')}>indexOf</button>
        <button onClick={() => handleSetActiveResult('includes')}>includes</button>
        <button onClick={() => handleSetActiveResult('find')}>find</button>
        <button onClick={() => handleSetActiveResult('some')}>some</button>
        <button onClick={() => handleSetActiveResult('every')}>every</button>
        <button onClick={() => handleSetActiveResult('sort')}>sort</button>
      </div>
      <div>
        <h4>원본배열 : {fruits.join(',')} </h4>
      </div>
      <div>
        <h4>결과물 : {displayResult()}</h4>
      </div>
    </div>
  );
};

export default App;
