// ----- CHAT -----
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (message === "") return;

  // Mostrar msg do usuário
  const userMsg = document.createElement("div");
  userMsg.classList.add("chat-message", "user-message");
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  // Loading
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("chat-message", "bot-message");
  loadingMsg.textContent = "⏳ A IA está pensando...";
  chatBox.appendChild(loadingMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
  input.style.height = "40px"; // reset altura

  // Chamada ao backend
  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    loadingMsg.textContent = "🤖 " + data.reply;
  } catch (error) {
    loadingMsg.textContent = "❌ Erro ao falar com a IA.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter para enviar
document.getElementById("user-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Sidebar toggle
document.getElementById("toggle-sidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("show");
});

// Textarea auto-grow
const textarea = document.getElementById("user-input");
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
