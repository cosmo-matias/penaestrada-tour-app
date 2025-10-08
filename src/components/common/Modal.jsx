// src/components/common/Modal.jsx
export function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    const modalStyle = {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    };
    const contentStyle = {
        backgroundColor: 'white', padding: '20px', borderRadius: '5px',
        width: '500px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    };

    return (
        <div style={modalStyle} onClick={onClose}>
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{title}</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>
                        &times;
                    </button>
                </div>
                <hr/>
                {children}
            </div>
        </div>
    );
}