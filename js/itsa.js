
var its_container_wrapper = document.createElement('div');
    its_container_wrapper.setAttribute("id", "its-wrapper");
    its_container_wrapper.style.background = 'white';
    its_container_wrapper.style.boxSizing = 'border-box';
    document.body.insertBefore(its_container_wrapper, document.body.firstChild);


// If I want a custom element to display messages
// Create an element with the id="its-wrapper"

//var its_container_wrapper = document.getElementById('its-wrapper');



//-// -------------- its.a -------------- //-//
var its = {
  
  // -- API Useage -- //
  // Description Output Options
  heading: function(ctx){
    its.appendContent('// ---------------- ' + ctx + ' --------------- //');
  },
  subheading: function(ctx){
    its.appendContent( '// -- ' + ctx + ' -- //');
  },
  linebreak: function(){
    its.appendContent( '// ---------------------------------------------------------------- //');
  },
  message: function(heading, message){
    var wrapper = document.createElement('div'),
        headingElement = document.createElement('div'),
        headingText = document.createTextNode(heading),
        messageElement = document.createElement('pre'),
        messageText = document.createTextNode(message);
    
    wrapper.style.position = 'relative';
    
    headingElement.appendChild(headingText);
    
    messageElement.appendChild(messageText);
    
    
    // Heading
    this.styleContent(headingElement);
    
    // Close Button
    this.createCloseButton(wrapper);
    
    this.styleObject(messageElement);

    messageElement.appendChild(messageText);
    wrapper.appendChild(headingElement);
    wrapper.appendChild(messageElement);
    its_container_wrapper.appendChild(wrapper);
  },
  // Clear The Entire Error Board
  clearAll: function(){
    document.getElementById('its-wrapper').innerHTML = '';
  },
  
  
  
  // -- Close Single Message Button -- //
  // Close Button Styles
  styleCloseButton: function(closeButton){
    closeButton.style.position = 'absolute';
    closeButton.style.top = '3px';
    closeButton.style.right = '3px';
    closeButton.style.zIndex = '10';
    closeButton.style.color = 'white';
    closeButton.style.padding = '2px 5px';
    closeButton.style.border = '1px solid white';
    closeButton.style.background = 'none';
  },
  // Create Close Button Element
  createCloseButton: function(parentContainer){
    var closeButton = document.createElement('button'),
        closeCtx = document.createTextNode('x');

    closeButton.appendChild(closeCtx);
    parentContainer.appendChild(closeButton);
    this.styleCloseButton(closeButton);
    this.removeSingleMessage(closeButton, parentContainer);
  },
  // Remove Single Message Functionality
  removeSingleMessage: function(closeButton, container){
    closeButton.onclick = function () { 
      container.parentNode.removeChild(container);
    };
  },
  
  
  
  // -- Standard Message Handeling -- //
  // Style the Message
  styleContent : function(container){
    container.style.backgroundColor = 'rgb(170,0,0)';
    container.style.color = 'white';
    container.style.display = 'block';
    container.style.padding = '5px 8% 5px 5px';
    container.style.width = '100%';
    container.style.margin = '1px';
    container.style.boxSizing = 'border-box';
    container.style.position = 'relative';
  },
  // Adds the Type the message context
  assembleContext: function(ctx, type){
    if(type){
      ctx = ctx + ' (' + type + ')';
    }else{
      ctx = ctx;
    }
    console.log(ctx);
    return ctx;
  },
  // Creates and Appends all the information for standard things
  appendContent : function(ctx, checkToAppendCloseButton){
    // Output Elements
    var container = document.createElement('div'),
        content = document.createTextNode(ctx),
        closeButton;
    
    // Pass false to disable type detection.
    // its.a(whatever, false);
    if(checkToAppendCloseButton !== false){
      this.createCloseButton(container);
    }
    
    // Set Output Class
    container.className += "its-a-message";
    
    
    // Style and Append
    this.styleContent(container);
    container.appendChild(content);
    its_container_wrapper.appendChild(container);
    
    //-- Insert the results as the first element in body
   its_container_wrapper.insertBefore(container, container.nextSibling);
  },
  
  
  
  // -- HTML Element Message Handeling -- //
  htmlElement:function(ctx, container){
    var wrapper = document.createElement('div'),
        heading = document.createElement('div'),
        headingText,
        pre = document.createElement('pre'),
        tmp = document.createElement('div'),
        ctxHeader = ctx.cloneNode(false),
        ctxCopyChildren = ctx.cloneNode(true),
        headerToString,
        elementToString;
    
    wrapper.style.position = 'relative';
    
    // Heading
    tmp.appendChild(ctxHeader);
    headerToString = document.createTextNode(tmp.innerHTML);
    heading.appendChild(headerToString);
    this.styleContent(heading);
    tmp.innerHTML = '';
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Convert html element to text
    tmp.appendChild(ctxCopyChildren);
    elementToString = document.createTextNode(tmp.innerHTML);
    this.styleObject(pre);

    pre.appendChild(elementToString);
    wrapper.appendChild(heading);
    wrapper.appendChild(pre);
    container.appendChild(wrapper);
  },
  
  
  
  // -- Object Message Handeling -- //
  // Object Container Styles
  styleObject: function( object ){
    object.style.padding = '10px';
    object.style.border = '3px solid rgb(170, 0, 0)';
    object.style.margin = '0';
    object.style.background = '#fff';
    object.style.overflow = 'scroll';
  },
  // Object Traversal and Nesting
  // Basically - loop through object properties
  // Create and Append List Item of Information
  // Each sub object is appended in a nested ul.
  processObject: function(key,value, objectContainer, objectFirstContainer, toggleTypeCheck){

    var objIterativeType = this.checkType(value),
        combined = ': ' + value + ' ',
        type = document.createElement('span'),
        typeText,
        text = document.createTextNode(combined),
        keyStrong = document.createElement('strong'),
        li = document.createElement('li'),
        propertyValueEl = document.createElement('span');
        keyText = document.createTextNode(key);

        if (toggleTypeCheck === false){
          typeText = document.createTextNode( '' );
        } else{
          typeText = document.createTextNode( '(' + objIterativeType + ')');
        }


    keyStrong.appendChild(keyText);
    
    propertyValueEl.appendChild(keyStrong);
    propertyValueEl.appendChild(text);
    
    li.appendChild(propertyValueEl);

    type.appendChild(typeText);
    type.style.color = 'rgb(170, 0, 0)';
    li.appendChild(type);

    
    objectFirstContainer.appendChild(li);

    objectContainer.appendChild(objectFirstContainer);
  },
  traverseObject: function(ctx, processObject, objectContainer, toggleTypeCheck){
    var objectFirstContainer = document.createElement('ul');
        objectFirstContainer.setAttribute('data-traverse','nested-properties');
        objectFirstContainer.style.display='block';


    for (var key in ctx) {
        its.processObject.apply(this, [key,ctx[key], objectContainer, objectFirstContainer, toggleTypeCheck]);
        if (ctx[key] !== null && typeof(ctx[key])=="object") {
          var objectCtx = ctx[key];
          this.traverseObject(objectCtx, its.processObject, objectFirstContainer, toggleTypeCheck );
        }
    }
    
  },

  // Group Object and Array Results
  groupObjectTogether: function( ctx, type, toggleTypeCheck ){
    var objectWrapper = document.createElement('div'),
        objectHeading = document.createElement('div'),
        objectHeadingText = document.createTextNode( type ),
        objectContainer = document.createElement('div');



    // Header
    objectHeading.appendChild(objectHeadingText);
    objectWrapper.style.position = 'relative';
    this.styleContent(objectHeading);

    this.createCloseButton(objectWrapper);

    if (type === 'htmlcollection'){
      this.processHTMLCollection(ctx, objectContainer);
    } else {

      // Traverse the object and process the results for display.
      this.traverseObject(ctx, this.processObject, objectContainer, toggleTypeCheck);
      this.styleObject(objectContainer);

      this.correctNestedObjectElements(objectContainer);
    }
    objectWrapper.appendChild(objectHeading);
    objectWrapper.appendChild(objectContainer);
    its_container_wrapper.appendChild(objectWrapper);
  },
  
correctNestedObjectElements: function(objectContainer){
  var nestedGrouping = objectContainer.querySelectorAll( '[data-traverse = nested-properties]' );
  
  for (var i = 1, len = nestedGrouping.length; i < len; i++){

    // Button so you can tab through everything and use spacebar
    // Thanks to Mr. Scott Vinkle for the feedback and education that made this possible.
    var levelExpandTitleAndButton = document.createElement('button');
    levelExpandTitleAndButton.className = 'has-child-list';
    levelExpandTitleAndButton.setAttribute('type', 'button');
    levelExpandTitleAndButton.style.cursor = 'pointer'; 
    levelExpandTitleAndButton.appendChild(nestedGrouping[i].previousSibling.firstChild);

    console.log(nestedGrouping[i].previousSibling);
    nestedGrouping[i].previousSibling.insertBefore(levelExpandTitleAndButton, nestedGrouping[i].previousSibling.firstChild);
    //nestedGrouping[i].previousSibling.firstChild.remove();
    nestedGrouping[i].previousSibling.appendChild(nestedGrouping[i]);
    nestedGrouping[i].parentNode.firstChild.setAttribute('class','has-child-list');

    levelExpandTitleAndButton.addEventListener("click", function(e){
      var childMenu = this.parentNode.getElementsByTagName('ul')[0];
      if (childMenu){
        if(childMenu.style.display == 'block'){
          childMenu.style.display = 'none';
        }else {
            childMenu.style.display = 'block';
        }
      }
    });
  }
},

  processHTMLCollection: function(ctx, objectContainer){
    for (var i = 0, len = ctx.length; i < len; i++){
      this.htmlElement(ctx[i], objectContainer);
    }
  },
  

  
  
  // -- Get the type of the input -- //
  checkType: function(global){
    var cache = {};
     return function(obj) {
        var key;
        return obj === null ? 'null' // null
            // window in browser or global in nodejs
            : obj === global ? 'global' 
            // basic: string, boolean, number, undefined, function
            : (key = typeof obj) !== 'object' ? key
            // DOM element
            : obj.nodeType ? 'object:DOMelement'
            // cached. date, regexp, error, object, array, math
            : cache[key = ({}).toString.call(obj)]
            // get XXXX from [object XXXX], and cache it
            || (cache[key] = key.slice(8, -1).toLowerCase()); 
    };
  }(),


  
 
  // -- Initialization function - its.a(thing); -- //
  // Controller Starts it all up - distributes the workload
  a: function(ctx, toggleTypeCheck){
    // Pass false to disable type detection.
    // its.a(whatever, false);
    var type = this.checkType(ctx);
    
    
    // Object/Array
    if( type === 'object' || type === 'array' || type === 'htmlcollection'){

      this.groupObjectTogether(ctx, type, toggleTypeCheck);
   
    // HTML Element
    } else if ( type === 'object:DOMelement' ){
      this.htmlElement(ctx, its_container_wrapper);
      
    // Variables, Strings, Numbers, Booleon
    }else{
      // Return value and type as string of anything other than an array or object.
      if( toggleTypeCheck === false ){
        type = '';
      }

      type = this.assembleContext(ctx, type);
      // Display the output
      this.appendContent(type);
    }
    
  },
  
};



