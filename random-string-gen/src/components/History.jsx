/**
 * History.jsx — Last 10 strings with stagger CSS animations (no framer-motion).
 */
import { TbTrash, TbCopy, TbHistory } from 'react-icons/tb';

const History = ({ history, onClear }) => (
  <div className="history-card glass-card anim-fade-left" style={{ animationDelay: '0.25s' }}>
    <div className="history-header-row">
      <p className="section-label" style={{ marginBottom: 0 }}>
        <TbHistory size={13} style={{ marginRight: 4 }} />
        History
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="history-count-badge">{history.length}/10</span>
        {history.length > 0 && (
          <button
            className="btn btn-danger"
            style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
            onClick={onClear}
            aria-label="Clear history"
          >
            <TbTrash size={13} /> Clear
          </button>
        )}
      </div>
    </div>

    <div className="history-list" role="list" aria-label="Generated string history">
      {history.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">📋</span>
          No history yet — generate some strings!
        </div>
      ) : (
        history.map((item, idx) => (
          <div
            key={item.id}
            className="history-item"
            role="listitem"
            style={{ animationDelay: `${idx * 0.04}s` }}
          >
            <span className="history-item-num">#{idx + 1}</span>
            <span className="history-item-str" title={item.value}>{item.value}</span>
            <span className="history-item-len">{item.value.length}ch</span>
            <button
              className="history-item-copy"
              aria-label={`Copy string #${idx + 1}`}
              onClick={() => navigator.clipboard.writeText(item.value)}
              title="Copy"
            >
              <TbCopy size={13} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default History;
