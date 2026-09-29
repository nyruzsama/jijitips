
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

    /* FLASHCARD DATA & ENGINE (VERBATIM SLIDE QUOTES) */
    const flashcards = [
      {
            "badge": "Slide 4 — Definition",
            "front": "Academic Texts",
            "back": "Formal, structured, linear, and evidence-based writing used in scholarly settings to analyze ideas, construct arguments, or build knowledge for academic evaluators and readers.",
            "ex": "<strong>Core Goal (Slide 5):</strong> To inform, analyze, or persuade using scholarly research.<br/><strong>Examples:</strong> Research articles, position papers, literature reviews, academic essays."
      },
      {
            "badge": "Slide 6 — Definition",
            "front": "Technical Texts",
            "back": "Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently.",
            "ex": "<strong>Core Goal (Slide 7):</strong> To guide action, explain a technical process, or document data.<br/><strong>Examples:</strong> User manuals, Standard Operating Procedures (SOPs), safety guidelines, lab reports."
      },
      {
            "badge": "Slide 8 — Fundamental Concept",
            "front": "Shared Umbrella of Academic & Technical Writing",
            "back": "While academic writing and technical writing serve different primary audiences and purposes, they sit under the same umbrella of formal, informative communication and share a core set of fundamental characteristics.",
            "ex": "Both require evidence-based objectivity, predictable structure, precision, critical evaluation, balance, and formal mechanics."
      },
      {
            "badge": "Slide 9 & 10 — Characteristic 1",
            "front": "Evidence-Based / Objective",
            "back": "Arguments, claims, and conclusions presented in academic and technical contexts must always be supported by empirical data, reputable facts, expert insights, or primary observations.<br/><br/>At the same time, the writing puts more emphasis on information and arguments and less on the feelings or personal perspectives of the writer, focusing entirely on the subject matter being discussed.",
            "ex": "<strong>Indicators (Slide 11):</strong> Survey data, statistics, APA/MLA citations; eliminating first-person subjective expressions (\"I think,\" \"I feel\")."
      },
      {
            "badge": "Slide 13 — Characteristic 2",
            "front": "Structured",
            "back": "It should follow a predictable, logical, and standardized organizational pattern. This structure serves as a roadmap that guides the reader seamlessly through complex ideas without unnecessary digressions or scatter.",
            "ex": "<strong>Indicators (Slide 14):</strong><br/>• Tripartite Structure for Essays (Introduction, Body, Conclusion)<br/>• Modular / Hierarchical Setup for Technical Texts (numbered steps, bulleted lists, subheadings)."
      },
      {
            "badge": "Slide 16 — Characteristic 3",
            "front": "Critical",
            "back": "Academic writing requires analytical and evaluative thinking. Writers must not merely describe or summarize information; they must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights.",
            "ex": "<strong>Indicators (Slide 17):</strong> Analyzing why and how a phenomenon occurs; identifying gaps/limitations in existing literature; evaluating source validity before citing."
      },
      {
            "badge": "Slide 19 — Characteristic 4",
            "front": "Balanced",
            "back": "Academic writing aims to consider different perspectives or arguments on an issue or topic to avoid being biased or one-sided. Writers exercise caution when making claims or conclusions to avoid making sweeping generalizations or unfounded statements.",
            "ex": "<strong>Indicators (Slide 20 - Hedging):</strong> Modal verbs (may, suggest), probability adverbs (likely, possibly), tentative phrases (\"the data imply that\")."
      },
      {
            "badge": "Slide 22 — Characteristic 5",
            "front": "Precise",
            "back": "Academic and technical writing strives to provide clear, accurate, and correct information that clearly captures what the data show. Vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable.",
            "ex": "<strong>Indicators (Slide 23):</strong> Exact vocabulary (increase/decrease instead of changed); quantifying observations with measurements, percentages, and units."
      },
      {
            "badge": "Slide 24 — Characteristic 6",
            "front": "Formal",
            "back": "Academic writing observes formal conventions of writing. Adhering to formal language and tone maintains professionalism, establishes authority, and ensures respect across scholarly and technical communities.",
            "ex": "<strong>Indicators (Slide 25):</strong> Zero colloquialisms/slang (\"cool,\" \"gonna\"); No contractions (spell out \"cannot,\" \"did not\"); Standard mechanics and citations."
      },
      {
            "badge": "Slide 28 — Core Model",
            "front": "The APC Framework",
            "back": "The foundational communication model standing for Audience, Purpose, and Context. Every effective text is shaped by who it is for (Audience), what it aims to achieve (Purpose), and the environment/medium in which it operates (Context).",
            "ex": "Slide 28-36: Aligns register, vocabulary, tone, structure, and length to rhetorical constraints."
      },
      {
            "badge": "Slide 29 & 30 — APC: Audience",
            "front": "Expert Audience",
            "back": "Specialists who possess deep background knowledge (e.g., scientists, engineers).",
            "ex": "<strong>Appropriate Strategy (Slide 30):</strong> Use specialized technical jargon directly without stopping to define basic concepts."
      },
      {
            "badge": "Slide 31 — APC: Audience",
            "front": "Non-Expert / Lay Audience",
            "back": "Readers with little or no technical background (e.g., the general public).",
            "ex": "<strong>Appropriate Strategy (Slide 31):</strong> Simplify complex terms, use relatable everyday analogies, and define technical terms immediately."
      },
      {
            "badge": "Slide 32 — APC: Audience",
            "front": "Peer Audience",
            "back": "Fellow students or colleagues with a similar level of training.",
            "ex": "<strong>Appropriate Strategy (Slide 32):</strong> Balance professional rigor with engaging, relatable explanations."
      },
      {
            "badge": "Slide 33 — APC: Audience",
            "front": "Academic Evaluators",
            "back": "Teachers, professors, or defense panel members who grade output.",
            "ex": "<strong>Appropriate Strategy (Slide 33):</strong> Demonstrate complete mastery, rigorous citation, and strict formal structure."
      },
      {
            "badge": "Slide 34 — APC: Purpose",
            "front": "Purposes in Academic & Technical Texts",
            "back": "Purpose defines the intended goal or outcome of your text. It determines the structure, strategy, focus, and call to action.<br/><br/>1. To Inform / Explain<br/>2. To Persuade / Argue<br/>3. To Instruct / Direct",
            "ex": "Slide 34: Academic texts prioritize informing/persuading; technical texts prioritize instructing/directing."
      },
      {
            "badge": "Slide 35 & 36 — APC: Context",
            "front": "Context & Its 3 Categories",
            "back": "Context encompasses the surrounding circumstances, environment, medium, and constraints of the interaction. It dictates the format, length, timing, and boundary conditions of your message.<br/><br/>1. Physical / Digital Setting<br/>2. Medium & Format<br/>3. Discipline Expectations",
            "ex": "<strong>Discipline Rule (Slide 36):</strong> Humanities prioritize argument and textual evidence; Sciences focus on methodology and replicable data."
      },
      {
            "badge": "Slide 38 & 39 — Reading",
            "front": "Pre-Reading: Previewing & SQ5R",
            "back": "<strong>Previewing:</strong> Reading titles, abstracts, and captions to set reading goals.<br/><br/><strong>SQ5R Model:</strong><br/>• Survey: scan headings/visuals<br/>• Question: turn headings into questions<br/>• Read: actively seek answers<br/>• Recite: summarize key points<br/>• Review: check overall recall",
            "ex": "Slide 38 & 39 Critical Reading Strategies."
      },
      {
            "badge": "Slide 40 — Reading",
            "front": "During Reading: Annotation & TEAC Model",
            "back": "<strong>Annotation:</strong> Highlighting main claims, circling key terms, and writing questions in the margins.<br/><br/><strong>TEAC Paragraph Structure:</strong><br/>• T (Topic Sentence): States the main claim.<br/>• E (Evidence): Statistics, study results, expert quotes.<br/>• A (Analysis): Explains how evidence proves topic sentence.<br/>• C (Clincher/Conclusion): Summarizes point or transitions.",
            "ex": "Slide 40 TEAC Model for paragraph cohesion."
      },
      {
            "badge": "Slide 41 — Reading",
            "front": "Post-Reading: Journaling, Outlining, Summarizing",
            "back": "• <strong>Double-Entry Journaling:</strong> A two-column graphic organizer that explicitly separates text evidence from student analysis.<br/>• <strong>Outlining:</strong> Deconstructing a text into a hierarchical alphanumeric or bulleted structure to make its organizational logic visible.<br/>• <strong>Summarizing:</strong> Restating the central thesis and main supporting arguments in your own words, removing minor details, examples, and repetitive phrasing.",
            "ex": "Slide 41 Post-Reading Strategies."
      },
      {
            "badge": "Slide 43 — Listening",
            "front": "Active Listening (How to do it)",
            "back": "Focuses full cognitive attention on the speaker, filtering out distractions and withholding hasty judgments until the message is fully delivered.<br/><br/>• Paying Attention: Total focus on verbal cues, vocal tone, body language.<br/>• Evaluating: Analyzing logical validity of arguments and checking factual support.<br/>• Responding Thoughtfully: Formulating questions/feedback based on accurate facts rather than emotional reaction.",
            "ex": "Slide 43 Active Listening steps."
      },
      {
            "badge": "Slide 44 & 45 — Listening",
            "front": "The Cornell Note-Taking System Layout",
            "back": "A structured format for taking, organizing, and reviewing lecture notes.<br/><br/>• <strong>Notes Column (Right, 70% width):</strong> Record main lecture concepts, facts, equations using abbreviations and bullet points during presentation.<br/>• <strong>Cue Column (Left, 30% width):</strong> Formulated immediately after lecture; record key vocabulary terms, main themes, potential exam questions.<br/>• <strong>Summary Block (Bottom, 2-3 inches):</strong> Write 2-4 sentence summary synthesizing page's core content.",
            "ex": "Slide 44 & 45 Cornell Note layout."
      },
      {
            "badge": "Slide 46 & 48 — Listening",
            "front": "Reflective Listening",
            "back": "Paraphrasing or restating the speaker's core message back to them to confirm accurate interpretation before moving forward.<br/><br/><strong>Verbatim Formula (Slide 46 & 48):</strong><br/><em>\"If I understand correctly, you are saying that [paraphrased main point]. Is that correct?\"</em>",
            "ex": "Slide 46 & 48 Reflective Listening protocol."
      },
      {
            "badge": "Slide 47 — Viewing",
            "front": "Critical Viewing Strategies",
            "back": "Empowers learners to decode, analyze, and evaluate multimodal visuals (charts, diagrams, infographics, videos) to detect bias, identify manipulated data, and verify claims.<br/><br/><strong>What to look out for:</strong><br/>1. Visual Grammar: layout, symbols, color coding, typography<br/>2. Scale Integrity: zero baselines, proportional axes<br/>3. Source Credibility: provenance and credentials",
            "ex": "Slide 47 Critical Viewing checkpoints."
      }
];


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

    /* QUIZ DATA & ENGINE (VERBATIM SLIDE QUESTIONS) */
    const quizQuestions = [
      {
            "q": "According to Slide 4, what is the exact definition of an Academic Text?",
            "opts": [
                  "Functional, practical, and highly precise writing designed to instruct, direct, or document procedures",
                  "Formal, structured, linear, and evidence-based writing used in scholarly settings to analyze ideas, construct arguments, or build knowledge for academic evaluators and readers",
                  "A creative compilation of personal opinions, fictional narratives, and emotional interpretations of cultural events",
                  "Informal correspondence between colleagues designed to speed up team workflows"
            ],
            "ans": 1,
            "exp": "Slide 4 verbatim defines Academic Texts as: 'Formal, structured, linear, and evidence-based writing used in scholarly settings to analyze ideas, construct arguments, or build knowledge for academic evaluators and readers.'"
      },
      {
            "q": "According to Slide 6, what is the verbatim definition of a Technical Text?",
            "opts": [
                  "Formal, structured, linear, and evidence-based writing used in scholarly settings to analyze ideas",
                  "Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently",
                  "Persuasive essays written exclusively for thesis defense committees and academic researchers",
                  "Descriptive narrative accounts detailing subjective experiences in workplace environments"
            ],
            "ans": 1,
            "exp": "Slide 6 explicitly defines Technical Texts as 'Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently.'"
      },
      {
            "q": "What core concept does Slide 8 establish regarding the relationship between Academic and Technical writing?",
            "opts": [
                  "They are fundamentally opposed and share no stylistic or structural commonalities",
                  "Technical writing is an informal, unreferenced precursor to true academic scholarship",
                  "While serving different primary audiences and purposes, they sit under the same umbrella of formal, informative communication and share fundamental characteristics",
                  "Academic writing relies on personal feelings, while technical writing relies on fiction"
            ],
            "ans": 2,
            "exp": "Slide 8 establishes that both genres 'sit under the same umbrella of formal, informative communication and share a core set of fundamental characteristics.'"
      },
      {
            "q": "According to Slide 10, how does an Evidence-Based / Objective text treat personal perspectives?",
            "opts": [
                  "It makes personal emotions the primary framework for validating arguments",
                  "It puts more emphasis on information and arguments and less on the feelings or personal perspectives of the writer, focusing entirely on the subject matter",
                  "It requires the writer to include first-person narrative anecdotes in every paragraph",
                  "It eliminates references and relies exclusively on intuitive reasoning"
            ],
            "ans": 1,
            "exp": "Slide 10 verbatim states: 'the writing puts more emphasis on information and arguments and less on the feelings or personal perspectives of the writer, focusing entirely on the subject matter being discussed.'"
      },
      {
            "q": "Which of the following phrases violates the objectivity guideline in Slide 11?",
            "opts": [
                  "\"Survey data from 250 learners reveal a 12% decrease in engagement...\"",
                  "\"In my personal opinion, I strongly feel that online homework is terrible...\"",
                  "\"The laboratory results indicate that solution temperature reached 78°C...\"",
                  "\"As established by Garcia (2024), screen fatigue is prevalent among adolescents...\""
            ],
            "ans": 1,
            "exp": "Slide 11 explicitly highlights 'Minimizing or eliminating first-person subjective expressions (\"I think,\" \"I feel,\" \"in my opinion\") in favor of objective phrasing.'"
      },
      {
            "q": "According to Slide 14, what constitutes the Tripartite Structure for academic essays?",
            "opts": [
                  "Cue Column, Main Notes Column, and Summary Block",
                  "Survey, Question, and Read",
                  "A clear Introduction (hook, background, thesis statement), Body (evidence and analysis), and Conclusion (thesis restatement, summary, clincher)",
                  "Topic Sentence, Evidence, and Analysis"
            ],
            "ans": 2,
            "exp": "Slide 14 defines the Tripartite Structure as: 'Introduction (hook, background, thesis statement), Body (evidence and analysis), and Conclusion (thesis restatement, summary, clincher).'"
      },
      {
            "q": "What is the primary function of structure in academic and technical texts according to Slide 13?",
            "opts": [
                  "To meet arbitrary word counts imposed by academic institutions",
                  "It serves as a roadmap that guides the reader seamlessly through complex ideas without unnecessary digressions or scatter",
                  "To disguise weak arguments behind dense formatting and typography",
                  "To allow the author to insert emotional digressions at random intervals"
            ],
            "ans": 1,
            "exp": "Slide 13 states verbatim: 'This structure serves as a roadmap that guides the reader seamlessly through complex ideas without unnecessary digressions or scatter.'"
      },
      {
            "q": "According to Slide 16, what does being 'Critical' require writers to do?",
            "opts": [
                  "Merely describe or summarize information found in textbooks",
                  "Aggressively attack opposing authors using emotional insults",
                  "Writers must not merely describe or summarize information; they must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights",
                  "Accept all published sources as indisputable facts without questioning methodology"
            ],
            "ans": 2,
            "exp": "Slide 16 states verbatim: 'Writers must not merely describe or summarize information; they must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights.'"
      },
      {
            "q": "Slide 20 identifies hedging techniques to maintain a 'Balanced' text. Which group contains examples of Modal Verbs?",
            "opts": [
                  "likely, possibly, presumably, generally",
                  "may, suggest, appear, seem",
                  "\"the data imply that...\", \"results indicate a potential link...\"",
                  "always, undeniably, absolutely, guaranteed"
            ],
            "ans": 1,
            "exp": "Slide 20 explicitly lists 'Modal Verbs (may, suggest, appear, seem)' as key indicators of balanced texts."
      },
      {
            "q": "Why is precision mandatory in academic and technical writing according to Slide 22?",
            "opts": [
                  "Vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable",
                  "It allows texts to be translated into foreign languages without proofreading",
                  "It increases the length and vocabulary score of published papers",
                  "It ensures that non-specialists cannot understand the content"
            ],
            "ans": 0,
            "exp": "Slide 22 states: 'Vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable.'"
      },
      {
            "q": "What does Slide 25 mandate regarding Contractions in Formal academic texts?",
            "opts": [
                  "Contractions are preferred because they make the writing relatable and approachable",
                  "Contractions can be used freely in body paragraphs but never in conclusions",
                  "No Contractions: Spelling out words completely (e.g., writing \"cannot,\" \"did not,\" \"would have\" instead of \"can't,\" \"didn't,\" \"would've\")",
                  "Contractions are only prohibited in scientific laboratory manuals"
            ],
            "ans": 2,
            "exp": "Slide 25 explicitly mandates: 'No Contractions: Spelling out words completely (e.g., writing \"cannot,\" \"did not,\" \"would have\" instead of \"can't,\" \"didn't,\" \"would've\").'"
      },
      {
            "q": "What does the acronym APC stand for according to Slide 28?",
            "opts": [
                  "Analysis, Purpose, Conclusion",
                  "Audience, Purpose, and Context",
                  "Argument, Proof, and Citation",
                  "Academic, Practical, and Critical"
            ],
            "ans": 1,
            "exp": "Slide 28 explicitly defines the APC framework as Audience, Purpose, and Context."
      },
      {
            "q": "When writing for an Expert Audience (Slide 30), what is the appropriate strategy?",
            "opts": [
                  "Simplify terms, use relatable everyday analogies, and define basic concepts immediately",
                  "Use specialized technical jargon directly without stopping to define basic concepts",
                  "Avoid all technical vocabulary and rely exclusively on visual cartoons",
                  "Use casual slang to keep the reading experience entertaining"
            ],
            "ans": 1,
            "exp": "Slide 30 states: 'Appropriate Strategy to Use: Use specialized technical jargon directly without stopping to define basic concepts.'"
      },
      {
            "q": "When communicating with a Non-Expert / Lay Audience (Slide 31), what must the author do?",
            "opts": [
                  "Present raw differential equations without narrative text",
                  "Simplify complex terms, use relatable everyday analogies, and define technical terms immediately",
                  "Assume the reader has an advanced doctorate in the field",
                  "Use dense acronyms without explaining their definitions"
            ],
            "ans": 1,
            "exp": "Slide 31 explicitly advises: 'Simplify complex terms, use relatable everyday analogies, and define technical terms immediately.'"
      },
      {
            "q": "What strategy is required when writing for Academic Evaluators according to Slide 33?",
            "opts": [
                  "Use casual language to prove confidence and informality",
                  "Demonstrate complete mastery, rigorous citation, and strict formal structure",
                  "Rely on uncited Wikipedia summaries to speed up research",
                  "Write short bullet points without explanations or evidence"
            ],
            "ans": 1,
            "exp": "Slide 33 states: 'Appropriate Strategy to Use: Demonstrate complete mastery, rigorous citation, and strict formal structure.'"
      },
      {
            "q": "What are the three primary purposes in academic and technical texts listed in Slide 34?",
            "opts": [
                  "To Entertain, To Exaggerate, To Conclude",
                  "To Inform / Explain, To Persuade / Argue, To Instruct / Direct",
                  "To Survey, To Question, To Recite",
                  "To Topic-sentence, To Evidence, To Analyze"
            ],
            "ans": 1,
            "exp": "Slide 34 lists the three primary purposes: '1. To Inform / Explain, 2. To Persuade / Argue, 3. To Instruct / Direct.'"
      },
      {
            "q": "According to Slide 36, how do Discipline Expectations differ between Humanities and Sciences?",
            "opts": [
                  "Humanities focus on lab apparatus; Sciences focus on poetic rhyming",
                  "Humanities prioritize argument and textual evidence, while Sciences focus on methodology and replicable data",
                  "Humanities prohibit citations; Sciences prohibit equations",
                  "Both disciplines prohibit peer review and empirical research"
            ],
            "ans": 1,
            "exp": "Slide 36 explicitly states: 'Humanities prioritize argument and textual evidence, while Sciences focus on methodology and replicable data.'"
      },
      {
            "q": "What is the pre-reading strategy defined in Slide 39 as 'Reading titles, abstracts, and captions to set reading goals'?",
            "opts": [
                  "Annotation",
                  "Previewing",
                  "Double-Entry Journaling",
                  "Outlining"
            ],
            "ans": 1,
            "exp": "Slide 39 defines 'Previewing: Reading titles, abstracts, and captions to set reading goals.'"
      },
      {
            "q": "What does each step of the SQ5R model stand for according to Slide 39?",
            "opts": [
                  "Search, Query, Read, Re-read, Review",
                  "Survey, Question, Read, Recite, Review",
                  "Study, Question, Read, Remember, Repeat",
                  "Scan, Quote, Read, Reflect, Revise"
            ],
            "ans": 1,
            "exp": "Slide 39 defines SQ5R as: Survey (scan headings/visuals), Question (turn headings into questions), Read (actively seek answers), Recite (summarize key points), Review (check overall recall)."
      },
      {
            "q": "In the TEAC paragraph structure (Slide 40), what does 'A' represent and what is its role?",
            "opts": [
                  "Audience: Identifies who is reading the paragraph",
                  "Analysis: Explains how the evidence proves the topic sentence",
                  "Appendix: Lists bibliographic citations at the end of the text",
                  "Assertion: Repeats the topic sentence in capitalized letters"
            ],
            "ans": 1,
            "exp": "Slide 40 defines 'A (Analysis): Explains how the evidence proves the topic sentence.'"
      },
      {
            "q": "According to Slide 41, what is a Double-Entry Journal?",
            "opts": [
                  "A diary where two students write entries on alternating days",
                  "A financial ledger documenting research grant expenses",
                  "A two-column graphic organizer that explicitly separates text evidence from student analysis",
                  "A document submitted twice to academic evaluators for re-grading"
            ],
            "ans": 2,
            "exp": "Slide 41 defines Double-Entry Journaling as: 'A two-column graphic organizer that explicitly separates text evidence from student analysis.'"
      },
      {
            "q": "What are the three components of Active Listening according to Slide 43?",
            "opts": [
                  "Hearing, Transcribing, Forgetting",
                  "Paying Attention, Evaluating, Responding Thoughtfully",
                  "Surveying, Questioning, Reciting",
                  "Taking notes, Interrupting, Judging"
            ],
            "ans": 1,
            "exp": "Slide 43 lists the three steps: 'Paying Attention', 'Evaluating', and 'Responding Thoughtfully'."
      },
      {
            "q": "According to Slide 44, what are the precise dimensions and functions of the Cornell Note-Taking System?",
            "opts": [
                  "Left 50% for Notes, Right 50% for Questions, Bottom 5 inches for References",
                  "Notes Column (Right, 70% width) for presentation notes; Cue Column (Left, 30% width) for key terms/questions; Summary Block (Bottom, 2-3 inches) for 2-4 sentence synthesis",
                  "Top half for drawings, bottom half for stream-of-consciousness reactions",
                  "Three equal vertical columns of 33% width each"
            ],
            "ans": 1,
            "exp": "Slide 44 specifies: Notes Column (Right, 70% width), Cue Column (Left, 30% width), and Summary Block (Bottom, 2-3 inches for a 2-4 sentence summary)."
      },
      {
            "q": "What is the verbatim reflective listening sentence stem taught in Slide 46 and 48?",
            "opts": [
                  "\"You are completely wrong because the textbook says otherwise, correct?\"",
                  "\"If I understand correctly, you are saying that [paraphrased main point]. Is that correct?\"",
                  "\"I believe your argument makes no logical sense, wouldn't you agree?\"",
                  "\"Could you repeat everything from slide 1 again?\""
            ],
            "ans": 1,
            "exp": "Slide 46 and 48 provide the verbatim formula: 'If I understand correctly, you are saying that [paraphrased main point]. Is that correct?'"
      },
      {
            "q": "Slide 47 outlines Critical Viewing checkpoints. What are the key areas learners must inspect?",
            "opts": [
                  "Visual Grammar, Scale Integrity, and Source Credibility",
                  "File size, compression ratio, and download speed",
                  "Camera model, lighting temperature, and filter effects",
                  "Word count, font size, and paper margins"
            ],
            "ans": 0,
            "exp": "Slide 47 explicitly identifies '1. Visual Grammar', '2. Scale Integrity', and '3. Source Credibility' as the core critical viewing checkpoints."
      }
];


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

  