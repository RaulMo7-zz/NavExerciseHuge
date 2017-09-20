
var NavigationModule = (function () {

	function getNavigationStructure(uri) {
		Http.get(uri, onSucessGetNavStructure)
	}

	function onSucessGetNavStructure(data) {
		createNavigationStructure(data);
		mobileToggleBehaviour();
		hideMenu();
	}

	function createNavigationStructure(data) {
		var ulMain = document.createElement('ul');

		_.forEach(data.items, function (item) {

			var childElement = document.createElement('li');
			childElement.className = 'nav-element';
			var anchorElement = document.createElement('a');
			anchorElement.className = 'first-level';
			anchorElement.innerHTML = item.label;

			if (item.items.length > 0) {
				anchorElement.href = '/#/';
				childElement.appendChild(anchorElement);
				childElement.className += ' sub-menu';
				var subMenuElment = document.createElement('ul');
				subMenuElment.className = 'sub-nav-element';
				_subMenuBehaviour(childElement);
				_.forEach(item.items, function (subItem) {
					var subAnchorElement = document.createElement('a');
					subAnchorElement.innerHTML = subItem.label;
					subAnchorElement.href = subItem.url;
					subAnchorElement.target = '_blank';
					var subListElement = document.createElement('li');
					subListElement.appendChild(subAnchorElement);
					subAnchorElement.addEventListener('click', function (e) {
						hideMenuElements();
					});
					subMenuElment.appendChild(subListElement);
				});
				childElement.appendChild(subMenuElment);
			}

			else {
				anchorElement.href = item.url;
				anchorElement.target = '_blank';
				childElement.appendChild(anchorElement);
			}
			
			ulMain.appendChild(childElement);
		});

		document.getElementById('menu').appendChild(ulMain);
	}

	function mobileToggleBehaviour() {
		document.getElementById('menu-toggle').addEventListener('click', function () {
			document.getElementById('hg-nav-wrapper').classList.toggle('open-mobile');
			document.getElementById('hg-masking-mobile').classList.toggle('display');
			document.getElementById('menu-toggle').classList.toggle('close');
		});
	}

	function hideMenu() {
		window.onkeydown = function (e) {
			if (e.keyCode == 27) {
				hideMenuElements();
			}
		}
	}

	function hideMenuElements(){
		_removeClass('display', 'sub-nav-element', 'class');
		_removeClass('open', 'nav-element', 'class');
		_removeClass('display', 'hg-masking', 'id');
		_removeClass('open-mobile', 'hg-nav-wrapper', 'id');
		_removeClass('display', 'hg-masking-mobile', 'id');
		_removeClass('close', 'menu-toggle', 'id');
	}

	function _subMenuBehaviour(element) {

		element.addEventListener('click', function () {
			var maskingElement = document.getElementById('hg-masking');

			if (window.innerWidth >= 768) {
				_removeClass('display', 'sub-nav-element', 'class');
				_removeClass('open', 'nav-element', 'class');
				maskingElement.classList.add('display');
			}

			this.classList.toggle('open');
			this.querySelector('.sub-nav-element').classList.toggle('display');

			maskingElement.addEventListener('click', function () {
				_removeClass('display', 'sub-nav-element', 'class');
				_removeClass('open', 'nav-element', 'class');
				_removeClass('display', 'hg-masking', 'id');
			});
		});

		document.getElementById('hg-masking-mobile').addEventListener('click', function () {
			_removeClass('open-mobile', 'hg-nav-wrapper', 'id');
			_removeClass('display', 'hg-masking-mobile', 'id');
			_removeClass('close', 'menu-toggle', 'id');
		});
	}

	function _removeClass(className, selector, type) {
		if (type === 'id') {
			var x = document.getElementById(selector);
			x.classList.remove(className);
		}

		else {
			var x = document.querySelectorAll('.' + selector);
			[].forEach.call(x, function (n) {
				n.classList.remove(className);
			});
		}
	}

	return {
		getNavigationStructure: getNavigationStructure,
		createNavigationStructure: createNavigationStructure,
		mobileToggleBehaviour: mobileToggleBehaviour,
		hideMenu: hideMenu
	}

})();
