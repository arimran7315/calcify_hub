
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        console.log('Loading script:', src);
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}
// Tab switching
document.getElementById('js-tab').addEventListener('click', function () {
    document.getElementById('js-unminifier').classList.remove('hidden');
    document.getElementById('css-unminifier').classList.add('hidden');
    this.classList.add('tab-active', 'text-white', 'bg-indigo-500');
    this.classList.remove('text-gray-600');
    document.getElementById('css-tab').classList.remove('tab-active', 'text-white', 'bg-indigo-500');
    document.getElementById('css-tab').classList.add('text-gray-600');
});

document.getElementById('css-tab').addEventListener('click', function () {
    document.getElementById('css-unminifier').classList.remove('hidden');
    document.getElementById('js-unminifier').classList.add('hidden');
    this.classList.add('tab-active', 'text-white', 'bg-indigo-500');
    this.classList.remove('text-gray-600');
    document.getElementById('js-tab').classList.remove('tab-active', 'text-white', 'bg-indigo-500');
    document.getElementById('js-tab').classList.add('text-gray-600');
});

// Function to toggle button states based on input
function toggleButtonState(inputId, unminifyBtnId, clearBtnId) {
    const input = document.getElementById(inputId).value;
    const unminifyBtn = document.getElementById(unminifyBtnId);
    const clearBtn = document.getElementById(clearBtnId);

    // Check if input is empty or only whitespace
    const isDisabled = !input.trim();

    // Toggle disabled state for both buttons
    unminifyBtn.disabled = isDisabled;
    clearBtn.disabled = isDisabled;

    // Update styling for disabled state
    if (isDisabled) {
        unminifyBtn.classList.add('opacity-50', 'cursor-not-allowed');
        clearBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        unminifyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        clearBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Add input event listeners to check input changes
document.getElementById('js-input').addEventListener('input', function () {
    toggleButtonState('js-input', 'unminify-js', 'clear-js');
});

document.getElementById('css-input').addEventListener('input', function () {
    toggleButtonState('css-input', 'unminify-css', 'clear-css');
});

// Initial check on page load
document.addEventListener('DOMContentLoaded', function () {
    toggleButtonState('js-input', 'unminify-js', 'clear-js');
    toggleButtonState('css-input', 'unminify-css', 'clear-css');
});

// JavaScript Unminifier
document.getElementById('unminify-js').addEventListener('click', async function () {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify.min.js');
    const input = document.getElementById('js-input').value;
    const originalSize = input.length;
    let beautified;
    try {
        beautified = unminifyJS(input);
    } catch (e) {
        console.error('JavaScript unminification error:', e);
        document.getElementById('js-output').value = 'Error: Invalid JavaScript code';
        document.getElementById('js-stats').textContent = 'Error in unminification';
        return;
    }
    const beautifiedSize = beautified.length;

    document.getElementById('js-output').value = beautified;
    document.getElementById('js-stats').textContent =
        `${originalSize} chars → ${beautifiedSize} chars`;

    // Show success animation
    const btn = this;
    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Unminified!';
    btn.classList.remove('from-indigo-500', 'to-indigo-600');
    btn.classList.add('from-green-500', 'to-green-600');
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-expand-alt mr-2"></i> Unminify JS';
        btn.classList.remove('from-green-500', 'to-green-600');
        btn.classList.add('from-indigo-650', 'to-indigo-600');
    }, 2000);
});

// CSS Unminifier
document.getElementById('unminify-css').addEventListener('click', async function () {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-css.min.js');
    const input = document.getElementById('css-input').value;
    const originalSize = input.length;
    let beautified;
    try {
        beautified = unminifyCSS(input);
    } catch (e) {
        console.error('CSS unminification error:', e);
        document.getElementById('css-output').value = 'Error: Invalid CSS code';
        document.getElementById('css-stats').textContent = 'Error in unminification';
        return;
    }
    const beautifiedSize = beautified.length;

    document.getElementById('css-output').value = beautified;
    document.getElementById('css-stats').textContent =
        `${originalSize} chars → ${beautifiedSize} chars`;

    // Show success animation
    const btn = this;
    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Unminified!';
    btn.classList.remove('from-indigo-500', 'to-indigo-600');
    btn.classList.add('from-green-500', 'to-green-600');
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-expand-alt mr-2"></i> Unminify CSS';
        btn.classList.remove('from-green-500', 'to-green-600');
        btn.classList.add('from-indigo-500', 'to-indigo-600');
    }, 2000);
});

// Copy buttons
document.getElementById('copy-js').addEventListener('click', function () {
    copyToClipboard('js-output');
    showTooltip(this, 'Copied!');
});

document.getElementById('copy-css').addEventListener('click', function () {
    copyToClipboard('css-output');
    showTooltip(this, 'Copied!');
});

// Clear buttons
document.getElementById('clear-js').addEventListener('click', function () {
    document.getElementById('js-input').value = '';
    document.getElementById('js-output').value = '';
    document.getElementById('js-stats').textContent = '0 chars → 0 chars';
    toggleButtonState('js-input', 'unminify-js', 'clear-js');
});

document.getElementById('clear-css').addEventListener('click', function () {
    document.getElementById('css-input').value = '';
    document.getElementById('css-output').value = '';
    document.getElementById('css-stats').textContent = '0 chars → 0 chars';
    toggleButtonState('css-input', 'unminify-css', 'clear-css');
});



// Unminification functions
function unminifyJS(code) {
    if (!code.trim()) return '';
    if (typeof js_beautify !== 'function') {
        throw new Error('js-beautify library not available');
    }
    return js_beautify(code, {
        indent_size: 2,
        space_in_paren: true,
        preserve_newlines: true
    });
}

function unminifyCSS(code) {
    if (!code.trim()) return '';
    if (typeof css_beautify !== 'function') {
        throw new Error('css-beautify library not available');
    }
    return css_beautify(code, {
        indent_size: 2,
        newline_between_rules: true
    });
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
}

function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bg-indigo-600 text-white px-2 py-1 rounded text-sm';
    tooltip.textContent = message;
    tooltip.style.top = '-30px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    element.style.position = 'relative';
    element.appendChild(tooltip);
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}