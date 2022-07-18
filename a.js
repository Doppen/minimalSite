


const loadData = async () => {
  const url ='https://jsonplaceholder.typicode.com/todos/1';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

loadData()
