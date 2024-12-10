const kermit = {
  app: document.getElementById("app"),

  clearPlaceholder() {
    const placeholder = this.app.querySelector(".placeholder");
    if (placeholder) placeholder.remove();
  },

  button: {
    name: function (label, onClickHTML) {
      kermit.clearPlaceholder();
      const btn = document.createElement("button");
      btn.innerText = label;
      btn.style.background = "#4CAF50";
      btn.style.color = "#fff";
      btn.addEventListener("click", () => {
        kermit.renderHTML(onClickHTML);
      });
      kermit.app.appendChild(btn);
    },
  },

  textarea: function () {
    kermit.clearPlaceholder();
    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "100px";
    kermit.app.appendChild(textarea);
  },

  paragraph: {
    show: function (text) {
      kermit.clearPlaceholder();
      const p = document.createElement("p");
      p.innerText = text;
      p.style.fontSize = "16px";
      kermit.app.appendChild(p);
    },
  },

  header: function (text) {
    kermit.clearPlaceholder();
    const h = document.createElement("h1");
    h.innerText = text;
    h.style.color = "#4CAF50";
    h.style.fontSize = "24px";
    kermit.app.appendChild(h);
  },

  renderHTML: function (html) {
    kermit.clearPlaceholder();
    const container = document.createElement("div");
    container.innerHTML = html;
    kermit.app.appendChild(container);
  },
};

// Command interpreter
const commandBox = document.getElementById("command-box");
commandBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    try {
      eval(commandBox.value);
      commandBox.value = ""; // Clear input
      document.querySelector(".error")?.remove(); // Remove previous errors
    } catch (error) {
      let errorElement = document.querySelector(".error");
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error";
        commandBox.insertAdjacentElement("afterend", errorElement);
      }
      errorElement.innerText = "Invalid command! Check syntax.";
    }
  }
});
