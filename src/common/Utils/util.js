
export const debounce = (fn, delay = 800) => { //默认800毫秒
	var timer;
	return function() {
		var args = arguments;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args); // this 指向vue
		}, delay);
	};
}
