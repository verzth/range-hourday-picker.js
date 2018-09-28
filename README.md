# range-hourday-picker.js
Javascript Library for Hour Day Picker


How to Use :
1. Add script range-hourday-picker.js in your HTML head or body.
2. Add stylesheet range-hourday-picker.css in your HTML head or body, if you want to override stylesheet,
   just go with your code.
3. Use RangeHourdayPicker to create range-hourday-picker object, you can pass options paramater.
4. Option List :
   {
        id : '', // Use string to custom Rhdp class.
        days : [0,1,2,3,4,5,6], // Values for day
        day_names : ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'], // Day names, by default using Indonesian Day name, start from Monday.
        hours : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], // You can set 0 to 23 or 1 to 24, based on your need.
        debug : false, // By default debug is off, when you set debug true (turn on debug) it will print debug info in browser console.
        callback : function(){} // It will called when the picker changed
   }
5. Rhdp provide two function:
   - setValues(values) : It used for change the rhdp values. When you set values, it will automatically update the view.
   - getValues() : It used to get the current rhdp values.
6. Sample values.
   {
        "0" : [
            {
                "_day":0,
                "_start":0,
                "_end":19
            }
        ],
        "1" : [
            {
                "_day":1,
                "_start":12,
                "_end":15
            },
            {
                "_day":1,
                "_start":19,
                "_end":22
            }
        ]
   }

7. Rhdp provide built-in module for angular ^1.6, you can add range-hourday-picker-angular.js on your script.
   For usage look our sample below:

   <script>

   ......
   angular.module('yourApp',['rangeHourdayPicker']);
   ......

   </script>

   In your HTML file.

   Single RHDP:
   <div class="rangehourdaypicker" ng-rhdp="rhdpOptions" ng-model="data"></div>

   Multiple RHDP:
   <div class="rangehourdaypicker" id="one" ng-rhdp="rhdpOptions" ng-model="data1"></div>
   <div class="rangehourdaypicker" id="two" ng-rhdp="rhdpOptions" ng-model="data2"></div>