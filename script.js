async function displayNotifications() {
  const response = await fetch('./data.json');
  const data = await response.json();
  const notificationsContainer = document.getElementsByTagName('main')[0];
    console.log(data);
  data.forEach(notification => {
    const { user, time, action, message, post, avatar, group } = notification;
    let notificationHTML;
    let notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    if (action === 'followed you' || action === 'left the group' || action === 'joined your group') {
        notificationElement.classList.add('followed');
        notificationElement.classList.add('group');
        notificationHTML = `
        
          <figure>
            <img src="${avatar}">
          </figure>
          <div>
            <strong>${user}</strong> ${action} ${!group ? group : ""}<br>
            <time>${time}</time>
          </div>
        
      `;
    } else if (action === 'reacted to your recent post') {
        notificationElement.classList.add('reacted_post');
      notificationHTML = `
        
          <figure>
            <img src="${avatar}">
          </figure>
          <div>
            <strong>${user}</strong> ${action} <span>${post}</span><br>
            <time>${time}</time>
          </div>
        
      `;
    } else if (action === 'commented on your picture') {
        notificationElement.classList.add('picture');
      notificationHTML = `

          <figure>
            <img src="${avatar}">
          </figure>
          <div>
            <strong>${user}</strong> ${action}<br>
            <time>${time}</time>
          </div>
          <figure class="right-pic">
            <img src="${post}">
          </figure>

      `;
    } else if (action === 'sent you a private message') {
        notificationElement.classList.add('message');
      notificationHTML = `

          <figure>
            <img src="${avatar}">
          </figure>
          <div>
            <strong>${user}</strong> ${action}<br>
            <time>${time}</time>
            <div>
              <p>${message}</p>
            </div>
          </div>

      `;
    }
    notificationElement.innerHTML = notificationHTML;
    console.log(notificationElement);
    console.log(notificationsContainer);
    notificationsContainer.appendChild(notificationElement);

  });
}

displayNotifications();
