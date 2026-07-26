"use strict";
(() => {

    const CONFIG = {

        SCROLL: {
            headerOffset: 90,
            stickyOffset: 10
        },

        SELECTORS: {

            header: "#header",
            navbar: "#nav",
            navToggle: "#navToggle",
            backdrop: "#backdrop",
            reveal: ".reveal",
            toTop: "#toTop"
        }
    };

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    function throttle(callback, delay = 100) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;
            callback(...args);
            waiting = true;

            setTimeout(() => {

                waiting = false;
            }, delay);
        };
    }

    const getSectionTop = section =>
        Math.max(
            window.scrollY + section.getBoundingClientRect().top - CONFIG.SCROLL.headerOffset,
            0
        );

    function smoothScroll(target) {

        const section = $(target);
        if (!section) return;

        window.scrollTo({

            top: getSectionTop(section),
            behavior: "smooth"
        });
    }

    function initHeader() {

        const header = $(CONFIG.SELECTORS.header);
        if (!header) return;

        function updateHeader() {

            header.classList.toggle(
                "is-stuck",
                window.scrollY > CONFIG.SCROLL.stickyOffset
            );
        }
        updateHeader();

        window.addEventListener(
            "scroll",
            throttle(updateHeader),
            { passive: true }
        );
    }

    function initMobileNavigation() {

        const nav = $(CONFIG.SELECTORS.navbar);
        const toggle = $(CONFIG.SELECTORS.navToggle);
        const backdrop = $(CONFIG.SELECTORS.backdrop);
        if (!nav || !toggle) return;

        function closeMenu() {
            nav.classList.remove("is-open");
            toggle.classList.remove("is-open");
            backdrop?.classList.remove("is-on");
            document.body.classList.remove("menu-open");
        }

        function openMenu() {
            nav.classList.add("is-open");
            toggle.classList.add("is-open");
            backdrop?.classList.add("is-on");
            document.body.classList.add("menu-open");
        }

        toggle.addEventListener("click", () => {
            if (nav.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        $$("a", nav).forEach(link => {
            link.addEventListener("click", closeMenu);
        });
        backdrop?.addEventListener("click", closeMenu);
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                closeMenu();
            }
        });
    }

    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener("click", e => {
                const target = link.getAttribute("href");
                if (!target || target === "#") return;
                if (!$(target)) return;
                e.preventDefault();
                smoothScroll(target);
            });
        });
    }

    function initReveal() {
        const elements = $$(CONFIG.SELECTORS.reveal);
        if (!elements.length) return;
        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                });
            },

            {
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px"
            }
        );

        elements.forEach(element => {
            observer.observe(element);

        });
    }

    function initHeroSlider() {
        const slides = $$(".hero-showcase__slide");
        if (!slides.length) return;
        let current = 0;

        setInterval(() => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        }, 3000);
    }

    function initServicesSlider() {
        const track = $("#svcTrack");
        const next = $("#svcNext");
        const prev = $("#svcPrev");
        if (!track || !next || !prev) return;

        const amount = 390;

        next.addEventListener("click", () => {

            track.scrollBy({
                left: amount,
                behavior: "smooth"
            });
        });

        prev.addEventListener("click", () => {

            track.scrollBy({
                left: -amount,
                behavior: "smooth"
            });
        });
    }

    function initCounters() {
        const counters = $$("[data-count]");
        if (!counters.length) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                if (!entry.isIntersecting) return;
                const counter = entry.target;
                const target = Number(counter.dataset.count);
                const suffix = counter.dataset.suffix || "";
                let current = 0;
                const increment = target / 80;

                function update() {

                    current += increment;
                    if (current < target) {
                        counter.textContent =
                            Math.floor(current) + suffix;
                        requestAnimationFrame(update);
                    }

                    else {
                        counter.textContent =
                            target + suffix;
                    }
                }

                update();
                observer.unobserve(counter);
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);

        });
    }

function validateForm(form) {

    let valid = true;

    form.querySelectorAll("[required]").forEach(field => {

        const wrapper =
            field.closest(".field") || field.parentElement;

        let isFieldValid = true;

        switch (field.type) {

            case "email":
                isFieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(field.value.trim());
                break;

            case "tel":
                isFieldValid = /^[0-9+\-\s()]{10,20}$/
                    .test(field.value.trim());
                break;

            default:
                isFieldValid =
                    field.value.trim() !== "";
        }

        wrapper?.classList.toggle(
            "invalid",
            !isFieldValid
        );

        if (!isFieldValid && valid) {
            field.focus();

        }
        valid = valid && isFieldValid;
    });
    return valid;

    }

function showLoader(button) {

    if (!button) return;
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
        <span class="spinner"></span>
        Sending...
    `;

}

function hideLoader(button) {

    if (!button) return;
    button.disabled = false;
    button.innerHTML =
        button.dataset.originalText;

}

function showToast(message, type = "success") {
    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);

    }

    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}

function initForm() {

    const form = $("#contactForm");
    if (!form) return;

    form.addEventListener("submit", e => {

        if (!validateForm(form)) {

            e.preventDefault();

            showToast(
                "Please complete all required fields.",
                "error"

            );
            return;
        }

        const submitBtn = form.querySelector(
            'button[type="submit"]'
        );
        showLoader(submitBtn);
    });

}

function initToTop() {

    const button = $("#toTop");

    if (!button) return;

    function toggle() {

        button.classList.toggle(
            "is-on",
            window.scrollY > 600
        );
    }

    toggle();

    window.addEventListener(
        "scroll",
        throttle(toggle),
        { passive: true }
    );

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initProjectFilters() {

    const filters = $$(".filter");
    const projects = $$(".proj");

    if (!filters.length || !projects.length) return;
    filters.forEach(filter => {

        filter.addEventListener("click", () => {
            const category = filter.dataset.filter;

            filters.forEach(btn => {

                btn.classList.remove("is-active");
                btn.setAttribute("aria-pressed", "false");

            });

            filter.classList.add("is-active");
            filter.setAttribute("aria-pressed", "true");

            projects.forEach(project => {

                const show =
                    category === "all" ||
                    project.dataset.type === category;

                project.style.display = show ? "" : "none";
            });
        });
    });
}

function boot() {

    initHeader();
    initMobileNavigation();
    initSmoothScroll();
    initReveal();
    initHeroSlider();
    initServicesSlider();
    initProjectFilters();
    initCounters();
    initForm();
    initToTop();

}
document.addEventListener(
    "DOMContentLoaded",
    boot

);
})();