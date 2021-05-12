import chai from 'chai';
import { runChrome, stopChrome, gotoUrl } from './framework/lib/browser';
import { urls } from './framework/const/urls';
import { doLogin, doLogout } from './framework/controller/authorization';

const { expect } = chai;

const fieldLogin = "//*[@id = 'field_email']";
const userMenuDropdownImg = "//*[contains(@class, 'js-toolbar-menu')]//img";
const avatar = "//*[contains(@hrefattrs, 'TopCardUserOpenPhoto')]";
const photolayer = "//*[@id = 'photoLayerScrollingWrapper']"
const profileName = "//*[@class = 'profile-user-info_name']";
const postformInFeed = "//*[contains(@hrefattrs, 'PopLayerMediaTopic')]";
const postformPopup = "//*[@id = 'hook_Block_pfnull']";
const postformTextarea = "//*[@data-module = 'postingForm/mediaText']";
const submitPost = "//*[@class = 'posting_footer']//*[@data-action = 'submit']";
const feedTopicTextblock = "//*[contains(@class, 'media-text_cnt_tx')]";

const USERNAME = 'TestOTUS1';
const PASSWORD = 'testQA1'
const FULLNAME = 'TestOTUS1 TestOTUS1';
const ID = '582953616009';

describe('Тесты одноклассников', () => {
    let page;

    beforeEach(async () => {
        await runChrome();
        page = await gotoUrl(urls.baseUrl);
    })

    afterEach(async () => {
        await stopChrome();
    })

    it('Проверяем логин', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        const name = await page.getAttribute(userMenuDropdownImg, 'alt');
        console.log(`Получили имя пользователя: ${name}`);
        expect(name).to.equal(FULLNAME);
    })
    it('Проверяем разлогин', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        await doLogout(page);

        let isLogin = await page.isVisible(fieldLogin);
        expect(isLogin).to.be.true;
    })
    it('Проверяем открытие аватарки', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        await page.click(avatar);
        await page.waitForSelector(photolayer);
        let isPhoto = await page.isVisible(photolayer);
        expect(isPhoto).to.be.true;
    })
    it('Проверяем переход в свой профиль', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        page = await gotoUrl(`${urls.baseUrl}profile/${ID}`);
        let name = await page.textContent(profileName);
        expect(name).to.equal(FULLNAME);
    })
    it('Проверяем постинг заметки', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        await page.click(postformInFeed);
        await page.waitForSelector(postformPopup);

        let text = `qwerty${Math.random()}`;
        await page.waitForSelector(postformTextarea);
        await page.fill(postformTextarea, text);
        await page.keyboard.press('Enter');
        await page.waitForSelector(submitPost);
        await page.click(submitPost);

        page = await gotoUrl(`${urls.baseUrl}profile/${ID}/statuses`);
        await page.waitForSelector(feedTopicTextblock);
        let textActual = await page.textContent(feedTopicTextblock);
        expect(textActual).to.equal(text);
    })
})
