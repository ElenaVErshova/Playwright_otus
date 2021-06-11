import chai from 'chai';
import { runChrome, stopChrome, gotoUrl } from './lib/browser';
import { urls } from './framework/const/urls';
import { doLogin, doLogout } from './framework/stepObject/authorization';
import { app } from './framework/pages/index'

const { expect } = chai;

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
        const name = await app.UserMainPage().getUsername(page);
        expect(name).to.equal(FULLNAME);
    })
    it('Проверяем разлогин', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        const name = await app.UserMainPage().getUsername(page);
        expect(name).to.equal(FULLNAME);
        await doLogout(page);
        const text = await app.LoginPage().getLoginButtonText(page);
        expect(text).to.equal('Войти в Одноклассники');
    })
    it('Проверяем открытие аватарки', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        await app.UserMainPage().openAvatarPhoto(page);
        const text = await app.PhotoLayer().getPhotoDescription(page);
        expect(text).to.equal('Моя крутая аватарка');
    })
    it('Проверяем переход в свой профиль', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        page = await gotoUrl(`${urls.baseUrl}profile/${ID}`);
        await app.UserOwnPage().check(page);
        const name = await app.UserOwnPage().getUsername(page);
        expect(name).to.equal(FULLNAME);
    })
    it('Проверяем постинг заметки', async () => {
        await doLogin(page, USERNAME, PASSWORD);
        await app.UserMainPage().openPostingForm(page);
        let text = `qwerty${Math.random()}`;
        await app.PostForm().makeTextTopic(page, text);
        page = await gotoUrl(`${urls.baseUrl}profile/${ID}/statuses`);
        const textActual = await app.UserTopicsPage().getLatestTopicText(page);
        expect(textActual).to.equal(text);
    })
})
