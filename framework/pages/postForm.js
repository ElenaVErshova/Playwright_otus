
const PostForm = function PostForm() {
    const postformPopup = "//*[@id = 'hook_Block_pfnull']";
    const postformTextarea = "//*[@data-module = 'postingForm/mediaText']";
    const submitPost = "//*[@class = 'posting_footer']//*[@data-action = 'submit']";

    this.check = async (page) => {
        await page.waitForSelector(postformPopup);
        await page.waitForSelector(postformTextarea);
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