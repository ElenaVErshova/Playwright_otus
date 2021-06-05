const UserTopicsPage = function UserTopicsPage() {
    const feedTopicTextblock = "//*[contains(@class, 'media-text_cnt_tx')]";

    this.getLatestTopicText = async (page) => {
        await page.waitForSelector(feedTopicTextblock);
        return await page.textContent(feedTopicTextblock);
    }
}

export { UserTopicsPage };