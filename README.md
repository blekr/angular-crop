# angular-crop
angular-crop is a [Jcrop](http://deepliquid.com/content/Jcrop.html) wrapper for [angular](https://angularjs.org/) framework. It offers a angular directive and a angular service that add image cropping functionality to your web application. The reason not to provide by angular module is that current angular module dependencies does not support load-on-demand, meaning that all module dependencies must be loaded before creating application module. load-on-demand feature is very significant in large SPA applications.

client-side cropping will be added in the future.

# Install
```console
npm install angular-crop 
```

# Dependencies
Jcrop

# Usage
angular-crop returns an object containing a directive method and a service method, you can feed it directively to angular.directive() and 
angular.service(). 
For example:
```html
<link rel="stylesheet" href="css/jquery.Jcrop.css">
<script type="text/javascript" src="js/jquery-1.11.0.js"></script>
<script type="text/javascript" src="js/jquery.Jcrop.min.js"></script>
<script type="text/javascript" src="js/angular-crop.js"></script>
```
```js
var app = angular.module('app', []);
app.directive('angularCrop', angularCrop.directive);
app.controller('controllerName', function () {
		$scope.data = {
x1: 0,
y1: 0,
x2: 200,
y2: 200
};
$scope.events = {
onChange: function () {
console.log('changed');
},
onSelect: function () {
console.log('selected');
}
};
});
```

