(function(){
  function init(){
    var els=document.querySelectorAll('.c-heading,.c-sub-heading,.c-paragraph,.c-image,.c-video,.c-button,[id^=button-]');
    if(!('IntersectionObserver' in window)){return}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('gu-in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){el.classList.add('gu-reveal');io.observe(el)});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){setTimeout(init,600)})}
  else{setTimeout(init,600)}
})();
