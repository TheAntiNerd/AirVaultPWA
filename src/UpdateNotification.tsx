import React from 'react';

interface UpdateNotificationProps {
	onUpdate: () => void;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({ onUpdate }) => {
	return (
		<div
			onClick={onUpdate}
			style={{
				position: 'fixed',
				top: '0px',
				width: '100%',
				right: '0px',
				display: 'flex',
				justifyContent: 'space-between',
				zIndex: 9999,
				padding: '10px 20px',
				backgroundColor: '#FF802C',
				color: 'white',
				border: 'none',
				borderRadius: '5px',

				boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
			}}>
			<label style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
				New update is available for AirVault.
			</label>
			<button
				style={{
					cursor: 'pointer',
					border: '1px solid white',
					padding: '3px',
					paddingLeft: '10px',
					paddingRight: '10px',
				}}
				onClick={onUpdate}>
				Update
			</button>
		</div>
	);
};

export default UpdateNotification;
