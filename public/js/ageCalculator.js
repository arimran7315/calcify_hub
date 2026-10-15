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
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const birthDateInput = document.getElementById("birthDate");
    const birthTimeInput = document.getElementById("birthTime");
    const compareDateInput = document.getElementById("compareDate");
    const calculateBtn = document.getElementById("calculateBtn");
    const calculatingBtn = document.getElementById("calculatingBtn");
    const resetBtn = document.getElementById("resetBtn");
    const resettingBtn = document.getElementById("resetingBtn");
    const yearsOutput = document.getElementById("years");
    const monthsOutput = document.getElementById("months");
    const daysOutput = document.getElementById("days");
    const hoursOutput = document.getElementById("hours");
    const totalDaysOutput = document.getElementById("totalDays");
    const totalHoursOutput = document.getElementById("totalHours");
    const totalMinutesOutput = document.getElementById("totalMinutes");
    const totalSecondsOutput = document.getElementById("totalSeconds");
    const totalMillisecondsOutput = document.getElementById("totalMilliseconds");
    const nextBirthdayOutput = document.getElementById("nextBirthday");
    const nextBirthdayCountdownOutput = document.getElementById("nextBirthdayCountdown");
    const zodiacSignOutput = document.getElementById("zodiacSign");
    const generationOutput = document.getElementById("generation");
    const birthstoneOutput = document.getElementById("birthstone");
    const birthFlowerOutput = document.getElementById("birthFlower");
    const historicalEventsOutput = document.getElementById("historicalEvents");
    const pdfBtn = document.getElementById("pdfBtn");
    const generatingPdfBtn = document.getElementById("generatingpdfBtn");
    const factsDiv = document.getElementById("facts-div");
    const ageDiv = document.getElementById("age-div");
    const currentDate = new Date();

    // Calculate button click handler
    calculateBtn.addEventListener("click", () => {
        calculateBtn.classList.add("hidden");
        calculatingBtn.classList.remove("hidden");

        setTimeout(() => {
            function calculateAge() {
                calculateBtn.classList.add("hidden");
                calculatingBtn.classList.remove("hidden");

                const birthDate = new Date(birthDateInput.value);
                if (birthDate == currentDate || !birthDateInput.value) {
                    calculateBtn.classList.remove("hidden");
                    calculatingBtn.classList.add("hidden");
                    alert("Please enter your birth date");
                    return;
                }

                // Set time if provided
                if (birthTimeInput.value) {
                    const [hours, minutes] = birthTimeInput.value.split(":");
                    birthDate.setHours(parseInt(hours), parseInt(minutes));
                }

                const compareDate = compareDateInput.value ? new Date(compareDateInput.value) : new Date();
                if (compareDate < birthDate) {
                    calculateBtn.classList.remove("hidden");
                    calculatingBtn.classList.add("hidden");
                    alert("The comparison date must be after your birth date");
                    return;
                }

                // Calculate age components
                function getAgeComponents(start, end) {
                    let years = end.getFullYear() - start.getFullYear();
                    let months = end.getMonth() - start.getMonth();
                    let days = end.getDate() - start.getDate();
                    let hours = end.getHours() - start.getHours();

                    if (days < 0) {
                        months--;
                        const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
                        days += lastDayOfMonth;
                    }
                    if (months < 0) {
                        years--;
                        months += 12;
                    }
                    if (hours < 0) {
                        days--;
                        hours += 24;
                    }
                    return { years, months, days, hours };
                }

                const age = getAgeComponents(birthDate, compareDate);

                // Show PDF button
                pdfBtn.classList.remove("hidden");

                // Update age outputs
                yearsOutput.textContent = age.years;
                monthsOutput.textContent = age.months;
                daysOutput.textContent = age.days;
                hoursOutput.textContent = age.hours;

                // Update total time outputs
                totalDaysOutput.innerHTML = `<span class="font-medium">Days:</span> ${Math.floor((compareDate - birthDate) / 86400000).toLocaleString()}`;
                totalHoursOutput.innerHTML = `<span class="font-medium">Hours:</span> ${Math.floor((compareDate - birthDate) / 3600000).toLocaleString()}`;
                totalMinutesOutput.innerHTML = `<span class="font-medium">Minutes:</span> ${Math.floor((compareDate - birthDate) / 60000).toLocaleString()}`;
                totalSecondsOutput.innerHTML = `<span class="font-medium">Seconds:</span> ${Math.floor((compareDate - birthDate) / 1000).toLocaleString()}`;
                totalMillisecondsOutput.innerHTML = `<span class="font-medium">Milliseconds:</span> ${(compareDate - birthDate).toLocaleString()}`;

                // Calculate next birthday
                function getNextBirthday(birth, now) {
                    const currentYear = now.getFullYear();
                    let nextBirthday = new Date(currentYear, birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes());
                    if (nextBirthday < now) {
                        nextBirthday = new Date(currentYear + 1, birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes());
                    }
                    const dateString = nextBirthday.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });
                    const timeDiff = nextBirthday - now;
                    const countdown = `${Math.floor(timeDiff / 86400000)} days, ${Math.floor((timeDiff % 86400000) / 3600000)} hours, ${Math.floor((timeDiff % 3600000) / 60000)} minutes`;
                    return { date: dateString, countdown };
                }

                const nextBirthday = getNextBirthday(birthDate, compareDate);
                nextBirthdayOutput.textContent = nextBirthday.date;
                nextBirthdayCountdownOutput.textContent = nextBirthday.countdown;

                // Calculate zodiac sign
                function getZodiacSign(date) {
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
                    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
                    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
                    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
                    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
                    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
                    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
                    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
                    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
                    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
                    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
                    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
                    return "Unknown";
                }

                zodiacSignOutput.textContent = getZodiacSign(birthDate);

                // Calculate generation
                function getGeneration(date) {
                    const year = date.getFullYear();
                    if (year >= 2013) return "Generation Alpha";
                    if (year >= 1997) return "Generation Z";
                    if (year >= 1981) return "Millennials";
                    if (year >= 1965) return "Generation X";
                    if (year >= 1946) return "Baby Boomers";
                    if (year >= 1928) return "Silent Generation";
                    if (year >= 1901) return "Greatest Generation";
                    return "Unknown Generation";
                }

                generationOutput.textContent = getGeneration(birthDate);

                // Calculate birthstone
                function getBirthstone(date) {
                    const month = date.getMonth() + 1;
                    const birthstones = {
                        1: "Garnet",
                        2: "Amethyst",
                        3: "Aquamarine or Bloodstone",
                        4: "Diamond",
                        5: "Emerald",
                        6: "Pearl, Moonstone, or Alexandrite",
                        7: "Ruby",
                        8: "Peridot or Sardonyx",
                        9: "Sapphire",
                        10: "Opal or Tourmaline",
                        11: "Topaz or Citrine",
                        12: "Turquoise, Zircon, or Tanzanite"
                    };
                    return birthstones[month] || "Unknown";
                }

                birthstoneOutput.textContent = getBirthstone(birthDate);

                // Calculate birth flower
                function getBirthFlower(date) {
                    const month = date.getMonth() + 1;
                    const birthFlowers = {
                        1: "Carnation or Snowdrop",
                        2: "Violet or Primrose",
                        3: "Daffodil or Jonquil",
                        4: "Daisy or Sweet Pea",
                        5: "Lily of the Valley or Hawthorn",
                        6: "Rose or Honeysuckle",
                        7: "Larkspur or Water Lily",
                        8: "Gladiolus or Poppy",
                        9: "Aster or Morning Glory",
                        10: "Marigold or Cosmos",
                        11: "Chrysanthemum",
                        12: "Narcissus or Holly"
                    };
                    return birthFlowers[month] || "Unknown";
                }

                birthFlowerOutput.textContent = getBirthFlower(birthDate);

                // Calculate historical events
                function getHistoricalEvents(date) {
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const events = [];
                    if (year >= 2020) events.push("COVID-19 pandemic");
                    if (year >= 2001) events.push("War on Terror began");
                    if (year >= 1991) events.push("World Wide Web became publicly available");
                    if (year >= 1969) events.push("First Moon landing");
                    if (year >= 1945) events.push("End of World War II");
                    if (year >= 1929) events.push("Great Depression");
                    if (month === 7 && day === 20 && year >= 1969) events.push("First Moon landing (same date as your birthday)");
                    if (month === 11 && day === 22 && year >= 1963) events.push("JFK assassination (same date as your birthday)");
                    if (month === 9 && day === 11 && year >= 2001) events.push("9/11 attacks (same date as your birthday)");
                    return events.length > 0 ? `In ${year}, notable events included: ${events.join(", ")}.` : "No notable historical events found for your birth date.";
                }

                historicalEventsOutput.textContent = getHistoricalEvents(birthDate);

                calculateBtn.classList.remove("hidden");
                calculatingBtn.classList.add("hidden");
                ageDiv.classList.remove("hidden");
                factsDiv.classList.remove("hidden");
            }

            calculateAge();
            calculateBtn.classList.remove("hidden");
            calculatingBtn.classList.add("hidden");
        }, 500);
    });

    // Reset button click handler
    resetBtn.addEventListener("click", () => {
        resetBtn.classList.add("hidden");
        resettingBtn.classList.remove("hidden");

        setTimeout(() => {
            calculateBtn.classList.remove("hidden");
            pdfBtn.classList.add("hidden");
            birthDateInput.valueAsDate = null;
            birthTimeInput.value = "";
            compareDateInput.value = "";
            yearsOutput.textContent = "--";
            monthsOutput.textContent = "--";
            daysOutput.textContent = "--";
            hoursOutput.textContent = "--";
            totalDaysOutput.innerHTML = '<span class="font-medium">Days:</span> --';
            totalHoursOutput.innerHTML = '<span class="font-medium">Hours:</span> --';
            totalMinutesOutput.innerHTML = '<span class="font-medium">Minutes:</span> --';
            totalSecondsOutput.innerHTML = '<span class="font-medium">Seconds:</span> --';
            totalMillisecondsOutput.innerHTML = '<span class="font-medium">Milliseconds:</span> --';
            nextBirthdayOutput.textContent = "--";
            nextBirthdayCountdownOutput.textContent = "--";
            zodiacSignOutput.textContent = "--";
            generationOutput.textContent = "--";
            birthstoneOutput.textContent = "--";
            birthFlowerOutput.textContent = "--";
            historicalEventsOutput.textContent = "--";
            ageDiv.classList.add("hidden");
            factsDiv.classList.add("hidden");
            resetBtn.classList.remove("hidden");
            resettingBtn.classList.add("hidden");
        }, 500);
    });

    // PDF button click handler
    pdfBtn.addEventListener("click", async () => {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
        pdfBtn.classList.add("hidden");
        generatingPdfBtn.classList.remove("hidden");

        setTimeout(() => {
            function generatePDF() {
                if (yearsOutput.textContent === "--") {
                    alert("Please calculate your age first before generating a PDF");
                    return;
                }

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Header
                doc.setFontSize(22);
                doc.setTextColor(40, 53, 147);
                doc.text("Age Calculator Report", 105, 20, { align: "center" });

                // Generation date
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });

                // Line separator
                doc.setDrawColor(200);
                doc.line(20, 35, 190, 35);

                // Birth information
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                doc.text("Birth Information:", 20, 45);
                doc.setFontSize(12);
                doc.text(`Date of Birth: ${birthDateInput.value}`, 20, 55);
                if (birthTimeInput.value) {
                    doc.text(`Time of Birth: ${birthTimeInput.value}`, 20, 65);
                }

                // Age results
                doc.setFontSize(14);
                doc.text("Your Age Results:", 20, 80);
                doc.setFontSize(12);
                doc.text(`Years: ${yearsOutput.textContent}`, 20, 90);
                doc.text(`Months: ${monthsOutput.textContent}`, 60, 90);
                doc.text(`Days: ${daysOutput.textContent}`, 100, 90);
                doc.text(`Hours: ${hoursOutput.textContent}`, 140, 90);

                // Time table
                doc.autoTable({
                    startY: 100,
                    head: [["Unit", "Value"]],
                    body: [
                        ["Total Days", totalDaysOutput.textContent.replace("Days: ", "")],
                        ["Total Hours", totalHoursOutput.textContent.replace("Hours: ", "")],
                        ["Total Minutes", totalMinutesOutput.textContent.replace("Minutes: ", "")],
                        ["Total Seconds", totalSecondsOutput.textContent.replace("Seconds: ", "")],
                        ["Total Milliseconds", totalMillisecondsOutput.textContent.replace("Milliseconds: ", "")]
                    ],
                    theme: "grid",
                    headStyles: { fillColor: [40, 53, 147], textColor: 255 }
                });

                // Next birthday
                doc.setFontSize(14);
                doc.text("Next Birthday:", 20, doc.autoTable.previous.finalY + 15);
                doc.setFontSize(12);
                doc.text(`${nextBirthdayOutput.textContent}`, 20, doc.autoTable.previous.finalY + 25);
                doc.text(`Countdown: ${nextBirthdayCountdownOutput.textContent}`, 20, doc.autoTable.previous.finalY + 35);

                // Interesting facts
                doc.setFontSize(14);
                doc.text("Interesting Facts:", 20, doc.autoTable.previous.finalY + 50);
                doc.autoTable({
                    startY: doc.autoTable.previous.finalY + 55,
                    columns: [
                        { header: "Category", dataKey: "category" },
                        { header: "Value", dataKey: "value" }
                    ],
                    body: [
                        { category: "Zodiac Sign", value: zodiacSignOutput.textContent },
                        { category: "Generation", value: generationOutput.textContent },
                        { category: "Birthstone", value: birthstoneOutput.textContent },
                        { category: "Birth Flower", value: birthFlowerOutput.textContent }
                    ],
                    theme: "grid",
                    headStyles: { fillColor: [40, 53, 147], textColor: 255 }
                });

                // Historical events
                doc.setFontSize(12);
                doc.text(historicalEventsOutput.textContent, 20, doc.autoTable.previous.finalY + 15, { maxWidth: 170 });

                // Footer
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Generated by Advanced Age Calculator", 105, 285, { align: "center" });

                // Save PDF
                doc.save("Age_Calculator_Report.pdf");
            }

            generatePDF();
            pdfBtn.classList.remove("hidden");
            generatingPdfBtn.classList.add("hidden");
        }, 500);
    });
});