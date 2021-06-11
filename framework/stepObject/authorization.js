import { app } from '../pages/index'

async function doLogin(page, username, password) {
    await app.LoginPage().doLogin(page, username, password);
}

async function doLogout(page) {
    console.log('Разлогиниваемся.');
    await app.UserMainPage().clickLogout(page);
    await app.LogoutPopup().confirmLogout(page);
    await app.LoginPage().check(page);
}

export { doLogin, doLogout };
