import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, index = 0 }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div
      className={`task-card glass-card animate-slide-up stagger-${Math.min(index + 1, 5)}`}
      style={{ opacity: 0 }}
    >
      <div className="task-card-header">
        <div className="task-card-badges">
          <span className={`badge badge-${task.status}`}>
            {task.status === 'pending' && '⏳'} 
            {task.status === 'in-progress' && '🔄'} 
            {task.status === 'completed' && '✅'} 
            {task.status}
          </span>
          <span className={`badge badge-${task.priority}`}>
            {task.priority === 'high' && '🔴'}
            {task.priority === 'medium' && '🟡'}
            {task.priority === 'low' && '🟢'}
            {' '}{task.priority}
          </span>
        </div>
        <div className="task-card-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(task)}
            id={`edit-task-${task._id}`}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task._id)}
            id={`delete-task-${task._id}`}
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="task-card-title">{task.title}</h3>

      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      <div className="task-card-footer">
        {task.dueDate && (
          <span className={`task-card-date ${isOverdue ? 'overdue' : ''}`}>
            📅 {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}
          </span>
        )}
        {task.user && (
          <span className="task-card-owner">
            👤 {task.user.name || 'Unknown'}
          </span>
        )}
        <span className="task-card-time">
          {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
