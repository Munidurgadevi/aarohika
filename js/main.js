(function () {
    var root = document.documentElement;

    function save(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    function clean(path) {
        return (path || "").replace(/\.html$/, "");
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (window.lucide) {
            lucide.createIcons();
        }

        var nav = document.getElementById("mainNav");
        var menuBtn = document.getElementById("menuToggle");
        var themeBtn = document.getElementById("themeToggle");
        var dirBtn = document.getElementById("dirToggle");
        var topBtn = document.getElementById("backToTop");
        var dropdowns = document.querySelectorAll(".nav-dropdown");

        function closeDropdowns(except) {
            dropdowns.forEach(function (item) {
                if (item !== except) {
                    item.classList.remove("open");
                    item.querySelector(".nav-dropdown-toggle").setAttribute("aria-expanded", "false");
                }
            });
        }

        function closeMenu() {
            nav.classList.remove("open");
            document.documentElement.classList.remove("menu-open");
            menuBtn.classList.remove("is-open");
            menuBtn.setAttribute("aria-expanded", "false");
        }

        var page = clean(location.pathname.replace(/\/+$/, "").split("/").pop()).toLowerCase() || "home1";
        var sectionOf = {
            guitar: "courses", keyboard: "courses", vocals: "courses", drums: "courses",
            "pricing-kids": "pricing", "pricing_adults": "pricing"
        };
        var activePage = sectionOf[page] || page;
        nav.querySelectorAll("a[href]").forEach(function (link) {
            if (clean(link.getAttribute("href")) === activePage) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
                var parent = link.closest(".nav-dropdown");
                if (parent) {
                    parent.querySelector(".nav-dropdown-toggle").classList.add("active");
                }
            }
        });

        dropdowns.forEach(function (item) {
            var toggle = item.querySelector(".nav-dropdown-toggle");
            toggle.addEventListener("click", function (event) {
                event.stopPropagation();
                var opened = item.classList.toggle("open");
                toggle.setAttribute("aria-expanded", opened ? "true" : "false");
                closeDropdowns(item);
            });
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".nav-dropdown")) {
                closeDropdowns();
            }
            if (!event.target.closest(".main-nav") && !event.target.closest(".header-actions")) {
                closeMenu();
            }
        });

        menuBtn.addEventListener("click", function () {
            var opened = nav.classList.toggle("open");
            document.documentElement.classList.toggle("menu-open", opened);
            menuBtn.classList.toggle("is-open", opened);
            menuBtn.setAttribute("aria-expanded", opened ? "true" : "false");
        });

        if (!themeBtn.dataset.themeBound) {
            themeBtn.dataset.themeBound = "1";
            themeBtn.addEventListener("click", function () {
                var dark = root.classList.toggle("dark-mode");
                save("aarohika-theme", dark ? "dark" : "light");
            });
        }

        if (!dirBtn.dataset.dirBound) {
            dirBtn.dataset.dirBound = "1";
            dirBtn.addEventListener("click", function () {
                var next = root.dir === "rtl" ? "ltr" : "rtl";
                root.dir = next;
                save("aarohika-dir", next);
            });
        }

        window.addEventListener("resize", function () {
            if (window.innerWidth > 1100) {
                closeMenu();
            }
        });

        if (topBtn) {
            window.addEventListener("scroll", function () {
                topBtn.classList.toggle("show", window.scrollY > 300);
            });

            topBtn.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        var form = document.getElementById("newsletterForm");
        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                form.reset();
            });
        }
    });
})();(function () {
    var people = {
        arjun: {
            name: "Arjun Rao", role: "Guitar Instructor", img: "https://i.pinimg.com/736x/7f/2a/31/7f2a31a3a59b809f81eeccb8d513e21b.jpg",
            tagline: "Passionate about helping students of all ages discover the joy of playing guitar.",
            bio: "Arjun is a dedicated guitar instructor who enjoys helping students build confidence through music.",
            qual: "Example qualification details can be added here.",
            styles: "Acoustic, Pop, Rock, Fingerstyle, Light Classical (example)",
            kids: "Uses simple, fun activities and songs to build interest and confidence.",
            adults: "Focuses on practical learning with students' favourite songs and achievable goals.",
            lang: "English, Hindi, Telugu (example)",
            bg: "Example background information can be added here."
        },
        meera: {
            name: "Meera Iyer", role: "Keyboard Instructor", img: "https://i.pinimg.com/736x/3b/8e/f9/3b8ef977e586c28345d63ee25816b01e.jpg",
            tagline: "Building strong musical foundations with patience and clear guidance.",
            bio: "Meera is a keyboard instructor who helps students understand music step by step with clarity and care.",
            qual: "Example qualification details can be added here.",
            styles: "Classical, Bollywood, Pop, Film Music (example)",
            kids: "Uses colourful exercises and short pieces to keep young learners engaged.",
            adults: "Builds theory and technique together with songs adults love to play.",
            lang: "English, Hindi, Tamil (example)",
            bg: "Example background information can be added here."
        },
        sahana: {
            name: "Sahana Verma", role: "Vocals Instructor", img: "https://i.pinimg.com/736x/7f/72/8b/7f728be9bc0686854fea45e14d7ea3bf.jpg",
            tagline: "Healthy vocal techniques and expressive singing for every age.",
            bio: "Sahana focuses on voice care, breath control and confident stage presence for singers of all levels.",
            qual: "Example qualification details can be added here.",
            styles: "Pop, Playback, Light Classical, Devotional (example)",
            kids: "Teaches through singing games, rhythm and simple melodies.",
            adults: "Works on range, pitch and expression with repertoire of their choice.",
            lang: "English, Hindi, Telugu (example)",
            bg: "Example background information can be added here."
        },
        rohit: {
            name: "Rohit Menon", role: "Drums Instructor", img: "https://i.pinimg.com/736x/39/dc/90/39dc90c605bde0a92147443c1c073e5d.jpg",
            tagline: "Rhythm and drum skills through engaging, structured lessons.",
            bio: "Rohit teaches drums with a strong focus on timing, coordination and playing along with real music.",
            qual: "Example qualification details can be added here.",
            styles: "Rock, Pop, Funk, Jazz Basics (example)",
            kids: "Builds rhythm through fun patterns and short, playful practice sessions.",
            adults: "Focuses on groove, fills and playing full songs from early on.",
            lang: "English, Hindi, Malayalam (example)",
            bg: "Example background information can be added here."
        }
    };

    var modal = document.getElementById("profileModal");

    function setText(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function openProfile(key) {
        var p = people[key];
        if (!p || !modal) return;
        ["pmImage", "pmThumb"].forEach(function (id) {
            var img = document.getElementById(id);
            if (img) {
                img.src = p.img;
                img.alt = p.name;
            }
        });
        setText("pmName", p.name);
        setText("pmRole", p.role);
        setText("pmTagline", p.tagline);
        setText("pmHeadName", p.name);
        setText("pmHeadRole", p.role);
        setText("pmBio", p.bio);
        setText("pmQual", p.qual);
        setText("pmStyles", p.styles);
        setText("pmKids", p.kids);
        setText("pmAdults", p.adults);
        setText("pmLang", p.lang);
        setText("pmBg", p.bg);
        var cta = document.getElementById("pmCta");
        if (cta) cta.textContent = "Request a Trial Class with " + p.name.split(" ")[0];
        modal.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeProfile() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    document.addEventListener("click", function (e) {
        var open = e.target.closest("[data-profile]");
        if (open) {
            openProfile(open.getAttribute("data-profile"));
            return;
        }
        if (e.target.closest("#pmClose") || e.target === modal) {
            closeProfile();
            return;
        }
        document.querySelectorAll("[data-select].is-open").forEach(function (s) {
            if (!s.contains(e.target)) {
                s.classList.remove("is-open");
                s.querySelector(".find-select-btn").setAttribute("aria-expanded", "false");
            }
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        if (modal && !modal.hidden) closeProfile();
        document.querySelectorAll("[data-select].is-open").forEach(function (s) {
            s.classList.remove("is-open");
        });
    });

    var form = document.getElementById("instructorFilters");
    var cards = document.querySelectorAll(".instructor-card");
    var count = document.getElementById("instructorCount");
    var empty = document.getElementById("instructorEmpty");

    function has(card, key, value) {
        return value === "all" || card.dataset[key].split(" ").indexOf(value) !== -1;
    }

    function applyFilters() {
        var q = document.getElementById("instructorSearch").value.trim().toLowerCase();
        var inst = document.getElementById("filterInstrument").value;
        var group = document.getElementById("filterGroup").value;
        var level = document.getElementById("filterLevel").value;
        var format = document.getElementById("filterFormat").value;
        var shown = 0;
        cards.forEach(function (card) {
            var match = card.dataset.name.toLowerCase().indexOf(q) !== -1 &&
                (inst === "all" || card.dataset.instrument === inst) &&
                has(card, "group", group) &&
                has(card, "level", level) &&
                has(card, "format", format);
            card.hidden = !match;
            if (match) shown++;
        });
        if (count) count.textContent = shown;
        if (empty) empty.hidden = shown !== 0;
    }

    document.querySelectorAll("[data-select]").forEach(function (sel) {
        var btn = sel.querySelector(".find-select-btn");
        var value = sel.querySelector(".find-value");
        var input = sel.querySelector("input[type=hidden]");
        var items = sel.querySelectorAll("[role=option]");

        btn.addEventListener("click", function () {
            var willOpen = !sel.classList.contains("is-open");
            document.querySelectorAll("[data-select].is-open").forEach(function (s) {
                s.classList.remove("is-open");
            });
            sel.classList.toggle("is-open", willOpen);
            btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        });

        items.forEach(function (item) {
            item.addEventListener("click", function () {
                items.forEach(function (i) { i.classList.remove("is-selected"); });
                item.classList.add("is-selected");
                input.value = item.dataset.value;
                value.textContent = item.textContent;
                sel.classList.remove("is-open");
                btn.setAttribute("aria-expanded", "false");
                applyFilters();
            });
        });

        sel.resetSelect = function () {
            items.forEach(function (i) { i.classList.remove("is-selected"); });
            items[0].classList.add("is-selected");
            input.value = "all";
            value.textContent = items[0].textContent;
        };
    });

    if (form) {
        form.addEventListener("input", applyFilters);
        form.addEventListener("submit", function (e) { e.preventDefault(); });
        form.addEventListener("reset", function () {
            document.querySelectorAll("[data-select]").forEach(function (s) { s.resetSelect(); });
            setTimeout(applyFilters, 0);
        });
    }

    if (document.getElementById("instructorSearch")) applyFilters();
})();
(function () {
    var rows = document.querySelectorAll(".batches-table tbody tr");
    document.querySelectorAll(".batch-filter [role=option]").forEach(function (item) {
        item.addEventListener("click", function () {
            var value = item.dataset.value;
            rows.forEach(function (row) {
                row.hidden = value !== "all" && row.dataset.batch !== value;
            });
        });
    });
})();
/* Aarohika: shared behaviour for login.html and register.html */
(function () {
    var root = document.documentElement;

    function save(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { }
    }

    // Theme toggle (same storage key as the rest of the site)
    var themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
        if (!themeBtn.dataset.themeBound) {
            themeBtn.dataset.themeBound = "1";
            themeBtn.addEventListener("click", function () {
                var dark = root.classList.toggle("dark-mode");
                save("aarohika-theme", dark ? "dark" : "light");
            });
        }
    }

    // RTL / LTR toggle
    var dirBtn = document.getElementById("dirToggle");
    var dirLabel = document.getElementById("dirLabel");
    function syncDir() {
        if (dirLabel) dirLabel.textContent = root.dir === "rtl" ? "LTR" : "RTL";
    }
    if (dirBtn && !dirBtn.dataset.dirBound) {
        dirBtn.dataset.dirBound = "1";
        dirBtn.addEventListener("click", function () {
            root.dir = root.dir === "rtl" ? "ltr" : "rtl";
            save("aarohika-dir", root.dir);
            syncDir();
        });
    }
    syncDir();

    // Show / hide password
    document.querySelectorAll(".auth-eye").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var input = btn.parentElement.querySelector("input");
            if (!input) return;
            var show = input.type === "password";
            input.type = show ? "text" : "password";
            btn.classList.toggle("is-shown", show);
            btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        });
    });

    // Form handling (demo: connect to your backend where marked)
    var form = document.querySelector(".auth-form");
    if (form) {
        var pass = form.querySelector("#password");
        var confirm = form.querySelector("#confirmPassword");
        if (pass && confirm) {
            var check = function () {
                confirm.setCustomValidity(confirm.value && confirm.value !== pass.value ? "Passwords do not match" : "");
            };
            pass.addEventListener("input", check);
            confirm.addEventListener("input", check);
        }
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // TODO: send form data to your server here, then redirect on success
            window.location.href = form.getAttribute("data-next") || "home1.html";
        });
    }

})();
/* Aarohika: responsive custom dropdowns for form <select> fields.
   The real <select> stays in the form (hidden), so submit / validation still work. */
