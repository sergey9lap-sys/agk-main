export function nextSession(now=new Date()){
 const start=new Date(now);start.setMilliseconds(0);start.setSeconds(0);start.setMinutes(Math.floor(start.getMinutes()/10)*10+10);
 return {start,seconds:Math.max(0,Math.ceil((start-now)/1000))};
}
export function clockText(now=new Date()){
 const {start,seconds}=nextSession(now);
 return {date:new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long'}).format(start),time:`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`,start:start.toISOString()};
}
if(typeof document!=='undefined'){
 const update=()=>{const v=clockText();for(const el of document.querySelectorAll('[data-autoweb]')){el.querySelector('[data-date]').textContent=v.date;el.querySelector('[data-countdown]').textContent=v.time;el.querySelector('time').dateTime=v.start;}};
 update();setInterval(()=>{if(!document.hidden)update();},1000);document.addEventListener('visibilitychange',update);window.addEventListener('pageshow',update);
}
