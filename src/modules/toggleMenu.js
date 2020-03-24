const toggleMenu = () => {

  const menu = document.querySelector('menu');

  // function for close and open menu
  const handlerMenu = () => menu.classList.toggle('active-menu');

  //Scroll links animate function
  function scroll(block, dur) {
    const endPoint = block.offsetTop;

    let idAnimate;
    let num = 0;

    function animateScroll() {
      idAnimate = requestAnimationFrame(animateScroll);

      // Function to increase scroll speed
      function duration(count) {
        if (num > (endPoint * 0.95) && count !== 1) {
          count /= 2;
        } else {
          if (endPoint > 4000) {
            count += 3;
          } else  if (endPoint > 3000) {
            count += 2;
          }
        }
        num += (count * 20);
      }

      duration(dur);
      document.documentElement.scrollTop = num;

      if (num > endPoint) {
        document.documentElement.scrollTop = endPoint;
        cancelAnimationFrame(idAnimate);
      }
    }

    idAnimate = requestAnimationFrame(animateScroll);
  }

  //All listeners for header
  document.addEventListener('click', event => {
    const target = event.target;
    //Main block
    if (target.closest('main') && !menu.classList.contains('active-menu')) {
      if (target.closest('.menu')) {
        // Open menu
        handlerMenu();
      } else if (target.closest('a[href="#service-block"]')) {
        //Scroll button to next slide at main block
        event.preventDefault();
        scroll(document.getElementById('service-block'), 2);
      }
    } else if (menu.classList.contains('active-menu')) {
      if (target.closest('menu') === null || target.classList.contains('close-btn')) {
        // Close menu
        handlerMenu();
      } else if (target.tagName === 'A' && !target.classList.contains('.close-btn')) {
        // Close menu and scroll to blocks of target-link
        event.preventDefault();
        handlerMenu();
        const targetId = target.getAttribute('href').substring(1);
        const block = document.getElementById(targetId);
        scroll(block, 3);
      }
    }
  });
};

export default toggleMenu;
