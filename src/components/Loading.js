import React from 'react';

function Loading() {
    // Use React.createElement to create the div and h2 elements
    return (
        <div id="loading">
            <h2 className="message">Searching...</h2>
        </div>
    );
}
// Export the component as the default export
export default Loading;

