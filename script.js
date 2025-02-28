let notificationUnreaded = 0
async function displayNotifications() {
  const response = await fetch('./data.json');
  const data = await response.json();
  const notificationsContainer = document.getElementsByTagName('main')[0];

  data.forEach(notification => {
    const { user, time, action, message, post, avatar, group, wasReded } = notification;
    let notificationHTML;
    let notificationElement = document.createElement('div');
    if(wasReded){
      notificationElement.classList.add('unread');
      notificationUnreaded++;
      document.getElementById('number').innerText = notificationUnreaded;
    }
    notificationElement.classList.add('notification');
    if (action === 'followed you' || action === 'left the group' || action === 'joined your group') {
        notificationElement.classList.add('followed');
        notificationElement.classList.add('group');
        notificationHTML = `
        
          <figure>
            <img src="${avatar}">
          </figure>
          <div>
            <strong>${user}</strong> ${action} ${group ? `<strong>${group}</strong>` : ""}<br>
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
            <strong>${user}</strong> ${action} <strong class="postalert">${post}</strong><br>
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
    if(wasReded){
      notificationElement.addEventListener('click', (e) => {
        if (notificationElement.classList.contains('unread')){
          notificationElement.classList.remove('unread');
          notificationUnreaded--;
          document.getElementById('number').innerText = notificationUnreaded;
        };
      });
    }


    notificationsContainer.appendChild(notificationElement);

  });
}

displayNotifications();

document.querySelector('button').addEventListener('click', () => {
  const unreadNotifications = document.querySelectorAll('.unread');
  unreadNotifications.forEach(notification => {
    notification.classList.remove('unread');
  });
  notificationUnreaded = 0;
  document.getElementById('number').innerText = notificationUnreaded;
});
