(function () {
  const COLORS_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/colors.json';
  const COLORS_CACHE_KEY = 'ghLangColors';

  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const container = document.getElementById('carousel');

  let currentSlide = 0;
  let slides = [];

  function getPlatformIcon(platform) {
    if (platform === 'github') {
      return '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
    }
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.15 0C9.64.12 7.56 1.43 6.82 3.91c-.76 2.56.2 5.6 2.28 8.55 1.16 1.65 2.54 2.98 3.49 3.54h.01c.3.18.57.1.63-.21.17-.83.21-2.3-.3-4.21-.29-1.08-.74-2.2-1.15-3.18-.28-.68-.55-1.28-.72-1.75-.09-.25.07-.44.3-.37.7.2 1.48.68 2.08 1.17.48.4.88.82 1.13 1.08.05.05.13.04.16-.02.56-1.16.85-2.52.73-3.39-.12-.83-.62-1.58-1.28-1.83C13.79.6 12.62.06 11.16 0z"/></svg>';
  }

  function getCategoryLabel(category) {
    return category === 'work' ? 'Working on' : 'Contributions';
  }

  async function fetchColors() {
    try {
      const cached = sessionStorage.getItem(COLORS_CACHE_KEY);
      if (cached) return JSON.parse(cached);
      const res = await fetch(COLORS_URL);
      if (!res.ok) throw new Error('Failed to fetch colors');
      const data = await res.json();
      sessionStorage.setItem(COLORS_CACHE_KEY, JSON.stringify(data));
      return data;
    } catch {
      return {};
    }
  }

  function getLangColor(lang, colors) {
    if (!lang || !colors[lang]) return '#8e8e8e';
    return colors[lang];
  }

  async function fetchRepoData(repo) {
    const url = repo.platform === 'github'
      ? `https://api.github.com/repos/${repo.owner}/${repo.repo}`
      : `https://codeberg.org/api/v1/repos/${repo.owner}/${repo.repo}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return null;
    }
  }

  function renderCard(data, repo, colors) {
    const name = data?.name || repo.repo;
    const desc = data?.description || 'No description';
    const lang = data?.language || null;
    const stars = data?.stargazers_count ?? data?.stars_count ?? 0;
    const url = data?.html_url || `https://${repo.platform}.com/${repo.owner}/${repo.repo}`;
    const langColor = getLangColor(lang, colors);

    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="repo-card">
        <div class="repo-card-header">
          <span class="repo-name">${name}</span>
          <span class="repo-stars">★ ${stars}</span>
        </div>
        <p class="repo-desc">${desc}</p>
        <div class="repo-footer">
          ${lang ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColor}"></span>${lang}</span>` : ''}
          <span class="repo-platform">${getPlatformIcon(repo.platform)}</span>
        </div>
      </a>
    `;
  }

  function buildSlides(groups, colors) {
    return groups.map(group => ({
      label: getCategoryLabel(group.category),
      html: group.repos.map(r => renderCard(r.data, r.repo, colors)).join('')
    }));
  }

  function render() {
    currentSlide = 0;
    track.innerHTML = slides.map((slide, i) => `
      <div class="carousel-slide${i === 0 ? ' active' : ''}">
        <h3 class="slide-label">${slide.label}</h3>
        <div class="slide-cards">${slide.html}</div>
      </div>
    `).join('');
    updateArrows();
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlide = index;
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    track.querySelectorAll('.carousel-slide').forEach((el, i) => {
      el.classList.toggle('active', i === currentSlide);
    });
    updateArrows();
  }

  function updateArrows() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }

  async function init() {
    const reposData = document.getElementById('repos-data');
    if (!reposData) return;
    const repos = JSON.parse(reposData.textContent);
    if (!repos.length) {
      container.style.display = 'none';
      return;
    }

    const [colors, ...results] = await Promise.all([
      fetchColors(),
      ...repos.map(fetchRepoData)
    ]);

    const workRepos = { category: 'work', repos: [] };
    const contribRepos = { category: 'contribution', repos: [] };

    repos.forEach((repo, i) => {
      const group = repo.category === 'work' ? workRepos : contribRepos;
      group.repos.push({ repo, data: results[i] });
    });

    slides = buildSlides([workRepos, contribRepos], colors);
    render();

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
