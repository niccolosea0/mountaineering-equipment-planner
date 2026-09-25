(() => {
  "use strict";

  const STORAGE_KEY = "mountaineering-equipment-planner-v2";
  const THEME_KEY = "mountaineering-equipment-planner-theme";

  const DEFAULT_GEAR = [
    { id: "starter-harness", name: "Climbing harness", category: "Soft goods", quantity: 1, notes: "Choose a comfortable, correctly sized harness and inspect it before every session.", price: 75, status: "need", source: "starter", custom: false },
    { id: "starter-shoes", name: "Climbing shoes", category: "Footwear", quantity: 1, notes: "Prioritize a secure, comfortable beginner-to-intermediate fit.", price: 120, status: "need", source: "starter", custom: false },
    { id: "starter-hms", name: "HMS locking carabiners", category: "Protection", quantity: 2, notes: "Useful for belaying and anchor systems; confirm compatibility with your device.", price: 40, status: "need", source: "starter", custom: false },
    { id: "starter-d-biners", name: "Lightweight D-shaped carabiners", category: "Protection", quantity: 2, notes: "Versatile lightweight connectors for organizing a climbing system.", price: 30, status: "need", source: "starter", custom: false },
    { id: "starter-chalk", name: "Chalk bag", category: "Accessories", quantity: 1, notes: "A simple chalk bag with a secure closure is enough to get started.", price: 25, status: "need", source: "starter", custom: false },
    { id: "starter-reverso", name: "Petzl Reverso belay device", category: "Protection", quantity: 1, notes: "Suitable for belay, rappel, and guide mode when used correctly.", price: 40, status: "need", source: "starter", custom: false },
    { id: "starter-sling", name: "120 cm Dyneema sling", category: "Anchors", quantity: 1, notes: "A versatile sling for extension and anchor systems when used with proper training.", price: 20, status: "need", source: "starter", custom: false },
    { id: "starter-helmet", name: "Climbing helmet", category: "Safety", quantity: 1, notes: "Check fit, shell, foam, certification, and retirement guidance.", price: 90, status: "need", source: "starter", custom: false },
    { id: "priority-rope", recommendationId: "rope", priority: 1, name: "60 m 9.5 mm dry single rope", category: "Rope", quantity: 1, notes: "Core rope for outdoor lead and top-rope climbing; dry treatment supports outdoor durability.", price: 205, status: "need", source: "recommended", custom: false },
    { id: "priority-quickdraws", recommendationId: "quickdraws", priority: 2, name: "Quickdraws (mixed lengths)", category: "Protection", quantity: 12, notes: "A mix of 12 cm and 17–18 cm draws covers most single-pitch sport routes.", price: 135, status: "need", source: "recommended", custom: false },
    { id: "priority-steel", recommendationId: "steel-lockers", priority: 3, name: "Steel locking carabiners", category: "Anchors", quantity: 2, notes: "Durable dedicated hardware for high-wear top-rope or fixed anchor points.", price: 60, status: "need", source: "recommended", custom: false },
    { id: "priority-pas", recommendationId: "pas", priority: 4, name: "Extra slings or a PAS", category: "Anchors", quantity: 1, notes: "Add one PAS or 1–2 slings for cleaning, extending, and anchor work.", price: 55, status: "need", source: "recommended", custom: false },
    { id: "priority-rope-bag", recommendationId: "rope-bag", priority: 5, name: "Rope bag / tarp", category: "Carry", quantity: 1, notes: "Keeps your rope cleaner, protected, and easier to organize at the crag.", price: 45, status: "need", source: "recommended", custom: false },
    { id: "priority-hms", recommendationId: "aluminum-lockers", priority: 6, name: "Extra aluminum HMS carabiners", category: "Protection", quantity: 3, notes: "Add 2–3 versatile lockers for belay, anchors, and backups.", price: 60, status: "need", source: "recommended", custom: false },
    { id: "priority-pack", recommendationId: "pack", priority: 7, name: "Climbing pack (20–35 L)", category: "Carry", quantity: 1, notes: "Carries rope, rack, layers, water, and approach essentials.", price: 140, status: "need", source: "recommended", custom: false },
    { id: "priority-approach", recommendationId: "approach-shoes", priority: 8, name: "Approach shoes", category: "Footwear", quantity: 1, notes: "Improves grip and comfort on rocky approaches while protecting climbing shoes.", price: 159, status: "need", source: "recommended", custom: false }
  ];

  const RECOMMENDATIONS = [
    {
      id: "rope", title: "60 m × 9.5 mm dry single rope", description: "The core of your outdoor lead and top-rope system.", note: "A 9.5 mm rope balances handling, weight, and durability. Confirm your Reverso's approved rope-diameter range before use.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Mammut 9.5 Crag Dry 60 m", price: "$250–300", summary: "Full dry treatment, dependable handling, center mark, and a durable sheath.", pro: "Balanced for outdoor sport and light alpine use", con: "Costs more than non-dry models" },
        { rank: "Best Value", type: "value", model: "Mammut 9.5 Crag We Care Classic 60 m", price: "$180–230", summary: "Strong handling and familiar construction with a lower entry price.", pro: "Quality first rope without the premium markup", con: "Lowest-priced version may not be fully dry treated" },
        { rank: "Solid Alternative", type: "alternative", model: "Sterling VR9 / IonR or BD 9.9 Sport", price: "$190–280", summary: "Durable, confidence-inspiring choices with slightly different diameters and treatments.", pro: "Thicker options can feel easier to belay on", con: "Potentially heavier for long approaches" }
      ]
    },
    {
      id: "quickdraws", title: "12 quickdraws", description: "A useful single-pitch set with mixed sling lengths.", note: "Aim for 6–8 short draws around 12 cm and 4–6 longer draws around 17–18 cm to help manage rope drag.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Petzl Spirit Express", price: "$28–36 each", summary: "Excellent clipping feel, keylock gates, durable dogbones, and multiple lengths.", pro: "Smooth handling and easy-to-grab sling", con: "Highest price of this group" },
        { rank: "Best Value", type: "value", model: "Black Diamond HotWire / HotForge Hybrid", price: "$18–27 each", summary: "A practical balance of price, handling, and long-term utility.", pro: "Good starter packs and proven performance", con: "Basic HotWire gates can snag more than keylocks" },
        { rank: "Solid Alternative", type: "alternative", model: "CAMP Orbit / Cypher Firefly II", price: "$15–22 each", summary: "Light, certified options that keep the 12-draw total manageable.", pro: "Affordable way to complete a full set", con: "Thinner dogbones feel less supportive when grabbing" }
      ]
    },
    {
      id: "steel-lockers", title: "2 steel locking carabiners", description: "Dedicated, wear-resistant hardware for anchor duty.", note: "Steel is heavy but resists wear at high-friction master points. Keep a suitable aluminum HMS locker for your primary belay setup.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Metolius Steel Auto-Lock / Screw-Lock", price: "$25–40 each", summary: "Very high strength and excellent longevity at frequently used anchor points.", pro: "Maximum wear resistance", con: "Roughly 200 g each" },
        { rank: "Best Value", type: "value", model: "Edelrid HMS Bulletproof", price: "$30–40", summary: "An aluminum body with a steel wear insert for lower weight.", pro: "Versatile hybrid for belay and anchor use", con: "Steel protection is limited to the wear zone" },
        { rank: "Solid Alternative", type: "alternative", model: "Reputable steel screw-lock HMS", price: "$20–35", summary: "A simple, widely available option from established climbing brands.", pro: "Straightforward strength and durability", con: "Gate shape and handling vary by model" }
      ]
    },
    {
      id: "pas", title: "Extra slings or a PAS", description: "Connection and extension options for cleaning and anchors.", note: "A PAS and a sling are not interchangeable in every system. Get qualified instruction before cleaning anchors or weighting a personal tether.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Petzl Connect Adjust", price: "$80–100", summary: "Dynamic rope construction with easy one-hand length adjustment.", pro: "Simple continuous adjustment", con: "Most expensive option" },
        { rank: "Best Value", type: "value", model: "Metolius PAS 22 / Dynamic PAS", price: "$40–70", summary: "A clear looped system with multiple clipping positions.", pro: "Beginner-friendly organization", con: "Loop lengths are fixed; models differ in material" },
        { rank: "Solid Alternative", type: "alternative", model: "60 cm + 120 cm sewn slings", price: "$25–50 total", summary: "Multi-use slings that complement the 120 cm sling you already own.", pro: "Versatile and compact", con: "Static material and length changes require sound technique" }
      ]
    },
    {
      id: "rope-bag", title: "Rope bag / tarp", description: "Protection and organization for your most important soft good.", note: "Choose a tarp large enough for your full rope and a carry style that matches your usual approach distance.",
      options: [
        { rank: "Best Overall", type: "overall", model: "DMM Classic / Petzl Kliff", price: "$70–100", summary: "Durable carry systems with useful tarps and comfortable straps.", pro: "Better on longer approaches", con: "Higher price and more bulk" },
        { rank: "Best Value", type: "value", model: "Metolius Ropemaster HC / Dirt Bag II", price: "$35–50", summary: "A proven, simple format with a roomy tarp and durable construction.", pro: "Practical everyday crag option", con: "Basic carry system" },
        { rank: "Solid Alternative", type: "alternative", model: "Metolius rope tarp / basic rope bag", price: "$20–35", summary: "The simplest way to keep rope off dirt and grit.", pro: "Low-cost protection", con: "Minimal structure and organization" }
      ]
    },
    {
      id: "aluminum-lockers", title: "2–3 aluminum HMS carabiners", description: "Versatile lockers for belay, anchors, and backups.", note: "Keep at least one compatible, dedicated HMS locking carabiner paired with the Reverso and follow Petzl's orientation guidance.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Petzl Attache Screw-Lock", price: "$22–28 each", summary: "Versatile pear shape, good gate clearance, and a visible lock indicator.", pro: "Excellent all-round HMS locker", con: "Screw gates can be overtightened" },
        { rank: "Best Value", type: "value", model: "Black Diamond RockLock / HotForge Screwgate", price: "$15–25", summary: "Dependable workhorse lockers with useful shapes and approachable pricing.", pro: "Strong price-to-utility ratio", con: "Slightly heavier or less refined" },
        { rank: "Solid Alternative", type: "alternative", model: "CAMP Photon Lock / DMM Phantom", price: "$12–20", summary: "Compact lockers that reduce rack weight for backup and anchor duty.", pro: "Light and easy to rack", con: "Smaller gate openings" }
      ]
    },
    {
      id: "pack", title: "Climbing pack", description: "A focused carry system for the approach and the route.", note: "The workbook suggests 20–35 L. An 18 L pack works for compact multi-pitch loads; choose 24–32 L if it must also carry the rope and layers.",
      options: [
        { rank: "Best Overall", type: "overall", model: "Osprey Mutant 22", price: "about $140", summary: "Close-fitting alpine pack with rope carry, tool attachments, and a streamlined profile.", pro: "Purpose-built for climbing movement", con: "Minimal space for a large crag load" },
        { rank: "Best Value", type: "value", model: "Petzl BUG 18", price: "about $110", summary: "Compact multi-pitch pack with rope carry and a removable helmet holder.", pro: "Useful on-route features at a fair price", con: "Below the workbook’s 20 L lower target" },
        { rank: "Solid Alternative", type: "alternative", model: "Black Diamond Street Creek 24", price: "about $150", summary: "Durable 24 L crag pack with a practical urban-to-cliff format.", pro: "Good size for day climbing", con: "Less alpine-focused than the Mutant" }
      ]
    },
    {
      id: "approach-shoes", title: "Approach shoes", description: "Grip, support, and durability for rough crag access.", note: "Fit matters more than rankings. Try shoes with the socks you will use and prioritize stable heel hold, secure lacing, and comfort on descents.",
      options: [
        { rank: "Best Overall", type: "overall", model: "La Sportiva TX4 Evo", price: "about $189", summary: "Stable leather approach shoe with Vibram Megagrip and a durable climbing zone.", pro: "Strong mix of grip, support, and durability", con: "Costs more and runs technical in fit" },
        { rank: "Best Value", type: "value", model: "SCARPA Crux 2", price: "about $159", summary: "Versatile crag-to-summit shoe with a Megagrip outsole and approachable price.", pro: "Balanced daily approach option", con: "Leather needs a little break-in" },
        { rank: "Solid Alternative", type: "alternative", model: "Black Diamond Prime", price: "about $140", summary: "A leather approach shoe with sticky rubber and a casual, comfortable shape.", pro: "Comfortable value for crag days", con: "Less supportive for long, loaded approaches" }
      ]
    }
  ];

  const LATER_ITEMS = [
    { key: "later-first-aid", name: "Climbing tape + small first-aid kit", category: "Safety", price: 30 },
    { key: "later-brush", name: "Hold brush", category: "Accessories", price: 12 },
    { key: "later-gloves", name: "Belay gloves", category: "Soft goods", price: 35 },
    { key: "later-headlamp", name: "Headlamp with helmet clips", category: "Safety", price: 50 },
    { key: "later-stickclip", name: "Stick clip", category: "Protection", price: 75 },
    { key: "later-guide", name: "Guidebook / offline route app", category: "Accessories", price: 40 }
  ];

  const els = {
    haveList: document.querySelector("#haveList"), needList: document.querySelector("#needList"),
    haveCount: document.querySelector("#haveCount"), needCount: document.querySelector("#needCount"),
    headerHaveCount: document.querySelector("#headerHaveCount"), headerNeedCount: document.querySelector("#headerNeedCount"), headerCost: document.querySelector("#headerCost"),
    haveTabCount: document.querySelector("#haveTabCount"), needTabCount: document.querySelector("#needTabCount"), heroProgress: document.querySelector("#heroProgress"),
    priorityList: document.querySelector("#priorityList"), totalCost: document.querySelector("#totalCost"), coreCost: document.querySelector("#coreCost"), customCost: document.querySelector("#customCost"), budgetMeterFill: document.querySelector("#budgetMeterFill"), nextBuyCallout: document.querySelector("#nextBuyCallout"),
    recommendations: document.querySelector("#recommendations"), laterGrid: document.querySelector("#laterGrid"), gearBoard: document.querySelector(".gear-board"),
    itemDialog: document.querySelector("#itemDialog"), itemForm: document.querySelector("#itemForm"), itemId: document.querySelector("#itemId"), itemName: document.querySelector("#itemName"), itemCategory: document.querySelector("#itemCategory"), itemQuantity: document.querySelector("#itemQuantity"), itemPrice: document.querySelector("#itemPrice"), itemNotes: document.querySelector("#itemNotes"), notesCount: document.querySelector("#notesCount"), dialogTitle: document.querySelector("#dialogTitle"), dialogEyebrow: document.querySelector("#dialogEyebrow"), saveButton: document.querySelector("#saveButton"), nameError: document.querySelector("#nameError"),
    confirmDialog: document.querySelector("#confirmDialog"), toast: document.querySelector("#toast"), toastMessage: document.querySelector("#toastMessage"), toastAction: document.querySelector("#toastAction")
  };

  let items = loadItems();
  let deletedItem = null;
  let toastTimer = null;

  function cloneDefaults() { return DEFAULT_GEAR.map(item => ({ ...item })); }
  function loadItems() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.every(item => item && item.id && (item.status === "have" || item.status === "need"))) return saved;
    } catch (error) { console.warn("Could not read saved gear list", error); }
    return cloneDefaults();
  }
  function saveItems() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch (error) { showToast("Your browser could not save this change."); console.warn(error); }
  }
  function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0); }
  function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[char]); }
  function icon(name) {
    const icons = {
      check: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
      arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"/></svg>',
      edit: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m4 16-.7 4.7L8 20l11-11-4-4L4 16Zm9-9 4 4"/></svg>',
      trash: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
      plus: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
      down: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>'
    };
    return icons[name] || "";
  }

  function sortItems(list) {
    return [...list].sort((a, b) => {
      const aPriority = Number.isFinite(a.priority) ? a.priority : 999;
      const bPriority = Number.isFinite(b.priority) ? b.priority : 999;
      return aPriority - bPriority || a.name.localeCompare(b.name);
    });
  }

  function itemCard(item) {
    const isHave = item.status === "have";
    const moveLabel = isHave ? "Move to Need to Buy" : "Mark as Already Have";
    const moveIcon = isHave ? icon("arrow") : icon("check");
    const priceMeta = !isHave && Number(item.price) > 0 ? `<span>${money(item.price)} est.</span>` : "";
    const categoryMeta = item.category ? `<span>${escapeHtml(item.category)}</span>` : "";
    const quantity = Number(item.quantity) > 1 ? `<span class="quantity-pill">×${Number(item.quantity)}</span>` : "";
    const customActions = item.custom ? `<div class="item-actions"><button class="mini-action" data-action="edit" data-id="${item.id}" type="button" aria-label="Edit ${escapeHtml(item.name)}" title="Edit">${icon("edit")}</button><button class="mini-action delete" data-action="delete" data-id="${item.id}" type="button" aria-label="Delete ${escapeHtml(item.name)}" title="Delete">${icon("trash")}</button></div>` : "";
    const priority = item.priority && !isHave ? `<span class="priority-badge">Priority ${item.priority}</span>` : "";
    return `<article class="gear-item">${priority}<button class="item-status-button" data-action="move" data-id="${item.id}" type="button" aria-label="${moveLabel}: ${escapeHtml(item.name)}" title="${moveLabel}">${moveIcon}</button><div class="gear-item-main"><div class="gear-item-title"><h4>${escapeHtml(item.name)}</h4>${quantity}</div><div class="gear-item-meta">${categoryMeta}${priceMeta}</div>${item.notes ? `<p class="gear-item-note" title="${escapeHtml(item.notes)}">${escapeHtml(item.notes)}</p>` : ""}</div>${customActions}</article>`;
  }

  function emptyState(status) {
    const isHave = status === "have";
    return `<div class="empty-state"><div><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16v13H4zM8 7V4h8v3"/></svg><p>${isHave ? "Nothing marked as ready yet." : "Your shopping list is clear."}</p><button type="button" data-empty-add>${isHave ? "Add something you own" : "Add an item"}</button></div></div>`;
  }

  function renderTracker() {
    const have = sortItems(items.filter(item => item.status === "have"));
    const need = sortItems(items.filter(item => item.status === "need"));
    els.haveList.innerHTML = have.length ? have.map(itemCard).join("") : emptyState("have");
    els.needList.innerHTML = need.length ? need.map(itemCard).join("") : emptyState("need");
    [els.haveCount, els.headerHaveCount, els.haveTabCount].forEach(el => el.textContent = have.length);
    [els.needCount, els.headerNeedCount, els.needTabCount].forEach(el => el.textContent = need.length);

    const total = need.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    els.headerCost.textContent = money(total);
    const trackable = items.filter(item => item.source === "recommended" || item.source === "starter");
    const ready = trackable.filter(item => item.status === "have").length;
    const progress = trackable.length ? Math.round((ready / trackable.length) * 100) : 0;
    els.heroProgress.textContent = `${progress}% equipped`;
  }

  function renderPriorities() {
    const priorityItems = DEFAULT_GEAR.filter(item => item.priority).sort((a, b) => a.priority - b.priority);
    const currentById = new Map(items.map(item => [item.id, item]));
    const next = priorityItems.find(item => currentById.get(item.id)?.status !== "have");
    els.priorityList.innerHTML = priorityItems.map(base => {
      const current = currentById.get(base.id);
      const complete = current?.status === "have";
      const missing = !current;
      const isNext = next?.id === base.id;
      const state = complete ? "Ready" : missing ? "Not in list" : isNext ? "Buy next" : "Planned";
      return `<li class="priority-item${complete ? " is-complete" : ""}${isNext ? " is-next" : ""}"><span class="priority-number">${complete ? "✓" : base.priority}</span><div><h3>${escapeHtml(base.name)}</h3><p>${escapeHtml(base.notes)}</p></div><div class="priority-state"><strong>${state}</strong><small>${money(current?.price ?? base.price)} est.</small></div></li>`;
    }).join("");

    const need = items.filter(item => item.status === "need");
    const coreCost = need.filter(item => item.source === "recommended").reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const customCost = need.filter(item => item.source !== "recommended").reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const total = coreCost + customCost;
    const baseline = DEFAULT_GEAR.filter(item => item.status === "need").reduce((sum, item) => sum + item.price, 0);
    els.totalCost.textContent = money(total);
    els.coreCost.textContent = money(coreCost);
    els.customCost.textContent = money(customCost);
    els.budgetMeterFill.style.width = `${Math.min(100, baseline ? (total / baseline) * 100 : 0)}%`;
    els.nextBuyCallout.innerHTML = next ? `<strong>Next up: ${escapeHtml(next.name)}</strong>Plan around ${money(currentById.get(next.id)?.price ?? next.price)} for this priority.` : "<strong>Core kit complete</strong>Everything in the eight-item priority list is marked ready.";
  }

  function renderRecommendations() {
    els.recommendations.innerHTML = RECOMMENDATIONS.map((rec, index) => {
      const linked = items.find(item => item.recommendationId === rec.id);
      const status = linked?.status === "have" ? "have" : "need";
      const statusText = linked?.status === "have" ? "Already have" : linked ? "In shopping list" : "Not in list";
      const options = rec.options.map(option => `<article class="option-card ${option.type}"><div class="option-top"><span class="option-rank">${option.rank}</span><span class="option-price">${option.price}</span></div><h4>${escapeHtml(option.model)}</h4><p>${escapeHtml(option.summary)}</p><div class="pros-cons"><span class="pro">${escapeHtml(option.pro)}</span><span class="con">${escapeHtml(option.con)}</span></div></article>`).join("");
      return `<details class="recommendation"${index === 0 ? " open" : ""}><summary><span class="recommendation-index">${String(index + 1).padStart(2, "0")}</span><span class="recommendation-title"><h3>${escapeHtml(rec.title)}</h3><p>${escapeHtml(rec.description)}</p></span><span class="recommendation-status ${status}">${statusText}</span><span class="chevron">${icon("down")}</span></summary><div class="recommendation-body"><div class="option-grid">${options}</div><p class="recommendation-note">${escapeHtml(rec.note)}</p></div></details>`;
    }).join("");
  }

  function renderLaterItems() {
    els.laterGrid.innerHTML = LATER_ITEMS.map(item => {
      const added = items.some(existing => existing.laterKey === item.key);
      return `<div class="later-item"><span>${escapeHtml(item.name)}<small>${money(item.price)} planning estimate</small></span><button type="button" data-add-later="${item.key}" ${added ? "disabled" : ""} aria-label="${added ? "Added" : "Add to plan"}: ${escapeHtml(item.name)}" title="${added ? "Already in your plan" : "Add to Need to Buy"}">${added ? icon("check") : icon("plus")}</button></div>`;
    }).join("");
  }

  function renderAll() {
    renderTracker();
    renderPriorities();
    renderRecommendations();
    renderLaterItems();
  }

  function moveItem(id) {
    const item = items.find(entry => entry.id === id);
    if (!item) return;
    item.status = item.status === "have" ? "need" : "have";
    saveItems(); renderAll();
    showToast(item.status === "have" ? `Marked “${item.name}” as ready.` : `Moved “${item.name}” to your shopping list.`);
  }

  function deleteItem(id) {
    const index = items.findIndex(entry => entry.id === id && entry.custom);
    if (index < 0) return;
    deletedItem = { item: items[index], index };
    items.splice(index, 1);
    saveItems(); renderAll();
    showToast(`Deleted “${deletedItem.item.name}”.`, "Undo", () => {
      if (!deletedItem) return;
      items.splice(deletedItem.index, 0, deletedItem.item);
      saveItems(); renderAll();
      deletedItem = null;
      showToast("Item restored.");
    });
  }

  function openItemDialog(item = null, defaultStatus = "need") {
    els.itemForm.reset();
    els.itemId.value = item?.id || "";
    els.itemName.value = item?.name || "";
    els.itemCategory.value = item?.category || "";
    els.itemQuantity.value = item?.quantity || 1;
    els.itemPrice.value = Number(item?.price) > 0 ? item.price : "";
    els.itemNotes.value = item?.notes || "";
    const status = item?.status || defaultStatus;
    document.querySelector(`#status${status === "have" ? "Have" : "Need"}`).checked = true;
    els.dialogTitle.textContent = item ? "Edit item" : "Add an item";
    els.dialogEyebrow.textContent = item ? "Update your gear" : "Personal gear";
    els.saveButton.textContent = item ? "Save changes" : "Add item";
    els.notesCount.textContent = els.itemNotes.value.length;
    els.nameError.textContent = "";
    els.itemName.classList.remove("is-invalid");
    els.itemDialog.showModal();
    window.setTimeout(() => els.itemName.focus(), 50);
  }

  function closeItemDialog() { els.itemDialog.close(); }

  function handleFormSubmit(event) {
    event.preventDefault();
    const name = els.itemName.value.trim();
    if (!name) {
      els.nameError.textContent = "Add a name so you can recognize this item.";
      els.itemName.classList.add("is-invalid");
      els.itemName.focus();
      return;
    }
    const payload = {
      name,
      category: els.itemCategory.value,
      quantity: Math.max(1, Math.min(99, Number(els.itemQuantity.value) || 1)),
      price: Math.max(0, Number(els.itemPrice.value) || 0),
      notes: els.itemNotes.value.trim(),
      status: new FormData(els.itemForm).get("status") === "have" ? "have" : "need"
    };
    const id = els.itemId.value;
    if (id) {
      const index = items.findIndex(item => item.id === id && item.custom);
      if (index >= 0) items[index] = { ...items[index], ...payload };
      showToast(`Updated “${name}”.`);
    } else {
      items.push({ id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...payload, source: "custom", custom: true });
      showToast(`Added “${name}” to your plan.`);
    }
    saveItems(); renderAll(); closeItemDialog();
  }

  function addLaterItem(key) {
    const later = LATER_ITEMS.find(item => item.key === key);
    if (!later || items.some(item => item.laterKey === key)) return;
    items.push({ id: `custom-${Date.now()}-${key}`, laterKey: key, name: later.name, category: later.category, quantity: 1, notes: "Optional addition from the nice-to-have list.", price: later.price, status: "need", source: "later", custom: true });
    saveItems(); renderAll(); showToast(`Added “${later.name}” to your shopping list.`);
  }

  function showToast(message, actionLabel = "", action = null) {
    window.clearTimeout(toastTimer);
    els.toastMessage.textContent = message;
    els.toastAction.hidden = !actionLabel;
    els.toastAction.textContent = actionLabel;
    els.toastAction.onclick = action || null;
    els.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), actionLabel ? 6000 : 3200);
  }

  document.addEventListener("click", event => {
    const open = event.target.closest("[data-open-item-dialog]");
    if (open) { openItemDialog(); return; }
    const emptyAdd = event.target.closest("[data-empty-add]");
    if (emptyAdd) { openItemDialog(null, emptyAdd.closest("#haveList") ? "have" : "need"); return; }
    const action = event.target.closest("[data-action]");
    if (action) {
      const id = action.dataset.id;
      if (action.dataset.action === "move") moveItem(id);
      if (action.dataset.action === "edit") openItemDialog(items.find(item => item.id === id));
      if (action.dataset.action === "delete") deleteItem(id);
      return;
    }
    const later = event.target.closest("[data-add-later]");
    if (later) addLaterItem(later.dataset.addLater);
  });

  document.querySelectorAll("[data-list-tab]").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll("[data-list-tab]").forEach(other => { const active = other === tab; other.classList.toggle("is-active", active); other.setAttribute("aria-selected", String(active)); });
    els.gearBoard.dataset.activeList = tab.dataset.listTab;
  }));

  document.querySelector("#dialogClose").addEventListener("click", closeItemDialog);
  document.querySelector("#cancelButton").addEventListener("click", closeItemDialog);
  els.itemForm.addEventListener("submit", handleFormSubmit);
  els.itemName.addEventListener("input", () => { els.nameError.textContent = ""; els.itemName.classList.remove("is-invalid"); });
  els.itemNotes.addEventListener("input", () => els.notesCount.textContent = els.itemNotes.value.length);
  els.itemDialog.addEventListener("click", event => { if (event.target === els.itemDialog) closeItemDialog(); });

  document.querySelector("#resetButton").addEventListener("click", () => els.confirmDialog.showModal());
  document.querySelector("#cancelReset").addEventListener("click", () => els.confirmDialog.close());
  document.querySelector("#confirmReset").addEventListener("click", () => {
    items = cloneDefaults(); saveItems(); renderAll(); els.confirmDialog.close(); showToast("Your starter shopping list has been restored.");
  });
  els.confirmDialog.addEventListener("click", event => { if (event.target === els.confirmDialog) els.confirmDialog.close(); });
  document.querySelector("#printButton").addEventListener("click", () => window.print());

  const themeToggle = document.querySelector("#themeToggle");
  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  if (initialTheme === "dark") document.documentElement.dataset.theme = "dark";
  function updateThemeLabel() { themeToggle.setAttribute("aria-label", document.documentElement.dataset.theme === "dark" ? "Use light theme" : "Use dark theme"); }
  updateThemeLabel();
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    if (next === "dark") document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
    localStorage.setItem(THEME_KEY, next); updateThemeLabel();
  });

  renderAll();
})();
