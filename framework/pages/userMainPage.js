import { app } from '../pages/index';

const UserMainPage = function UserMainPage() {
    const userMenuDropdown = "//*[@id = 'hook_Block_ToolbarUserDropdown']/div"
    const userMenuDropdownImg = "//*[contains(@class, 'js-toolbar-menu')]//img";
    const logoutLink = "//*[@data-l = 't,logoutCurrentUser']";
    const avatar = "//*[contains(@hrefattrs, 'TopCardUserOpenPhoto')]";
    const postformInFeed = "//*[contains(@hrefattrs, 'PopLayerMediaTopic')]";

    this.clickLogout = async (page) => {
        // await page.click(userMenuDropdown, { force: true }); 
        // клик не работает на этом элементе, поэтому золотой костыль ниже
        await page.waitForSelector(userMenuDropdown);
        await page.$eval(userMenuDropdown, el => {
            let cls = el.className;
            el.className = cls + ' toolbar_dropdown_w_hover';
        });
        await page.waitForSelector(logoutLink);
        await page.click(logoutLink);
    }

    this.check = async (page) => {
        await page.waitForSelector(userMenuDropdownImg);
    }

    this.getUsername = async (page) => {
        const name = await page.getAttribute(userMenuDropdownImg, 'alt');
        console.log(`Получили имя пользователя: ${name}`);
        return name;
    }

    this.openAvatarPhoto = async (page) => {
        console.log('Открываем аватарку пользователя');
        await page.click(avatar);
        await app.PhotoLayer().check(page);
    }

    this.openPostingForm = async (page) => {
        console.log('Открываем форму постинга');
        await page.click(postformInFeed);
        await app.PostForm().check(page);
    }
}

export { UserMainPage };
