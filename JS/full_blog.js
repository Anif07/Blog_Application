// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const postId = urlParams.get("id");

//   const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
//   const post = posts[postId];

//   if (post) {
//     const postContainer = document.getElementById("post-container");

//     const postElement = document.createElement("div");
//     postElement.className = "post";

//     postElement.innerHTML = `
//         <div id="full-blog-container">
//           <img src="${post.imageUrl}" alt="Post Image" id="img"/>
//           <h2  id="post-title">${post.title}</h2>
//           <p id="post-content">${post.content}</p>
//           <a href="./allBlogs.html" class="AllBlogs">All Blogs</a>
//         </div>
//       `;

//     postContainer.appendChild(postElement);
//   } else {
//     postContainer.textContent = "Post not found.";
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = parseInt(urlParams.get("id"), 10); // Get index from URL

  const postContainer = document.getElementById("post-container");

  fetch("https://json-server-8qp6.onrender.com/posts")
    .then((res) => res.json())
    .then((posts) => {
      if (postIndex >= 0 && postIndex < posts.length) {
        const post = posts[postIndex];
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <div id="full-blog-container">
            <h2 id="post-title">${post.title}</h2>
            <p id="post-content">${post.postContent}</p>
            <a href="./allBlogs.html" class="AllBlogs">All Blogs</a>
          </div>
        `;
        postContainer.appendChild(postElement);
      } else {
        postContainer.textContent = "Post not found.";
      }
    })
    .catch((error) => {
      console.error(error);
      postContainer.textContent = "Error fetching posts.";
    });
});
