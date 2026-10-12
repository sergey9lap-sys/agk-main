import '../../shared/feedback.css';
import {setupEntrances} from '../../shared/entrance.js';
import {setupRegistration} from './registration.js';
setupRegistration();
setupEntrances({
 hero:'.hero h1,.hero .lead,.hero .hero-jump,.hero .pill,.hero .card',
 sections:'.editorial-section,.final,.site-footer',
 items:'h2,.reading-chapter,.scene>.prose>p,.scene>figure,.continuation>p,.comparison-summary,.comparison-item,.checks li,.nots li,.nums li,.callout,.author,.case,.next-intro>p,.next-conditions>p,.final .wrap>div>p,.final .card,.footer-legal,.footer-bottom',
});
const sticky=document.querySelector('#sticky'),top=document.querySelector('.hero'),bottom=document.querySelector('#form-bottom');
if(sticky&&'IntersectionObserver' in window){
 const visible={top:true,bottom:false};
 const update=()=>{sticky.hidden=visible.top||visible.bottom;};
 new IntersectionObserver(([entry])=>{visible.top=entry.isIntersecting;update();}).observe(top);
 new IntersectionObserver(([entry])=>{visible.bottom=entry.isIntersecting;update();}).observe(bottom);
}
