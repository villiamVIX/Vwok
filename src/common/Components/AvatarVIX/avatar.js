/**
*@param widths 画布宽
*@param heights 画布高
*@param fontSize 字体大小
*@param id canvas id值
*@param className img ID值或者类名
*@param name 用户名
*@param index 索引值
*/
export function draw(widths,heights,fontSize,id,className,name,index){
	var names = name.charAt(0)
	var canvas = document.getElementById(id)
	canvas.width = widths
	canvas.height = heights
	var context = canvas.getContext('2d')
	const color1 = getColor()
	const color2 = getColor()
	if(color1 !== color2){
		context.fillStyle = color1
		context.fillRect(0,0,canvas.width,canvas.height)
		context.fillStyle = color2
	}
	//给画布字体加粗，注意：这里的 ' '是空格，如果没有空格或者为空字符串会不起作用，系统直接赋值默认值 10px sans-serif
	context.font = 'normal bold' + ' ' + fontSize + 'px sans-serif'
	context.textAlign = 'center'
	context.textBaseline = 'middle'
	context.fillText(names,fontSize,fontSize)
	var el = document.getElementById(className)
	//当传入的值为类名时，用这个
	//var el = document.getElementByClassName(className)[index]
	el.setAttribute('src',canvas.toDataURL('image/png'))
}
//获取动态的颜色
function getColor() {
	var str = '#'
	var colorArr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
	for(var i = 0; i < 6; i++) {
		var num = parseInt(Math.random() * 16)
		str += colorArr[num]
	}
	return str
}