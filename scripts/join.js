function join(event) {
  console.log(hello)
  const urlParams = new URLSearchParams(window.location.search);

  fetch(urlParams.get("api"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: urlParams.get("event"),
      event_hash: urlParams.get("hash"),
      timestamp: urlParams.get("timestamp"),
      name: event.target.value
    }),
  }).then(r => r.json())
  .then(message => alert('Success: ' + message.success))
}