// ==== TEST BED === //
// Copy and paste tests here
// Merge tests below after.

//its.message(
//  'its.a()', 
 // 'An unintrusive alert window with more information and custom messaging api.'
//);


var paragraphs = document.getElementsByTagName('p');
//its.a(paragraphs);

// ------- Usage Examples ------- //
// ------------------------------ //
  
// Default
// it.a(whatever);
  
// Pass in false to disable type detection
// its.a(whatever,false);

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
//its.a(x + ' × ' + y);

  

// -- Configure Type Detection Example -- //
var testDefaultMessage = 'Default Message';
//its.a(testDefaultMessage);
  
var testTypeDetectionOff = 'Type Detection set to False';
//its.a(testTypeDetectionOff,false);

  
// -- String Test --//
var texty = 'This is a String variable';
//its.a(texty);
  
// -- Number Test -- //
var number = 1;
//its.a(number);


// -- Number String Test -- //
var numberString = '1';
//its.a(numberString);


// -- Booleon Test -- //
var trueTest = true;
//its.a(trueTest);

var itsNotABooleon = 'true';
//its.a(itsNotABooleon);

var falseTest = false;
//its.a(falseTest);

var alsoNotABooleon = 'FALSE';
//its.a(alsoNotABooleon);


// -- Date Test -- //
var date = new Date();
//its.a(date);


// -- Array Test -- //
var newArray = [ 1, 'hello', true ];
//its.a(newArray);

// -- Array with objects -- //
var arrayWithObjects = [
  {
   "city": "Dallas",
   "state": "TX",
   "zip": 75201,
   "price": 162500
  },
  {
   "city": "New York",
   "state": "NY",
   "zip": 00010,
   "price": 962500
  }
];

//its.a(arrayWithObjects);
  

// -- Simple Object Test -- //
var ObjectTest =
    {
        "key1": {
          "1":"The value of key1 in ObjectTest"},
        "key2": "The value of key2 in ObjectTest",
        "key3": "The value of key3 in ObjectTest"
    };
//its.a(ObjectTest);


// -- Object containaining a variety of properties types -- //
var multiStructuredObject = { 
  foo: "bar",
  foo2: "foo2",
  arr: [1,2,3],
  subo: {
    foo2: "bar2",
    anotherfoo: "bar3",
    newArr:[1,2,3],
    subsubo: {
      foo3: "bar3"
    }
  }
};
//its.a(multiStructuredObject);





// -- Big Object Test -- //
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
its.a(bigobj, false);
its.a(bigobj);
