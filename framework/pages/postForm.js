import chai from 'chai';

const { expect } = chai;

const PostForm = function PostForm() {
    const postformPopup = "//*[@id = 'hook_Block_pfnull']";
    const postformTextarea = "//*[@data-module = 'postingForm/mediaText']";
    const submitPost = "//*[@class = 'posting_footer']//*[@data-action = 'submit']";

    this.check = async (page) => {
        await page.waitForSelector(postformPopup);
        let isPopupPresent = await page.isVisible(postformPopup);
        expect(isPopupPresent).to.be.true;
        await page.waitForSelector(postformTextarea);
        let isTextAreaPresent = await page.isVisible(postformTextarea);
        expect(isTextAreaPresent).to.be.true;
    }

    this.makeTextTopic = async (page, text) => {
        console.log(`Постим топик с текстом: ${text}`)
        await page.waitForSelector(postformTextarea);
        await page.fill(postformTextarea, text);
        await page.keyboard.press('Enter');
        await page.waitForSelector(submitPost);
        await page.click(submitPost);
    }
}

export { PostForm };