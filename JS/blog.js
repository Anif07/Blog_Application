// JavaScript for blog.html (blog input page)

// banner = document.getElementById("banner");
// const imageInput = document.getElementById("banner-upload");
// const titleInput = document.getElementById("heading");
// const contentInput = document.getElementById("article");
// document
//   .getElementById("blogForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const file = imageInput.files[0];
//     const reader = new FileReader();

//     reader.onloadend = function () {
//       const imageUrl = reader.result;
//       const title = titleInput.value;
//       const content = contentInput.value;

//       const newPost = {
//         id: Date.now(),
//         title: title,
//         content: content,
//         imageUrl: imageUrl,
//       };

//       //   fetch("https://json-server-8qp6.onrender.com/posts", {
//       //     method: "post",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify(posts),
//       //   });
//       // Get existing posts from localStorage or initialize an empty array
//       const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
//       posts.push(newPost);

//       //   Save updated posts back to localStorage
//       localStorage.setItem("blogPosts", JSON.stringify(posts));

//       // Clear form inputs
//       imageInput.value = "";
//       titleInput.value = "";
//       contentInput.value = "";

//       alert("Post added successfully! Now please check All Blogs.");
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   });

const blogForm = document.getElementById("blogForm");

blogForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("heading").value;
  const contentInput = document.getElementById("article").value;

  // Fetch the current posts to determine the next ID
  fetch("https://json-server-8qp6.onrender.com/posts")
    .then((res) => res.json())
    .then((posts) => {
      // Determine the next ID based on the current number of posts
      const nextId =
        posts.length > 0 ? Number(posts[posts.length - 1].id) + 1 : 1;

      // Create the new post object
      const newPost = {
        id: nextId,
        title: titleInput,
        postContent: contentInput,
      };

      // Post the new blog post to the server
      return fetch("https://json-server-8qp6.onrender.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Post added successfully:", data);

      // Clear form inputs
      document.getElementById("heading").value = "";
      document.getElementById("article").value = "";

      alert("Post added successfully! Now please check All Blogs.");
    })
    .catch((error) => {
      console.error("Error adding post:", error);
      alert("Error adding post. Please try again.");
    });
});
