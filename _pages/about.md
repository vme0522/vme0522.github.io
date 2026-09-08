---
layout: about
title: about
permalink: /
subtitle:

profile: false

selected_papers: false
social: false

announcements:
  enabled: false
  scrollable: false
  limit: 5

latest_posts:
  enabled: false
  scrollable: false
  limit: 3
---

<style>
  :root {
    --global-theme-color: #111111;
    --global-hover-color: #555555;
    --global-hover-text-color: #ffffff;
  }

  html {
    scroll-behavior: smooth;
  }

  body > header,
  .post > .post-header {
    display: none;
  }

  body.fixed-top-nav {
    padding-top: 76px;
  }

  .home-header {
    position: fixed;
    z-index: 1030;
    top: 0;
    right: 0;
    left: 0;
    border-bottom: 1px solid #dedede;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
  }

  .home-header__inner {
    display: flex;
    width: min(930px, 100%);
    min-height: 64px;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .home-title,
  .home-nav a {
    color: #111111;
    text-decoration: none;
  }

  .home-title {
    flex: 0 0 auto;
    font-size: 1.05rem;
    font-weight: 650;
    letter-spacing: -0.01em;
  }

  .home-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1.35rem;
    font-size: 0.92rem;
  }

  .home-nav a:hover,
  .home-nav a:focus-visible,
  .home-title:hover,
  .home-title:focus-visible {
    color: #666666;
  }

  .home-section {
    padding: 3rem 0;
    border-bottom: 1px solid #e5e5e5;
    scroll-margin-top: 82px;
  }

  .home-section:first-of-type {
    padding-top: 1.25rem;
  }

  .home-section:last-of-type {
    border-bottom: 0;
  }

  .home-section h2 {
    margin: 0 0 1.4rem;
    color: #111111;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .home-section p:last-child {
    margin-bottom: 0;
  }

  .about-social {
    margin-top: 1rem;
  }

  .about-social a {
    display: inline-flex;
    align-items: center;
    font-size: 1.15rem;
    line-height: 1;
    text-decoration: none;
  }

  .about-layout {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(230px, 2fr);
    align-items: start;
    gap: 2rem;
  }

  .about-avatar {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0.35rem;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
  }

  .home-section a {
    color: #111111;
    text-decoration-color: #aaaaaa;
    text-underline-offset: 0.18em;
  }

  .home-section a:hover,
  .home-section a:focus-visible {
    color: #555555;
  }

  .home-section .btn {
    border-color: #b8b8b8;
    color: #222222;
  }

  .publications .author em {
    font-style: normal;
    font-weight: 700;
  }

  .pub-spotlight {
    color: #c62828;
    font-weight: 700;
  }

  @media (min-width: 576px) {
    .publications .row > .col-sm-2 {
      flex: 0 0 32%;
      max-width: 32%;
      padding-right: 1.5rem;
    }

    .publications .row > .col-sm-8 {
      flex: 0 0 68%;
      max-width: 68%;
    }

    .publications .abbr figure,
    .publications .abbr img.preview {
      width: 100%;
    }
  }

  .section-placeholder {
    color: #777777;
  }

  .honors-group + .honors-group {
    margin-top: 1.75rem;
  }

  .honors-group h3 {
    margin: 0 0 0.65rem;
    font-size: 1.05rem;
    font-weight: 600;
  }

  .honors-list {
    display: grid;
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .honors-list li {
    display: grid;
    grid-template-columns: 5.7rem minmax(0, 1fr);
    gap: 0.8rem;
  }

  .honors-list time {
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    body.fixed-top-nav {
      padding-top: 104px;
    }

    .home-header__inner {
      min-height: 92px;
      align-content: center;
      align-items: flex-start;
      flex-direction: column;
      gap: 0.45rem;
      justify-content: center;
    }

    .home-nav {
      justify-content: flex-start;
      gap: 0.5rem 1rem;
      font-size: 0.86rem;
    }

    .home-section {
      padding: 2.25rem 0;
      scroll-margin-top: 112px;
    }

    .publications .row > .abbr,
    .publications .row > .col-sm-8 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .publications .abbr {
      margin-bottom: 1rem;
    }

    .about-layout {
      grid-template-columns: 1fr;
    }

    .about-avatar {
      width: min(100%, 360px);
    }
  }
</style>

<header class="home-header">
  <div class="home-header__inner">
    <a class="home-title" href="#about">Feixiang Ruan</a>
    <nav class="home-nav" aria-label="Homepage sections">
      <a href="#about">About</a>
      <a href="#news">News</a>
      <a href="#publications">Publications</a>
      <a href="#internships">Internships</a>
      <a href="#awards">Awards &amp; Honors</a>
    </nav>
  </div>
</header>

<section id="about" class="home-section">
  <h2>About</h2>
  <div class="about-layout">
    <div class="about-copy">
      <p>
        I am <strong>Feixiang Ruan</strong>, an undergraduate student majoring in Automation at the College of Electronic and
        Information Engineering, Tongji University. My research interests include dexterous manipulation and robot evaluation.
      </p>
      <p>
        I also spent a wonderful year as a research assistant at the
        <strong>Institute for Interdisciplinary Information Sciences, Tsinghua University</strong>, working with
        <a href="https://gcfy63821.github.io/">Ruoqu Chen</a> and <a href="https://www.mengdixu.me/">Prof. Mengdi Xu</a>.
        I have also joined <strong>SHARPA</strong> as an Algorithm Engineer in the <strong>Academia Group</strong>, under the guidance of
        Kaifeng Zhang.
      </p>
      <div class="about-social">
        <a href="https://scholar.google.com/citations?user=Yq6XCyIAAAAJ" aria-label="Google Scholar" title="Google Scholar">
          <i class="ai ai-google-scholar ai-2x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <img class="about-avatar" src="{{ '/assets/img/profile-art-right.jpg' | relative_url }}" alt="Feixiang Ruan profile artwork">
  </div>
</section>

<section id="news" class="home-section">
  <h2>News</h2>
  <p>
    <time datetime="2026-09"><strong>2026-09</strong></time> — Our paper
    <a href="https://dexx-code.github.io/dexx-code/"><strong>DEX-X</strong></a> has been accepted to the
    Conference on Robot Learning (CoRL) 2026.
  </p>
</section>

<section id="publications" class="home-section">
  <h2>Publications</h2>
  <div class="publications">
    {% bibliography --group_by none --query @*[selected=true]* %}
  </div>
</section>

<section id="internships" class="home-section">
  <h2>Internships</h2>
  <p class="section-placeholder">Details coming soon.</p>
</section>

<section id="awards" class="home-section">
  <h2>Awards &amp; Honors</h2>
  <div class="honors-group">
    <h3>Academic Honors</h3>
    <ul class="honors-list">
      <li><time datetime="2026-05"><strong>2026-05</strong></time><span>Qidi Scholarship</span></li>
      <li><time datetime="2025-12"><strong>2025-12</strong></time><span>National Scholarship</span></li>
      <li>
        <time datetime="2024-12"><strong>2024-12</strong></time><span>Undergraduate First-Class Scholarship, Tongji University</span>
      </li>
      <li><time datetime="2023-12"><strong>2023-12</strong></time><span>National Scholarship</span></li>
    </ul>
  </div>
  <div class="honors-group">
    <h3>Competitions</h3>
    <ul class="honors-list">
      <li>
        <time datetime="2025-08"><strong>2025-08</strong></time
        ><span>National Second Prize, China Collegiate Intelligent Robot Creative Competition</span>
      </li>
      <li>
        <time datetime="2025-05"><strong>2025-05</strong></time><span>5th Place, Skills Challenge, VEX Robotics World Championship</span>
      </li>
      <li>
        <time datetime="2024-12"><strong>2024-12</strong></time
        ><span>National Second Prize, China Intelligent Robot Combat and Athletics Competition</span>
      </li>
      <li>
        <time datetime="2024-11"><strong>2024-11</strong></time
        ><span>National First Prize (Champion), China Robot Competition and RoboCup China Open</span>
      </li>
      <li>
        <time datetime="2024-05"><strong>2024-05</strong></time><span>4th Place, Skills Challenge, VEX Robotics World Championship</span>
      </li>
    </ul>
  </div>
</section>
