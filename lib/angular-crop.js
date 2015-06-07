(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jcrop'], factory);
	} else {
		window.angularCrop = factory();
	}
}(function () {
	function directive() {
		function link(scope, element, attrs) {
			function set(c) {
				scope.$eval(attrs.angularCropData + '.x1=' + c.x);
				scope.$eval(attrs.angularCropData + '.y1=' + c.y);
				scope.$eval(attrs.angularCropData + '.x2=' + c.x2);
				scope.$eval(attrs.angularCropData + '.y2=' + c.y2);

			}
			function onSelect(c) {
				if (!scope.$$phase) {
					scope.$apply(function () {
						set(c);
						scope.$eval(attrs.angularCropEvents + '.onSelect()');
					});
				}
			}
			function onChange(c) {
				if (!scope.$$phase) {
					scope.$apply(function () {
						set(c);
						scope.$eval(attrs.angularCropEvents + '.onChange()');
					});
				}
			}
			scope.$watch(attrs.angularCropData, function (data) {
				data = data || {x1: 0, y1: 0, x2: 150, y2: 150};
				element.width();
				element.Jcrop({
					onSelect: onSelect,
					onChange: onChange,
					bgColor: '#747474',
					bgOpacity: 0.4,
					aspectRatio: data.ratio ? data.ratio : null, 
					setSelect: [data.x1, data.y1, data.x2, data.y2]
				});
			});
		}
		return {
			link: link
		};
	}
	function service($timeout) {
		function noop() {}
		this.angularCrop = function (element, data, events) {
			function set(c) {
				data.x1 = c.x;
				data.y1 = c.y;
				data.x2 = c.x2;
				data.y2 = c.y2;
			}
			function onChange(c) {
				$timeout(function () {
					set(c);
					(events && events.onChange) ? events.onChange() : '';
				});
			}
			function onSelect(c) {
				$timeout(function () {
					set(c);
					(events && events.onSelect) ? events.onSelect () : ''
				});
			}
			element.width();
			element.Jcrop({
				onSelect: onSelect,
				onChange: onChange,
				bgColor: '#747474',
				bgOpacity: 0.4,
				aspectRatio: data.ratio, 
				setSelect: [data.x1, data.y1, data.x2, data.y2]
			});
		};
	}
	return {
		directive: directive,
		service: service
	};
}));
