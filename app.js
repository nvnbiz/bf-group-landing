/* ===== BF GROUP landing — interactions ===== */
(function () {
  "use strict";

  /* Если где-то случится ошибка скрипта — снимаем класс js,
     и весь контент показывается без анимаций вместо пустого экрана. */
  function showEverything() {
    document.documentElement.className = document.documentElement.className.replace(/\bjs\b/g, "");
  }
  window.addEventListener("error", showEverything);

  /* Каждый блок изолирован: поломка одного не роняет остальные. */
  function safe(fn) {
    try { fn(); } catch (e) { if (window.console) console.error(e); }
  }

  function list(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  var hasIO = typeof window.IntersectionObserver === "function";

  /* header */
  safe(function () {
    var header = document.getElementById("header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  /* burger */
  safe(function () {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    if (!burger || !nav) return;
    burger.addEventListener("click", function () { nav.classList.toggle("open"); });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  });

  /* reveal on scroll */
  safe(function () {
    var items = list(".reveal");
    if (!hasIO) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  });

  /* live chats: hero demo + Arina case */
  function runChat(chat, script) {
    function addBubble(cls, text) {
      var el = document.createElement("div");
      el.className = cls;
      el.textContent = text;
      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
      requestAnimationFrame(function () { el.classList.add("show"); });
    }
    function addSched(rows) {
      var el = document.createElement("div");
      el.className = "bubble sched";
      rows.forEach(function (r) {
        var row = document.createElement("div");
        row.className = "sched-row";
        var b = document.createElement("b");
        b.textContent = r[0];
        row.appendChild(b);
        row.appendChild(document.createTextNode(r[1]));
        el.appendChild(row);
      });
      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
      requestAnimationFrame(function () { el.classList.add("show"); });
    }
    function addTyping() {
      var el = document.createElement("div");
      el.className = "demo-typing";
      el.innerHTML = "<i></i><i></i><i></i>";
      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
      return el;
    }
    function play(i) {
      if (i >= script.length) {
        setTimeout(function () { chat.innerHTML = ""; play(0); }, 7000);
        return;
      }
      var msg = script[i];
      if (msg.t === "time") {
        addBubble("demo-time", msg.text);
        setTimeout(function () { play(i + 1); }, 800);
      } else if (msg.t === "in") {
        addBubble("bubble in", msg.text);
        setTimeout(function () { play(i + 1); }, 1600);
      } else if (msg.t === "sched") {
        addSched(msg.rows);
        setTimeout(function () { play(i + 1); }, 2200);
      } else if (msg.t === "sys") {
        addBubble("bubble accent", msg.text);
        setTimeout(function () { play(i + 1); }, 1000);
      } else {
        var tp = addTyping();
        setTimeout(function () {
          tp.remove();
          addBubble(msg.t === "accent" ? "bubble out accent" : "bubble out", msg.text);
          setTimeout(function () { play(i + 1); }, 1600);
        }, 1200);
      }
    }
    setTimeout(function () { play(0); }, 900);
  }

  /* запускает чат, когда блок появился на экране */
  function chatOnView(chat, script) {
    if (!hasIO) { runChat(chat, script); return; }
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !started) {
          started = true;
          runChat(chat, script);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(chat);
  }

  safe(function () {
    var heroChat = document.getElementById("demoChat");
    if (!heroChat) return;
    runChat(heroChat, [
      { t: "time", text: "23:47" },
      { t: "in", text: "Здравствуйте! Есть свободное окно на завтра?" },
      { t: "out", text: "Здравствуйте! Да, завтра свободны 14:00 и 17:30. Что удобнее?" },
      { t: "in", text: "17:30 отлично" },
      { t: "out", text: "Записала вас на 17:30. За час пришлю напоминание и адрес." },
      { t: "sys", text: "Заявка передана в CRM · ответ занял 40 секунд" }
    ]);
  });

  safe(function () {
    var arinaChat = document.getElementById("arinaChat");
    if (!arinaChat) return;
    chatOnView(arinaChat, [
      { t: "time", text: "08:30" },
      { t: "accent", text: "Доброе утро! День под контролем:" },
      { t: "sched", rows: [
        ["10:00", "Встреча с заказчиком"],
        ["12:30", "Планёрка с руководителем проектов"],
        ["до 15:00", "Отправить 3 КП клиентам"],
        ["17:00", "Связаться с поставщиком"]
      ]},
      { t: "in", text: "Забронируй билет в Москву на пятницу" },
      { t: "out", text: "Готово ✓ Билет куплен: пт, 09:40 · S7 · 12 300 ₽. Регистрацию на рейс делаем?" },
      { t: "in", text: "Да, сделай" },
      { t: "out", text: "Зарегистрировала ✓ Место 14A, посадочный уже у вас." }
    ]);
  });

  /* astrocartography map: city tooltips */
  safe(function () {
    var ayaMap = document.getElementById("ayaMap");
    var wmTip = document.getElementById("wmTip");
    if (!ayaMap || !wmTip) return;
    var tipTitle = wmTip.querySelector("b");
    var tipDesc = wmTip.querySelector("span");
    list(".wm-city", ayaMap).forEach(function (city) {
      var m = /translate\(([\d.]+) ([\d.]+)\)/.exec(city.getAttribute("transform"));
      if (!m) return;
      function show() {
        tipTitle.textContent = city.getAttribute("data-t");
        tipDesc.textContent = city.getAttribute("data-d");
        wmTip.style.left = (m[1] / 1280 * 100) + "%";
        wmTip.style.top = (m[2] / 677 * 100) + "%";
        if (m[2] / 677 < 0.45) wmTip.classList.add("below");
        else wmTip.classList.remove("below");
        wmTip.classList.add("show");
      }
      function hide() { wmTip.classList.remove("show"); }
      city.addEventListener("mouseenter", show);
      city.addEventListener("mouseleave", hide);
      city.addEventListener("click", function () {
        if (wmTip.classList.contains("show") && tipTitle.textContent === city.getAttribute("data-t")) hide();
        else show();
      });
    });
  });

  /* Aya dialogue: start on scroll into view */
  safe(function () {
    var ayaChat = document.getElementById("ayaChat");
    if (!ayaChat) return;
    chatOnView(ayaChat, [
      { t: "time", text: "сегодня" },
      { t: "in", text: "Айя, куда поехать отдохнуть с 1 по 16 сентября?" },
      { t: "out", text: "Смотрю вашу карту. В сентябре через Бали проходит ваша линия Венеры ♀ — отдых, восстановление, красота. Берите даты 3–14 сентября." },
      { t: "in", text: "А мероприятие для клиентов где лучше провести?" },
      { t: "out", text: "Дубай. Там ваша линия Юпитера ♃ — признание и рост: запуски и переговоры ложатся идеально. Для короткой поездки на 2–3 дня — Лиссабон, линия Солнца ☉." },
      { t: "sys", text: "Разбор карты · 3 минуты вместо 4–5 часов" }
    ]);
  });

  /* finance tracker demo: play on scroll into view */
  safe(function () {
    var finApp = document.getElementById("finApp");
    if (!finApp) return;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finPlayed = false;
    function playFin() {
      if (finPlayed) return;
      finPlayed = true;
      finApp.classList.add("play");
      var numEl = finApp.querySelector(".fin-num");
      if (!numEl) return;
      var target = parseInt(numEl.getAttribute("data-count"), 10);
      if (reduceMotion) { numEl.textContent = target.toLocaleString("ru-RU") + " ₽"; return; }
      var start = null, dur = 1800;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.round(target * eased).toLocaleString("ru-RU") + " ₽";
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    if (!hasIO) { playFin(); return; }
    var finIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { playFin(); finIO.disconnect(); }
      });
    }, { threshold: 0.4 });
    finIO.observe(finApp);
  });

  /* FAQ: only one open */
  safe(function () {
    var faqItems = list(".faq details");
    faqItems.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) faqItems.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });
})();
