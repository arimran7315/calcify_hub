function showToast(type = 'info', message = 'This is a toast!') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.error('Toast container not found!');
        return;
    }

    const toastId = Date.now();
    const styles = {
        success: 'bg-emerald-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };

    const toast = document.createElement('div');
    toast.id = `toast-${toastId}`;
    toast.className = `
        p-4 rounded-lg shadow-lg flex items-center justify-between transition-all duration-300 
        max-w-sm opacity-0 transform translate-x-full ${styles[type] || styles.info}
    `;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="dismissToast(${toastId})" class="ml-4 text-white hover:text-gray-200">✕</button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-x-full');
    }, 100);

    setTimeout(() => {
        dismissToast(toastId);
    }, 5000);
}

function dismissToast(toastId) {
    const toast = document.getElementById(`toast-${toastId}`);
    if (toast) {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }
}

// Automatically show toast if data-* attributes exist
window.addEventListener('DOMContentLoaded', () => {
    checkForToastContainer(0, 10); // Start polling with max 10 retries
});

// Polling function with retry limit
function checkForToastContainer(attempt = 0, maxAttempts = 10) {
    const container = document.getElementById('toast-container');
    if (!container) {
        if (attempt < maxAttempts) {
            setTimeout(() => checkForToastContainer(attempt + 1, maxAttempts), 100);
        } else {
            console.error('Toast container not found after max retries');
        }
        return;
    }

    let type = container.dataset.toastType || container.getAttribute('data-toast-type');
    let message = container.dataset.toastMessage || container.getAttribute('data-toast-message');

    if (type && message) {
        showToast(type, message);
    } else {
        if (attempt < maxAttempts) {
            setTimeout(() => checkForToastContainer(attempt + 1, maxAttempts), 100);
        } else {
            console.warn('No toast attributes found after max retries');
        }
    }
}

// Support for Livewire or Inertia.js
if (typeof Livewire !== 'undefined') {
    Livewire.on('showToast', (type, message) => {
        showToast(type, message);
    });
}