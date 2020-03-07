const togglePopUp = () => {
	const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn'),
		popupContent = popup.querySelector('.popup-content'),
		popupContentRect =  popupContent.getBoundingClientRect(),
		popupContentWidth = popupContentRect.width;
	console.log(popupContentRect);
	popupBtn.forEach(elem => elem.addEventListener('click', () => {
		popup.style.display = 'block';
		if (screen.width > 768) {
			animationPopUp();
		}
	}));

	//popup Close
	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			popup.style.display = 'none';
		} else {
			target = target.closest('.popup-content');
			if (!target) {
				popup.style.display = 'none';
			}
		}
	});

	//Popup Animation function
	function animationPopUp() {
		let animationId;
		let count = -1200;
		popupContent.style.transform = `translate(${count}px)`;

		const animationFunc = () => {
			animationId = requestAnimationFrame(animationFunc);
			count += 50;
			if (count >= popupContentWidth - 50) {
				cancelAnimationFrame(animationId);
			}

			popupContent.style.transform = `translate(${count}px)`;
		};
		animationFunc();
	}
};

export default togglePopUp;