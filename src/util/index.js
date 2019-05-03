/**
 * 
 * @param {*} vm  vue实例对象 一般传入this
 * @param {*} key  需要回复的对象 字符串类型
 */
export function resetData(vm,key){
    Object.assign(vm.$data[key], vm.$options.data()[key]);
}

export function resetForm(vm){
    Object.assign(vm.$data, vm.$options.data())
}



/**
 *  用于方便提交对象类型的数组,把数组对象转换为{key_0:{},key_1:{}}
 * @param {*} key 
 * @param {*} arr 
 */
export function handlePostObjArr(key,arr){
    var size = arr.length;
    var obj = {
      _size:size
    };
    for(var i = 0 ; i < size ;i ++){
      obj[key+'_'+i] = arr[i];
    }
    return obj;
  }
  
  

