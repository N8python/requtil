function read_file({directory, pathComplete = true, encoding = "utf-8"}){
  return function read_file_requestor(callback, value) {
    return fs.readFile(pathComplete ? directory : directory + value,
    encoding,
    function (err, data) {
      return (
        err 
        ? callback(undefined, err)
        : callback(data)
      );
    });
  };
}

function write_file({path}) {
    return function write_file_requestor(callback, value) {
    return fs.writeFile(path,
    value,
    function (err, data) {
      return (
        err 
        ? callback(undefined, err)
        : callback(data)
      );
    });
  };
}
function append_file({path}) {
  return function append_file_requestor(callback, value) {
    return fs.appendFile(path, value, function (err, data) {
      return (
        err 
        ? callback(undefined, err)
        : callback(data)
      );
    })
  }
}
function node_to_requestor(func){
  return function requestor(callback, value){
    return func(...value, function (err, data) {
      return (
        err 
        ? callback(undefined, err)
        : callback(data)
      );
    });
  }
}

module.exports = Object.freeze({
  read_file,
  write_file,
  append_file,
  node_to_requestor
});
