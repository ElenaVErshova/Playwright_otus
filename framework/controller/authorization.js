const fieldLogin = "//*[@id = 'field_email']";
const fieldPassword = "//*[@id = 'field_password']";
const buttonSignIn = "//*[@data-l = 't,sign_in']";
const userMenuDropdown = "//*[@id = 'hook_Block_ToolbarUserDropdown']/div"
const userMenuDropdownImg = "//*[contains(@class, 'js-toolbar-menu')]//img";
const logoutLink = "//*[@data-l = 't,logoutCurrentUser']";
const logoutPopup = "//*[@id = 'hook_Modal_popLayerModal']";
const logoutButton = "//*[@id = 'hook_FormButton_logoff.confirm_not_decorate']";

async function doLogin(page, username, password) {
    console.log(`Логинимся пользователем: ${username}, ${password}`);
    await page.fill(fieldLogin, username);
    await page.fill(fieldPassword, password);
    await page.click(buttonSignIn);
    await page.waitForSelector(userMenuDropdownImg);
}

async function doLogout(page) {
    console.log('Разлогиниваемся.');
    // await page.click(userMenuDropdown, { force: true }); 
    // клик не работает на этом элементе, поэтому золотой костыль ниже
    await page.$eval(userMenuDropdown, el => {
        let cls = el.className;
        el.className = cls + ' toolbar_dropdown_w_hover';
    });
    await page.waitForSelector(logoutLink);
    await page.click(logoutLink);
    await page.waitForSelector(logoutPopup);
    await page.click(logoutButton);
    await page.waitForSelector(fieldLogin);
}

export { doLogin, doLogout };
