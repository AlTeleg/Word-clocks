import dial from './img/dial.png'
import arrowBig from './img/arrowBig.png'
import arrowSmall from './img/arrowSmall.png'
import lineDash from './img/lineDash.png'
import cross from './img/cross.png'
import { useEffect, useRef } from 'react'


interface ClockProps {
  id: string;
  name: string;
  zone: string;
  onDelete: (id: string) => void;
}

const Clock = ({ id, name, zone, onDelete }: ClockProps) => {
  const refArrBig = useRef<HTMLImageElement>(null);
  const refArrSmall = useRef<HTMLImageElement>(null);
  const refArrDash = useRef<HTMLImageElement>(null);
  const refCross = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let timeZone = Number(zone)
    let day = new Date()
    let timeZoneOffset = day.getTimezoneOffset()
    let timeOffset = timeZone*60+timeZoneOffset
    day = new Date(day.getTime()+timeOffset*60*1000)
    let seconds = day.getSeconds()
    let minutes = day.getMinutes()
    let hour = day.getHours()
    if (refArrDash.current) {
      refArrDash.current.style.transform = "translate(-50%,-100%) rotate(" + (6 * seconds) + "deg)"
    }
    if (refArrBig.current) {
      refArrBig.current.style.transform = "translate(-50%,-100%) rotate(" + (6 * minutes) + "deg)"
    }
    if (refArrSmall.current) {
      refArrSmall.current.style.transform = "translate(-50%,-100%) rotate(" + (30 * hour + 0.5 * minutes) + "deg)"
    }
    refCross.current?.addEventListener('click', deleteFunction)
    const secInterval = setInterval(()=> {
      let day = new Date() 
      let seconds = day.getSeconds() 
      if (refArrDash.current) {
        refArrDash.current.style.transform = "translate(-50%,-100%) rotate(" + (6 * seconds) + "deg)"
      }
    }, 1000)
    const minuteInterval = setInterval(()=> {
      let day = new Date() 
      let minutes = day.getMinutes()
      if (refArrBig.current) {
        refArrBig.current.style.transform = "translate(-50%,-100%) rotate(" + (6 * minutes) + "deg)"
      }
    }, 60000)
    const hourInterval = setInterval(()=> {
      let day = new Date()
      let minutes = day.getMinutes()
      let hour = day.getHours()+timeOffset
      if (refArrSmall.current) {
        refArrSmall.current.style.transform = "translate(-50%,-100%) rotate(" + (30 * hour + 0.5 * minutes) + "deg)"
      }
    }, 360000)
    return() => {
      clearInterval(secInterval);
      clearInterval(hourInterval);
      clearInterval(minuteInterval);
      refCross.current?.removeEventListener('click', deleteFunction)
    }
  },[zone])

  const deleteFunction = () => {
    onDelete(id);
  }

  return (
    <div className='clock'>
        {name}
        <div className='clock_dial-div'>
          <img src={dial} alt="dial" className='clock_dial-img'/>
          <img src={arrowBig} alt="arrow-big" className='clock_arrow-big' ref={refArrBig}/>
          <img src={arrowSmall} alt="arrow-small" className='clock_arrow-small' ref={refArrSmall}/>
          <img src={lineDash} alt="line-dash" className='clock_line-dash' ref={refArrDash}/>
          <img src={cross} alt="cross" className='clock_cross' ref={refCross}/>
        </div>
        
    </div>
  )
}

export default Clock