const $=document
const inputElem=$.getElementById('itemInput')
const addButton=$.getElementById('addButton')
const clearButton=$.getElementById('clearButton')
const todoList=$.getElementById('todoList')
let todosArray=[]

function addTodo(){
    if(inputElem.value!=""){
        let newTodoTitle=inputElem.value
        let newTodoObj={
            id:todosArray.length+1,
            title:newTodoTitle,
            complete:false

        }
        inputElem.value=''
        todosArray.push(newTodoObj)
        setLocalStorage(todosArray)
        todosGenerator(todosArray)   
          }
inputElem.focus()

}
function setLocalStorage(todosList){
    localStorage.setItem('todos',JSON.stringify(todosList))
            
}
function todosGenerator(todosList){
    todoList.innerHTML=''
    let newTodo,newButton,deletButton,newTodoLableElem
   
    todosList.forEach(function(todo) {
     newTodo=$.createElement('li')
    newTodo.className='completed well' 
    newTodo.innerHTML=inputElem.value
    newTodoLableElem=$.createElement('label')
    newTodoLableElem.innerHTML=todo.title
 
    newButton=$.createElement('button')
    newButton.className='btn btn-success'
    newButton.innerHTML='Complete'
    newButton.setAttribute('onclick','editTodo('+todo.id+')')
     deletButton=$.createElement('button')
    deletButton.className='btn btn-danger'
    deletButton.innerHTML='Delete'
    deletButton.setAttribute('onclick','removeTodo (' + todo.id +')')
    newTodo.append(newTodoLableElem,newButton,deletButton)
    todoList.append(newTodo)
    if(todo.complete){
        newTodo.className='uncompleted well' 
        newButton.innerHTML='unComplete'  
    }
        
    });
}
function editTodo(todoId){
    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))
    todosArray=localStorageTodos
    todosArray.forEach(function(todo){
        if(todo.id===todoId){
            todo.complete = !todo.complete
        }
    })
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}

function removeTodo(todoId){
 
   let localStorageTodos=JSON.parse(localStorage.getItem('todos'))
     todosArray=localStorageTodos
   let mainTodoIndex=todosArray.findIndex(function(todo){
      return todo.id===todoId
  
  }  )

  todosArray.splice(mainTodoIndex,1)
  setLocalStorage(todosArray)
  todosGenerator(todosArray)
  console.log(todosArray)
}
function getLocalStorage(){
   let localStorageTodos=JSON.parse(localStorage.getItem('todos'))
   if(localStorageTodos){
    todosArray=localStorageTodos
   }else{
    todosArray=[]
   }
   todosGenerator(todosArray)
}
window.addEventListener('load',getLocalStorage)
  





function clearAllTodo(){
    todosArray=[]
    todosGenerator(todosArray)
    localStorage.removeItem('todos')
}
addButton.addEventListener('click',addTodo)
clearButton.addEventListener('click',clearAllTodo)
inputElem.addEventListener('keydown',function(event){
    if(event.code ==='Enter'){
        addTodo()
    }
})
