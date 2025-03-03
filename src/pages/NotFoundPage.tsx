import React from 'react';

const NotFoundPage = () => {
    return (
        <div
            style={{
                backgroundColor: '#FFA07A', // Snazzy orange background
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 'bold',
            }}
        >
            <div>
                <h1>404: Page Not Found</h1>
                <p>It looks like you're lost in space!</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
