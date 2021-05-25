(function() {
  let findObjs = function(element, props, multiple) {
    let match = multiple ? [] : undefined;

    element.some(function(obj) {
      let allMatch = true;

      for (let prop in props) {
        if (!(prop in obj) || obj[prop] !== props[prop]){
          allMatch = false;
        }
      }

      if (allMatch) { 
        if (multiple) {
          match.push(obj)
        } else{
        match = obj;
        return true;
        }
      }
    });
    
    return match;
  };

  let _ = function(element) {
  
    let u = {
      last: function () {
        return element[element.length - 1]
      },

      first: function() {
        return element[0];
      },

      without: function() {
        let newArr = [];
        let args = Array.prototype.slice.call(arguments);

        element.forEach(num => {
          if (!args.includes(num)) {
            newArr.push(num)
          };
        });
        return newArr;

      },

      lastIndexOf: function(value) {
        let idx = -1;
        for (let i = element.length -1; i>=0; i--) {
          if (element[i] === value) {
            idx = i;
            break
          }
        }
        return idx;

      },

      sample: function(qty) {
        if (qty) {
          let arr = [];
          let num;
          
          for (let i = 0; i < qty; i++) {
            num = Math.floor(Math.random()*element.length);
            arr.push(element[num]);
            element=element.slice(0, num).concat(element.slice(num+1));
          }

          return arr;
        } else {
          return element[Math.floor(Math.random()*element.length)];
        }
      },

      findWhere(props) {
        return findObjs(element, props, false);
      },

      where(supplied) {
        return findObjs(element, supplied, true);
      },

      pluck(key) {
        //arr of values from the objects with the key matching
        return element.map(obj => {
          if (obj[key]) {
            return obj[key];
          }
        });
      },

      keys() {
        let arr = [];
        for (let key in element) {
          arr.push(key)
        }
        return arr;
      },

      values() {
        let arr = [];
        for (let key in element) {
          arr.push(element[key])
        }
        return arr;
      },

     pick() {
        let keys = Array.prototype.slice.call(arguments);
        let newObj = {};
        keys.forEach(key => newObj[key] = element[key]);
        return newObj;
      },

      omit() {
        let keys = Array.prototype.slice.call(arguments);
        let newObj = {};

        for (key in element) {
          if (!keys.includes(key)) {
            newObj[key] = element[key];
          }
        };
        
        return newObj;
      },

      has(prop) {
        if (Object.keys(element).includes(prop)) {
          return true;
        } else {
          return false;
        }
      },

    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method){
      u[method] = function () { _[method].call(u, element); };
    });

  return u;
  };

  window._ = _;
  _.range = function(start, end) {
    let arr = [];
    if (end) {
      for (let i = start; i < end; i++) {
        arr.push(i)
      }
    } else {
        for (let i = 0; i < start; i++) {
          arr.push(i)
        }
    }
    return arr;
  };

  _.extend = function() {
    let args = Array.prototype.slice.call(arguments);

    for (let i = args.length - 1; i > 0; i--) {
      let obj = args[i];
      for (let key in obj) {
        args[i-1][key] = obj[key]
      }
    }

    return arguments[0]
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1
  };

  _.isArray = function(obj) {
    return obj && Object.getPrototypeOf(obj) === Array.prototype;
  };

  _.isObject = function(obj) {
    let type = typeof obj;
    return obj && type === 'object' || type === 'function';
  };

  _.isFunction = function(obj) {
    let type = typeof obj;
    return type === 'function'
  };

  _.isBoolean = function(obj) {
    let type = toString.call(obj)
    return type === '[object Boolean]';
  };

  _.isString = function(obj) {
    let type = toString.call(obj);
    return type === '[object String]';
  };

  _.isNumber = function(obj) {
    let type = toString.call(obj);
    return type === '[object Number]'
  }
})();

