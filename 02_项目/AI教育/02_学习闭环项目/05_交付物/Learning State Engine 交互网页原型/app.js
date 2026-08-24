const toast = document.querySelector('#toast');
const navLinks = document.querySelectorAll('.side-nav a');
const flowLinks = document.querySelectorAll('[data-flow-link]');
const sections = document.querySelectorAll('.content > section');

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });

  flowLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  { rootMargin: '-110px 0px -55% 0px', threshold: [0.18, 0.35, 0.6] },
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll('a[href^="#"], [data-jump]').forEach((item) => {
  item.addEventListener('click', (event) => {
    const targetSelector = item.dataset.jump || item.getAttribute('href');
    const target = document.querySelector(targetSelector);

    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveLink(target.id);
  });
});

document.querySelectorAll('.view-pill').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.view-pill').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const viewNames = {
      architecture: '架构视图',
      student: '学生视图',
      teacher: '老师视图',
      data: '数据视图',
    };
    showToast(`已切换到${viewNames[button.dataset.view]}，当前仍在单页原型内校验。`);
  });
});

document.querySelectorAll('.segmented button').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('.segmented');
    group.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
  });
});

document.querySelector('#extractButton').addEventListener('click', () => {
  document.querySelector('#knowledgeResult').classList.add('is-highlighted');
  showToast('已模拟提取知识点：词汇、短语、句型、语法。');
  setTimeout(() => {
    document.querySelector('#knowledgeResult').classList.remove('is-highlighted');
  }, 900);
});

document.querySelector('#makePracticeButton').addEventListener('click', () => {
  document.querySelector('#practice').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('已将选中知识点转入页面做题区。');
});

document.querySelector('#submitPracticeButton').addEventListener('click', () => {
  const result = document.querySelector('#practiceResult');
  const questions = document.querySelectorAll('.question-item');
  let score = 0;

  questions.forEach((question) => {
    const input = question.querySelector('input');
    const expected = question.dataset.answer.toLowerCase();
    const actual = input.value.trim().toLowerCase();
    const isCorrect = actual === expected;
    question.classList.toggle('is-correct', isCorrect);
    question.classList.toggle('is-wrong', actual.length > 0 && !isCorrect);
    if (isCorrect) score += 1;
  });

  result.hidden = false;
  result.textContent = `已提交：${score}/${questions.length} 题正确。系统将生成错因分析、更新红黄绿状态，并进入下一步练习策略。`;
  showToast('作答已提交，反馈区和状态更新区可继续查看。');
});

document.querySelectorAll('[data-state-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.stateFilter;
    document.querySelectorAll('[data-state-filter]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    document.querySelectorAll('.state-table tbody tr').forEach((row) => {
      row.hidden = filter !== 'all' && row.dataset.state !== filter;
    });
  });
});

document.querySelectorAll('[data-metric]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-metric]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    document.querySelector('#chartCaption').textContent = `当前指标：${button.dataset.metric}。点击某天可查看当天练习、错因和状态变化。`;

    const heights = {
      题量: [42, 68, 54, 82, 64, 90, 72],
      知识点: [32, 44, 58, 52, 70, 62, 78],
      转绿: [18, 30, 24, 46, 38, 54, 48],
      转红: [14, 28, 20, 36, 30, 26, 22],
      学习时长: [45, 52, 40, 72, 60, 86, 66],
    };

    document.querySelectorAll('#learningChart span').forEach((bar, index) => {
      bar.style.height = `${heights[button.dataset.metric][index]}%`;
    });
  });
});

document.querySelector('#showUpdateButton').addEventListener('click', () => {
  document.querySelector('#updateTimeline').classList.toggle('is-expanded');
  showToast('已展开本次状态更新过程。');
});

document.querySelector('#generateNextButton').addEventListener('click', () => {
  const count = document.querySelector('input[name="count"]:checked').value;
  document.querySelector('#nextOutput').textContent = `已生成 ${count} 题针对性练习：优先练 often / usually，并加入 by bus / by subway 的易混淆迁移题。`;
  showToast('下一步练习已生成。');
});

document.querySelector('#makeLessonButton').addEventListener('click', () => {
  document.querySelector('#lessonOutput').classList.add('is-highlighted');
  showToast('教案草稿已刷新：教学目标、讲解顺序、易错点和练习已生成。');
  setTimeout(() => {
    document.querySelector('#lessonOutput').classList.remove('is-highlighted');
  }, 900);
});

const reportText = {
  student: {
    title: '学生报告',
    body: '你已经掌握了问路句型，但 often / usually 还不稳定。下一步先练 3 道频率副词对比题，再做 1 道交通方式迁移题。',
  },
  parent: {
    title: '家长报告',
    body: '孩子本次完成 3 道练习。问路句型表现稳定，频率副词仍处于红色状态，属于需要短期补救的知识点。当前判断为初步判断，后续还需要更多作答证据。',
  },
  teacher: {
    title: '老师报告',
    body: '班级层面建议关注频率副词混淆和第三人称单数遗漏。可安排 8 分钟对比例句讲解，并对红色知识点学生生成 3 题补弱练习。',
  },
};

document.querySelectorAll('[data-report]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-report]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const report = reportText[button.dataset.report];
    const card = document.querySelector('#reportCard');
    card.querySelector('h3').textContent = report.title;
    card.querySelector('p').textContent = report.body;
  });
});

document.querySelectorAll('.graph-node').forEach((node) => {
  node.addEventListener('click', () => {
    showToast(`已选中知识点：${node.textContent.trim()}。可联动状态、错因和报告。`);
  });
});
