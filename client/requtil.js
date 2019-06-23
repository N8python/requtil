function ajax(url, options){
  return function ajax_requestor(callback, value = {
    url: "",
    options: {}
  }){
    return fetch(url || value.url, options || value.options).then(res => {
      const type = res.headers.get("content-type");
      if(type && type.includes("application/json")){
        return res.json();
      } else {
        return res.text();
      }
    }).then(data => {
      callback(data);
    })
  }
}
function log(...styles){
  return function log_requestor(callback, value){
    if(styles.length === 0){
      return console.log(value);
    }
    console.log(value, ...styles);
    callback({
      text: value,
      styles
    })
  }
}
function wait(amount){
  return function wait_requestor(callback, value){
    const waiter = setTimeout(function(){
      clearTimeout(waiter);
      callback(value);
    }, amount);
  }
}
function wait_until(method){
  return function wait_until_requestor(callback, value){
    const waiter = setInterval(function(){
      if(method()){
        clearInterval(waiter);
        callback(value);
      }
    }, 100);
  }
}


export default Object.freeze({
  ajax,
  log,
  wait,
  wait_until
});
