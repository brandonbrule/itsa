// Change element

var its_container_wrapper;

var config = {
  expanded: true,
  type_detection: true
}

// Let the the user set a custom location for the wrapper
// so if theres an element with its-wrapper do stuff there.
if ( document.getElementById('its-wrapper') ) {
  its_container_wrapper = document.getElementById('its-wrapper');

// Create its-wrapper at the top of page.
} else {
  its_container_wrapper = document.createElement('div');
  its_container_wrapper.setAttribute("id", "its-wrapper");
  document.body.insertBefore(its_container_wrapper, document.body.firstChild);
}


// Styles Config
( function () {
  var style_tag = document.createElement('style');
  var styles = [
  '#its-wrapper{',
    'box-sizing: border-box;',
    'position: relative;',
    'z-index: 100;',
    'max-width: 100%;',
    'margin: 0px auto;',
    'line-height: 1.35;',
    'background: white;',
    'font-family: "Lucida Sans Typewriter";',
  '}',
  '.its-close-button{',
    'position: absolute;',
    'top: 3px;',
    'right: 3px;',
    'z-index: 10;',
    'color: white;',
    'padding: 2px 5px;',
    'border: 1px solid white;',
    'background: none;',
  '}',
  '.its-a-message{',
    'color: white;',
    'display: block;',
    'padding: 5px 1%;',
    'box-sizing: border-box;',
    'width: 100%;',
    'margin: 1px;',
    'position: relative;',
    'border: 3px solid rgb(170, 0, 0);',
    'background-color: rgb(170, 0, 0);',
  '}',
  '.its-a-object-container{',
    'padding: 10px;',
    'border: 3px solid rgb(170, 0, 0);',
    'margin: 0px;',
    'overflow: scroll;',
    'width: 100%;',
    'box-sizing: border-box;',
    'background: rgb(255, 255, 255);',
  '}',
  '.code-snippet{',
    'position: fixed;',
    'bottom: 0;',
    'left: 0;',
    'width: 100%;',
  '}',
  '#its-wrapper ul.closed{',
    'display: none;',
  '}',
  '#its-wrapper li{',
    'color:#555;',
    'position: relative;',
  '}',
  '#its-wrapper li button{',
    'position: absolute;',
    'left: -27px;',
    'width: 25px;',
    'height: 25px;',
  '}',
  '#its-wrapper li span{',
    'display: inline-block;',
  '}',
  '#its-wrapper li strong{',
    'color:#222;',
    'font-family: Arial, helvetica;',
    'font-size: 14px;',
    'display: inline-block;',
    'font-weight: 600;',
  '}'
  ].join('');

  style_tag.innerHTML = styles;
  document.getElementsByTagName('head')[0].appendChild(style_tag);
})();



