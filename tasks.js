
const Tasks = ['HTML', 'CSS', 'ENGLISH'];

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const r=text.split(' ')[0].trim();
  const t=text.slice(4, text.length);
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(r === 'add'){
    if (t.trim() ===""){
      console.log('task is empty');
    }
    else{
      add(t);
    }
  } 
  else if(r ==='remove'){
    remove();
    }
  else if(r === 'remove1'){
    remove1();
  }
  else if(r ==='remove2'){
    remove2();
  }
  else if (text.trim() === 'list') {
    listTasks();}

  else if(r === 'hello'){
    hello(text.replace("\n",""));
  }

  //help is used to display the possible entered text
  else if(text === 'help\n'){
    console.log('Available commands:');
    console.log('hello [name] - Say hello to someone');
    console.log('quit or exit - to quit the program');
  }
  else{
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  console.log(text +'!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Lists the tasks
 *
 * @returns {void}
 */
 function listTasks() {
 console.log('Tasks:');
 for (let i = 0; i < Tasks.length; i++) {
    console.log(`${i+1}- ${Tasks[i]}`);
 }
 }
 /**
 * Add the tasks
 *
 * @returns {void}
 */
 function add(t) {
     Tasks.push(t.replace('\n', ''));
  }
  /**
 * remove the tasks
 *
 * @returns {void}
 */
 function remove() {
  Tasks.pop();
}
 /**
 * remove the tasks
 *
 * @returns {void}
 */
function remove1() { 
  Tasks.shift(); 
}
  /**
 * remove the tasks from the 
 * 
 * @returns {void}
 */
function remove2() { 
  Tasks.splice(1,1); 
}
 
// The following line starts the application
startApp("Jana Sakr");
