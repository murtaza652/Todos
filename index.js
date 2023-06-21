const myForm = document.querySelector('#my-form');
const TodoName = document.querySelector('#name');
const TodoDesc = document.querySelector('#desc');
const itemList = document.getElementById('items');
const itemList1 = document.getElementById('item');

myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
  
function onSubmit(e){
    e.preventDefault();
    axios.post('https://crudcrud.com/api/618b6c3f7742432c8bfed904a93866f7/todos',{
      name:TodoName.value,
      desc:TodoDesc.value,
    })
      .then(re=> showOnscreen(re.data,"todos remaining"))
      .catch(e=> console.log(e))
    
  }  
function removeItem(e){
  if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      let link="https://crudcrud.com/api/618b6c3f7742432c8bfed904a93866f7/todos/"+e.target.id;
      
      axios.delete(link);
      itemList.removeChild(li); 
  }
  if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
      li.removeChild(li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling);
      li.removeChild(li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
      itemList1.appendChild(li);
      let link="https://crudcrud.com/api/618b6c3f7742432c8bfed904a93866f7/todos/"+ e.target.id;
      axios.delete(link);
  }
}
function showOnscreen(user,x)
{
  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = x;
  // Add text node with input value
  li.appendChild(document.createTextNode(user.name));
  li.appendChild(document.createTextNode("-"));
  li.appendChild(document.createTextNode(user.desc));
  li.appendChild(document.createTextNode(" "));
  // Create del button element
  var deleteBtn = document.createElement('button');
  var completedBtn= document.createElement('button');
  // Add classes to del button
  deleteBtn.className = 'btn-sm float-right delete';
  deleteBtn.id=user._id;
  completedBtn.className="btn-sm float-right edit"
  completedBtn.id=user._id;
  // Append text node
  completedBtn.appendChild(document.createTextNode('Done'));  
  deleteBtn.appendChild(document.createTextNode('remove'));
  // Append button to li
  li.appendChild(completedBtn);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(deleteBtn);
  // Append li to list
  itemList.appendChild(li);
}