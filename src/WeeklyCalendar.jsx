import { useState } from 'react';

const days = ['月', '火', '水', '木', '金'];

// 30分刻みで 8:00 - 18:00 までのスロット
const slotCount = 20; // 10時間 * 2

const slotToTime = (slot) => {
  const hour = 8 + Math.floor(slot / 2);
  const min = slot % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
};

function WeeklyCalendar({ records, addRecord }) {
  const [drag, setDrag] = useState(null); // {day, start}
  const [hover, setHover] = useState(null); // {day, end}

  const handleMouseDown = (day, slot) => {
    setDrag({ day, start: slot });
    setHover({ day, end: slot });
  };

  const handleMouseEnter = (day, slot) => {
    if (drag) {
      setHover({ day, end: slot });
    }
  };

  const clearDrag = () => {
    setDrag(null);
    setHover(null);
  };

  const handleMouseUp = () => {
    if (drag && hover && drag.day === hover.day) {
      const day = drag.day;
      const startSlot = Math.min(drag.start, hover.end);
      const endSlot = Math.max(drag.start, hover.end) + 1;
      if (startSlot !== endSlot) {
        const task = window.prompt('作業内容を入力してください');
        if (task) {
          addRecord({ day, startSlot, endSlot, task });
        }
      }
    }
    clearDrag();
  };

  const isSelected = (day, slot) => {
    if (!drag || !hover) return false;
    if (day !== drag.day || day !== hover.day) return false;
    const start = Math.min(drag.start, hover.end);
    const end = Math.max(drag.start, hover.end);
    return slot >= start && slot <= end;
  };

  return (
    <div className="calendar" onMouseUp={handleMouseUp} onMouseLeave={clearDrag}>
      <div className="header">
        {days.map((d) => (
          <div key={d} className="day-header">
            {d}
          </div>
        ))}
      </div>
      <div className="body">
        {days.map((d, dayIndex) => (
          <div key={d} className="day-column">
            {[...Array(slotCount)].map((_, slotIndex) => (
              <div
                key={slotIndex}
                className={`slot ${isSelected(dayIndex, slotIndex) ? 'selected' : ''}`}
                onMouseDown={() => handleMouseDown(dayIndex, slotIndex)}
                onMouseEnter={() => handleMouseEnter(dayIndex, slotIndex)}
              >
                {slotIndex % 2 === 0 && (
                  <span className="time-label">{slotToTime(slotIndex)}</span>
                )}
              </div>
            ))}
            {records
              .filter((r) => r.day === dayIndex)
              .map((r) => (
                <div
                  key={r.id}
                  className="record"
                  style={{
                    top: r.startSlot * 30,
                    height: (r.endSlot - r.startSlot) * 30,
                  }}
                >
                  {r.task}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { slotToTime };
export default WeeklyCalendar;
