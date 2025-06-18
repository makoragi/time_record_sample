import { useState } from 'react';

function App() {
  const [records, setRecords] = useState([
    { id: 1, task: '資料作成', start: '09:00', end: '10:30' },
    { id: 2, task: '会議', start: '11:00', end: '12:00' },
  ]);
  const [task, setTask] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const addRecord = (e) => {
    e.preventDefault();
    if (!task || !start || !end) return;
    setRecords([...records, { id: Date.now(), task, start, end }]);
    setTask('');
    setStart('');
    setEnd('');
  };

  return (
    <div>
      <h1>作業時間記録アプリ</h1>
      <form onSubmit={addRecord}>
        <input
          placeholder="作業内容"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>
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
              <td>{r.start}</td>
              <td>{r.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
