document.addEventListener("DOMContentLoaded", () => {
  let posts = []; // Define posts array inside the DOMContentLoaded listener

  const fetchPosts = () => {
    const container = document.getElementById("blog-container");
    container.innerHTML = `
    <div>
    <img src="./Assets/loading-circles-blue-gradient_78370-2646.jpg" id="loading"/>
    </div>`;

    fetch("https://json-server-8qp6.onrender.com/posts")
      .then((res) => res.json())
      .then((data) => {
        posts = data;
        document.innerText = "";
        displayPosts(posts);
        console.log(posts);
      })
      .catch((error) => console.log(error));
  };

  fetchPosts();
});

function displayPosts(posts) {
  const container = document.getElementById("blog-container");
  if (!container) {
    console.error("Blog container not found");
    return;
  }

  container.innerHTML = "";

  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "box-1";

    postElement.innerHTML = `
        <div>
          <h2>${post.title.substring(0, 80)}</h2>
          <p id="para-allBlog">${post.postContent.substring(0, 350) + "..."}</p>
          <button class="read-btn" data-id="${index}">Read More</button>
        </div>
      `;
    const deleteHandler = (id) => {
      fetch(`https://json-server-8qp6.onrender.com/posts/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            posts = posts.filter((p) => p.id !== id);
            displayPosts(posts);
          } else {
            throw new Error("Failed to delete post");
          }
        })
        .catch((error) => console.error("Delete error:", error));
    };

    if (
      post.id != "asc" &&
      post.id != "sdfs" &&
      post.id != "ssd" &&
      post.id != "hhrt" &&
      post.id != "hhrt"
    ) {
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList = "deleteBtn";
      deleteBtn.addEventListener("click", () => {
        deleteHandler(post.id);
      });
      postElement.appendChild(deleteBtn);
    }
    container.appendChild(postElement);

    const readBtn = postElement.querySelector(".read-btn");
    if (readBtn) {
      readBtn.addEventListener("click", (e) => {
        const postId = e.target.getAttribute("data-id");
        window.location.href = `full_blog_post.html?id=${postId}`;
      });
    }
  });
}

// document.addEventListener("DOMContentLoaded", () => {
//   let posts = []; // Define posts array inside the DOMContentLoaded listener

//   const fetchPosts = () => {
//     fetch("https://json-server-8qp6.onrender.com/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         posts = data; // Update posts array with fetched data directly
//         displayPosts(posts); // Pass posts array to displayPosts function
//         console.log(posts);
//       })
//       .catch((error) => console.error("Fetch error:", error));
//   };

//   fetchPosts();
// });

// function displayPosts(posts, index) {
//   const container = document.getElementById("blog-container");
//   if (!container) {
//     console.error("Blog container not found");
//     return;
//   }

//   container.innerHTML = ""; // Clear the container before appending new elements

//   posts.forEach((post) => {
//     const postElement = document.createElement("div");
//     postElement.className = "box-1";

//     postElement.innerHTML = `
//         <div>
//           <h2>${post.title.substring(0, 80)}</h2>
//           <p id="para-allBlog">${post.postContent.substring(0, 350) + "..."}</p>
//           <button class="read-btn" data-id="${post.id}">Read More</button>
//         </div>
//       `;

//     const deleteHandler = (id) => {
//       fetch(`https://json-server-8qp6.onrender.com/posts/${id}`, {
//         method: "DELETE",
//       })
//         .then((res) => {
//           if (res.ok) {
//             // Mutate the existing posts array to remove the deleted post
//             posts = posts.filter((p) => p.id !== id);
//             displayPosts(posts); // Re-render the posts after deletion
//           } else {
//             throw new Error("Failed to delete post");
//           }
//         })
//         .catch((error) => console.error("Delete error:", error));
//     };

//     // Exclude specific IDs from deletion
//     if (
//       post.id !== "asc" &&
//       post.id !== "sdfs" &&
//       post.id !== "ssd" &&
//       post.id !== "hhrt" &&
//       post.id !== "hhrt"
//     ) {
//       const deleteBtn = document.createElement("button");
//       deleteBtn.innerText = "Delete";
//       deleteBtn.classList = "deleteBtn";
//       deleteBtn.addEventListener("click", () => {
//         deleteHandler(post.id);
//       });
//       postElement.appendChild(deleteBtn);
//     }

//     container.appendChild(postElement);

//     const readBtn = postElement.querySelector(".read-btn");
//     if (readBtn) {
//       readBtn.addEventListener("click", (e) => {
//         const postId = e.target.getAttribute("data-id");
//         window.location.href = `full_blog_post.html?id=${index}`;
//       });
//     }
//   });
// }
