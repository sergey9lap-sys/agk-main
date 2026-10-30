import GetCourseWidget from "./GetCourseWidget";
import {recording} from "./tariffsData";

export default function TariffsSection({className=""}: {className?:string}) {
  return <section className={`section tariffs recording-tariff ${className}`} id="tariffs" aria-labelledby="recording-title">
    <div className="tariff-grid recording-grid" data-stagger>
      <article className="tariff-card recording-card" data-item>
        <div className="tariff-top"><h2 id="recording-title"><span className="nowrap">Мастер-класс</span> в записи</h2></div>
        <div className="price-row recording-price">
          <small><span className="sr-only">Обычная цена </span>{recording.oldPrice}</small>
          <div className="recording-price-current"><strong><span className="sr-only">Цена со скидкой </span>3 900 <span>Р</span></strong><span className="recording-discount">{recording.discount}</span></div>
        </div>
        <ul>{recording.includes.map(item=><li className={`recording-item ${item.bonus?'recording-bonus':''}`} key={item.text}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{item.bonus?<><path d="M4 10h16v11H4zM3 6h18v4H3zM12 6v15"/><path d="M12 6S5 7 6 3c1-3 6 0 6 3Zm0 0s7 1 6-3c-1-3-6 0-6 3Z"/></>:<path d="m5 12 4 4L19 6"/>}</svg>
          <span>{item.text}{item.duration?<> <span className="recording-duration">· {item.duration}</span></>:null}</span>
        </li>)}</ul>
        <GetCourseWidget widgetId={recording.widgetId} className="is-dark" />
      </article>
    </div>
  </section>;
}
