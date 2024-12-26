import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Child() {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const monthArray = [];

    for (let i = 0; i < 100; i++) {
      const currentMonth = new Date(year, month + i); 
      const monthLabel = `${currentMonth.getFullYear()}년${String(currentMonth.getMonth() + 1).padStart(2, '0')}월`;
      monthArray.push(monthLabel);
    }
    setMonths(monthArray);
  }, []);

  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h1>우리아이 페이지</h1>
      <Link to='./register'>등록하기</Link>
      <div>우리 아이 접종 체크리스트</div>
      
      <div>접종 일정표</div>
      <select value={selectedMonth} onChange={handleMonthSelect}
        className="border p-2 rounded mb-[30px] w-full">
        {months.map((month, index) => (
          <option key={index} value={month}> {month}</option>))}
      </select>
    </div>
  );
}
