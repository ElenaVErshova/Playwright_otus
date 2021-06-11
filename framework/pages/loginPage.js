import { app } from '../pages/index'

const LoginPage = function LoginPage() {
    const mainBlock = "#hook_Block_AnonymMain";
    const fieldLogin = "//*[@id = 'field_email']";
    const fieldPassword = "//*[@id = 'field_password']";
    const buttonSignIn = "//*[@data-l = 't,sign_in']";

    this.doLogin = async (page, username, password) => {
        console.log(`Логинимся пользователем: ${username}, ${password}`);
        await page.fill(fieldLogin, username);
        await page.fill(fieldPassword, password);
        await page.click(buttonSignIn);
        app.UserMainPage().check(page);
    };

    this.check = async (page) => {
        await page.waitForSelector(mainBlock);
    }

    this.getLoginButtonText = (page) => {
        const text = page.getAttribute(buttonSignIn, 'value');
        return text;
    }
}

export { LoginPage };
