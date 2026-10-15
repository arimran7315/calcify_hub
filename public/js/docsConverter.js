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

document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const removeFileBtn = document.getElementById('remove-file');
    const convertBtn = document.getElementById('convert-btn');
    const downloadSection = document.getElementById('download-section');
    const downloadBtn = document.getElementById('download-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    let selectedFile = null;
    let convertedBlob = null;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    // Handle file selection via button
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', function () {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });

    // Remove file selection
    removeFileBtn.addEventListener('click', resetFileInput);

    // Conversion button click handler
    convertBtn.addEventListener('click', async function () {
        if (!selectedFile) {
            showError('No file selected for conversion.');
            return;
        }

        const conversionType = document.querySelector('input[name="conversion-type"]:checked').id;

        try {
            showProgress(0);
            progressContainer.classList.remove('hidden');

            if (conversionType === 'pdf-to-word') {
                convertedBlob = await convertPdfToWord(selectedFile);
            } else {
                convertedBlob = await convertWordToPdf(selectedFile);
            }

            showProgress(100);
            setTimeout(() => {
                conversionComplete();
            }, 500);
        } catch (error) {
            showError(`Conversion failed: ${error.message}`);
            console.error('Conversion error:', error);
        }
    });

    // Download button click handler
    downloadBtn.addEventListener('click', function () {
        if (!convertedBlob) {
            showError('No file available for download.');
            return;
        }

        const conversionType = document.querySelector('input[name="conversion-type"]:checked').id;
        const outputType = conversionType === 'pdf-to-word' ? 'docx' : 'pdf';

        downloadFile(convertedBlob, selectedFile.name, outputType);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('border-blue-500', 'bg-blue-50');
        dropArea.classList.remove('border-gray-300');
    }

    function unhighlight() {
        dropArea.classList.remove('border-blue-500', 'bg-blue-50');
        dropArea.classList.add('border-gray-300');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    function isValidFile(file) {
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/rtf',
            'text/plain',
            'application/vnd.ms-word'
        ];
        const validExtensions = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
    }

    function handleFiles(files) {
        if (files.length === 0) return;

        if (files.length > 1) {
            showError('Please select only one file at a time.');
            return;
        }

        const file = files[0];
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/rtf',
            'text/plain',
            'application/vnd.ms-word'
        ];
        const validExtensions = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
            showError('Please select a valid PDF or Word document.');
            resetFileInput();
            return;
        }

        selectedFile = file;
        convertedBlob = null;
        displayFileInfo(file);

        // Auto-select conversion type based on file type
        if (file.type === 'application/pdf' || fileExtension === '.pdf') {
            document.getElementById('pdf-to-word').checked = true;
        } else {
            document.getElementById('word-to-pdf').checked = true;
        }
    }

