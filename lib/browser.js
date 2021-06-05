import playwright from 'playwright';

let chrome;
let context;
let page;

async function runChrome() {
    chrome = await playwright.chromium.launch({
        headless: false,
        slowMo: 250,
    });
    context = await chrome.newContext();
    page = await context.newPage();
}

async function gotoUrl(url) {
    await page.goto(url);
    return page;
}

async function stopChrome() {
    await page.screenshot(`${(new Date()).getUTCDate}_playwright.jpg`);
    await page.close();
    await chrome.close();
}

export { runChrome, gotoUrl, stopChrome };
