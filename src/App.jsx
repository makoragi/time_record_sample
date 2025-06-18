import { useState } from 'react';
import WeeklyCalendar, { slotToTime } from './WeeklyCalendar';

function App() {
  const [records, setRecords] = useState([]);

  const addRecord = ({ day, startSlot, endSlot, task }) => {
    setRecords((prev) => [
      ...prev,
      { id: Date.now(), day, startSlot, endSlot, task },
    ]);
  };

  return (
    <div>
      <h1>作業時間記録アプリ</h1>
      <WeeklyCalendar records={records} addRecord={addRecord} />
      <table>
        <thead>
          <tr>
            <th>作業</th>
            <th>開始</th>
            <th>終了</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.task}</td>
              <td>{slotToTime(r.startSlot)}</td>
              <td>{slotToTime(r.endSlot)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
