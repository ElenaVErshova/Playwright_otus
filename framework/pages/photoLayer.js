const PhotoLayer = function PhotoLayer() {
    const photolayer = "//*[@id = 'photoLayerScrollingWrapper']";
    const description = "//*[@id = 'photoLayerScrollingWrapper']//*[@class = 'text-field_text']";

    this.check = async (page) => {
        await page.waitForSelector(photolayer);
    }

    this.getPhotoDescription = async (page) => {
        await page.waitForSelector(description);
        console.log(await page.isVisible(description))
        const text = await page.textContent(description);
        return text;
    }
}

export { PhotoLayer };