/**
 * Universal Weight Converter
 * Reads conversion rates from data attributes on body tag
 */
(function() {
    'use strict';

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Get conversion factors from body data attributes
    const gramToUnit = parseFloat(document.body.dataset.gramToUnit);
    const unitToGram = parseFloat(document.body.dataset.unitToGram);

    // Validate conversion factors
    if (!gramToUnit || !unitToGram) {
        console.error('Conversion factors not found in body data attributes');
        return;
    }

    // Get input elements
    const gramInput = document.getElementById('gram-input');
    const unitInput = document.getElementById('ounce-input') ||
                      document.getElementById('pound-input') ||
                      document.getElementById('kilogram-input') ||
                      document.getElementById('grain-input') ||
                      document.getElementById('dram-input') ||
                      document.getElementById('stone-input') ||
                      document.getElementById('quarter-input') ||
                      document.getElementById('hundredweight-input') ||
                      document.getElementById('shortton-input') ||
                      document.getElementById('longton-input') ||
                      document.getElementById('tola-input');

    if (!gramInput || !unitInput) {
        console.error('Input elements not found');
        return;
    }

    // Flag to prevent infinite loop
    let isUpdating = false;

    /**
     * Convert grams to target unit
     */
    function convertGramsToUnit() {
        if (isUpdating) return;

        isUpdating = true;
        const gramValue = parseFloat(gramInput.value) || 0;
        const unitValue = gramValue * gramToUnit;

        // Determine decimal places based on conversion factor size
        let decimalPlaces = 3;
        if (gramToUnit < 0.0001) {
            decimalPlaces = 6; // For very small values like quarters, tons
        }

        // Display result
        unitInput.value = unitValue.toFixed(decimalPlaces);

        // Add glow effect on change
        unitInput.style.boxShadow = '0 0 8px rgba(255, 149, 0, 0.5)';
        setTimeout(() => {
            unitInput.style.boxShadow = '';
        }, 800);

        isUpdating = false;
    }

    /**
     * Convert target unit to grams
     */
    function convertUnitToGrams() {
        if (isUpdating) return;

        isUpdating = true;
        const unitValue = parseFloat(unitInput.value) || 0;
        const gramValue = unitValue * unitToGram;

        // Display result with 3 decimal places
        gramInput.value = gramValue.toFixed(3);

        // Add glow effect on change
        gramInput.style.boxShadow = '0 0 8px rgba(255, 149, 0, 0.5)';
        setTimeout(() => {
            gramInput.style.boxShadow = '';
        }, 800);

        isUpdating = false;
    }

    // Event listeners
    gramInput.addEventListener('input', convertGramsToUnit);
    unitInput.addEventListener('input', convertUnitToGrams);

    // Initialize
    convertGramsToUnit();
})();
