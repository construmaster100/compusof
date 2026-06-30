const cycleData = {
  aprender: {
    label: "Aprender",
    title: "Contenido y orientacion inicial",
    text: "El aprendiz accede a guias, recursos, ejemplos y criterios del proyecto para comprender requisitos, contexto productivo y metas de aprendizaje.",
    percent: 64
  },
  reforzar: {
    label: "Reforzar",
    title: "Practica, retroalimentacion y mejora",
    text: "Las actividades de refuerzo permiten ajustar entregables, repetir procesos, resolver retos y cerrar brechas antes de presentar evidencias formales.",
    percent: 78
  },
  evaluar: {
    label: "Evaluar",
    title: "Evidencias y medicion de competencias",
    text: "La evaluacion cuantifica conocimiento, desempeno y producto para validar el avance del aprendiz frente a resultados de aprendizaje y competencias.",
    percent: 86
  }
};

function renderCycle(key) {
  const data = cycleData[key];
  if (!data) return;

  document.querySelectorAll(".cycle-segment").forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.cycle === key);
  });

  const cycleLabel = document.getElementById("cycleLabel");
  const cycleTitle = document.getElementById("cycleTitle");
  const cycleText = document.getElementById("cycleText");
  const cycleBar = document.getElementById("cycleBar");
  const cyclePercent = document.getElementById("cyclePercent");

  if (cycleLabel) cycleLabel.textContent = data.label;
  if (cycleTitle) cycleTitle.textContent = data.title;
  if (cycleText) cycleText.textContent = data.text;
  if (cycleBar) cycleBar.style.setProperty("--value", data.percent + "%");
  if (cyclePercent) cyclePercent.textContent = data.percent + "%";
}

document.querySelectorAll(".cycle-segment").forEach((segment) => {
  segment.addEventListener("click", () => renderCycle(segment.dataset.cycle));
  segment.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") renderCycle(segment.dataset.cycle);
  });
  segment.setAttribute("tabindex", "0");
  segment.setAttribute("role", "button");
});

const caseData = {
  case1: {
    summary: "Diagnostico inicial para reconocer el punto de partida del aprendiz y definir el plan de refuerzo.",
    scores: { Analisis: 42, Diseno: 35, Desarrollo: 30, Pruebas: 25, Comunicacion: 48 }
  },
  case2: {
    summary: "Seguimiento del proyecto durante la construccion, con enfasis en evidencias parciales y mejora continua.",
    scores: { Analisis: 68, Diseno: 62, Desarrollo: 57, Pruebas: 49, Comunicacion: 72 }
  },
  case3: {
    summary: "Revision de evidencia final para validar desempeno integral y cierre de brechas antes de la aprobacion.",
    scores: { Analisis: 88, Diseno: 84, Desarrollo: 81, Pruebas: 76, Comunicacion: 90 }
  }
};

const ids = {
  Analisis: ["barAnalisis", "txtAnalisis"],
  Diseno: ["barDiseno", "txtDiseno"],
  Desarrollo: ["barDesarrollo", "txtDesarrollo"],
  Pruebas: ["barPruebas", "txtPruebas"],
  Comunicacion: ["barComunicacion", "txtComunicacion"]
};

function renderCase(key) {
  const data = caseData[key];
  const caseSummary = document.getElementById("caseSummary");
  if (!data || !caseSummary) return;

  const values = Object.values(data.scores);
  const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

  caseSummary.textContent = data.summary;

  Object.entries(data.scores).forEach(([name, value]) => {
    const [barId, textId] = ids[name];
    const bar = document.getElementById(barId);
    const text = document.getElementById(textId);
    if (bar) bar.style.setProperty("--value", value + "%");
    if (text) text.textContent = value + "%";
  });

  const averageText = document.getElementById("averageText");
  const decisionText = document.getElementById("decisionText");
  if (averageText) averageText.textContent = average + "% de avance general cuantificado.";
  if (decisionText) {
    decisionText.textContent = average >= 80
      ? "Listo para evaluar y certificar evidencias."
      : average >= 55
        ? "Continuar con refuerzo focalizado."
        : "Priorizar actividades de aprendizaje y acompanamiento.";
  }
}

const caseSelect = document.getElementById("caseSelect");
if (caseSelect) {
  caseSelect.addEventListener("change", (event) => renderCase(event.target.value));
  renderCase(caseSelect.value || "case1");
}

if (document.querySelector(".cycle-segment")) {
  renderCycle("aprender");
}

function normalizePhase(phaseText) {
  return phaseText.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .split(" ")[1] || phaseText;
}

