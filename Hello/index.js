﻿/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

module.exports = async function (context) {
//module.exports = function (context) {
    //return `Hello ${context.bindings.name}!`;
    var res = context.bindings.name;
    var obj = res.split(" ");
    obj_id = obj[1];
    obj_count = obj[0];
    console.log('Act_ start ' + obj_id + ' ' + new Date().getTime() + ' array_value ' + obj_count);
    var num = 1000000000;
    function fibonacci(num){
        var a = 1, b = 0, temp;
        while (num >= 0){
          temp = a;
          a = a + b;
          b = temp; 
          num--;
        } 
        return b;
    }
    let va = fibonacci(num);
    console.log('Act_ end__ ' + obj_id + ' ' + new Date().getTime() + ' array_value ' + obj_count);
    //return context.bindings.name + 1;
    console.log('Act_Output ' + obj_count);
    var aaa = parseInt(obj_count, 10);
    return aaa+1;
};