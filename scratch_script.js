
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
    const flashcards = [
      {
        badge: "Slide 4 · Definition",
        front: "Academic Texts",
        back: ""Formal, structured, linear, and evidence-based writing used in scholarly settings to analyze ideas, construct arguments, or build knowledge for academic evaluators and readers."",
        ex: "<strong>Core Goal (Slide 5):</strong> To inform, analyze, or persuade using scholarly research.<br/><strong>Examples:</strong> Research articles, position papers, literature reviews, academic essays."
      },
      {
        badge: "Slide 6 · Definition",
        front: "Technical Texts",
        back: ""Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently."",
        ex: "<strong>Core Goal (Slide 7):</strong> To guide action, explain a technical process, or document data.<br/><strong>Examples:</strong> User manuals, Standard Operating Procedures (SOPs), safety guidelines, lab reports."
      },
      {
        badge: "Slide 8 · Fundamental Concept",
        front: "Shared Umbrella of Academic & Technical Writing",
        back: ""While academic writing and technical writing serve different primary audiences and purposes, they sit under the same umbrella of formal, informative communication and share a core set of fundamental characteristics."",
        ex: "Both adhere to evidence-based objectivity, precision, formal mechanics, and structured layouts."
      },
      {
        badge: "Slide 9 & 10 · Characteristic 1",
        front: "Evidence-Based / Objective",
        back: ""Arguments, claims, and conclusions presented in academic and technical contexts must always be supported by empirical data, reputable facts, expert insights, or primary observations.<br/><br/>At the same time, the writing puts more emphasis on information and arguments and less on the feelings or personal perspectives of the writer, focusing entirely on the subject matter being discussed."",
        ex: "<strong>Indicators (Slide 11):</strong> Survey data, statistics, APA/MLA citations; eliminating first-person subjective expressions ("I think," "I feel")."
      },
      {
        badge: "Slide 13 · Characteristic 2",
        front: "Structured",
        back: ""It should follow a predictable, logical, and standardized organizational pattern. This structure serves as a roadmap that guides the reader seamlessly through complex ideas without unnecessary digressions or scatter."",
        ex: "<strong>Indicators (Slide 14):</strong><br/>• Tripartite Structure for Essays (Intro, Body, Conclusion)<br/>• Modular / Hierarchical Setup for Technical Texts (numbered steps, bulleted lists, subheadings)."
      },
      {
        badge: "Slide 16 · Characteristic 3",
        front: "Critical",
        back: ""Academic writing requires analytical and evaluative thinking. Writers must not merely describe or summarize information; they must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights."",
        ex: "<strong>Indicators (Slide 17):</strong> Analyzing why and how; identifying gaps, limitations, or contradictions in literature; evaluating source validity."
      },
      {
        badge: "Slide 19 · Characteristic 4",
        front: "Balanced",
        back: ""Academic writing aims to consider different perspectives or arguments on an issue or topic to avoid being biased or one-sided. Writers exercise caution when making claims or conclusions to avoid making sweeping generalizations or unfounded statements."",
        ex: "<strong>Indicators (Slide 20):</strong> Modal Verbs (may, suggest, appear, seem), Probability Adverbs (likely, possibly, presumably, generally), and Tentative Phrases ("the data imply that...")."
      },
      {
        badge: "Slide 22 · Characteristic 5",
        front: "Precise",
        back: ""Academic and technical writing strives to provide clear, accurate, and correct information that clearly captures what the data show. Vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable."",
        ex: "<strong>Indicators (Slide 23):</strong> Exact language (using "increase" or "decrease" instead of "changed"); quantifying observations with exact measurements, percentages, and statistical values."
      },
      {
        badge: "Slide 24 · Characteristic 6",
        front: "Formal",
        back: ""Academic writing observes formal conventions of writing. Adhering to formal language and tone maintains professionalism, establishes authority, and ensures respect across scholarly and technical communities."",
        ex: "<strong>Indicators (Slide 25):</strong> Zero colloquialisms/slang ("cool," "gonna," "trash"); No contractions ("cannot," "did not" instead of "can't," "didn't"); Standard grammar mechanics."
      },
      {
        badge: "Slide 28 · Core Model",
        front: "The APC of Academic & Technical Texts",
        back: ""Considering Audience, Purpose, and Context (APC) is a fundamental rule of communication that applies across every single register—from a quick text to a friend to a formal academic paper or a workplace technical report."",
        ex: "Universal framework dictating tone, structure, depth, and vocabulary."
      },
      {
        badge: "Slide 30 · Audience",
        front: "Expert Audience Strategy",
        back: ""Specialists who possess deep background knowledge (e.g., scientists, engineers).<br/><br/>Appropriate Strategy to Use: Use specialized technical jargon directly without stopping to define basic concepts."",
        ex: "Example: Direct discussion of enzymatic binding constants without explaining basic chemistry."
      },
      {
        badge: "Slide 31 · Audience",
        front: "Non-Expert / Lay Audience Strategy",
        back: ""Readers with little or no technical background (e.g., the general public).<br/><br/>Appropriate Strategy to Use: Simplify complex terms, use relatable everyday analogies, and define technical terms immediately."",
        ex: "Example: Comparing computer RAM to an office work desk surface."
      },
      {
        badge: "Slide 32 · Audience",
        front: "Peer Audience Strategy",
        back: ""Fellow students or colleagues with a similar level of training.<br/><br/>Appropriate Strategy to Use: Balance professional rigor with engaging, relatable explanations."",
        ex: "Assumes shared foundational training but maintains engaging collaborative tone."
      },
      {
        badge: "Slide 33 · Audience",
        front: "Academic Evaluators Strategy",
        back: ""Teachers, professors, or panel defense members who grade output.<br/><br/>Appropriate Strategy to Use: Demonstrate complete mastery, rigorous citation, and strict formal structure."",
        ex: "Example: Formal thesis defense and graded academic research papers."
      },
      {
        badge: "Slide 34 · Purpose",
        front: "Purposes in Academic & Technical Writing",
        back: ""Purpose defines the intended goal or outcome of your text. It determines the structure, strategy, focus, and call to action.<br/><br/>1. To Inform / Explain<br/>2. To Persuade / Argue<br/>3. To Instruct / Direct"",
        ex: "Determines rhetorical choices and structural layout."
      },
      {
        badge: "Slide 35 & 36 · Context",
        front: "Context in Academic & Technical Writing",
        back: ""Context encompasses the surrounding circumstances, environment, medium, and constraints of the interaction. It dictates the format, length, timing, and boundary conditions of your message."",
        ex: "<strong>Examples (Slide 36):</strong> Physical / Digital Setting, Medium & Format, Discipline Expectations (Humanities vs Sciences)."
      },
      {
        badge: "Slide 38 · Reading",
        front: "Critical Reading Strategies Definition",
        back: ""Critical reading involves analysis, interpretation, and evaluation. It requires moving beyond passive reading to actively question, analyze, and evaluate how an author constructs an argument."",
        ex: "Divided into 3 sequential stages: Pre-Reading, During Reading, and Post-Reading."
      },
      {
        badge: "Slide 39 · Reading",
        front: "SQ5R Model",
        back: "Pre-reading study system (Slide 39):<br/>• <strong>Survey:</strong> Scan headings/visuals<br/>• <strong>Question:</strong> Turn headings into questions<br/>• <strong>Read:</strong> Actively seek answers<br/>• <strong>Recite:</strong> Summarize key points<br/>• <strong>Review:</strong> Check overall recall",
        ex: "Replaces passive reading with active cognitive inquiry."
      },
      {
        badge: "Slide 40 · Reading",
        front: "TEAC Model for Paragraph Structure",
        back: "During-reading organizational formula (Slide 40):<br/>• <strong>T (Topic Sentence):</strong> States the main claim of the paragraph.<br/>• <strong>E (Evidence):</strong> Presents statistics, study results, or expert quotes.<br/>• <strong>A (Analysis):</strong> Explains how the evidence proves the topic sentence.<br/>• <strong>C (Clincher/Conclusion):</strong> Summarizes the point or transitions to the next paragraph.",
        ex: "The standard building block for analytical academic paragraphs."
      },
      {
        badge: "Slide 41 · Reading",
        front: "Post-Reading Strategies (3 Models)",
        back: "• <strong>Double-Entry Journaling:</strong> A two-column graphic organizer that explicitly separates text evidence from student analysis.<br/>• <strong>Outlining:</strong> Deconstructing a text into a hierarchical alphanumeric or bulleted structure to make its organizational logic visible.<br/>• <strong>Summarizing:</strong> Restating the central thesis and main supporting arguments in your own words, removing minor details, examples, and repetitive phrasing.",
        ex: "Slide 41 Post-Reading models."
      },
      {
        badge: "Slide 43 · Listening",
        front: "Active Listening (How to do it)",
        back: ""Focuses full cognitive attention on the speaker, filtering out distractions and withholding hasty judgments until the message is fully delivered.<br/><br/>• Paying Attention: Giving total focus to verbal cues, vocal tone, and body language.<br/>• Evaluating: Analyzing logical validity of arguments and checking if claims are supported by facts.<br/>• Responding Thoughtfully: Formulating questions or feedback based on accurate facts rather than emotional reaction."",
        ex: "Slide 43 Active Listening breakdown."
      },
      {
        badge: "Slide 44 · Listening",
        front: "The Cornell Note-Taking System Layout",
        back: ""A structured format for taking, organizing, and reviewing lecture notes.<br/><br/>• Notes Column (Right, 70% width): Record main lecture concepts, facts, equations using abbreviations and bullet points during presentation.<br/>• Cue Column (Left, 30% width): Formulated immediately after lecture; record key vocabulary terms, main themes, and potential exam questions.<br/>• Summary Block (Bottom, 2-3 inches): Write 2-4 sentence summary in your own words synthesizing core content."",
        ex: "Slide 44 & 45 Cornell Note layout."
      },
      {
        badge: "Slide 46 & 48 · Listening",
        front: "Reflective Listening",
        back: ""Paraphrasing or restating the speaker's core message back to them to confirm accurate interpretation before moving forward."",
        ex: "<strong>Verbatim Formula (Slide 46 & 48):</strong> 'If I understand correctly, you are saying that [paraphrased main point]. Is that correct?'"
      },
      {
        badge: "Slide 47 · Viewing",
        front: "Critical Viewing Strategies",
        back: ""Critical viewing empowers learners to decode, analyze, and evaluate multimodal visuals (charts, diagrams, infographics, and videos) to detect bias, identify manipulated data, and verify claims.<br/><br/>What to look out for:<br/>1. Visual Grammar<br/>2. Scale Integrity<br/>3. Source Credibility"",
        ex: "Slide 47 Critical Viewing checkpoints."
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
    const quizQuestions = [
      {
        q: "According to Slide 5, what is the exact verbatim Core Goal of Academic Texts?",
        opts: [
          "To guide action, explain a technical process, or document data",
          "To inform, analyze, or persuade using scholarly research",
          "To instruct, direct, or document procedures so readers perform tasks safely",
          "To entertain general readers with creative personal stories"
        ],
        ans: 1,
        exp: "Slide 5 states verbatim that the Core Goal of Academic Texts is: 'To inform, analyze, or persuade using scholarly research.'"
      },
      {
        q: "According to Slide 6, what is the exact verbatim definition of Technical Texts?",
        opts: [
          "Formal, structured, linear, and evidence-based writing used in scholarly settings",
          "Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently",
          "Creative and narrative writing expressing author thoughts and emotional perspectives",
          "A two-column graphic organizer separating evidence from personal reflection"
        ],
        ans: 1,
        exp: "Slide 6 defines Technical Texts verbatim as: 'Functional, practical, and highly precise writing designed to instruct, direct, or document procedures so readers can perform tasks safely and efficiently.'"
      },
      {
        q: "According to Slide 8, what shared umbrella do Academic Writing and Technical Writing sit under?",
        opts: [
          "Informal, creative storytelling",
          "Formal, informative communication",
          "Commercial, persuasive marketing",
          "Subjective, emotional opinion pieces"
        ],
        ans: 1,
        exp: "Slide 8 states verbatim: 'While academic writing and technical writing serve different primary audiences and purposes, they sit under the same umbrella of formal, informative communication and share a core set of fundamental characteristics.'"
      },
      {
        q: "Under the characteristic 'Evidence-Based / Objective' (Slide 11), what should be minimized or eliminated in favor of objective phrasing?",
        opts: [
          "Empirical survey results and statistics",
          "Standardized APA and MLA in-text citations",
          "First-person subjective expressions ('I think,' 'I feel,' 'in my opinion')",
          "Verifiable laboratory metrics and data"
        ],
        ans: 2,
        exp: "Slide 11 explicitly specifies: 'Minimizing or eliminating first-person subjective expressions ("I think," "I feel," "in my opinion") in favor of objective phrasing.'"
      },
      {
        q: "In the verbatim example on Slide 12, which of the following is the Evidence-Based version?",
        opts: [
          "'Online learning is obviously terrible because students hate sitting in front of screens all day.'",
          "'Survey data from 250 senior high school learners reveal that 68% experienced digital fatigue, which directly correlated with a 12% decrease in self-reported engagement during extended online lectures.'",
          "'I think online classes are boring because students don't like listening to teachers.'",
          "'The technology crashed and it was super frustrating for the whole research team.'"
        ],
        ans: 1,
        exp: "Slide 12 provides this exact verbatim evidence-based sentence with survey data from 250 senior high school learners, 68% digital fatigue, and a 12% decrease in self-reported engagement."
      },
      {
        q: "What are the three components of the Tripartite Structure for Essays specified on Slide 14?",
        opts: [
          "Title, Heading, Footnote",
          "A clear Introduction (hook, background, thesis statement), Body (evidence and analysis), and Conclusion (thesis restatement, summary, clincher)",
          "Cue Column, Notes Column, and Summary Block",
          "Survey, Question, and Read"
        ],
        ans: 1,
        exp: "Slide 14 lists verbatim: 'Tripartite Structure for Essays: A clear Introduction (hook, background, thesis statement), Body (evidence and analysis), and Conclusion (thesis restatement, summary, clincher).'"
      },
      {
        q: "What setup is specified for Technical Texts under the Structured characteristic (Slide 14)?",
        opts: [
          "Tripartite narrative arc with emotional climaxes",
          "Modular / Hierarchical Setup: Numbered steps, bulleted lists, clear headings, and subheadings",
          "Stream-of-consciousness journaling without punctuation",
          "Alphabetical index with no chapter headings"
        ],
        ans: 1,
        exp: "Slide 14 specifies verbatim: 'Modular / Hierarchical Setup for Technical Texts: Numbered steps, bulleted lists, clear headings, and subheadings.'"
      },
      {
        q: "According to Slide 16, what does 'Critical' academic writing require of writers?",
        opts: [
          "They must merely describe or summarize information without analyzing it",
          "They must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights",
          "They must criticize other authors using personal attacks and hostile language",
          "They must write only in the first person using casual contractions"
        ],
        ans: 1,
        exp: "Slide 16 states verbatim: 'Writers must not merely describe or summarize information; they must develop clear, logical arguments, create depth, avoid stating the obvious, and uncover underlying insights.'"
      },
      {
        q: "Which of the following is listed on Slide 17 as a Key Indicator of Critical Texts?",
        opts: [
          "Just summarizing what happened in chronological order",
          "Analyzing why and how a phenomenon occurs rather than just summarizing what happened",
          "Using contractions like couldn't and didn't to sound natural",
          "Omitting counterarguments to keep the thesis one-sided"
        ],
        ans: 1,
        exp: "Slide 17 highlights: 'Analyzing why and how a phenomenon occurs rather than just summarizing what happened' as well as identifying literature gaps and evaluating source validity."
      },
      {
        q: "Which linguistic tools are explicitly listed on Slide 20 for writing 'Balanced' texts?",
        opts: [
          "Exclamation points and hyperbole",
          "Modal Verbs (may, suggest, appear, seem), Probability Adverbs (likely, possibly, presumably, generally), and Tentative Phrases",
          "Colloquial slang and informal contractions",
          "Imperative commands and direct orders"
        ],
        ans: 1,
        exp: "Slide 20 verbatim lists: 'Modal Verbs (may, suggest, appear, seem)', 'Probability Adverbs (likely, possibly, presumably, generally)', and 'Tentative Phrases ("the data imply that...", "results indicate a potential link...")'."
      },
      {
        q: "On Slide 21, what makes the statement 'Artificial intelligence completely destroys student creativity...' flawed?",
        opts: [
          "It uses too much empirical data",
          "It is an 'Overgeneralized' claim that lacks nuance and makes an unfounded absolute assertion",
          "It contains formal APA citations",
          "It uses modal verbs like 'may' and 'suggest'"
        ],
        ans: 1,
        exp: "Slide 21 labels this statement 'Overgeneralized' because it asserts dogmatic absolutes ('completely destroys', 'guarantees') without hedging or balanced counterarguments."
      },
      {
        q: "According to Slide 22, why is Precision essential in academic and technical texts?",
        opts: [
          "Because vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable",
          "Because precise words make the author sound more poetic",
          "Because precision is only required in history essays",
          "Because precise writing eliminates the need for reference lists"
        ],
        ans: 0,
        exp: "Slide 22 states verbatim: 'Vague descriptors create ambiguity, lead to costly errors, or render scientific procedures non-replicable.'"
      },
      {
        q: "On Slide 23, what specific vocabulary example is given for Key Indicators of Precise Texts?",
        opts: [
          "Using 'stuff' and 'things' instead of scientific terms",
          "Using 'increase' or 'decrease' instead of merely saying the values 'changed'",
          "Using 'very big' instead of exact measurements",
          "Using abbreviations without defining them"
        ],
        ans: 1,
        exp: "Slide 23 explicitly notes: 'Using exact language and specific terms (e.g., using "increase" or "decrease" instead of merely saying the values "changed").'"
      },
      {
        q: "What does Slide 25 mandate regarding Contractions in Formal academic texts?",
        opts: [
          "Contractions should be used in every paragraph to save space",
          "No Contractions: Spelling out words completely (e.g., writing 'cannot,' 'did not,' 'would have' instead of 'can't,' 'didn't,' 'would've')",
          "Contractions are preferred in lab reports but not in essays",
          "Only contractions ending in 'nt are allowed"
        ],
        ans: 1,
        exp: "Slide 25 states verbatim: 'No Contractions: Spelling out words completely (e.g., writing "cannot," "did not," "would have" instead of "can't," "didn't," "would've").'"
      },
      {
        q: "According to Slide 28, what does the acronym APC stand for?",
        opts: [
          "Analysis, Protocol, Conclusion",
          "Audience, Purpose, and Context",
          "Argument, Perspective, Credibility",
          "Accuracy, Precision, Clarity"
        ],
        ans: 1,
        exp: "Slide 28 explicitly identifies the APC of academic and technical texts as: Audience, Purpose, and Context."
      },
      {
        q: "According to Slide 30, what is the Appropriate Strategy to Use for an EXPERT AUDIENCE?",
        opts: [
          "Simplify complex terms and use everyday relatable analogies",
          "Use specialized technical jargon directly without stopping to define basic concepts",
          "Demonstrate complete mastery and strict formal citation for grading",
          "Avoid using any numerical data or equations"
        ],
        ans: 1,
        exp: "Slide 30 specifies verbatim for Expert Audience: 'Appropriate Strategy to Use: Use specialized technical jargon directly without stopping to define basic concepts.'"
      },
      {
        q: "According to Slide 31, what is the Appropriate Strategy to Use for a NON-EXPERT / LAY AUDIENCE?",
        opts: [
          "Use dense jargon without defining terms",
          "Simplify complex terms, use relatable everyday analogies, and define technical terms immediately",
          "Use only advanced mathematical formulas",
          "Require the reader to consult external scholarly databases"
        ],
        ans: 1,
        exp: "Slide 31 states verbatim for Non-Expert / Lay Audience: 'Appropriate Strategy to Use: Simplify complex terms, use relatable everyday analogies, and define technical terms immediately.'"
      },
      {
        q: "According to Slide 33, what is the Appropriate Strategy to Use for ACADEMIC EVALUATORS?",
        opts: [
          "Use casual conversational slang to build rapport",
          "Demonstrate complete mastery, rigorous citation, and strict formal structure",
          "Omit the bibliography to keep the report concise",
          "Rely on personal intuition rather than empirical citations"
        ],
        ans: 1,
        exp: "Slide 33 dictates verbatim for Academic Evaluators: 'Appropriate Strategy to Use: Demonstrate complete mastery, rigorous citation, and strict formal structure.'"
      },
      {
        q: "What are the three purposes in writing academic and technical texts listed on Slide 34?",
        opts: [
          "1. To Entertain, 2. To Narrate, 3. To Describe",
          "1. To Inform / Explain, 2. To Persuade / Argue, 3. To Instruct / Direct",
          "1. To Criticize, 2. To Condemn, 3. To Confuse",
          "1. To Memorize, 2. To Recite, 3. To Review"
        ],
        ans: 1,
        exp: "Slide 34 lists the 3 Purposes verbatim: '1. To Inform / Explain', '2. To Persuade / Argue', '3. To Instruct / Direct'."
      },
      {
        q: "On Slide 36, how do Discipline Expectations differ between the Humanities and the Sciences?",
        opts: [
          "Humanities use numbers only; Sciences use poetry",
          "Humanities prioritize argument and textual evidence, while Sciences focus on methodology and replicable data",
          "Humanities require lab manuals; Sciences forbid citations",
          "Both disciplines share the identical focus on subjective emotions"
        ],
        ans: 1,
        exp: "Slide 36 states verbatim: 'Discipline Expectations: Humanities prioritize argument and textual evidence, while Sciences focus on methodology and replicable data.'"
      },
      {
        q: "What are the exact 5 steps of the SQ5R Model on Slide 39?",
        opts: [
          "Scan, Query, Read, Rewrite, Remember",
          "Survey (scan headings/ visuals), Question (turn headings into questions), Read (actively seek answers), Recite (summarize key points), Review (check overall recall)",
          "Study, Question, Read, Reflect, Repeat",
          "Search, Quote, Read, Retell, Re-evaluate"
        ],
        ans: 1,
        exp: "Slide 39 defines the SQ5R Model verbatim: Survey, Question, Read, Recite, Review."
      },
      {
        q: "What do the letters T, E, A, C stand for in the TEAC Paragraph Model (Slide 40)?",
        opts: [
          "Thesis, Example, Appendix, Citation",
          "Topic Sentence (states main claim), Evidence (presents statistics/quotes), Analysis (explains how evidence proves claim), Clincher/Conclusion (summarizes point/transitions)",
          "Title, Evidence, Argument, Conclusion",
          "Theory, Experiment, Analysis, Calculation"
        ],
        ans: 1,
        exp: "Slide 40 specifies verbatim: T (Topic Sentence), E (Evidence), A (Analysis), C (Clincher/Conclusion)."
      },
      {
        q: "According to Slide 41, what is Double-Entry Journaling?",
        opts: [
          "Balancing financial debits and credits in an accounting ledger",
          "A two-column graphic organizer that explicitly separates text evidence from student analysis",
          "Writing two separate essays on the same topic",
          "Recording notes twice in two different notebooks"
        ],
        ans: 1,
        exp: "Slide 41 defines Double-Entry Journaling verbatim: 'A two-column graphic organizer that explicitly separates text evidence from student analysis.'"
      },
      {
        q: "In the Cornell Note-Taking System (Slide 44), what is the width and purpose of the Cue Column?",
        opts: [
          "Right side, 70% width, recorded during the lecture",
          "Left, 30% width: Formulated immediately after the lecture; record key vocabulary terms, main themes, and potential exam questions",
          "Bottom, 2-3 inches, used for writing full transcripts",
          "Top header, used for student name only"
        ],
        ans: 1,
        exp: "Slide 44 defines the Cue Column verbatim: 'Left, 30% width: Formulated immediately after the lecture; record key vocabulary terms, main themes, and potential exam questions.'"
      },
      {
        q: "What is the verbatim example given on Slide 46 & 48 for Reflective Listening?",
        opts: [
          "'I completely disagree with everything you just said.'",
          "'If I understand correctly, you are saying that [paraphrased main point]. Is that correct?'",
          "'Can you please repeat that word for word?'",
          "'According to the data from 250 learners, your argument is invalid.'"
        ],
        ans: 1,
        exp: "Slide 46 and 48 provide this exact verbatim formula: '"If I understand correctly, you are saying that [paraphrased main point]. Is that correct?"'"
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

  