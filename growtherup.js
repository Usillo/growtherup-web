(function(){
  // Ruta base = carpeta de este mismo script (sirve en jsDelivr y en el preview local)
  var me=document.currentScript||[].slice.call(document.scripts).filter(function(s){return /growtherup\.js/.test(s.src)})[0];
  var base=me?me.src.replace(/[^\/]*$/,''):'';

  // Flechas: imagen nueva pensada para fondo oscuro
  function swapArrows(){
    var img=document.querySelector('#image-I5qgae5dv7 img');
    if(!img||!base||img.getAttribute('data-gu'))return;
    img.setAttribute('data-gu','1');img.removeAttribute('srcset');img.loading='eager';
    img.src=base+'flechas.webp';
  }

  // Aparición suave al hacer scroll
  function reveal(){
    var els=document.querySelectorAll('.c-heading,.c-sub-heading,.c-paragraph,.c-image,.c-video,[id^=button-]');
    if(!('IntersectionObserver' in window))return;
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('gu-in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){el.classList.add('gu-reveal');io.observe(el)});
  }

  function init(){swapArrows();reveal();
    // GHL puede volver a pintar la imagen: reintenta un momento
    var n=0,t=setInterval(function(){swapArrows();if(++n>10)clearInterval(t)},700)}
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){setTimeout(init,600)})}
  else{setTimeout(init,600)}
})();
