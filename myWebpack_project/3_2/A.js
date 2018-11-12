
// es module
import aa from "./B";

// commonjs
var c = require("./C");

//  amd
require(['./D'],function(muti){
	
	console.log("乘法"+ muti(2,4) );
	
})


	console.log("减法"+ c(5,4) );

	console.log("加法"+ aa(5,3) );
	
	
	
	
	
	
	
	
	
	
	
	
