const myForm = document.querySelector('#my-form');
const TodoName = document.querySelector('#name');
const TodoDesc = document.querySelector('#desc');
const itemList = document.getElementById('items');
const itemList1 = document.getElementById('item');

myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);

async function onSubmit(e) {
  e.preventDefault();
  try {
    const response = await axios.post('https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todos', {
      name: TodoName.value,
      desc: TodoDesc.value,
    });
    showOnscreen(response.data, "todos remaining");
  } catch (error) {
    console.log(error);
  }
}

async function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    var li = e.target.parentElement;
    let link = "https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todos/" + e.target.id;

    try {
      await axios.delete(link);
      itemList.removeChild(li);
    } catch (error) {
      console.log(error);
    }
  }
  if (e.target.classList.contains('edit')) {
    var li = e.target.parentElement;
    itemList.removeChild(li);
    let link = "https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todos/" + e.target.id;
    let obs={};
    await axios.get(link)
      .then( res=> {obs.name=res.data.name;
                    obs.desc=res.data.desc})
      .catch(e=> console.log(e))
    axios.post('https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todosdone', {
      name: obs.name,
      desc: obs.desc
    })
      .then(re=> showOnscreen(re.data, "todos completed"))
      .catch(e=> console.log(e))
    try {
      await axios.delete(link);
    } catch (error) {
      console.log(error);
    }
  }
}
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todos')
    .then( res=> {
      for(var i=0; i<res.data.length; i++) { 
        showOnscreen(res.data[i],"todos remaining");
    }})
  axios.get('https://crudcrud.com/api/5e20656a6bae47fd8aef27e159d1855a/todosdone')
    .then( res=> {
      for(var i=0; i<res.data.length; i++) { 
        showOnscreen(res.data[i],"todos completed");
    }})

})
function showOnscreen(user, x) {
  var li = document.createElement('li');
  li.className = x;
  li.appendChild(document.createTextNode(user.name));
  li.appendChild(document.createTextNode("-"));
  li.appendChild(document.createTextNode(user.desc));
  li.appendChild(document.createTextNode(" "));

  if(x=="todos remaining")
  { 
    var deleteBtn = document.createElement('button');
    var completedBtn = document.createElement('button');
    deleteBtn.className = 'btn-sm float-right delete';
    deleteBtn.id = user._id;
    completedBtn.className = "btn-sm float-right edit";
    completedBtn.id = user._id;
    completedBtn.appendChild(document.createTextNode('Done'));
    deleteBtn.appendChild(document.createTextNode('remove'));

    li.appendChild(completedBtn);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
  }
  if(x=="todos completed")
  {
    li.id=user._id;
    itemList1.appendChild(li);
  }
  
}
