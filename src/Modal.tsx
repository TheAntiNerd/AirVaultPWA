import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onConfirm, onCancel }) => {
	if (!isOpen) return null;

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
			}}>
			<div
				style={{
					backgroundColor: 'white',
					padding: '20px',
					borderRadius: '8px',
					maxWidth: '400px',
					width: '90%',
				}}>
				<h3>Update Available</h3>
				<p>A new version of the application is available. Would you like to update now?</p>
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
					<button
						onClick={onCancel}
						style={{
							padding: '8px 16px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							backgroundColor: '#f5f5f5',
							cursor: 'pointer',
						}}>
						Later
					</button>
					<button
						onClick={onConfirm}
						style={{
							padding: '8px 16px',
							border: 'none',
							borderRadius: '4px',
							backgroundColor: '#007bff',
							color: 'white',
							cursor: 'pointer',
						}}>
						Update Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
