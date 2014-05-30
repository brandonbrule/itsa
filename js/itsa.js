var its = {
  styleContent : function(container, closeButton){
    // Container Styles
    container.style.backgroundColor = 'rgb(170,0,0)';
    container.style.color = 'white';
    container.style.display = 'block';
    container.style.padding = '5px 8% 5px 5px';
    container.style.width = '92%';
    container.style.margin = '1px';
    container.style.position = 'relative';
    
    // Close Button Style
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5%';
    closeButton.style.right = '0.85%';
  },
  appendContent : function(ctx){
    // Output Elements
    var errorContainer = document.getElementById('its-wrapper'),
        container = document.createElement('div'),
        content = document.createTextNode(ctx),
        closeButton = document.createElement('button'),
        closeCtx = document.createTextNode('x');
    
    // Assemble the view output
    container.appendChild(content);
    container.appendChild(closeButton);
    closeButton.appendChild(closeCtx);
    errorContainer.appendChild(container);
    
    container.className += "its-a-message";
    
    //-- Click to close
    this.removeThisMessage(closeButton, container);
    
    // The Output Container Styles
    this.styleContent(container, closeButton);
    
    //-- Insert it all as the first element in body
    errorContainer.insertBefore(container, container.nextSibling);
  },
  assembleContext: function(ctx, type){
    if(type){
      ctx = ctx + ' | Type: ' + type + ' | Caller: callerName | Line: 102 |';
    }else{
      ctx = ctx;
    }
    return ctx;
  },
  removeThisMessage: function(closeButton, container){
    closeButton.onclick = function () { 
      container.parentNode.removeChild(container);
    };
  },
  clearAll: function(){
    document.querySelectorAll(".class");
  },
  processObject: function(key,value){
    var objIterativeType = this.checkType(value);
    var combined =  
        key +
        " : " + 
        value + 
        " | Type: " + objIterativeType;
    this.appendContent(combined);
  },
  traverseObject: function(o, processObject){
    for (var i in o) {
        processObject.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            var iteration = o[i];
            this.traverseObject(iteration,processObject);
        }
    }
  },
  a: function(ctx, toggleTypeCheck){
    var type = '';
    
    if(toggleTypeCheck === false){
      type = ''; 
    }else{
      // Attach type (object, number, array, string, null)
      type = this.checkType(ctx);
    }
    // Once the type is attached the output becomes a string.
    // Were avoiding turning objects into strings.
    // This allows objects to be more easily inspected.
    // The object breakdown comes later.
    if(type === 'object'){
      type = ctx; 
      this.appendContent(type);
      this.traverseObject(type,this.processObject)
    }else{
      type = this.assembleContext(ctx, type);
      // Turn on detection for console.log
      //console.log(type);
      this.appendContent(type);
    }
  },
  checkType: function(global){
    var cache = {};
     return function(obj) {
        var key;
        return obj === null ? 'null' // null
            : obj === global ? 'global' // window in browser or global in nodejs
            : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
            : obj.nodeType ? 'object:DOMelement' // DOM element
            : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
            || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
    };
  }(this)
};


var elcontainer = document.createElement('div');
    elcontainer.setAttribute("id", "its-wrapper");
    document.body.insertBefore(elcontainer, document.body.firstChild);

//-- Number Test
var number = 1;
its.a(number);

//-- Number String Test
var numberString = '1';
its.a(numberString);

var objectIdentifier = { 
  foo:"bar",
  foo2: "foo2",
  arr:[1,2,3],
  subo: {
    foo2:"bar2",
    anotherfoo:"bar3",
    newArr:[1,2,3],
    subsubo: {
      foo3: "bar3"
    }
  }
};
its.a(objectIdentifier);



