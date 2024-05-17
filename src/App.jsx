import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}`);
      const postsData = await response.json();
      console.log(postsData);
      setPosts([...postsData]);
      setIsLoading(false);
    }
    fetchPosts()
  },[]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleSort = () => {
    return setPosts([...posts].sort((a, b) => a.title.localeCompare(b.title)));
  }

  return (
    <div>
      <header>
        <h1>Data fetching</h1>
      </header>
      <h2>title list:</h2>
    <ul>
      {posts.map( post => {
        return <li key={post.id}>{post.title}</li>;
      }
      )}
    </ul>
    <button onClick={handleSort}>order</button>
    </div>
  )
}

export default App
