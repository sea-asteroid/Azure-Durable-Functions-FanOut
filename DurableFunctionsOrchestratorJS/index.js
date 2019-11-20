/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require('durable-functions')

module.exports = df.orchestrator(function* (context) {
  // retrieves the organization name from the Orchestrator_HttpStart function
  //var organizationName = context.df.getInput();
  let instanceID = context.df.instanceId;
  var num_array = new Array(1,2,3); 
  let organizationName = num_array.length;
  console.log('Orch start ' + instanceID + ' ' + new Date().getTime() + ' ArrayLength', organizationName);
  // retrieves the list of repositories for an organization by invoking a separate Activity Function.
  //var repositories = yield context.df.callActivity('GetAllRepositoriesForOrganization', organizationName);
  // Creates an array of task to store the result of each functions
  
  var output = [];
  var outputs = [];
  //for (var i = 0; i < repositories.length; i++) {
  for (var i = 0; i < organizationName; i++) {
    // Starting an activity WITHOUT `yield`
    // This will starts Activity Functions in parallel instead of sequentially.
    const tmp = context.df.callActivity('Hello', `${num_array[i]} ${instanceID}`);
    console.log('Orch mid__ ' + instanceID + ' ' + new Date().getTime() + ' after callActivity ', tmp);
    output.push(tmp);
    //console.log(instanceID + ' tmp:', tmp);
    //output.push(context.df.callActivity('Hello', num_array[i]));
  }
  // Wait for all Activity Functions to complete execution
  console.log('Orch yield ' + instanceID + ' ' + new Date().getTime());
  const results = yield context.df.Task.all(output)
  //const results = context.df.Task.all(output);
  outputs.push(results);
  //console.log('finalOutput:', results);
  console.log('Orch end__ ' + instanceID + ' ' + new Date().getTime() + ' finished');
  return outputs;
  // Send the list to an Activity Function to save them to Blob Storage.
  //yield context.df.callActivity('SaveRepositories', results)
  //return context.instanceId
})
