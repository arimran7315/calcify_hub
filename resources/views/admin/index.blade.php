<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body>
    <div id="toast-container" data-toast-type="error" data-toast-message="Something went wrong!"></div>
    <script>
        function showToast(type = 'info', message = 'This is a toast!') {
            const toastContainer = document.getElementById('toast-container');
            const toastId = `toast-${Date.now()}`;

            const typeStyles = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-400 text-black',
                info: 'bg-blue-500 text-white'
            };

            const toast = document.createElement('div');
            toast.id = toastId;
            toast.className = `
        flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg 
        transition-transform duration-300 transform translate-x-full opacity-0 
        ${typeStyles[type] || typeStyles.info}
    `;

            toast.innerHTML = `
        <span class="flex-1">${message}</span>
        <button onclick="dismissToast('${toastId}')" class="text-white hover:text-gray-200 font-bold">✕</button>
    `;

            toastContainer.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.classList.remove('opacity-0', 'translate-x-full');
            }, 50);

            // Auto-dismiss
            setTimeout(() => {
                dismissToast(toastId);
            }, 3000); // Adjust auto-dismiss time if needed
        }

        function dismissToast(id) {
            const toast = document.getElementById(id);
            if (toast) {
                toast.classList.add('opacity-0', 'translate-x-full');
                setTimeout(() => toast.remove(), 300);
            }
        }

        // Auto-show if data attributes are present
        window.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('toast-container');
            const type = container.dataset.toastType;
            const message = container.dataset.toastMessage;

            if (type && message) {
                showToast(type, message);
            }
        });
    </script>

</body>

</html>
