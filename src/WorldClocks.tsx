import { useEffect, useRef, useState } from "react"
import Clock from "./Clock";
import { createRoot } from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';

const WorldClocks = () => {
  const refInputName = useRef<HTMLInputElement>(null);
  const refInputZone = useRef<HTMLInputElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);
  const refClocks = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');
  const [clocks, setClocks] = useState<JSX.Element[]>([]);
  const [clockId, setClockId] = useState<number>(1);

  const addClock = () => {
    const refInputZoneEl = refInputZone.current as HTMLInputElement;
    const refInputNameEl = refInputName.current as HTMLInputElement;
    if ((Number(refInputZoneEl.value) < -11) || (Number(refInputZoneEl.value) > 12) || (!(refInputNameEl.value) || !(refInputZoneEl.value) || !(Number(refInputZoneEl.value)))) {
      return;
    } 
    let id = uuidv4()
    let newClock = <Clock name={refInputNameEl.value} zone={refInputZoneEl.value} key={`${id}`} id={id} onDelete={deleteClock}/>;
    setClockId(clockId+1)
    setClocks(prevClocks => [...prevClocks, newClock]);
    setName('');
    setZone('');
  }

  const deleteClock = (id: string) => {
    setClocks(prevClocks => prevClocks.filter(clock => clock.key !== id));
  }

  const getInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value) 
  }

  const getInputZone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      return
    }
    setZone(e.target.value)
  }

  useEffect(() => {
    const refButtonEl = refButton.current as HTMLButtonElement;
    refButtonEl.addEventListener('click', addClock)
  
  return () => {
    refButtonEl.removeEventListener('click', addClock)
  }
  }, []);

  return (
    <div>
        <div className="input-bar">
          <div className="input-name">
            <label htmlFor="input1">Название</label>
            <input type="text" name={'input1'} ref={refInputName} value={name} onChange={getInputName} placeholder="Назовите ваши часы"/>
          </div>
          <div className="input-zone">
            <label htmlFor="input2">Временная зона</label>
            <input type="text" name={'input2'} ref={refInputZone} value={zone} onChange={getInputZone} placeholder="-11 до 12"/>
          </div>

          <button ref={refButton}>Добавить</button>
        </div>
        <div className="clocks" ref={refClocks}>{clocks}</div>
    </div>

  )
}

export default WorldClocks