const sendButton = document.getElementById('sendButton');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');

sendButton.addEventListener('click', async () => 
{
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if(!message || !name)
    {
        alert('Por favor, escribe un mensaje antes de enviar.');
        return;
    }

    try
    {
        const payload = {
            fields:{
                Name: {stringValue: name},
                Message: {stringValue: message},
            }
        };

        const response = await fetch('https://firestore.googleapis.com/v1/projects/macroweb-b1df0/databases/(default)/documents/messages', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if(response.ok)
        {
            window.location.href = 'thanks.html';
        }
        else
        {
            alert('ERROR');
        }
    }
    catch
    {
        alert('ERROR');
    }
});