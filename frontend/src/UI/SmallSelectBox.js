import React, { useState, useRef } from 'react';
import '../css/SmallSelectBox.css'; 

export default function SmallSelectBox({options, selectLabel, selectedOption, setSelectedOption, disabled, size}) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  // const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션
  const selectRef = useRef(null);

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 선택 처리
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 드롭다운 닫기
  };

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 외부 클릭 감지 이벤트 등록
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`small-select ${size ? size : "w-[130px]"} `} ref={selectRef}>
      <button className='small-trigger'
              onClick={toggleDropdown} disabled={disabled?disabled:false}>
        {selectedOption ? selectedOption.label : selectLabel}
      </button>
      {isOpen && (
        <ul className="small-options">
          {options.map((option) => (
            <li
              key={option.value}
              className="small-option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
