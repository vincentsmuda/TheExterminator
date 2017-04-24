(function() {
	document.addEventListener('DOMContentLoaded', function() {
		document.getElementById('exterminator__trigger').addEventListener('click', function (e) {
			e.preventDefault();
			var extTarget = document.getElementById('exterminator__body');
			this.classList.toggle('menu-is-open');
			extTarget.classList.toggle('is-visible');
		});
	});
})();
