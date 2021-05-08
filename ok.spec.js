import { chai } from 'chai';
import { runChrome, stop, gotoUrl } from './framework/lib/browser';
import { urls } from './framework/const/urls'

const { expect } = chai;

describe('Тесты одноклассников', () => {
    let page;

    beforeEach(async () => {
        await runChrome();
        page = await gotoUrl(urls.baseUrl);
    })

    afterEach(async () => {
        await stop();
    })

    it('Проверяем логин', async () => {
        console.log('OK.RU');
    })
})
