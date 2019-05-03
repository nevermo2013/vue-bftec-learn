function save(key,v){
	window.localStorage.setItem(key,JSON.stringify(v));
}

function get(key){
	return JSON.parse(window.localStorage.getItem(key));
}

function del(key){
	window.localStorage.removeItem(key);
}

export default {
	save,
	get,
	del
}