angular.module('editors', []).
directive('editor', [function(){
	return {
		restrict: 'E',
		templateUrl: 'editor.html',
		scope: { notes: '=' },
		link: function(scope, elm, attrs) {
			scope.notes = scope.notes || [ { text: undefined, focus: true } ];
    
    		scope.add = function (event) {
        		scope.notes.push({ text: undefined, focus: true });
    		};

    		scope.remove = function(index) {
    			console.log('remove', index);
    			if (index > 0) {
    				scope.notes.splice(index, 1);
    				scope.notes[index-1].focus = true;
    			} else {
    				scope.notes[index].focus = true
    			}
    			console.log('after remove', scope.notes);
    		};
		}
	};
}]).
directive('contenteditable', function () {
   'use strict';
   return {
       require: 'ngModel',
       link: function (scope, elm, attrs, ctrl) {
           // view -> model
           elm.bind('keypress', function (event) {
               var enter =  event.which === 13,
                   esc = event.which === 27;

               if (enter || esc) {
                   event.preventDefault();
                   elm.blur();
                   scope.$apply(function () {
                       console.log('setting view value', elm.html());
                       ctrl.$setViewValue(elm.html());
                       if (attrs.onEditEnd) {
                           scope.$eval(attrs.onEditEnd);
                       }
                   });
               } else {
                   scope.$apply(function () {
                       console.log('setting view value', elm.html());
                       ctrl.$setViewValue(elm.html());   
                   });
               }
               
               
           });


           elm.bind('keyup', function(event) {
           		var backspace = event.which === 8,
           			empty = elm.html().trim() === '';

           		if (backspace && empty) {
               		event.preventDefault();
               		elm.blur();
               		scope.$apply(function () {
                       console.log('setting view value', elm.html());
                       ctrl.$setViewValue(elm.html());
                       if (attrs.onDelete) {
                           scope.$eval(attrs.onDelete);
                       }
                   });

               } 
           });

           // model -> view
           ctrl.$render = function () {
               console.log('render with', ctrl.$viewValue);
               elm.html(ctrl.$viewValue);
           };
           
       }
   };
}).
directive('focused', function () {
    return function (scope, elm, attrs) {
        attrs.$observe('focused', function (value) {
            if (value) {
                elm.focus();
            } else {
                elm.blur();
            }
        });
    };
});


(function ($) {
	$(document).on('change keydown keypress input', '*[data-placeholder]', function() {
		if (this.textContent) {
			this.setAttribute('data-div-placeholder-content', 'true');
		}
		else {
			this.removeAttribute('data-div-placeholder-content');
		}
	});
})(jQuery);


    