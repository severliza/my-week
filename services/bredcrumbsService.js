class breadcrumbs {
    constructor() {
        this.linkStack = {}
    }

    getLinks(breadcrumbsKey) {
        if (breadcrumbsKey in this.linkStack) {
            return this.linkStack[breadcrumbsKey]
        }
        return []
    }

    addLink(title, page, breadcrumbsKey) {
        if (breadcrumbsKey in this.linkStack) {
            this.linkStack[breadcrumbsKey].push({
                title: { title },
                link: { page },
            })
        } else {
            this.linkStack[breadcrumbsKey] = [
                { title: { title }, link: { page } },
            ]
        }
    }

    removeLastLink(breadcrumbsKey) {
        this.linkStack[breadcrumbsKey].pop()
    }

    removeAllLink(breadcrumbsKey) {
        this.linkStack[breadcrumbsKey] = []
    }

    removeLinkAfter(index, breadcrumbsKey) {
        this.linkStack[breadcrumbsKey].length = index
    }
}

export default new breadcrumbs()
