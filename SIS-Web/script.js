// ===== Shared Header =====
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// ===== STUDENTS =====
async function loadStudents() {
  const res = await fetch('backend/get_students.php');
  const data = await res.json();
  const tbody = document.querySelector('#studentTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.student_id}</td>
      <td>${s.student_number}</td>
      <td>${s.first_name} ${s.last_name}</td>
      <td>${s.gender}</td>
      <td>${s.email || ''}</td>
      <td>
        <button onclick="editStudent(${s.student_id})">Edit</button>
        <button onclick="deleteStudent(${s.student_id})">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function filterTable() {
  const q = document.getElementById('search')?.value.toLowerCase();
  document.querySelectorAll('#studentTable tbody tr').forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
}

function editStudent(id) {
  window.location.href = 'edit_student.html?id=' + id;
}

async function deleteStudent(id) {
  if (!confirm('Delete this student?')) return;
  const fd = new FormData();
  fd.append('student_id', id);
  const res = await fetch('backend/delete_student.php', { method: 'POST', body: fd });
  const txt = await res.text();
  if (txt.trim() === 'success') loadStudents(); else alert(txt);
}

// ===== ADD STUDENT =====
const addForm = document.getElementById('addStudentForm');
if (addForm) {
  addForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch('backend/add_student.php', { method: 'POST', body: fd });
    const txt = await res.text();
    if (txt.trim() === 'success') {
      alert('Student added successfully!');
      window.location.href = 'index.html';
    } else alert(txt);
  });
}

// ===== EDIT STUDENT =====
const editForm = document.getElementById('editStudentForm');
if (editForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');

  async function loadStudent() {
    const fd = new FormData();
    fd.append('student_id', studentId);
    const res = await fetch('backend/get_student.php', { method: 'POST', body: fd });
    const student = await res.json();

    editForm.student_id.value = student.student_id;
    editForm.student_number.value = student.student_number;
    editForm.first_name.value = student.first_name;
    editForm.last_name.value = student.last_name;
    editForm.gender.value = student.gender;
    editForm.birth_date.value = student.birth_date;
    editForm.email.value = student.email;
  }

  editForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(editForm);
    const res = await fetch('backend/update_student.php', { method: 'POST', body: fd });
    const txt = await res.text();
    if (txt.trim() === 'success') {
      alert('Student updated successfully!');
      window.location.href = 'index.html';
    } else alert(txt);
  });

  document.addEventListener('DOMContentLoaded', loadStudent);
}

// ===== SUBJECTS =====
async function loadSubjects() {
  const res = await fetch('backend/get_subjects.php');
  const data = await res.json();
  const tbody = document.querySelector('#subjectTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(sub => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sub.subject_id}</td>
      <td>${sub.subject_code}</td>
      <td>${sub.subject_name}</td>
      <td>${sub.units}</td>
      <td><button onclick="deleteSubject(${sub.subject_id})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteSubject(id) {
  if (!confirm('Delete this subject?')) return;
  const fd = new FormData();
  fd.append('subject_id', id);
  const res = await fetch('backend/delete_subject.php', { method: 'POST', body: fd });
  const txt = await res.text();
  if (txt.trim() === 'success') loadSubjects(); else alert(txt);
}

// ===== ADD SUBJECT =====
const addSubjectForm = document.getElementById('addSubjectForm');
if (addSubjectForm) {
  addSubjectForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch('backend/add_subject.php', { method: 'POST', body: fd });
    const txt = await res.text();
    if (txt.trim() === 'success') {
      alert('Subject added successfully!');
      e.target.reset();
      loadSubjects();
    } else alert(txt);
  });
}

// ===== ENROLLMENTS =====
async function loadEnrollments() {
  const res = await fetch('backend/get_enrollments.php');
  const data = await res.json();
  const tbody = document.querySelector('#enrollmentTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach(e => {
    tbody.innerHTML += `
      <tr>
        <td>${e.first_name} ${e.last_name}</td>
        <td>${e.subject_code}</td>
        <td>${e.subject_name}</td>
        <td>
          <input 
            type="number" 
            value="${e.grade || ''}" 
            class="grade-input"
            data-id="${e.enrollment_id}" 
            ${e.grade ? "readonly style='background:#e6e6e6;cursor:not-allowed;'" : ""}
            onkeyup="updateGrade(this)"
          >
        </td>
        <td><button onclick="deleteEnrollment(${e.enrollment_id})">Delete</button></td>
      </tr>`;
  });
}

async function deleteEnrollment(id) {
  if (!confirm('Delete this enrollment?')) return;
  const fd = new FormData();
  fd.append('enrollment_id', id);
  const res = await fetch('backend/delete_enrollment.php', { method: 'POST', body: fd });
  const txt = await res.text();
  if (txt.trim() === 'success') loadEnrollments(); else alert(txt);
}

async function updateGrade(input) {
  const enrollmentId = input.getAttribute("data-id");
  const grade = input.value.trim();
  if (grade === "") return;

  const fd = new FormData();
  fd.append("enrollment_id", enrollmentId);
  fd.append("grade", grade);

  const res = await fetch("backend/update_enrollment.php", {
    method: "POST",
    body: fd
  });

  const result = await res.text();

  if (result.trim() === "locked") {
    alert("❌ Grade already submitted and cannot be changed.");
    loadEnrollments();
  } 
  else if (result.trim() === "success") {
    alert("✔ Grade submitted and locked.");
    input.setAttribute("readonly", true);
    input.style.background = "#e6e6e6";
    input.style.cursor = "not-allowed";
  }
}

// ===== Populate dropdowns =====
async function loadStudentOptions() {
  const res = await fetch('backend/get_students.php');
  const data = await res.json();
  const select = document.getElementById('studentSelect');
  if (!select) return;
  select.innerHTML = '';
  data.forEach(s => {
    select.innerHTML += `<option value="${s.student_id}">${s.first_name} ${s.last_name}</option>`;
  });
}

async function loadSubjectOptions() {
  const res = await fetch('backend/get_subjects.php');
  const data = await res.json();
  const select = document.getElementById('subjectSelect');
  if (!select) return;
  select.innerHTML = '';
  data.forEach(sub => {
    select.innerHTML += `<option value="${sub.subject_id}">${sub.subject_name}</option>`;
  });
}

const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
  document.addEventListener('DOMContentLoaded', () => {
    loadStudentOptions();
    loadSubjectOptions();

    enrollForm.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(enrollForm);
      const res = await fetch('backend/add_enrollment.php', { method: 'POST', body: fd });
      const txt = await res.text();
      if (txt.trim() === 'success') {
        enrollForm.reset();
        loadEnrollments();
      } else alert(txt);
    });
  });
}

// ===== Load initial data =====
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  loadSubjects();
  loadEnrollments();
});