//-// -------------- its.a -------------- //-//
var its = {

  type_check: true,
  collapsed: true,

  setConfig: function(config){
    this.type_check = config.type_check;
    this.collapsed = config.collapsed;
  },
  
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

    headingElement.setAttribute('class', 'its-a-message');
    headingElement.appendChild(headingText);
    
    messageElement.appendChild(messageText);
    
    // Close Button
    this.createCloseButton(wrapper);

    // Message
    messageElement.setAttribute('class', 'its-a-object-container');

    messageElement.appendChild(messageText);
    wrapper.appendChild(headingElement);
    wrapper.appendChild(messageElement);
    its_container_wrapper.appendChild(wrapper);
  },
  
  snippet: function(){
    var wrapper = document.createElement('div'),
        headingElement = document.createElement('div'),
        headingText = document.createTextNode('Test Code Snippet'),
        messageElement = document.createElement('textarea'),
        messageText = document.createTextNode('its.a("test")'),
        runScriptButton = document.createElement('button'),
        runScriptButtonText = document.createTextNode('Run Code');
    
    // Heading
    headingElement.setAttribute('class', 'its-a-message');
    headingElement.appendChild(headingText);
    wrapper.appendChild(headingElement);
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Message
    messageElement.setAttribute('class', 'its-a-object-container');
    messageElement.appendChild(messageText);
    wrapper.appendChild(messageElement);

    // Run Script Button
    runScriptButton.appendChild(runScriptButtonText);
    (function(){ 
      runScriptButton.style.position = 'absolute';
      runScriptButton.style.right = '25px';
      runScriptButton.style.top = '5px';
      wrapper.appendChild(runScriptButton);
    })();
    runScriptButton.addEventListener("click", function(e){
      ( new Function( messageElement.value ))();
      e.stopPropagation();
    });

    wrapper.setAttribute('class', 'code-snippet');

    // Append it all
    document.getElementsByTagName('body')[0].appendChild(wrapper);
  },
  // Clear The Entire Error Board
  clearAll: function(){
    its_container_wrapper.innerHTML = '';
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
  // Create Close Button Element
  createCloseButton: function(parentContainer){
    var closeButton = document.createElement('button'),
        closeCtx = document.createTextNode('x');

    closeButton.setAttribute('class', 'its-close-button');
    closeButton.appendChild(closeCtx);
    parentContainer.appendChild(closeButton);
    this.removeSingleMessage(closeButton, parentContainer);
  },
  // Remove Single Message Functionality
  removeSingleMessage: function(closeButton, container){
    closeButton.addEventListener('click', function(e){
      container.parentNode.removeChild(container);
      e.stopPropagation();
    });
  },
  
  
  
  // -- Standard Message Handeling -- //
  // Adds the Type the message context
  assembleContext: function(ctx, type){
    if(its.type_check){
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
    
    // Append
    container.appendChild(content);
    its_container_wrapper.appendChild(container);
    
    //-- Insert the results as the first element in body
   its_container_wrapper.insertBefore(container, container.nextSibling);
  },
  
  
  
  // -- HTML Element Message Handeling -- //
  htmlElement:function(ctx, container, iterator){
    var wrapper = document.createElement('div'),
        heading = document.createElement('div'),
        headingText,
        pre = document.createElement('pre'),
        tmp = document.createElement('div'),
        ctxHeader = ctx.cloneNode(false),
        ctxCopyChildren = ctx.cloneNode(true),
        headerToString,
        elementToString,
        str;
    
    wrapper.style.position = 'relative';
    
    // Heading
    heading.setAttribute('class', 'its-a-message');
    tmp.appendChild(ctxHeader);

    if (iterator === 'single-element'){
      pre.setAttribute('class', 'its-a-object-container');
      headerToString = document.createTextNode(tmp.innerHTML);
    } else{
      headerToString = document.createTextNode(tmp.innerHTML + ' [' + iterator + ']');
    }

    heading.appendChild(headerToString);
    tmp.innerHTML = '';
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Convert html element to text

    tmp.appendChild(ctxCopyChildren);
    elementToString = document.createTextNode(tmp.innerHTML);

    pre.appendChild(elementToString);
    wrapper.appendChild(heading);
    wrapper.appendChild(pre);
    container.appendChild(wrapper);
  },
  
  cookies: function(){
    console.log(document.cookie);
  },
  
  // -- Object Message Handeling -- //
  // Object Traversal and Nesting
  // Basically - loop through object properties
  // Create and Append List Item of Information
  // Each sub object is appended in a nested ul.
  processObject: function(key,value, objectContainer, objectFirstContainer){

    var objIterativeType = this.checkType(value),
        combined = ': ' + value + ' ',
        type = document.createElement('span'),
        typeText,
        text = document.createTextNode(combined),
        keyStrong = document.createElement('strong'),
        li = document.createElement('li'),
        propertyValueEl = document.createElement('span');
        keyText = document.createTextNode(key);
        typeText = document.createTextNode( '(' + objIterativeType + ')');


    keyStrong.appendChild(keyText);
    li.appendChild(keyStrong);

    if (objIterativeType !== 'array'){
      li.appendChild(text);
    }
    
    if(its.type_check){
      type.appendChild(typeText);
      type.style.color = 'rgb(170, 0, 0)';
      type.setAttribute('class', 'its-type');
      li.appendChild(type);
    }

    
    objectFirstContainer.appendChild(li);

    objectContainer.appendChild(objectFirstContainer);


  },

  traverseObject: function(ctx, processObject, objectContainer){
    var objectFirstContainer = document.createElement('ul');
        objectFirstContainer.setAttribute('data-traverse','nested-properties');

    if (this.collapsed !== false){
      objectFirstContainer.setAttribute('class', 'closed');
    }
    
    // Types inside an Object
    for (var key in ctx) {
      var property_value;

      if (ctx[key] === null){
        property_value = null;
        its.processObject.apply(this, [key, property_value, objectContainer, objectFirstContainer]);

      } else if (ctx[key] === undefined){
        property_value = undefined;
        its.processObject.apply(this, [key, property_value, objectContainer, objectFirstContainer]);

      // If it's an HTML element nested in an object
      } else if (ctx[key].nodeName){
        property_value = {
          el: ctx[key].nodeName
        };

        var nodes=[], values=[];
        var attrs = [];
        for (var att, i = 0, atts = ctx[key].attributes, n = atts.length; i < n; i++){
            att = atts[i];
            var att_type = att.nodeName;
            attrs.push( "[" + att.nodeName + '="' + att.nodeValue + '"]' );
        }
        property_value.attributes = attrs;
        
        its.processObject.apply(this, [key, property_value, objectContainer, objectFirstContainer]);
        this.traverseObject(property_value, its.processObject, objectFirstContainer );

      } else {

        property_value = ctx[key];
        its.processObject.apply(this, [key, property_value, objectContainer, objectFirstContainer]);
        if (property_value !== null && typeof(property_value)=="object") {
          this.traverseObject(property_value, its.processObject, objectFirstContainer );
        }
      }

    }
    
  },

  // Group Object and Array Results
  groupObjectTogether: function( ctx, type ){
    var objectWrapper = document.createElement('div'),
        objectHeading = document.createElement('div'),
        objectHeadingText = document.createTextNode( type ),
        objectContainer = document.createElement('div');


    // Header
    objectHeading.setAttribute('class', 'its-a-message');
    objectHeading.appendChild(objectHeadingText);
    objectWrapper.style.position = 'relative';

    // Object Content
    objectContainer.setAttribute('class', 'its-a-object-container');

    this.createCloseButton(objectWrapper);

    if (type === 'htmlcollection' || type === 'nodelist'){
      this.processHTMLCollection(ctx, objectContainer);
      
    } else {

      // Traverse the object and process the results for display.
      this.traverseObject(ctx, this.processObject, objectContainer);

      this.correctNestedObjectElements(objectContainer);
    }
    objectWrapper.appendChild(objectHeading);
    objectWrapper.appendChild(objectContainer);
    if (objectWrapper.getElementsByTagName('ul')[0]){
      objectWrapper.getElementsByTagName('ul')[0].removeAttribute('class');
    }
    its_container_wrapper.appendChild(objectWrapper);
  },
    
  correctNestedObjectElements: function(objectContainer){
    var nestedGrouping = objectContainer.querySelectorAll( '[data-traverse = nested-properties]' );
    
    for (var i = 1, len = nestedGrouping.length; i < len; i++){

      // Button so you can tab through everything and use spacebar
      // Thanks to Mr. Scott Vinkle for the feedback and education that made this possible.
      var li = nestedGrouping[i].previousSibling;
      var strong = li.firstChild;
      var property_name = strong.innerHTML;
      
      var expand_button = document.createElement('button');
      expand_button.setAttribute('type', 'button');
      expand_button.style.cursor = 'pointer';

      if (this.collapsed !== true){
        expand_button.innerHTML = '-';
      } else {
        expand_button.innerHTML = '+';
      }
      
      // Expand Button
      li.insertBefore(expand_button, strong);

      // Children List Menus appended
      li.appendChild(nestedGrouping[i]);

      expand_button.addEventListener("click", function(e){
        if ( e.target.nodeName === 'BUTTON'){
          var childMenu = e.target.parentNode.getElementsByTagName('ul')[0];
          if (childMenu){
            if ( childMenu.getAttribute('class') ){
              childMenu.removeAttribute('class');
              e.target.innerHTML = '-';
            } else {
              childMenu.setAttribute('class', 'closed');
              e.target.innerHTML = '+';
            }
          }
        }
        e.stopPropagation();
      });
    }
  },

  processHTMLCollection: function(ctx, objectContainer){
    for (var i = 0, len = ctx.length; i < len; i++){
      this.htmlElement(ctx[i], objectContainer, i);
    }
  },
  

  // -- Get the type of the input -- //
  checkType : function(arg){
    if (arg != null || arg != undefined){
      if (arg.nodeType){
        return 'DOMelement';
      }
    }

    return Object.prototype.toString.call(arg).replace('[object ', '').replace(']', '').toLowerCase();
  },

  // -- Initialization function - its.a(thing); -- //
  // Controller Starts it all up - distributes the workload
  a: function(ctx, toggleTypeCheck){
    var type = this.checkType(ctx);
    if (typeof(toggleTypeCheck)==='undefined') toggleTypeCheck = true;
    its.type_check = toggleTypeCheck;


    // Object/Array
    if( type === 'object' || type === 'array' || type === 'htmlcollection' || type === 'nodelist'){

      this.groupObjectTogether(ctx, type, toggleTypeCheck);
      console.log(ctx);
   
    // HTML Element
    } else if ( type === 'DOMelement' ){
      this.htmlElement(ctx, its_container_wrapper, 'single-element');

    // localStorage
    } else if ( type === 'storage' ){

      for (var key in ctx) {
        var localstoragetype = this.checkType(ctx[key]);
        var localStorageItemObject = JSON.parse( ctx[key] );
        this.groupObjectTogether(localStorageItemObject, key + ' (' + type + ')');
        console.log(key + ':' + ctx[key]);
      }
      
    // Variables, Strings, Numbers, Booleon
    }else{

      type = this.assembleContext(ctx, type);
      // Display the output
      this.appendContent(type);
    }

  },
  
};
