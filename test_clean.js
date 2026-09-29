
    /* Theme Toggle */
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('effcom_theme') || 'light';
    if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('effcom_theme', newTheme);
    });

    /* Tab Switching */
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        tabSections.forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    /* Study Mode: Deep vs Cram */
    function setStudyMode(mode) {
      const btnDeep = document.getElementById('btnModeDeep');
      const btnCram = document.getElementById('btnModeCram');
      if (mode === 'cram') {
        document.body.classList.add('cram-mode');
        btnCram.classList.add('active');
        btnDeep.classList.remove('active');
      } else {
        document.body.classList.remove('cram-mode');
        btnDeep.classList.add('active');
        btnCram.classList.remove('active');
      }
    }

    /* Example Toggle */
    function switchExample(btn, paneId) {
      const parent = btn.closest('.interactive-example-box');
      parent.querySelectorAll('.ex-tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.example-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      parent.querySelector('#' + paneId).classList.add('active');
    }

    /* Audience Selector (Slides 29-33) */
    const audienceData = {
      expert: {
        slide: "Slide 30",
        title: "Expert Audience (Slide 30)",
        def: "Specialists who possess deep background knowledge (e.g., scientists, engineers).",
        strategy: "Use specialized technical jargon directly without stopping to define basic concepts.",
        example: "'The allosteric binding kinetics demonstrated competitive inhibition with a Km of 4.2 µM.'"
      },
      lay: {
        slide: "Slide 31",
        title: "Non-Expert / Lay Audience (Slide 31)",
        def: "Readers with little or no technical background (e.g., the general public).",
        strategy: "Simplify complex terms, use relatable everyday analogies, and define technical terms immediately.",
        example: "'The medicine works like a key in a lock, gently slowing down the cell engine so it doesn't overheat.'"
      },
      peer: {
        slide: "Slide 32",
        title: "Peer Audience (Slide 32)",
        def: "Fellow students or colleagues with a similar level of training.",
        strategy: "Balance professional rigor with engaging, relatable explanations.",
        example: "'As observed in our biology lab sessions, temperature shifts significantly altered bacterial growth rates.'"
      },
      eval: {
        slide: "Slide 33",
        title: "Academic Evaluators (Slide 33)",
        def: "Teachers, professors, or panel defense members who grade output.",
        strategy: "Demonstrate complete mastery, rigorous citation, and strict formal structure.",
        example: "'In accordance with APA standards, all empirical claims are substantiated via rigorous primary documentation (p < .01).'"
      }
    };

    function selectAudience(key, btnEl) {
      document.querySelectorAll('.aud-btn').forEach(b => b.classList.remove('active'));
      if (btnEl) {
        btnEl.classList.add('active');
      } else {
        const first = document.querySelector('.aud-btn');
        if (first) first.classList.add('active');
      }

      const data = audienceData[key];
      const host = document.getElementById('audDisplayCard');
      if (!host || !data) return;
      host.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="font-family: var(--font-display); font-size: 17px; margin-bottom: 0; color: var(--primary);">${data.title}</h4>
          <span class="slide-badge">${data.slide}</span>
        </div>
        <div class="verbatim-quote-box" style="margin: 6px 0 10px 0;">
          <span class="quote-title">📖 Verbatim Definition</span>
          "${data.def}"
        </div>
        <p style="font-size: 14px; color: var(--t2); line-height: 1.6; margin-bottom: 12px;"><strong>Appropriate Strategy to Use:</strong> "${data.strategy}"</p>
        <div style="background: var(--bg-card-muted); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 13px; font-style: italic; color: var(--t2);">
          <strong>Example Tone:</strong> ${data.example}
        </div>
      `;
    }
    // Initialize default audience safely
    selectAudience('expert', null);

    /* Cornell Notes Recall Toggle */
    let notesVisible = true;
    function toggleCornellNotes() {
      const col = document.getElementById('cornellNotesCol');
      const btn = document.getElementById('btnToggleNotes');
      notesVisible = !notesVisible;
      if (!notesVisible) {
        col.style.filter = 'blur(6px)';
        col.style.pointerEvents = 'none';
        btn.textContent = '🙈 Notes Blurred (Quiz Yourself from Cues!)';
      } else {
        col.style.filter = 'none';
        col.style.pointerEvents = 'auto';
        btn.textContent = '👁️ Toggle Notes (Recall Test)';
      }
    }

    function loadCornellSample() {
      document.getElementById('cornellCueContent').innerHTML = `
        • Academic vs Technical?<br/><br/>
        • 6 Characteristics?<br/><br/>
        • What is Hedging?<br/><br/>
        • 4 Audience types?<br/><br/>
        • SQ5R steps?<br/><br/>
        • TEAC paragraph?
      `;
      document.getElementById('cornellNotesContent').innerHTML = `
        - Academic: Linear, scholarly research, thesis, formal (APA/MLA).<br/>
        - Technical: Practical, guides human action, user manuals/SOPs.<br/>
        - 6 Rules: Evidence-based (data), Structured (Tripartite/Modular), Critical (depth/why), Balanced (hedging: modal verbs), Precise (quantify numbers), Formal (no contractions/slang).<br/>
        - APC: Audience dictates jargon; Purpose = inform/persuade/instruct; Context = setting/discipline.<br/>
        - SQ5R: Survey, Question, Read, Recite, Review.<br/>
        - TEAC: Topic Sentence, Evidence, Analysis, Clincher.
      `;
      document.getElementById('cornellSummaryContent').innerHTML = `
        Academic and technical communication share formal, objective foundations but serve distinct purposes. Mastery requires analyzing audience/purpose/context, applying critical reading (SQ5R, TEAC), active/reflective listening, and maintaining visual scale integrity.
      `;
    }

    /* Scale Integrity Visualizer (Slide 47) */
    function updateScaleDemo(val) {
      const v = parseInt(val);
      const span = document.getElementById('baselineVal');
      const barA = document.getElementById('barA');
      const barB = document.getElementById('barB');
      const yLabelBottom = document.getElementById('yLabelBottom');
      const comm = document.getElementById('scaleCommentary');

      yLabelBottom.textContent = v + '%';

      if (v === 0) {
        span.textContent = '0% (Honest Accurate Scale)';
        span.style.color = 'var(--primary)';
        barA.setAttribute('y', '35');
        barA.setAttribute('height', '125');
        barB.setAttribute('y', '38');
        barB.setAttribute('height', '122');
        comm.innerHTML = '✅ Baseline starts at 0%: The modest 2% difference (96% vs 94%) is represented honestly and proportionally.';
        comm.style.color = 'var(--accent-emerald)';
      } else {
        span.textContent = v + '% (Distorted Truncated Scale)';
        span.style.color = 'var(--accent-rose)';
        const range = 100 - v;
        const hA = Math.max(10, ((96 - v) / range) * 130);
        const hB = Math.max(10, ((94 - v) / range) * 130);
        barA.setAttribute('height', hA);
        barA.setAttribute('y', 160 - hA);
        barB.setAttribute('height', hB);
        barB.setAttribute('y', 160 - hB);
        comm.innerHTML = `⚠️ Truncated baseline at ${v}%: The tiny 2% difference appears dramatically magnified! This violates Scale Integrity in Critical Viewing (Slide 47).`;
        comm.style.color = 'var(--accent-rose)';
      }
    }

    /* Lightbox Modal */
    function openLightbox(src) {
      const box = document.getElementById('imageLightbox');
      const img = document.getElementById('lightboxImg');
      img.src = src;
      box.style.display = 'flex';
    }

    function closeLightbox() {
      document.getElementById('imageLightbox').style.display = 'none';
    }

    /* Search Bar Live Filtering */
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('.searchable-item');
      const rows = document.querySelectorAll('#glossaryTable tbody tr');

      if (!term) {
        items.forEach(it => it.style.display = '');
        rows.forEach(r => r.style.display = '');
        return;
      }

      items.forEach(it => {
        const text = it.textContent.toLowerCase();
        it.style.display = text.includes(term) ? '' : 'none';
      });

      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(term) ? '' : 'none';
      });
    });

    /* FLASHCARD DATA & ENGINE (VERBATIM SLIDE QUOTES) */
const flashcards = [];

    let currentCardIndex = 0;
    function updateFlashcardUI() {
      const card = flashcards[currentCardIndex];
      const fcEl = document.getElementById('mainFlashcard');
      fcEl.classList.remove('flipped');

      document.getElementById('fcBadge').textContent = card.badge;
      document.getElementById('fcFrontText').textContent = card.front;
      document.getElementById('fcBackText').innerHTML = card.back;
      document.getElementById('fcBackEx').innerHTML = card.ex;

      document.getElementById('fcCounter').textContent = `Card ${currentCardIndex + 1} of ${flashcards.length}`;
      const pct = ((currentCardIndex + 1) / flashcards.length) * 100;
      document.getElementById('fcProgressFill').style.width = pct + '%';
    }

    function flipCurrentCard() {
      document.getElementById('mainFlashcard').classList.toggle('flipped');
    }

    function nextFlashcard() {
      if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
      } else {
        currentCardIndex = 0;
      }
      updateFlashcardUI();
    }

    function prevFlashcard() {
      if (currentCardIndex > 0) {
        currentCardIndex--;
      } else {
        currentCardIndex = flashcards.length - 1;
      }
      updateFlashcardUI();
    }

    function shuffleFlashcards() {
      for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
      }
      currentCardIndex = 0;
      updateFlashcardUI();
    }

    function resetFlashcards() {
      currentCardIndex = 0;
      updateFlashcardUI();
    }

    document.addEventListener('keydown', (e) => {
      const activeTab = document.querySelector('.tab-section.active');
      if (activeTab && activeTab.id === 'tab-flashcards') {
        if (e.code === 'Space') {
          e.preventDefault();
          flipCurrentCard();
        } else if (e.code === 'ArrowRight') {
          nextFlashcard();
        } else if (e.code === 'ArrowLeft') {
          prevFlashcard();
        }
      }
    });

    // Initialize Flashcard
    updateFlashcardUI();

    /* QUIZ DATABASE (25 QUESTIONS FROM 48 SLIDES) */
const quizQuestions = [];

    let userAnswers = {};
    function renderQuiz() {
      const host = document.getElementById('quizQuestionsHost');
      if (!host) return;
      host.innerHTML = quizQuestions.map((q, idx) => `
        <div class="quiz-card" id="qCard-${idx}">
          <div class="quiz-q-meta">
            <span>Question ${idx + 1} of ${quizQuestions.length}</span>
            <span id="qStatus-${idx}">Unanswered</span>
          </div>
          <div class="quiz-question-text">${q.q}</div>
          <div class="quiz-options">
            ${q.opts.map((opt, oIdx) => `
              <button class="quiz-option" id="qOpt-${idx}-${oIdx}" onclick="selectQuizAnswer(${idx}, ${oIdx})">
                <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-explanation" id="qExp-${idx}">
            <strong>Rationale:</strong> ${q.exp}
          </div>
        </div>
      `).join('');
    }

    function selectQuizAnswer(qIdx, oIdx) {
      if (userAnswers[qIdx] !== undefined) return;
      userAnswers[qIdx] = oIdx;

      const q = quizQuestions[qIdx];
      const optBtn = document.getElementById(`qOpt-${qIdx}-${oIdx}`);
      const correctBtn = document.getElementById(`qOpt-${qIdx}-${q.ans}`);
      const statusSpan = document.getElementById(`qStatus-${qIdx}`);
      const expBox = document.getElementById(`qExp-${qIdx}`);

      document.querySelectorAll(`[id^="qOpt-${qIdx}-"]`).forEach(b => b.classList.add('locked'));

      if (oIdx === q.ans) {
        optBtn.classList.add('correct');
        statusSpan.textContent = '✅ Correct';
        statusSpan.style.color = 'var(--accent-emerald)';
      } else {
        optBtn.classList.add('wrong');
        correctBtn.classList.add('correct');
        statusSpan.textContent = '❌ Incorrect';
        statusSpan.style.color = 'var(--accent-rose)';
      }

      expBox.classList.add('show');
      updateQuizProgress();
    }

    function updateQuizProgress() {
      const answeredCount = Object.keys(userAnswers).length;
      let correctCount = 0;
      Object.keys(userAnswers).forEach(idx => {
        if (userAnswers[idx] === quizQuestions[idx].ans) correctCount++;
      });

      document.getElementById('quizProgressText').textContent = `Answered ${answeredCount} of ${quizQuestions.length}`;
      document.getElementById('quizLiveScore').textContent = `Score: ${correctCount} / ${answeredCount}`;

      if (answeredCount === quizQuestions.length) {
        showFinalQuizResults(correctCount);
      }
    }

    function showFinalQuizResults(correct) {
      const pct = Math.round((correct / quizQuestions.length) * 100);
      const card = document.getElementById('quizResultCard');
      const val = document.getElementById('finalScoreVal');
      const title = document.getElementById('finalScoreTitle');
      const desc = document.getElementById('finalScoreDesc');

      val.textContent = pct + '%';
      if (pct >= 90) {
        title.textContent = '🌟 Outstanding Mastery!';
        desc.textContent = `You scored ${correct} out of ${quizQuestions.length}. You have mastered all verbatim slide concepts for the First Long Quiz!`;
      } else if (pct >= 75) {
        title.textContent = '👍 Solid Proficiency!';
        desc.textContent = `You scored ${correct} out of ${quizQuestions.length}. Review the rationales above to lock in a 100% score.`;
      } else {
        title.textContent = '📚 Keep Reviewing!';
        desc.textContent = `You scored ${correct} out of ${quizQuestions.length}. Review the verbatim quotes in the Study Guide and Glossary.`;
      }
      card.style.display = 'block';
      card.scrollIntoView({ behavior: 'smooth' });
    }

    function restartQuiz() {
      userAnswers = {};
      document.getElementById('quizResultCard').style.display = 'none';
      renderQuiz();
      document.getElementById('quizProgressText').textContent = `Question 1 of ${quizQuestions.length}`;
      document.getElementById('quizLiveScore').textContent = 'Score: 0 / 0';
      window.scrollTo({ top: document.getElementById('tab-quiz').offsetTop - 60, behavior: 'smooth' });
    }

    // Initialize Quiz
    renderQuiz();

  