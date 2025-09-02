(function(){
  try{
    var r=document.referrer||'';
    if(!r) return;
    var u=new URL(r,location.origin);
    if(!u.pathname.endsWith('/course/section.php')) return;
    var fromId=new URLSearchParams(u.search).get('id');
    document.querySelectorAll('[data-eli-back]').forEach(function(c){
      var ids=(c.getAttribute('data-eli-back')||'').split(',').map(function(s){return s.trim()});
      if(ids.indexOf(fromId)>-1) c.hidden=false;
    });
  }catch(e){}
})();
