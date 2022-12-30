import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState('');
  const [task,setTask]= useState('')
  const fetchPost = async () => {
    console.log("Fetching posts.....");
    const request = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return request.data;
  };
  const addPost=()=>{
    const id = uuidv4();
    setPosts(last=>{
      let newTask = {id,title:task,statut:"todo"}
      return [...last,newTask]
    })
    console.log(id);


  }
  const deletePost = (id) => {
    setPosts((last) => {
      return last.filter(items=>items.id !== id);
    });
  };
  const handler=(e)=>{
    setActive(e)
    if(e!=="all"){
      setPosts((last)=>{
        return last.filter(items=>items.statut === e);
      })
    } else{
      console.log("p")
    }
  }
  useEffect(() => {
  setActive('all')
    console.log("Je suis le useEffect");
    fetchPost().then((p) => {
      for (const post of p) {
        post.statut = "done";
      }
      setPosts(p);
    });
  }, []);

  return (
    <div className="text-center m-[100px] flex flex-col items-center">
      <h1 className="text-[32px] font-semibold">Simple To-do app with React and Tailwindcss</h1>
      <div
        id="container"
        className="w-[50%] mt-10 flex flex-col justify-end items-start "
      >
        <form action="" className="flex flex-row gap-1">
          <input
            type="text"
            name="ajouter"
            id="taskAdd"
            required
            onChange={(e)=>setTask(e.target.value)}
            placeholder="Add tasks"
            className="w-[500px] h-[38px] rounded-md p-2 text-black border-2 border-gray-500  outline-0"
          />
          <input
          onClick={addPost} 
            type="button"
            value="Add"
            className="bg-blue-600 w-[100px] h-[38px] cursor-pointer rounded-md hover:bg-blue-800"
          />
        </form>
        <div className="w-[300px] h-[40px] rounded-md my-2 flex text-center border-2 border-blue-500 ">
          <button className={`w-[100px] text-center ${active === "all" ? "bg-blue-600" : ""}`}  name="all" onClick={(e)=>handler(e.target.name)}>
            All
          </button>
          <button className={`w-[100px] text-center rounded-md ${active === "todo" ? "bg-blue-600" : ""}`} name="todo" onClick={(e)=>handler(e.target.name)}>To do</button>
          <button className={`w-[100px] text-center  ${active === "done" ? "bg-blue-600" : ""}`}  name="done" onClick={(e)=>handler(e.target.name)}>Done</button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-5">
          <tbody>
            {posts.map((post) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      key={post.id}
    >
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between"
      >
        <p>{post.title } {post.statut}</p>
        <svg
          width="25"
          height="25"
          fill="none"
          stroke="#ff0000"
          strokeLinecap="round"
          className="cursor-pointer"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => deletePost(post.id)}
          key={post.id}
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </th>
    </tr>
  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
