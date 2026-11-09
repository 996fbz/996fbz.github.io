/* 站内搜索：纯前端，索引由 search.html 内联注入，file:// 直接打开也可用 */
(function () {
  var input = document.getElementById("q");
  var list = document.getElementById("results");
  var count = document.getElementById("result-count");
  if (!input || !list || typeof IDX === "undefined") return;

  var ALL = IDX;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function mark(text, kw) {
    var s = esc(text);
    if (!kw) return s;
    var k = esc(kw).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return s.replace(new RegExp(k, "gi"), function (m) {
      return "<mark>" + m + "</mark>";
    });
  }

  function score(item, k) {
    var t = item.t.toLowerCase(), d = item.d.toLowerCase();
    var g = item.g.toLowerCase(), b = (item.b || "").toLowerCase();
    if (t.indexOf(k) === 0) return 100;
    if (t.indexOf(k) > -1) return 82;
    if (g.indexOf(k) > -1) return 60;
    if (d.indexOf(k) > -1) return 40;
    if (b.indexOf(k) > -1) return 28;
    if (item.c.toLowerCase().indexOf(k) > -1) return 15;
    return 0;
  }

  function snippet(item, kw) {
    if (!kw) return item.d;
    var text = item.b || item.d;
    var i = text.toLowerCase().indexOf(kw.toLowerCase());
    if (i < 0) return item.d;
    var start = Math.max(0, i - 24);
    var end = Math.min(text.length, i + kw.length + 70);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function render(raw) {
    var kw = (raw || "").trim();
    var hits;
    if (!kw) {
      hits = ALL.slice(0, 12);
    } else {
      var k = kw.toLowerCase();
      hits = ALL.map(function (it) { return { it: it, s: score(it, k) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 40)
        .map(function (x) { return x.it; });
    }

    list.innerHTML = "";
    if (kw && !hits.length) {
      count.textContent = "「" + kw + "」· 0 条结果";
      list.innerHTML = '<li style="border:0;padding:26px 0;color:var(--soft);font-size:14px">'
        + "<b style='display:block;font-family:var(--serif);font-size:18px;color:var(--ink);margin-bottom:8px'>没有找到匹配的内容</b>"
        + "试试更短的词，比如「合击」「打金」「攻沙」，或者直接去"
        + '<a href="kaifu.html" style="color:var(--red)">今日开服表</a>看看。</li>';
      return;
    }

    count.textContent = kw
      ? "「" + kw + "」· 命中 " + hits.length + " 条"
      : "还没有输入关键词，下面是最近更新的 12 篇，输入后实时筛选。";

    hits.forEach(function (it) {
      var li = document.createElement("li");
      li.innerHTML = '<a class="rt" href="' + it.u + '">' + mark(it.t, kw) + "</a>"
        + '<p class="rd">' + mark(snippet(it, kw), kw) + "</p>"
        + '<div class="rm">' + esc(it.c) + " · " + esc(it.g) + "</div>";
      list.appendChild(li);
    });
  }

  function current() {
    var m = location.search.match(/[?&]q=([^&]*)/);
    if (!m) return "";
    try { return decodeURIComponent(m[1].replace(/\+/g, " ")); } catch (e) { return ""; }
  }

  var timer = null;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    var v = input.value;
    timer = setTimeout(function () { render(v); }, 120);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); render(input.value); }
  });
  var btn = document.getElementById("go");
  if (btn) btn.addEventListener("click", function (e) {
    e.preventDefault(); render(input.value);
  });

  var q = current();
  input.value = q;
  render(q);
  if (q) input.focus();
})();
