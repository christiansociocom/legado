import React from 'react';
import { useState, useEffect } from 'react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch posts and categories from an API or data source
    const fetchPostsAndCategories = async () => {
      const postResponse = await fetch('/api/posts'); // Replace with your API endpoint
      const categoryResponse = await fetch('/api/categories'); // Replace with your API endpoint
      const postsData = await postResponse.json();
      const categoriesData = await categoryResponse.json();
      setPosts(postsData);
      setCategories(categoriesData);
    };

    fetchPostsAndCategories();
  }, []);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = content || '';
    const words = text.split(' ').length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  return (
    <div>
      <h1>Travel Blog</h1>
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Blog Posts</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><em>Estimated reading time: {calculateReadingTime(post.content)} min</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
