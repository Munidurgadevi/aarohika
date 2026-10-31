document.addEventListener('DOMContentLoaded', () => {


  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }


  const navItems = document.querySelectorAll('.dash-nav-item[data-target]');
  const panels = document.querySelectorAll('.dash-panel[data-panel]');
  const pageTitle = document.getElementById('page-title');
  const pageSub = document.getElementById('page-sub');
  const dashMain = document.getElementById('dash-main');
  const sidebar = document.getElementById('dash-sidebar');
  const scrim = document.getElementById('sidebar-scrim');

  const panelMeta = {
    overview: { title: 'Overview', sub: 'Welcome back, Tedoshijika. Here is a quick look at your courses, classes and progress.' },
    courses: { title: 'My <span class="gold">Courses</span>', sub: 'All the courses you are enrolled in, with your lesson progress and tutors.' },
    schedule: { title: 'Schedule', sub: 'Dates, timings and status of your upcoming and past classes.' },
    notes: { title: 'Progress <span class="gold">Notes</span>', sub: 'Skill levels, home practice and written feedback from your tutors.' },
    payments: { title: 'Fees & Payments', sub: 'Pay your fees, check what is due and download receipts.' },
    performances: { title: 'Performances', sub: 'Your recital results, assessment scores and performance recordings.' },
    enroll: { title: 'Enroll in a <span class="gold">Course</span>', sub: 'Pick a new course and send your enrolment request. We will confirm the batch on WhatsApp.' },
    profile: { title: 'Profile', sub: 'Update your personal details and notification settings.' }
  };

  function openPanel(target) {
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.target === target));
    if (panelMeta[target]) {
      pageTitle.innerHTML = panelMeta[target].title;
      dashMain.dataset.active = target;
      pageSub.textContent = panelMeta[target].sub;
    }
    dashMain.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  }

  navItems.forEach(item => item.addEventListener('click', () => openPanel(item.dataset.target)));

  // Any element anywhere (links inside cards, profile dropdown, etc.) with data-target jumps to that panel
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('dash-nav-item')) return; // already wired
    el.addEventListener('click', (e) => {
      const target = el.dataset.target;
      if (!panelMeta[target]) return;
      e.preventDefault();
      openPanel(target);
      closeDropdowns();
    });
  });


  const sidebarToggle = document.getElementById('sidebar-toggle');
  function closeSidebar() {
    sidebar.classList.remove('open');
    scrim.classList.remove('show');
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show');
    });
  }
  if (scrim) scrim.addEventListener('click', closeSidebar);


  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  const profileBtn = document.getElementById('profile-btn');
  const profileDropdown = document.getElementById('profile-dropdown');

  function closeDropdowns() {
    notifDropdown && notifDropdown.classList.remove('open');
    profileDropdown && profileDropdown.classList.remove('open');
    notifBtn && notifBtn.setAttribute('aria-expanded', 'false');
    profileBtn && profileBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(btn, panel) {
    const isOpen = panel.classList.contains('open');
    closeDropdowns();
    if (!isOpen) {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  if (notifBtn) notifBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(notifBtn, notifDropdown); });
  if (profileBtn) profileBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(profileBtn, profileDropdown); });
  document.addEventListener('click', closeDropdowns);
  notifDropdown && notifDropdown.addEventListener('click', e => e.stopPropagation());
  profileDropdown && profileDropdown.addEventListener('click', e => e.stopPropagation());

  document.getElementById('profile-notifs')?.addEventListener('click', () => {
    closeDropdowns();
    if (notifDropdown) { notifDropdown.classList.add('open'); notifBtn && notifBtn.setAttribute('aria-expanded', 'true'); }
  });

  const markRead = document.getElementById('mark-read');
  const notifBadge = document.getElementById('notif-badge');
  if (markRead) {
    markRead.addEventListener('click', () => {
      document.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
      if (notifBadge) notifBadge.style.display = 'none';
      showToast('All notifications marked as read.');
    });
  }


  function handleLogout() {
    closeDropdowns();
    showToast("Signed out safely. Come back soon.");
    setTimeout(() => { window.location.href = 'login.html'; }, 700);
  }
  document.getElementById('sidebar-logout')?.addEventListener('click', handleLogout);
  document.getElementById('profile-logout')?.addEventListener('click', handleLogout);


  function wireCheckable(selector, doneClass) {
    document.querySelectorAll(selector).forEach(item => {
      const chk = item.querySelector('.chk');
      if (!chk) return;
      chk.addEventListener('click', () => item.classList.toggle('done'));
    });
  }
  wireCheckable('.mini-check-item', 'done');
  wireCheckable('.pg-task', 'done');

  const assignmentList = document.getElementById('assignment-list');
  const assignmentCount = document.getElementById('assignment-count');
  function updateAssignmentCount() {
    if (!assignmentList || !assignmentCount) return;
    const all = assignmentList.querySelectorAll('.pg-task');
    const done = assignmentList.querySelectorAll('.pg-task.done');
    assignmentCount.textContent = `${done.length}/${all.length} complete`;
    const ring = document.getElementById('pg-ring');
    if (ring) ring.style.setProperty('--p', Math.round(done.length / all.length * 100));
  }
  if (assignmentList) {
    assignmentList.addEventListener('click', () => setTimeout(updateAssignmentCount, 0));
    updateAssignmentCount();
  }


  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const upcomingList = document.getElementById('schedule-upcoming');
  const pastList = document.getElementById('schedule-past');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isUpcoming = btn.dataset.tab === 'upcoming';
      if (upcomingList) upcomingList.style.display = isUpcoming ? 'flex' : 'none';
      if (pastList) pastList.style.display = isUpcoming ? 'none' : 'flex';
    });
  });



  const videoModal = document.getElementById('video-modal');
  const videoTitle = document.getElementById('video-modal-title');
  const videoMeta = document.getElementById('video-modal-meta');
  document.querySelectorAll('.play-circle').forEach(btn => {
    btn.addEventListener('click', () => {
      videoTitle.textContent = btn.dataset.title || 'Recording';
      videoMeta.textContent = btn.dataset.meta || '';
      videoModal.classList.add('open');
    });
  });
  document.getElementById('video-modal-close')?.addEventListener('click', () => videoModal.classList.remove('open'));
  videoModal?.addEventListener('click', (e) => { if (e.target === videoModal) videoModal.classList.remove('open'); });


  const payNowBtn = document.getElementById('pay-now-btn');
  const dueCard = document.getElementById('due-card');
  const dueAmt = document.getElementById('due-amt');
  const dueSub = document.getElementById('due-sub');
  if (payNowBtn) {
    payNowBtn.addEventListener('click', () => {
      dueCard.classList.add('paid');
      dueAmt.textContent = 'No dues';
      dueSub.textContent = 'October fees are paid.';
      payNowBtn.textContent = 'Paid';
      const ovAmt = document.getElementById('ov-fee-amt'), ovSub = document.getElementById('ov-fee-sub');
      if (ovAmt) ovAmt.textContent = 'No dues';
      if (ovSub) ovSub.textContent = 'October fees paid.';
      payNowBtn.disabled = true;
      showToast('₹2,400 paid. A receipt has been sent to your email.');
    });
  }


  const editBtns = document.querySelectorAll('[data-edit]');
  const saveBtn = document.getElementById('save-profile-btn');
  const profileForm = document.getElementById('profile-form');
  if (profileForm && saveBtn) {
    editBtns.forEach(btn => btn.addEventListener('click', () => {
      profileForm.querySelectorAll('input, select').forEach(el => { if (el.id !== 'pf-instrument') el.disabled = false; });
      profileForm.classList.add('editing');
      saveBtn.style.display = 'inline-flex';
      editBtns.forEach(b => { b.style.display = 'none'; });
      document.getElementById('pf-name').focus();
    }));
    saveBtn.addEventListener('click', () => {
      profileForm.querySelectorAll('input, select').forEach(el => el.disabled = true);
      profileForm.classList.remove('editing');
      saveBtn.style.display = 'none';
      editBtns.forEach(b => { b.style.display = ''; });
      showToast('Your profile has been updated.');
    });
  }

  /* My classes: cancel a class */
  document.querySelectorAll('.mc-cancel').forEach(btn => btn.addEventListener('click', () => {
    const row = btn.closest('.mc-row');
    row.classList.add('cancelled');
    const pill = row.querySelector('.mc-status');
    pill.textContent = 'Cancelled'; pill.className = 'mc-status st-rust';
    row.querySelectorAll('.mc-actions .btn').forEach(b => { b.disabled = true; });
    const left = document.querySelectorAll('#schedule-upcoming .mc-row:not(.cancelled)').length;
    const count = document.getElementById('mc-count'); if (count) count.textContent = left;
    showToast('Class cancelled. Check the Schedule for your other classes.');
  }));

  /* Enroll: send an enrolment request */
  document.querySelectorAll('[data-enroll]').forEach(btn => btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-check-circle"></i>Request sent';
    const pill = btn.closest('.cr-card').querySelector('.mc-status');
    if (pill) { pill.textContent = 'Requested'; pill.className = 'mc-status st-wait'; }
    showToast('Enrolment request sent for ' + btn.dataset.enroll + '. We will confirm your batch soon.');
  }));

  /* Fees: receipts and saved method */
  document.querySelectorAll('.bl-rcpt').forEach(a => a.addEventListener('click', (e) => { e.preventDefault(); showToast('Receipt sent to your email.'); }));
  document.getElementById('bl-manage')?.addEventListener('click', () => showToast('You can change your preferred payment method here.'));

  /* Light / dark and RTL toggles (same keys as the main site) */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const dirBtn = document.getElementById('dir-toggle');

  function syncThemeBtn() {
    const dark = root.classList.contains('dark-mode');
    if (themeBtn) {
      const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      themeBtn.title = label;
      themeBtn.setAttribute('aria-label', label);
    }
  }
  function syncDirBtn() {
    if (!dirBtn) return;
    // button shows what you will switch TO
    const label = root.dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
    dirBtn.title = label;
    dirBtn.setAttribute('aria-label', label);
  }
  syncThemeBtn();
  syncDirBtn();

  themeBtn?.addEventListener('click', () => {
    const dark = root.classList.toggle('dark-mode');
    try { localStorage.setItem('aarohika-theme', dark ? 'dark' : 'light'); } catch (e) { }
    syncThemeBtn();
  });
  dirBtn?.addEventListener('click', () => {
    const dir = root.dir === 'rtl' ? 'ltr' : 'rtl';
    root.dir = dir;
    try { localStorage.setItem('aarohika-dir', dir); } catch (e) { }
    syncDirBtn();
  });

});