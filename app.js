const API = "https://blogapp-swfa.onrender.com/api/v1";

let posts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
});

async function apiFetch(path, options = {}) {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Request Failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

async function fetchPosts() {
  const feed = document.getElementById("feed");

  feed.innerHTML = `
    <div class="empty-feed">
      Loading posts...
    </div>
  `;

  try {
    const data = await apiFetch("/Posts");

    posts = (data.Posts || []).reverse();

    renderFeed();
    updateStats();
  } catch (error) {
    console.error(error);

    feed.innerHTML = `
      <div class="empty-feed">
        Failed to load posts.
      </div>
    `;
  }
}

function renderFeed() {
  const feed = document.getElementById("feed");

  if (!posts.length) {
    feed.innerHTML = `
      <div class="empty-feed">
        No blogs available.
      </div>
    `;
    return;
  }

  feed.innerHTML = posts
    .map((post) => {
      const preview =
        post.body.length > 250
          ? post.body.slice(0, 250) + "..."
          : post.body;

      return `
        <article class="post-card">

          <div class="post-card-header">
            <h2 class="post-title">
              ${esc(post.title)}
            </h2>
          </div>

          <div class="post-body-preview">
            ${esc(preview)}
          </div>

          <div style="padding:0 1.5rem 1.5rem;">
            <button
              class="btn btn-primary"
              onclick="openBlog('${post._id}')"
            >
              Read Full Blog →
            </button>
          </div>

        </article>
      `;
    })
    .join("");
}

function openBlog(postId) {
  const post = posts.find((p) => p._id === postId);

  if (!post) return;

  document.getElementById("modalTitle").textContent =
    post.title;

  document.getElementById("modalBody").textContent =
    post.body;

  document.getElementById("blogModal").style.display =
    "flex";
}

function closeBlog() {
  document.getElementById("blogModal").style.display =
    "none";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("blogModal");

  if (e.target === modal) {
    closeBlog();
  }
});

async function publishPost() {
  const titleInput =
    document.getElementById("write-title");

  const bodyInput =
    document.getElementById("write-body");

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Please enter both title and blog content.");
    return;
  }

  try {
    const data = await apiFetch("/posts/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
    });

    posts.unshift(data.post);

    titleInput.value = "";
    bodyInput.value = "";

    renderFeed();
    updateStats();

    alert("Blog published successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to publish blog.");
  }
}

function updateStats() {
  const postCount =
    document.getElementById("s-posts");

  if (postCount) {
    postCount.textContent = posts.length;
  }

  const comments =
    posts.reduce(
      (sum, p) => sum + (p.comments?.length || 0),
      0
    );

  const likes =
    posts.reduce(
      (sum, p) => sum + (p.likes?.length || 0),
      0
    );

  const c =
    document.getElementById("s-comments");

  const l =
    document.getElementById("s-likes");

  if (c) c.textContent = comments;
  if (l) l.textContent = likes;
}

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}