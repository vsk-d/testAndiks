var moduleCheckbox = (function(){

	'use strict';

	function _check () {
		var
			$this 			= $(this),
			checkBody 		= $('.checkbox'),
			rele 			= $('.checkbox__rele'),
			txtOn			= $('.checkbox__on'),
			txtOff			= $('.checkbox__off'),
			checkInput 		= $('.checkbox__input.hide');

		if  ( rele.hasClass('disableC') ) {

			console.log('checked');
			rele.removeClass('disableC'),
			txtOff.css("opacity", "0"),
			txtOn.css("opacity", "1"),
			checkInput.attr('checked', 'true');

		} else {
			console.log('unchecked');
			rele.addClass('disableC'),
			txtOff.css("opacity", "1"),
			txtOn.css("opacity", "0"),
			checkInput.removeAttr('checked');
		};


	}	
	if (document.addEventListener) {
  		document.addEventListener("touchstart", function () {
  		}, true);
}

		return {
		init : function () {
			this.setUpListeners();
			console.log ('check init')
		},
		setUpListeners : function () {
			$('.checkbox').on('click', _check);
			$('.checkbox__rele').on('tap', _check);
			// $('.checkbox').on("touchstart", _check);

			$('.checkbox__input.hide').on('change', _check);

		}
	};
}());

moduleCheckbox.init();


