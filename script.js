let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts(filteredPosts = posts) {

    const container =
    document.getElementById("postsContainer");

    container.innerHTML = "";

    filteredPosts.forEach((post, index) => {

        const postDiv =
        document.createElement("div");

        postDiv.className = "post";

        postDiv.innerHTML = `
            <h2>${post.title}</h2>

            <p>${post.content}</p>

            <button onclick="deletePost(${index})">
                Delete Post
            </button>

            <div class="comment-box">

                <input
                    type="text"
                    id="comment-${index}"
                    placeholder="Add Comment">

                <button onclick="addComment(${index})">
                    Add Comment
                </button>

                <div>
                    ${post.comments.map(comment =>
                        `<div class="comment">${comment}</div>`
                    ).join("")}
                </div>

            </div>
        `;

        container.appendChild(postDiv);
    });

    savePosts();
}

function addPost() {

    const title =
    document.getElementById("titleInput");

    const content =
    document.getElementById("contentInput");

    if (
        title.value.trim() === "" ||
        content.value.trim() === ""
    ) {
        return;
    }

    posts.unshift({
        title: title.value,
        content: content.value,
        comments: []
    });

    title.value = "";
    content.value = "";

    renderPosts();
}

function deletePost(index) {

    posts.splice(index, 1);

    renderPosts();
}

function addComment(index) {

    const commentInput =
    document.getElementById(`comment-${index}`);

    if (commentInput.value.trim() === "") {
        return;
    }

    posts[index].comments.push(
        commentInput.value
    );

    renderPosts();
}

document
.getElementById("searchInput")
.addEventListener("input", function() {

    const value =
    this.value.toLowerCase();

    const filtered =
    posts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.content.toLowerCase().includes(value)
    );

    renderPosts(filtered);
});

renderPosts();
