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
      <a href="#awards">Awards</a>
    </nav>
  </div>
</header>

<section id="about" class="home-section">
  <h2>About</h2>
  <p>
    I am <strong>Feixiang Ruan</strong>, an undergraduate student majoring in Automation at the College of Electronic and
    Information Engineering, Tongji University. My research interests include dexterous manipulation and robot evaluation.
  </p>
  <p>
    I also spent a wonderful year as a research assistant at the
    <strong>Institute for Interdisciplinary Information Sciences, Tsinghua University</strong>, working with
    <a href="https://gcfy63821.github.io/">Ruoqu Chen</a> and <a href="https://www.mengdixu.me/">Prof. Mengdi Xu</a>.
  </p>
  <p>
    You can find me on <a href="https://github.com/VVVVME50">GitHub</a> and
    <a href="https://scholar.google.com/citations?user=Yq6XCyIAAAAJ">Google Scholar</a>.
  </p>
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
  <h2>Awards</h2>
  <p class="section-placeholder">Details coming soon.</p>
</section>