function updateApprovalSummary() {
  const rows = Array.from(document.querySelectorAll(".phase-table tbody tr"));
  const total = rows.length;
  let approved = 0;
  let disapproved = 0;
  rows.forEach((row) => {
    const approvedCheckbox = row.querySelector(".approved-checkbox");
    const disapprovedCheckbox = row.querySelector(".row-disapproved-checkbox");
    const isApproved = approvedCheckbox && approvedCheckbox.checked;
    const isDisapproved = disapprovedCheckbox && disapprovedCheckbox.checked;
    
    if (isApproved) {
      approved += 1;
      row.classList.add("row-approved");
      row.classList.remove("row-disapproved");
    } else if (isDisapproved) {
      disapproved += 1;
      row.classList.add("row-disapproved");
      row.classList.remove("row-approved");
    } else {
      row.classList.remove("row-approved");
      row.classList.remove("row-disapproved");
    }
  });
  
  let percent = 0;
  let displayText = "";
  const tableProgressBar = document.getElementById("tableProgressBar");
  const siteProgressBar = document.getElementById("siteProgressBar");
  const tableProgressLabel = document.getElementById("tableProgressLabel");
  const siteProgressLabel = document.getElementById("siteProgressLabel");
  if (!tableProgressBar || !siteProgressBar || !tableProgressLabel || !siteProgressLabel) return;
  
  if (disapproved > 0) {
    percent = total ? Math.round((disapproved / total) * 100) : 0;
    tableProgressBar.classList.add("disapproved");
    tableProgressBar.classList.remove("approved");
    siteProgressBar.classList.add("disapproved");
    siteProgressBar.classList.remove("approved");
    displayText = `${disapproved} no aprobadas de ${total} / ${percent}%`;
  } else if (approved > 0) {
    percent = total ? Math.round((approved / total) * 100) : 0;
    tableProgressBar.classList.add("approved");
    tableProgressBar.classList.remove("disapproved");
    siteProgressBar.classList.add("approved");
    siteProgressBar.classList.remove("disapproved");
    displayText = `${approved} aprobadas de ${total} / ${percent}%`;
  } else {
    tableProgressBar.classList.remove("approved", "disapproved");
    siteProgressBar.classList.remove("approved", "disapproved");
    displayText = `0 aprobadas de ${total} / 0%`;
  }
  
  tableProgressBar.style.width = percent + "%";
  siteProgressBar.style.width = percent + "%";
  tableProgressLabel.textContent = displayText;
  siteProgressLabel.textContent = `Total: ${approved} aprobadas, ${disapproved} no aprobadas de ${total} actividades`;
}

function setPhaseFilter(phase) {
  document.querySelectorAll(".phase-filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.phase === phase);
  });
  document.querySelectorAll(".phase-table tbody tr").forEach((row) => {
    const rowPhase = normalizePhase(row.cells[1].textContent);
    row.style.display = phase === "all" || rowPhase === phase ? "" : "none";
  });
}

function attachRowStatus() {
  const rows = document.querySelectorAll(".phase-table tbody tr");
  rows.forEach((row, index) => {
    const rowNum = index + 1;
    const phaseCell = row.cells[0];
    const phaseText = phaseCell.textContent.toLowerCase();
    
    // Agregar clase de color segÃºn fase
    let colorClass = "row-analisis";
    if (phaseText.includes("planeacion")) colorClass = "row-planeacion";
    else if (phaseText.includes("ejecucion")) colorClass = "row-ejecucion";
    else if (phaseText.includes("evaluacion")) colorClass = "row-evaluacion";
    
    row.classList.add(colorClass);
    
    // Insertar celda de ID al inicio
    const idCell = document.createElement("td");
    idCell.className = "id-cell";
    idCell.textContent = rowNum;
    row.insertBefore(idCell, row.firstChild);
    
    // Agregar status checkbox (Aprobado y No aprobado)
    const statusCell = document.createElement("td");
    statusCell.className = "status-cell";
    statusCell.innerHTML = `
      <label><input type="checkbox" class="row-status-checkbox approved-checkbox"> Aprobado</label>
      <label><input type="checkbox" class="row-disapproved-checkbox"> No aprobado</label>
    `;
    const approvedCheckbox = statusCell.querySelector(".approved-checkbox");
    const disapprovedCheckbox = statusCell.querySelector(".row-disapproved-checkbox");
    
    approvedCheckbox.addEventListener("change", () => {
      if (approvedCheckbox.checked) disapprovedCheckbox.checked = false;
      updateApprovalSummary();
    });
    disapprovedCheckbox.addEventListener("change", () => {
      if (disapprovedCheckbox.checked) approvedCheckbox.checked = false;
      updateApprovalSummary();
    });
    row.appendChild(statusCell);
  });
}

document.querySelectorAll(".phase-filter").forEach((button) => {
  button.addEventListener("click", () => setPhaseFilter(button.dataset.phase));
});

if (document.querySelector(".phase-table")) {
  attachRowStatus();
  setPhaseFilter("all");
  updateApprovalSummary();
}

async function ingresarAVA(event) {
  event.preventDefault();
  
  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();
  const rol = document.getElementById("rol").value;
  
  if (!email || !password || !rol) {
    alert("Por favor completa todos los campos");
    return false;
  }
  
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      alert("Error: " + data.error);
      return false;
    }
    
    // Login exitoso - guardar datos del usuario y redirigir
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = rol;
  } catch (error) {
    alert("Error de conexión: " + error.message);
  }
  
  return false;
}



// Dropdown toggle: keep Servicios open on click and close on outside/Escape
(function() {
  const toggles = document.querySelectorAll('.nav-dropdown-toggle');
  toggles.forEach((btn) => {
    const wrapper = btn.closest('.nav-dropdown');
    if (!wrapper) return;
    const menu = wrapper.querySelector('.dropdown-menu');
    // ensure accessible default
    btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') || 'false');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = wrapper.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // move focus into the menu when opening
      if (isOpen && menu) {
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  });

  // Close any open dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-dropdown')) return;
    document.querySelectorAll('.nav-dropdown.open').forEach((w) => {
      w.classList.remove('open');
      const b = w.querySelector('.nav-dropdown-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.nav-dropdown.open').forEach((w) => {
      w.classList.remove('open');
      const b = w.querySelector('.nav-dropdown-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
})();