(function () {
    var CHEVRON = '<svg class="cs-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" ' +
        'stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="m6 9 6 6 6-6"/></svg>';

    function closeAll(except) {
        document.querySelectorAll(".cs.is-open").forEach(function (cs) {
            if (cs !== except) {
                cs.classList.remove("is-open");
                cs.querySelector(".cs-btn").setAttribute("aria-expanded", "false");
            }
        });
    }

    function build(select) {
        if (select.dataset.csDone) return;
        select.dataset.csDone = "1";

        var wrap = document.createElement("div");
        wrap.className = "cs";

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cs-btn";
        btn.setAttribute("aria-haspopup", "listbox");
        btn.setAttribute("aria-expanded", "false");
        if (select.id) btn.setAttribute("aria-labelledby", select.id + "-cs-label");

        var label = document.createElement("span");
        label.className = "cs-value";
        btn.appendChild(label);
        btn.insertAdjacentHTML("beforeend", CHEVRON);

        var menu = document.createElement("ul");
        menu.className = "cs-menu";
        menu.setAttribute("role", "listbox");

        var items = [];
        Array.prototype.forEach.call(select.options, function (opt, i) {
            var li = document.createElement("li");
            li.setAttribute("role", "option");
            li.dataset.index = i;
            li.textContent = opt.textContent;
            if (opt.disabled) li.setAttribute("aria-disabled", "true");
            menu.appendChild(li);
            items.push(li);
        });

        wrap.appendChild(btn);
        wrap.appendChild(menu);
        select.classList.add("cs-native");
        select.tabIndex = -1;
        select.setAttribute("aria-hidden", "true");
        select.parentNode.insertBefore(wrap, select.nextSibling);

        function sync() {
            var opt = select.options[select.selectedIndex];
            label.textContent = opt ? opt.textContent : "";
            label.classList.toggle("is-placeholder", !!opt && opt.value === "");
            items.forEach(function (li, i) {
                var on = i === select.selectedIndex;
                li.classList.toggle("is-selected", on);
                li.setAttribute("aria-selected", on ? "true" : "false");
            });
        }

        function setOpen(open) {
            if (open) {
                closeAll(wrap);
                wrap.classList.remove("cs-up");
                wrap.classList.add("is-open");
                var r = btn.getBoundingClientRect();
                var h = Math.min(menu.scrollHeight, 260) + 12;
                var below = window.innerHeight - r.bottom;
                if (below < h && r.top > below) wrap.classList.add("cs-up");
                var sel = menu.querySelector(".is-selected");
                if (sel) menu.scrollTop = sel.offsetTop - 6;
            } else {
                wrap.classList.remove("is-open");
            }
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        }

        function choose(i) {
            if (items[i] && items[i].getAttribute("aria-disabled") === "true") return;
            select.selectedIndex = i;
            select.dispatchEvent(new Event("input", { bubbles: true }));
            select.dispatchEvent(new Event("change", { bubbles: true }));
            sync();
        }

        btn.addEventListener("click", function () {
            setOpen(!wrap.classList.contains("is-open"));
        });

        menu.addEventListener("click", function (e) {
            var li = e.target.closest("li");
            if (!li) return;
            choose(Number(li.dataset.index));
            setOpen(false);
            btn.focus();
        });

        btn.addEventListener("keydown", function (e) {
            var open = wrap.classList.contains("is-open");
            if (e.key === "Escape") { setOpen(false); return; }
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                var next = select.selectedIndex + (e.key === "ArrowDown" ? 1 : -1);
                next = Math.max(0, Math.min(items.length - 1, next));
                if (!open) setOpen(true);
                choose(next);
            }
        });

        select.addEventListener("change", sync);
        if (select.form) {
            select.form.addEventListener("reset", function () { setTimeout(sync, 0); });
        }
        sync();
    }

    function init() {
        document.querySelectorAll(".ct-field select, .trial-form select").forEach(build);
    }

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".cs")) closeAll();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeAll();
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();