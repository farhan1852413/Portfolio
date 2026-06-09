'use client';

/**
 * Centrally manages CV download tracking and file delivery.
 * Hits the /cv-download route stealthily in a hidden iframe to register the page view
 * for Vercel analytics while delivering the actual PDF download simultaneously.
 */
const CV_FILE_NAME = 'FarhanCV.pdf';
const CV_FILE_PATH = '/documents/FarhanCV.pdf';

const getCvUrl = () => `${CV_FILE_PATH}?cache-bust=${Date.now()}`;

export const triggerCVDownload = () => {
    // 1. Deliver the actual PDF file directly with a cache-busting query
    // so the browser fetches the latest version of the file.
    const link = document.createElement('a');
    link.href = getCvUrl();
    link.download = CV_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Register the Page View in Vercel by loading the route in a hidden iframe.
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/cv-download?stealth=true';
    document.body.appendChild(iframe);

    setTimeout(() => {
        if (iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    }, 2000);
};
