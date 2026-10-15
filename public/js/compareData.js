document.getElementById('compareBtn').addEventListener('click', function () {
    const compareBtn = document.getElementById('compareBtn');
    const comparingBtn = document.getElementById('comparingBtn');
    const input1 = document.getElementById('input1').value.trim();
    const input2 = document.getElementById('input2').value.trim();
    const ignoreWhitespace = document.getElementById('ignoreWhitespace').checked;
    const ignoreCase = document.getElementById('ignoreCase').checked;
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');

    // Validation check
    if (!input1 || !input2) {
        alert("Please enter text in both input fields.");
        return;
    }

    // Toggle buttons
    compareBtn.classList.add('hidden');
    comparingBtn.classList.remove('hidden');

    setTimeout(() => {
        resultContent.innerHTML = '';

        let compare1 = input1;
        let compare2 = input2;

        if (ignoreWhitespace) {
            compare1 = compare1.replace(/\s+/g, '');
            compare2 = compare2.replace(/\s+/g, '');
        }

        if (ignoreCase) {
            compare1 = compare1.toLowerCase();
            compare2 = compare2.toLowerCase();
        }

        if (compare1 === compare2) {
            resultContent.innerHTML = `
                <div class="p-3 bg-green-100 text-green-800 rounded-md">
                    <p class="font-medium">All OK!</p>
                    <p>The inputs are ${ignoreWhitespace || ignoreCase ? 'functionally' : ''} identical.</p>
                    ${(ignoreWhitespace || ignoreCase) && input1 !== input2
                    ? '<p class="mt-2 text-sm">(Differences exist but are being ignored based on your settings)</p>'
                    : ''}
                </div>
            `;
            resultDiv.classList.remove('hidden');
        } else {
            const diff = findDifferences(input1, input2, ignoreWhitespace, ignoreCase);
            let resultHTML = '<div class="space-y-4">';

            diff.forEach(d => {
                const value1 = highlightWhitespace(escapeHtml(d.value1));
                const value2 = highlightWhitespace(escapeHtml(d.value2));

                resultHTML += `
                    <div class="border-l-4 border-red-500 pl-3 py-1 bg-red-50">
                        <div class="font-medium text-gray-700 mb-1">Difference at line ${d.line}</div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="p-2 rounded ${d.type === 'removed' ? 'diff-removed' : ''}">
                                <span class="font-medium">Input 1:</span> ${value1}
                            </div>
                            <div class="p-2 rounded ${d.type === 'added' ? 'diff-added' : ''}">
                                <span class="font-medium">Input 2:</span> ${value2}
                            </div>
                        </div>
                    </div>
                `;
            });

            resultHTML += '</div>';
            resultContent.innerHTML = resultHTML;
            resultDiv.classList.remove('hidden');
        }

        // Toggle buttons back
        comparingBtn.classList.add('hidden');
        compareBtn.classList.remove('hidden');
    }, 800); // Simulate slight processing delay
});

document.getElementById('reset-btn').addEventListener('click', function () {
    const resetBtn = document.getElementById('reset-btn');
    const resetingBtn = document.getElementById('resetingBtn');

    resetBtn.classList.add('hidden');
    resetingBtn.classList.remove('hidden');

    setTimeout(() => {
        // Clear inputs
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';

        // Uncheck checkboxes
        document.getElementById('ignoreWhitespace').checked = false;
        document.getElementById('ignoreCase').checked = false;

        // Hide result
        const resultDiv = document.getElementById('result');
        const resultContent = document.getElementById('resultContent');
        resultDiv.classList.add('hidden');
        resultContent.innerHTML = '';

        // Reset buttons
        resetingBtn.classList.add('hidden');
        resetBtn.classList.remove('hidden');
    }, 500);
});


function findDifferences(text1, text2, ignoreWhitespace = false, ignoreCase = false) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const differences = [];
    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
        let line1 = lines1[i] || '';
        let line2 = lines2[i] || '';

        // Prepare comparison lines based on options
        let compare1 = line1;
        let compare2 = line2;

        if (ignoreWhitespace) {
            compare1 = compare1.replace(/\s+/g, '');
            compare2 = compare2.replace(/\s+/g, '');
        }

        if (ignoreCase) {
            compare1 = compare1.toLowerCase();
            compare2 = compare2.toLowerCase();
        }

        if (compare1 !== compare2) {
            if (line1 && !line2) {
                differences.push({
                    line: i + 1,
                    type: 'removed',
                    value1: line1,
                    value2: '[empty]'
                });
            } else if (!line1 && line2) {
                differences.push({
                    line: i + 1,
                    type: 'added',
                    value1: '[empty]',
                    value2: line2
                });
            } else {
                differences.push({
                    line: i + 1,
                    type: 'changed',
                    value1: line1,
                    value2: line2
                });
            }
        }
    }

    return differences;
}

function highlightWhitespace(text) {
    return text.replace(/ /g, '<span class="whitespace-char" title="Space">·</span>')
        .replace(/\t/g, '<span class="whitespace-char" title="Tab">→</span>')
        .replace(/\r/g, '<span class="whitespace-char" title="Carriage return">←</span>')
        .replace(/\n/g, '<span class="whitespace-char" title="New line">↵</span>');
}

// Helper function to escape HTML for safe display
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}