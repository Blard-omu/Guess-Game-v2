const APIURL = 'https://api.github.com/';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const reposEl = document.getElementById('repos');

async function getUsers(username) {
  try {
    const { data } = await axios.get(APIURL + 'search/users', {
      params: {
        q: username
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    clearResults();
    if (data.items.length > 0) {
      data.items.forEach(user => {
        getUser(user.login);
      });
    } else {
      createErrorCard('No profiles with this username');
    }
  } catch (err) {
    clearResults();
    if (err.response && err.response.status === 404) {
      createErrorCard('No profiles with this username');
    } else {
      createErrorCard('Problem fetching data');
    }
  }
}

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + 'users/' + username, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    createUserCard(data);
    getRepos(username);
  } catch (err) {
    createErrorCard('Problem fetching user');
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + 'users/' + username + '/repos?sort=created', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    addReposToCard(data);
  } catch (err) {
    createErrorCard('Problem fetching repositories');
  }
}

// Rest of the code...



function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : '';
  const cardHTML = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>
  `;
  main.insertAdjacentHTML('beforeend', cardHTML);
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `;
  main.insertAdjacentHTML('beforeend', cardHTML);
}

function addReposToCard(repos) {
  repos.slice(0, 5).forEach(repo => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

function clearResults() {
  main.innerHTML = '';
  reposEl.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUsers(user);
  } else {
    clearResults();
  }
});

search.addEventListener('input', () => {
  const user = search.value;
  if (!user) {
    clearResults();
  }
});
