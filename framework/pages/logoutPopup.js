const LogoutPopup = function LogoutPopup() {
    const logoutPopup = "//*[@id = 'hook_Modal_popLayerModal']";
    const logoutButton = "//*[@id = 'hook_FormButton_logoff.confirm_not_decorate']";

    this.confirmLogout = async (page) => {
        await page.waitForSelector(logoutPopup);
        await page.click(logoutButton);
    }
}

export { LogoutPopup };
