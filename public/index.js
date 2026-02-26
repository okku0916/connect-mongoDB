window.addEventListener('DOMContentLoaded', (event) => {
	document.querySelectorAll('.user-name').forEach((elem) => {
		elem.addEventListener('click', (event) => {
			alert(event.target.innerHTML);
		});
	});
	document .querySelector ('.send-button' ).addEventListener ('click' , (event) =>
		{
			const inputValue = document.querySelector('.input-text').value;
			fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: inputValue }) })
		});
});
