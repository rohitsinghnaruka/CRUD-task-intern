import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { taskAPI } from '../api/index.js';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from '../components/TaskForm.jsx';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      params.page = filters.page;
      params.limit = filters.limit;

      const res = await taskAPI.getAll(params);
      setTasks(res.data.data.tasks);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (data) => {
    try {
      await taskAPI.create(data);
      toast.success('Task created! ✨');
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create task';
      toast.error(msg);
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await taskAPI.update(editingTask._id, data);
      toast.success('Task updated! ✅');
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update task';
      toast.error(msg);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.delete(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete task';
      toast.error(msg);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // Stats
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header animate-fade-in">
          <div>
            <h1 className="dashboard-title">
              Hello, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="dashboard-subtitle">
              {isAdmin ? 'Viewing all tasks across the platform' : 'Here are your tasks for today'}
            </p>
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowForm(true)}
            id="new-task-btn"
          >
            ＋ New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats animate-fade-in">
          <div className="stat-card glass-card">
            <div className="stat-value">{pagination?.total || tasks.length}</div>
            <div className="stat-label">Total Tasks</div>
            <div className="stat-icon">📋</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value stat-pending">{pendingCount}</div>
            <div className="stat-label">Pending</div>
            <div className="stat-icon">⏳</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value stat-progress">{inProgressCount}</div>
            <div className="stat-label">In Progress</div>
            <div className="stat-icon">🔄</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value stat-completed">{completedCount}</div>
            <div className="stat-label">Completed</div>
            <div className="stat-icon">✅</div>
          </div>
        </div>

        {/* Filters */}
        <div className="dashboard-filters glass-card animate-fade-in">
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              id="filter-status"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Priority</label>
            <select
              className="form-select"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              id="filter-priority"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {(filters.status || filters.priority) && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setFilters({ status: '', priority: '', page: 1, limit: 10 })}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="dashboard-tasks">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="empty-state-icon">📝</div>
              <h3 className="empty-state-title">No tasks yet</h3>
              <p className="empty-state-desc">
                Create your first task to get started. Click the "New Task" button above.
              </p>
            </div>
          ) : (
            <>
              {tasks.map((task, i) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={i}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTask}
                />
              ))}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="dashboard-pagination">
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                  >
                    ← Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={!pagination.hasNextPage}
                    onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Task Form Modal */}
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
