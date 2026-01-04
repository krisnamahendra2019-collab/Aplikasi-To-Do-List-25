(function () {
  "use strict";

  // ==== helpers ====
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function toast(title, desc = "") {
    const t = $("#toast");
    if (!t) return;
    $(".t-title", t).textContent = title;
    $(".t-desc", t).textContent = desc;
    t.classList.add("show");
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => t.classList.remove("show"), 2200);
  }

  function confirmDelete(msg = "Yakin hapus item ini?") {
    return window.confirm(msg);
  }

  // ==== inline edit (toggle) ====
  // Tombol edit di setiap row harus punya: data-action="toggle-edit" data-id="123"
  // Form inline edit wrapper harus punya: data-edit-for="123"
  $$(('[data-action="toggle-edit"]')).forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      const panel = document.querySelector(`[data-edit-for="${id}"]`);
      if (!panel) return;
      panel.classList.toggle("show");

      const input = panel.querySelector('input[type="text"]');
      if (panel.classList.contains("show") && input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });

  // ==== delete confirm ====
  // Link/button delete harus punya: data-action="delete"
  $$(('[data-action="delete"]')).forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!confirmDelete()) e.preventDefault();
    });
  });

  // ==== toggle status (optional via fetch) ====
  // Jika kamu pakai checkbox + endpoint update_status.php,
  // set checkbox: data-action="toggle-status" data-id="123"
  // dan endpoint menerima POST id= & status= (0/1)
  $$(('[data-action="toggle-status"]')).forEach(chk => {
    chk.addEventListener("change", async () => {
      const id = chk.getAttribute("data-id");
      const status = chk.checked ? 1 : 0;

      try {
        const res = await fetch("../process/update_status.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ id, status }).toString()
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        // UI feedback (opsional)
        const row = chk.closest("tr");
        if (row) {
          row.classList.toggle("is-done", status === 1);
          const title = row.querySelector("[data-role='title']");
          if (title) title.classList.toggle("done-text", status === 1);

          const dot = row.querySelector(".status-dot");
          if (dot) dot.classList.toggle("done", status === 1);
        }

        toast("Tersimpan", status ? "Ditandai selesai." : "Ditandai belum selesai.");
      } catch (err) {
        // rollback checkbox
        chk.checked = !chk.checked;
        toast("Gagal", "Tidak bisa update status. Coba lagi.");
        console.error(err);
      }
    });
  });

  // ==== auto submit inline edit on Enter ====
  // Input judul inline edit: data-action="edit-title-input"
  $$(('[data-action="edit-title-input"]')).forEach(inp => {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const form = inp.closest("form");
        if (form) form.submit();
      }
      if (e.key === "Escape") {
        const panel = inp.closest(".inline-edit");
        if (panel) panel.classList.remove("show");
      }
    });
  });

})();
