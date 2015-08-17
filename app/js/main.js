// Объявляем глобальные переменны

var _var = (function() {
    return {
        checkBody: 		'.checkbox',
        rele: 			$('.checkbox__rele'),
        txtOn:			$('.checkbox__on'),
        txtOff:			$('.checkbox__off'),
        checkInput: 	$('.checkbox__input.hide'),
        currentVal: 	0,
    };
})();

// ======== Модуль Чекбокса ==========
// ===================================

var moduleCheckbox = (function(){

	'use strict';

	function _check () {
		var
			$this 			= $(this);
					
		if  ( _var.rele.hasClass('disableC') ) {

			window.console.log('checked');
			_var.rele.removeClass('disableC'),
			_var.txtOff.css("opacity", "0"),
			_var.txtOn.css("opacity", "1"),
			_var.checkInput.attr('checked', 'true');

		} else {
			window.console.log('unchecked');
			_var.rele.addClass('disableC'),
			_var.txtOff.css("opacity", "1"),
			_var.txtOn.css("opacity", "0"),
			_var.checkInput.removeAttr('checked');
		};


	}	
	if (document.addEventListener) {
  		document.addEventListener("touchstart", function () {
  		}, true);
}

		return {

		init : function () {
			this.setUpListeners();
			window.console.log ('check init')
		},

		setUpListeners : function () {
			$(_var.checkBody).on('click', _check);
			$(_var.rele).on('touch', _check);
			$(_var.checkBody).on("touchstart", _check);
			$('.checkbox__input.hide').on('change', _check);

		}
	};
}());

moduleCheckbox.init();

// ======== Модуль Инпута ==========
// ===================================

var moduleInput = (function(){
		window.console.log('вал:', _var.currentVal);
		// изменяем загрузку через введения в инпут с клавы
		function _enterInput () {
			var val = parseInt($(this).val());
  				$circle = $('#svg #bar');

if (isNaN(val)) {
   val = 0; 
  }
  else{
    var r = $circle.attr('r');
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    var pct = ((100-val)/100)*c;
    
    $circle.css({ strokeDashoffset: pct});
    window.console.log (val);
    $('#cont').attr('data-pct',val);
    document.getElementById("perc__main").innerHTML = val;
    _var.currentVal = val;
    window.console.log('последний вал:', _var.currentVal);
  }

		}

		  // Запрещаем вводить буквы в инпуты
		function _keyPressNumber(e) {
  
        	if (e.which > 57 || e.which < 48) {
                return false;
            } 
         }

         // Изменяем загрузку через щелчек или тап

        function _upInput() {
  			var val = _var.currentVal,
  				$circle = $('#svg #bar'),
  				step = 1,
  				r = $circle.attr('r');
  				c = Math.PI*(r*2);
  				newVal = val + step;
  				
      				
					if (newVal < 101) {
							var pct = ((100-newVal)/100)*c;
							$circle.css({ strokeDashoffset: pct});
    						$('#cont').attr('data-pct',newVal);
    						document.getElementById("perc__main").innerHTML = newVal;
    						_var.currentVal = newVal;

						};
         }

         // а теперь на скролл
         function _scrollInput() {
         	console.log('mouseenter');
  			
        var wheel = document.getElementById('wheel');


function report(ammout) {
			var val = _var.currentVal,
  				$circle = $('#svg #bar'),
  				r = $circle.attr('r');
  				c = Math.PI*(r*2);
  				newVal = val + ammout;

  						if (newVal < 101) {
							var pct = ((100-newVal)/100)*c;
							$circle.css({ strokeDashoffset: pct});
    						$('#cont').attr('data-pct',newVal);
    						document.getElementById("perc__main").innerHTML = newVal;
    						_var.currentVal = newVal;

    						if (_var.currentVal < 1) { _var.currentVal = 1;}
						};
}

function callback(event) {
    var normalized;
    if (event.wheelDelta) {
        normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
    } else {
        var rawAmmount = event.deltaY ? event.deltaY : event.detail;
        normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
    }
    report(normalized);
}

var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
window.addEventListener(event, callback);


         }

         // По движению мыши при зажатой кнопке

        function _mouseInput() {
  			console.log('зажал')

  			var lastX; // Последняя позиция мыши
  			var rect = document.querySelector("div");

  			rect.addEventListener("mousedown", function(event) {
    			if (event.which == 1) {
      			lastX = event.pageX;
      			addEventListener("mousemove", _moved);
      			event.preventDefault(); // Запретим выделение
    		}
  		});
  			function _moved(event) {
   			 if (event.which != 1) {
      			removeEventListener("mousemove", _moved);
   			 } else {
   			 		var lastX = 0;
      				var dist = event.pageX - lastX;
      				var newWidth = Math.abs(Math.round( (Math.max(10, rect.offsetWidth + dist) - 1000) / 10) - 18);
      				if (newWidth > 100) { newWidth = 100;}

      				var     $circle = $('#svg #bar'),
  							r = $circle.attr('r');
  							c = Math.PI*(r*2);
  							
      				var pct = ((100-newWidth)/100)*c;
      				$circle.css({ strokeDashoffset: pct});
    				$('#cont').attr('data-pct',newWidth);
      				document.getElementById("perc__main").innerHTML = newWidth;
      				lastX = newWidth;
      				_var.currentVal = lastX;
    			}
  			}

         }

// ======== Модуль Слайдера ==========
// ===================================

		function _slider() {

				console.log("sadfasd");

          
			var lasteX = 0,
          releW =document.getElementById("rele").offsetWidth;
          curentPosDef = 50,
          curentPos = 50,
          slWidth = document.getElementById("slider").offsetWidth;
  			var sl = document.getElementById("slider");

  			sl.addEventListener("mousedown", function(event) {
    			if (event.which == 1) {
      			lasterX = event.pageX;
      			addEventListener("mousemove", _moved);
      			event.preventDefault(); // Запретим выделение
    		}
  		});
  			function _moved(event) {
   			 if (event.which != 1) {
      			removeEventListener("mousemove", _moved);
   			 } else {
            var $rele = $('#rele'),
                $leftSl = $('#slide__left'),
                $rightSl = $('#slide__right');
   			 		var dist = event.pageX - lasteX;
      				var newPos = Math.round(((lasteX + dist) - (curentPos * 3 ))  / 2);
      				if (newPos > 100) { newPos = 100;}
              if (newPos < 0) { newPos = 0;}

              $rele.css({ left: newPos + '%'});

              if (newPos>93) {
                  console.log (">>>");
                  $rele.css({ left: Math.abs((newPos - releW/3)) + '%'});
                }
              
              $rightSl.css({ left: newPos + '%'});
              $rightSl.css({ width: Math.abs((newPos - (curentPosDef*2))) + '%'}); 

      				lasteX = newPos;
              $('.slider__input.hide').attr('val',lasteX);
              console.log(lasteX);
      			}
    			}
         }

			return {

		init : function () {
			this.setUpListeners();
			window.console.log ('app init')
		},

		setUpListeners : function () {
			// setTimeout(200);
			$('#cont').on('click', _upInput);
			$('#cont').on('touch', _upInput);
			$('#cont').mouseenter(_scrollInput);
			$('#cont').mousedown(_mouseInput);
			$('#percent').on('keypress', _keyPressNumber);
			$('#percent').on('change', _enterInput);
			$('#rele').mousedown(_slider);

			}
	};
}());

moduleInput.init();