function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);

    // Detect icon based on file type
    const extension = file.name.split('.').pop().toLowerCase();
    let iconHtml = '';

    if (extension === 'pdf') {
        iconHtml = `<i class="fas fa-file-pdf text-red-500 text-2xl mr-3"></i>`;
    } else if (['doc', 'docx', 'rtf'].includes(extension)) {
        iconHtml = `<i class="fas fa-file-word text-blue-500 text-2xl mr-3"></i>`;
    } else {
        iconHtml = `<i class="fas fa-file-alt text-gray-500 text-2xl mr-3"></i>`;
    }

    // Replace existing icon
    const iconContainer = fileInfo.querySelector('.flex.items-center > i');
    if (iconContainer) {
        iconContainer.outerHTML = iconHtml;
    }

    fileInfo.classList.remove('hidden');
    convertBtn.classList.remove('hidden');
    downloadSection.classList.add('hidden');
}


    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function resetFileInput() {
        selectedFile = null;
        convertedBlob = null;
        fileInfo.classList.add('hidden');
        convertBtn.classList.add('hidden');
        downloadSection.classList.add('hidden');
        progressContainer.classList.add('hidden');
        fileInput.value = '';
    }

    function showProgress(percent) {
        progressBar.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;

        if (percent < 100) {
            progressContainer.classList.remove('hidden');
        } else {
            setTimeout(() => {
                progressContainer.classList.add('hidden');
            }, 500);
        }
    }

    function conversionComplete() {
        downloadSection.classList.remove('hidden');
    }

    function showError(message) {
        alert(message);
    }

    function downloadFile(blob, originalName, outputType) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");
        const extension = outputType;

        a.download = `${nameWithoutExtension}_converted.${extension}`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    // Conversion functions
    async function convertPdfToWord(pdfFile) {
        return new Promise(async (resolve, reject) => {
            try {
                showProgress(5);

                // Load required scripts for PDF-to-Word conversion
                await Promise.all([
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'),
                    loadScript('https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js')
                ]);

                // Verify PDF.js is loaded
                if (typeof pdfjsLib === 'undefined') {
                    throw new Error('PDF.js failed to load');
                }

                // Configure PDF.js worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

                showProgress(10);

                // Load the PDF file
                const arrayBuffer = await pdfFile.arrayBuffer();
                if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                    throw new Error('Invalid or empty PDF file');
                }

                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                if (!pdf || !pdf.numPages) {
                    throw new Error('Failed to load PDF or PDF has no pages');
                }

                showProgress(20);

                let fullText = '';

                // Extract text from each page
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    if (!page) {
                        console.warn(`Page ${i} could not be loaded`);
                        continue;
                    }

                    const textContent = await page.getTextContent();
                    if (!textContent || !textContent.items) {
                        console.warn(`No text content found on page ${i}`);
                        continue;
                    }

                    const pageText = textContent.items
                        .filter(item => item && typeof item.str === 'string')
                        .map(item => item.str)
                        .join(' ');
                    fullText += pageText + '\n\n';

                    showProgress(20 + (i / pdf.numPages) * 60);
                }

                if (!fullText.trim()) {
                    throw new Error('No text could be extracted from the PDF. It may be a scanned document or image-based.');
                }

                showProgress(85);

                // Create DOCX file
                if (typeof docx === 'undefined') {
                    throw new Error('Docx.js failed to load');
                }
                const { Document, Paragraph, Packer, TextRun } = docx;

                const paragraphs = fullText
                    .split('\n\n')
                    .filter(p => p.trim().length > 0)
                    .map(text => new Paragraph({ children: [new TextRun(text)] }));

                const doc = new Document({
                    sections: [{ properties: {}, children: paragraphs }]
                });

                showProgress(95);

                const blob = await Packer.toBlob(doc);
                resolve(blob);
            } catch (error) {
                console.error('Error in convertPdfToWord:', error);
                reject(error);
            }
        });
    }

    async function convertWordToPdf(wordFile) {
        return new Promise(async (resolve, reject) => {
            try {
                showProgress(5);

                // Load required scripts for Word-to-PDF conversion
                await Promise.all([
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'),
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.0/mammoth.browser.min.js')
                ]);

                showProgress(10);

                // Extract text from the Word document using mammoth
                const arrayBuffer = await wordFile.arrayBuffer();
                if (typeof mammoth === 'undefined') {
                    throw new Error('Mammoth.js failed to load');
                }
                const result = await mammoth.extractRawText({ arrayBuffer });

                showProgress(40);

                const text = result.value;

                // Create a PDF with the extracted text
                if (typeof PDFLib === 'undefined') {
                    throw new Error('PDF-Lib failed to load');
                }
                const { PDFDocument, rgb } = PDFLib;
                const pdfDoc = await PDFDocument.create();

                showProgress(60);

                const page = pdfDoc.addPage([612, 792]); // Letter size
                const { width, height } = page.getSize();
                const fontSize = 12;
                const margin = 50;

                // Split text into lines that fit the page width
                const lines = [];
                const words = text.split(/\s+/);
                let currentLine = words[0] || '';

                for (let i = 1; i < words.length; i++) {
                    const word = words[i];
                    const testLine = currentLine + ' ' + word;
                    const testWidth = fontSize * testLine.length * 0.5; // Approximate width

                    if (testWidth > (width - 2 * margin)) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine);

                showProgress(80);

                // Add text to the PDF
                let y = height - margin - fontSize;

                for (const line of lines) {
                    if (y < margin) {
                        page.addPage([width, height]);
                        y = height - margin - fontSize;
                    }

                    page.drawText(line, {
                        x: margin,
                        y: y,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                    });

                    y -= fontSize * 1.5;
                }

                showProgress(95);

                const pdfBytes = await pdfDoc.save();
                resolve(new Blob([pdfBytes], { type: 'application/pdf' }));
            } catch (error) {
                reject(error);
            }
        });
    }
    document.addEventListener('paste', function (e) {
        const clipboardItems = e.clipboardData.items;
        const files = [];

        for (const item of clipboardItems) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file && isValidFile(file)) {
                    files.push(file);
                }
            }
        }

        if (files.length > 1) {
            showError('Please paste only one file at a time.');
        } else if (files.length === 1) {
            handleFiles(files);
        } else {
            alert('No valid Word or PDF file found in clipboard.');
        }
    });

});