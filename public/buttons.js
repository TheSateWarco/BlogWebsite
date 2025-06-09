document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleFormBtn");
  const form = document.getElementById("blogForm");

  if (toggleBtn && form) {
    toggleBtn.addEventListener("click", () => {
      if (form.style.display === "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    });
  }

  const filter = document.getElementById("categoryFilter");
  const allPosts = document.querySelectorAll(".blog");

  if (filter) {
    filter.addEventListener("change", () => {
      const selected = filter.value.toLowerCase();

      allPosts.forEach(post => {
        const categorySpan = post.querySelector(".post-category span");
        let category = "";

        if (categorySpan) {
          const text = categorySpan.textContent;
          if (text) {
            category = text.toLowerCase();
          }
        }

        if (selected === "all" || category === selected) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    });
  }
});
