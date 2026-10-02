import { FiArrowDown, FiArrowUp, FiPlus, FiTrash2 } from 'react-icons/fi'

// Repeating cards (audience cards, services...) that can be added,
// removed, and reordered. Every item needs a unique id.
// renderItem(item, setItem) returns the fields for one item.
function ListEditor({
  items,
  onChange,
  createItem,
  itemTitle,
  renderItem,
  addLabel = 'Add item',
  min = 0,
  max = Infinity,
}) {
  const setItem = (id, changes) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...changes } : item)))

  const removeItem = (id) => onChange(items.filter((item) => item.id !== id))

  const moveItem = (index, step) => {
    const next = [...items]
    const [item] = next.splice(index, 1)
    next.splice(index + step, 0, item)
    onChange(next)
  }

  return (
    <div className="pe-list">
      {items.map((item, index) => {
        const number = String(index + 1).padStart(2, '0')
        return (
          <div className="pe-item" key={item.id}>
            <div className="pe-item-head">
              <span className="pe-item-number">{number}</span>
              <span className="pe-item-title">{itemTitle(item) || 'Untitled'}</span>
              <div className="pe-item-actions">
                <button
                  type="button"
                  className="pe-icon-btn"
                  aria-label={`Move item ${number} up`}
                  disabled={index === 0}
                  onClick={() => moveItem(index, -1)}
                >
                  <FiArrowUp />
                </button>
                <button
                  type="button"
                  className="pe-icon-btn"
                  aria-label={`Move item ${number} down`}
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, 1)}
                >
                  <FiArrowDown />
                </button>
                <button
                  type="button"
                  className="pe-icon-btn danger"
                  aria-label={`Remove item ${number}`}
                  disabled={items.length <= min}
                  onClick={() => removeItem(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="pe-item-body">
              {renderItem(item, (changes) => setItem(item.id, changes))}
            </div>
          </div>
        )
      })}

      {items.length < max && (
        <button
          type="button"
          className="pe-add"
          onClick={() => onChange([...items, createItem()])}
        >
          <FiPlus />
          {addLabel}
        </button>
      )}
    </div>
  )
}

export default ListEditor
