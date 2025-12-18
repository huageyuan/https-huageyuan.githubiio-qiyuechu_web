  /*  当导航栏放大时候 菜单栏隐藏变成汉堡按钮*/
(()=>{
  const header=document.querySelector('.nav');

  /* 汉堡按钮 */
  const btn=document.createElement('div');
  btn.id='hamburger';
  btn.innerHTML='<span></span><span></span><span></span>';
  header.appendChild(btn);

  /* 抽屉容器 */
  const drawer=document.createElement('div');
  drawer.id='navDrawer';
 const menuClone=document.querySelector('.nav__center').cloneNode(true);
const searchClone=document.querySelector('.nav__right').cloneNode(true);
drawer.appendChild(menuClone);
drawer.appendChild(searchClone);

document.body.appendChild(drawer);

  /* 遮罩 */
  const mask=document.createElement('div');
  mask.id='drawerMask';
  document.body.appendChild(mask);

  /* 事件 */
  btn.addEventListener('click',()=>drawer.classList.toggle('open'));
  mask.addEventListener('click',()=>drawer.classList.remove('open'));
})();

  /* 放大图片（点击关闭） */
function showLarge(src){
  const img = document.getElementById('web03-large');
  img.src = src;                              // 换图
  document.getElementById('web03-overlay').classList.add('show');
}
function hideLarge(){
  document.getElementById('web03-overlay').classList.remove('show');
}