/*

//-- Number Test
var number = 1;
its.a(number);

//-- Number String Test
var numberString = '1';
its.a(numberString);


// -- Usage Examples -- //

//-- Variable test
var texty = 'This is a String variable';
//-- False doesn't tell you what kind it is.
its.a(texty,false);

//-- Number Test
var number = 1;
//its.a(number);

//-- Number String Test
var numberString = '1';
//Its.A(numberString);

//-- Date Test
var date = new Date();
its.a(date);


//--  Body Element Test
its.a(document.body);


//-- Element Test
var p = document.createElement('p');
//Its.A(p);


//-- Array Test
var arr = [
  "Eggs", 
  "Milk"
];
its.a(arr);

//-- Object Test
var ObjectTest =
    {
        "key1": {
          "1":"The value of key1 in ObjectTest"},
        "key2": "The value of key2 in ObjectTest",
        "key3": "The value of key3 in ObjectTest"
    };
its.a(ObjectTest);


//-- Empty Object
var emptyObj = {};
//Its.A(emptyObj);


var o = { 
  foo:"bar",
  foo2: "foo2",
  arr:[1,2,3],
  subo: {
    foo2:"bar2",
    anotherfoo:"bar3",
    newArr:[1,2,3],
    subsubo: {
      foo3: "bar3"
    }
  }
};
its.a(o);

var bigobj = {
  "id.2467": 2467,
  "businessId.2467": [1341,222,32,444],
  "city.2467": "Austin",
  "state.2467": "TX",
  "zip.2467": 78704,
  "country.2467": "us",
  "lat.2467": 30.24278,
  "lon.2467": {
    "id.4524": 4524,
    "businessId.4524": 1791,
    "city.4524": "Austin",
    "state.4524": "TX",
    "zip.4524": 78613,
    "country.4524": null,
    "lat.4524": 30.530402,
    "lon.4524": -97.812738,
    "id.348": {
      "businessId.348": 241,
      "city.348": "Austin",
      "state.348": "TX",
      "zip.348": 78756,
      "country.348": "us",
      "lat.348": 30.307886,
      "lon.348": -97.74127,
      "id.1895": 1895,
      "businessId.1895": 1140,
      "city.1895": "Austin",
      "state.1895": "TX",
      "zip.1895": 73301,
      "country.1895": "us",
      "lat.1895": 30.268039,
      "lon.1895": -97.743193,
      "id.4030": 4030,
      "businessId.4030": 1491,
      "city.4030": "Austin",
      "state.4030": "TX",
      "zip.4030": null,
      "country.4030": null,
      "lat.4030": 30.284772,
      "lon.4030": -97.737265,
      "id.2965": 2965,
      "businessId.2965": 672,
      "city.2965": "Lubbock",
      "state.2965": "TX",
      "zip.2965": null,
      "country.2965": null,
      "lat.2965": 33.578015,
      "lon.2965": -101.791996,
      "id.305": 305
    }
  },
  "businessId.305": 209,
  "city.305": "Austin",
  "state.305": "TX",
  "zip.305": 78701,
  "country.305": "us",
  "lat.305": {
    "lon.305": -97.742081,
    "id.3031": 3031,
    "businessId.3031": 1629,
    "city.3031": "Austin",
    "state.3031": "TX",
    "zip.3031": 78705,
    "country.3031": null,
    "lat.3031": 30.282835,
    "lon.3031": -97.741605,
    "id.1143": {
      "lat.1143": 0,
      "lon.1143": 0,
      "id.2147": 2147,
      "businessId.2147": 1243,
      "city.2147": "Austin",
      "state.2147": "TX",
      "zip.2147": 78752,
      "country.2147": "us",
      "lat.2147": 0,
      "lon.2147": 0,
      "id.4205": 4205,
      "businessId.4205": 244,
      "city.4205": "Austin",
      "state.4205": "TX",
      "zip.4205": null,
      "country.4205": {
        "country.1143": "us",
        "country.4223": null,
        "lat.4223": 34.032773,
        "lon.4223": -84.340744,
        "id.4330": 4330,
        "businessId.4330": 675,
        "city.4330": "Austin",
        "state.4330": "TX",
        "zip.4330": 78749,
        "country.4330": null,
        "lat.4330": 30.223876,
        "lon.4330": -97.839455,
        "id.2946": 2946,
        "businessId.2946": 422,
        "city.2946": "Austin",
        "state.2946": "TX",
        "zip.2946": 78722,
        "country.2946": null,
        "lat.2946": 30.283645,
        "lon.2946": -97.722516,
        "id.1908": 1908,
        "businessId.1908": {
          "city.1908": "Austin",
          "state.1908": "TX",
          "zip.1908": 78702,
          "country.1908": "us",
          "lat.1908": 0,
          "lon.1908": 0,
          "id.4202": 4202,
          "businessId.4202": 908,
          "city.4202": "Austin",
          "state.4202": "TX",
          "zip.4202": 78735,
          "country.4202": null,
          "lat.4202": 30.239411,
          "lon.4202": -97.831761,
          "id.3986": 3986,
          "businessId.3986": 1393,
          "city.3986": "Austin",
          "state.3986": "TX",
          "zip.3986": 78748,
          "country.3986": {
            "lat.3986": 30.173342,
            "lon.3986": -97.821909,
            "id.1337": 1337,
            "businessId.1337": 866,
            "city.1337": "Austin",
            "state.1337": "TX",
            "zip.1337": 78704,
            "country.1337": "us",
            "lat.1337": 30.235404,
            "lon.1337": -97.741482,
            "id.4003": 4003,
            "businessId.4003": 842,
            "city.4003": "Austin",
            "state.4003": "TX",
            "zip.4003": 78701,
            "country.4003": null,
            "lat.4003": 30.265605,
            "lon.4003": -97.74829,
            "id.2164": 2164,
            "businessId.2164": {
              "lat.2645": 30.497891,
              "lon.2645": -97.775882,
              "id.2430": 2430,
              "businessId.2430": 1315,
              "city.2430": "Austin",
              "state.2430": "TX",
              "zip.2430": 78705,
              "country.2430": "us",
              "lat.2430": 0,
              "lon.2430": 0,
              "id.1253": 1253,
              "businessId.1253": 799,
              "city.1253": "Austin",
              "state.1253": "TX",
              "zip.1253": 78704,
              "country.1253": "us",
              "lat.1253": 0,
              "lon.1253": 0,
              "id.2703": 2703,
              "businessId.2703": 1474,
              "city.2703": "Austin",
            },
            "city.2164": "Austin",
            "state.2164": "TX"
          }
        },
      },
      "lat.4205": 30.297089,
      "lon.4205": -97.741558,
      "id.4223": 4223,
      "businessId.4223": 943,
      "city.4223": "Roswell",
      "state.4223": "GA",
      "zip.4223": 30076
    },
    "businessId.1143": 720,
    "city.1143": "Austin",
    "state.1143": "TX",
    "zip.1143": 78752
  }
};
//its.a(bigobj);
*/
