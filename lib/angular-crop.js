(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'jcrop'], factory);
	} else {
		window.angularCrop = factory(window.$);
	}
}(function ($) {
	function directive($timeout) {
		function link(scope, element, attrs) {
			function set(c) {
				scope.$eval(attrs.cropData + '.x1=' + c.x);
				scope.$eval(attrs.cropData + '.y1=' + c.y);
				scope.$eval(attrs.cropData + '.x2=' + c.x2);
				scope.$eval(attrs.cropData + '.y2=' + c.y2);
			}
			function onSelect(c) {
				set(c);
				scope.$eval(attrs.cropEvents + '.onSelect()');
			}
			function onChange(c) {
				set(c);
				scope.$eval(attrs.cropEvents + '.onChange()');
			}
			scope.$watch(attrs.cropData, function (data) {
				$(element).Jcrop({
					onSelect: onSelect,
					onChange: onChange,
					bgColor: '#747474',
					bgOpacity: 0.4,
					aspectRatio: data.ratio, 
					setSelect: [data.x1, data.y1, data.x2, data.y2]
				});
			});
		}
		return {
			link: link
		};
	}
	function serivce($timeout) {
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
					(events || events.onChange || noop)();
				});
			}
			function onSelect(c) {
				$timeout(function () {
					set(c);
					(events || events.onSelect || noop)();
				});
			}
			$(element).Jcrop({
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
		serivce: service
	};
}));
