import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}`);
        const postsData = await response.json();
        setPosts([...postsData]);
      } catch(e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }

    }
    fetchPosts()
  },[]);

  const handleSort = () => {
    return setPosts([...posts].sort((a, b) => a.title.localeCompare(b.title)));
  }

  if (error) {
    return <div>Something went wrong! Please try again !</div>
  }

  return (
    <div>
      <header>
        <h1>Data fetching</h1>
      </header>
      <h2>title list:</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {posts.map( post => {
            return <li key={post.id}>{post.title}</li>;
          }
          )}
        </ul>
      )}
      <button onClick={handleSort}>order</button>
    </div>
  )
}

export default App
