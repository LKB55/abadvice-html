async function buildMenu() {
  try {
    const response = await fetch('/content/nav.json');
    const items = await response.json();
    const nav = document.getElementById('site-nav');
    const ul = document.createElement('ul');

    items.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.label;
      a.href = item.url;
      if (item.cta) a.classList.add('cta');
      li.appendChild(a);

      if (item.children) {
        const subUl = document.createElement('ul');
        item.children.forEach(child => {
          const subLi = document.createElement('li');
          const subA = document.createElement('a');
          subA.textContent = child.label;
          subA.href = child.url;
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }

      ul.appendChild(li);
    });

    nav.appendChild(ul);
  } catch (err) {
    console.error('Navigation load error', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  buildMenu();
  const burger = document.getElementById('burger');
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', () => {
    const menu = document.querySelector('#site-nav ul');
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
});
