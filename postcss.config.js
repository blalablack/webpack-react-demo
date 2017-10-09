module.exports = {
    plugins: [
    	//自动加前缀插件
        require('autoprefixer')({
        	broswers:['last 5 versions']//浏览器版本，根据自己需求查找
        })
    ]
}