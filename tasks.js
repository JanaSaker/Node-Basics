
const Tasks = ['[ ] HTML', '[ ] CSS', '[ ] ENGLISH', '[ ] JAVA'];

const fs =require('fs');

fs.readFile("./DataBase.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const Tasks = JSON.parse(jsonString);
    console.log("Tasks are:", Tasks); 
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
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
  const m=parseInt(text.split(' ')[1]);
  const t=text.slice(4, text.length);
  const n=text.slice(5,text.length);
  const d=parseInt(text.slice(7,text.length))

  const checkTask = text.slice(6,7);
  const unCheckTask = text.slice(8,9);
  const editText = text.split(' ');

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(r == 'edit'){
    if(n.trim() === ""){
      console.log("You can not edit an empty")
    }
    else if(isNaN(editText[1])){
      Tasks[Tasks.length-1] = "[ ] " + n.replace("\n","");
    }
    else if(parseInt(editText[1]) > Tasks.length)
      console.log("There is no number " + editText[1])
    else if (editText[1] !==NaN)
      Tasks[parseInt(editText[1]-1)] = "[ ] " + text.slice(7,text.length).replace("\n","");
  }
  
  
  else if(r == 'check'){
    if(text.slice(6,text.length).trim() === "")
      console.log("What do you want to check?");
    else if(Tasks[checkTask - 1].startsWith("[ ]"))
    Tasks[checkTask - 1] = "[✓]" + Tasks[checkTask - 1].slice(3);
  }

  else if(r == 'uncheck'){
    if(text.slice(8,text.length).trim() === ""){
      console.log("What do u need to uncheck?");
    }
    else if (Tasks[unCheckTask - 1].startsWith("[✓]"))
    Tasks[unCheckTask - 1] = "[ ]" + Tasks[unCheckTask - 1].slice(3);
  }
  
  else if(r === 'add'){
    if (t.trim() ===""){
      console.log('task is empty');
    }
    else{
      add(t);
    }
  } 
  else if(text ==='remove\n'){
    remove();
    }
  else if(r === 'remove'){
    removeNo(d);
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
    console.log('add [task] - to add a task');
    console.log('remove [number]- to remove a task');
    console.log('edit [number] [task] - to edit the tasks');
    console.log('check - to check the tasks in the list');
    console.log('uncheck - to uncheck the tasks in the list');
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
  const jsonString = JSON.stringify(Tasks)
  fs.writeFileSync('./DataBase.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

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
     Tasks.push('[ ] '+ t.replace('\n', ''));
  }
  /**
 * remove the first task
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
function removeNo(d) {
  Tasks.splice(d-1,1);
}

// The following line starts the application
startApp("Jana Sakr");
