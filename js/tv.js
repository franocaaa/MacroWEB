const messagesContainer = document.getElementById("messagesContainer");

const FIREBASE_URL =
  "https://firestore.googleapis.com/v1/projects/macroweb-b1df0/databases/(default)/documents/messages";

async function fetchMessages() {
  try {
    const response = await fetch(FIREBASE_URL);
    const data = await response.json();

    const messages = data.documents.map((doc) => ({
        Name: doc.fields.Name.stringValue,
        Message: doc.fields.Message.stringValue,
      }));
  
    // Limitamos a 4 mensajes aleatorios
    const randomMessages = getRandomMessages(messages, 4);
  
    // Limpiamos el contenedor de mensajes antes de agregar los nuevos
    messagesContainer.innerHTML = '';
  
    // Añadimos cada mensaje al contenedor de mensajes
    randomMessages.forEach((msg) => {
        const messageBox = document.createElement("div");
        messageBox.classList.add("message-box");
        messageBox.innerHTML = `<strong>${msg.Name}:</strong> ${msg.Message}`;
        messagesContainer.appendChild(messageBox);
    });
  } catch (error) {
    console.error("Error al obtener los mensajes desde Firestore:", error);
    messagesContainer.innerHTML =
      "<p>No se pudieron cargar los mensajes. Intenta de nuevo más tarde.</p>";
  }
}

function getRandomMessages(messages, count) {
    const shuffled = [...messages].sort(() => 0.5 - Math.random());  // Mezcla aleatoria
    return shuffled.slice(0, count);  // Devuelve los primeros "count" elementos
  }

// Llamamos a la función para obtener los mensajes al cargar la página
fetchMessages();