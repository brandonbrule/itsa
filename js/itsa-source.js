var its_container_wrapper = document.createElement('div');
    its_container_wrapper.setAttribute("id", "its-wrapper");
    its_container_wrapper.style.background = 'white';
    its_container_wrapper.style.boxSizing = 'border-box';
    its_container_wrapper.style.position = 'relative';
    its_container_wrapper.style.zIndex = '100';
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

  setFixedPosition: function(){
    its_container_wrapper.style.position = 'fixed';
    its_container_wrapper.style.top = '0';
    its_container_wrapper.style.left = '0';
    its_container_wrapper.style.width = '100%';
  },
  
  setDefaultPosition: function(){
    its_container_wrapper.style.position = 'relative';
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
    
    li.appendChild(keyStrong);
    li.appendChild(text);
    

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
    console.log(ctx);
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
      console.log(ctx);
   
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