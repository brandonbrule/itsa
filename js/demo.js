// ==== TEST BED === //
// Copy and paste tests here
// Merge tests below after.

its.message(
  'its.a()', 
  'An unintrusive alert window with more information and custom messaging api.'
);


// its.settings //

// By Config //
////////////////////////
// var config = {
//   collapsed: false,
//   type_check: false
// };
//its.setConfig(config);


// Set Before its.a() //
////////////////////////
// Prior to its.a() call
// its.type_check = false;
// its.collapsed = false;

// its.type_check = true;
// its.collapsed = true;





// -- Test Code Snippet --//
//its.snippet();

var paragraphs = document.getElementsByTagName('li');
var nodees = document.querySelectorAll('li');

//its.a(paragraphs);

// ------- Usage Examples ------- //
// ------------------------------ //
  
// Default
// it.a(whatever);
  
// Pass in false to disable type detection
// its.a(whatever,false);
  


//Intro Object
var itsIntroSampleObject = { 
  foo: "its.a() tries to tell you things.",
  foo2: "it breaks down objects, arrays, html elements and other things.",
  foo3: "it can tell you if it's a number",
  number: 123,
  foo4: "If it's an array",
  arr: [0, '0', false, 'false'],
  foo5: "it will loop through all of the nested properties and key value pairs.",
  subo: {
    foo6: "Like this string here",
    anotherfoo: "or this condition here.",
    condition: false,
    foo7: "and the nested arrays and properties.",
    newArr:[1,2,3],
    subsubo: {
      foo1: "and so on.",
      foo2: {
        subfoo2: "and so on."
      }
    }
  },
  lastfoo: "Oh and there's tabbable, collapseable levels."
};


  
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
//its.a(bigobj, false);
//its.a(bigobj);