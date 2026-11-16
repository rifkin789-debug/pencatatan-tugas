import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import './App.css'

const emptyTask = {
  title: '',
  description: '',
  due_date: '',
  priority: 'sedang',
}

const priorityLabels = {
  rendah: 'Rendah',
  sedang: 'Sedang',
  tinggi: 'Tinggi',
}

function getTasks() {
  return supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true })
    .order('created_at', { ascending: false })
}

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('semua')
  const [form, setForm] = useState(emptyTask)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = useCallback(async () => {
    if (!isSupabaseConfigured) return

    const { data, error: queryError } = await getTasks()

    if (queryError) {
      setError(queryError.message)
    } else {
      setTasks(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined

    let active = true
    getTasks().then(({ data, error: queryError }) => {
      if (!active) return
      if (queryError) setError(queryError.message)
      else setTasks(data)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'belum') return !task.is_done
    if (filter === 'selesai') return task.is_done
    return true
  })

  function resetForm() {
    setForm(emptyTask)
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isSupabaseConfigured) return

    setSaving(true)
    setError('')
    const taskData = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      due_date: form.due_date,
      priority: form.priority,
    }
    const result = editingId
      ? await supabase.from('tasks').update(taskData).eq('id', editingId)
      : await supabase.from('tasks').insert(taskData)

    if (result.error) {
      setError(result.error.message)
    } else {
      resetForm()
      await loadTasks()
    }
    setSaving(false)
  }

  async function toggleTask(task) {
    const { error: updateError } = await supabase
      .from('tasks')
      .update({ is_done: !task.is_done })
      .eq('id', task.id)

    if (updateError) setError(updateError.message)
    else await loadTasks()
  }

  async function deleteTask(task) {
    if (!window.confirm(`Hapus tugas "${task.title}"?`)) return

    const { error: deleteError } = await supabase
      .from('tasks')
      .delete()
      .eq('id', task.id)

    if (deleteError) setError(deleteError.message)
    else await loadTasks()
  }

  function editTask(task) {
    setEditingId(task.id)
    setForm({
      title: task.title,
      description: task.description || '',
      due_date: task.due_date,
      priority: task.priority,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">T</div>
        <div>
          <p className="eyebrow">RUANG KERJA</p>
          <h1>Pencatatan Tugas</h1>
          <p className="subtitle">Semua tugasmu, lebih tertata.</p>
        </div>
      </header>

      {!isSupabaseConfigured ? (
        <section className="setup-notice" aria-labelledby="setup-title">
          <span className="notice-icon" aria-hidden="true">i</span>
          <div>
            <h2 id="setup-title">Hubungkan project Supabase</h2>
            <p>
              Aplikasi siap dijalankan. Tambahkan URL project dan publishable
              key Supabase di file <code>.env</code>, lalu jalankan migrasi SQL
              yang tersedia di <code>supabase/migrations</code>.
            </p>
            <p className="setup-env">
              VITE_SUPABASE_URL=https://project-id.supabase.co<br />
              VITE_SUPABASE_ANON_KEY=sb_publishable_...
            </p>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">
              Buka Supabase Dashboard
            </a>
          </div>
        </section>
      ) : (
        <>
          <section className="task-form-card" aria-labelledby="form-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{editingId ? 'PERBARUI' : 'MULAI DARI SINI'}</p>
                <h2 id="form-title">{editingId ? 'Edit tugas' : 'Tambah tugas baru'}</h2>
              </div>
              {editingId && (
                <button className="text-button" type="button" onClick={resetForm}>
                  Batal
                </button>
              )}
            </div>
            <form className="task-form" onSubmit={handleSubmit}>
              <label className="field field-title">
                Judul tugas
                <input
                  autoComplete="off"
                  maxLength={160}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="Contoh: Selesaikan laporan praktikum"
                  required
                  value={form.title}
                />
              </label>
              <label className="field">
                Tenggat
                <input
                  onChange={(event) => setForm({ ...form, due_date: event.target.value })}
                  required
                  type="date"
                  value={form.due_date}
                />
              </label>
              <label className="field">
                Prioritas
                <select
                  onChange={(event) => setForm({ ...form, priority: event.target.value })}
                  value={form.priority}
                >
                  <option value="rendah">Rendah</option>
                  <option value="sedang">Sedang</option>
                  <option value="tinggi">Tinggi</option>
                </select>
              </label>
              <label className="field field-description">
                Deskripsi <span>(opsional)</span>
                <textarea
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Catatan singkat tentang tugas ini"
                  rows="2"
                  value={form.description}
                />
              </label>
              <button className="primary-button" disabled={saving} type="submit">
                {saving ? 'Menyimpan...' : editingId ? 'Simpan perubahan' : '+ Tambah tugas'}
              </button>
            </form>
          </section>

          <section className="task-section" aria-labelledby="tasks-title">
            <div className="section-heading list-heading">
              <div>
                <p className="eyebrow">DAFTAR KAMU</p>
                <h2 id="tasks-title">Tugas mendatang</h2>
              </div>
              <span className="task-count">{tasks.filter((task) => !task.is_done).length} belum selesai</span>
            </div>
            <nav className="filter-bar" aria-label="Filter tugas">
              {[
                ['semua', 'Semua'],
                ['belum', 'Belum selesai'],
                ['selesai', 'Selesai'],
              ].map(([value, label]) => (
                <button
                  aria-pressed={filter === value}
                  className={filter === value ? 'filter-button active' : 'filter-button'}
                  key={value}
                  onClick={() => setFilter(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </nav>

            {error && <p className="error-message" role="alert">{error}</p>}
            {loading ? (
              <p className="empty-state">Memuat daftar tugas...</p>
            ) : visibleTasks.length === 0 ? (
              <p className="empty-state">Belum ada tugas di kategori ini.</p>
            ) : (
              <ul className="task-list">
                {visibleTasks.map((task) => (
                  <li className={task.is_done ? 'task-item completed' : 'task-item'} key={task.id}>
                    <button
                      aria-label={task.is_done ? `Tandai ${task.title} belum selesai` : `Tandai ${task.title} selesai`}
                      className="task-check"
                      onClick={() => toggleTask(task)}
                      type="button"
                    >
                      {task.is_done ? '✓' : ''}
                    </button>
                    <div className="task-content">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      <div className="task-meta">
                        <time dateTime={task.due_date}>
                          Tenggat {new Date(`${task.due_date}T00:00:00`).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                        <span className={`priority priority-${task.priority}`}>
                          {priorityLabels[task.priority]}
                        </span>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button aria-label={`Edit ${task.title}`} onClick={() => editTask(task)} type="button">Edit</button>
                      <button aria-label={`Hapus ${task.title}`} onClick={() => deleteTask(task)} type="button">Hapus</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      <footer className="page-footer">Pencatatan Tugas <span>·</span> Fokus satu per satu.</footer>
    </main>
  )
}

export default App
