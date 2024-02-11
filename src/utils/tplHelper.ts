import Handlebars from 'handlebars';

export function registerTemplate(name: string, tpl: string): void {
    Handlebars.registerPartial(name, tpl);
}

export function renderTemplate(tpl: string) {
    const templateFunc = Handlebars.compile(tpl);

    return function renderEl(props: { [key: string]: boolean }) {
        return templateFunc(props);
    };
}

export function handlePartials(components: { [key: string]: string }) {
    Object.entries(components).forEach(([name, tpl]) => {
        registerTemplate(name, tpl);
        renderTemplate(tpl);
    });
}

export function handlePages(pages: { [key: string]: string }) {
    const pagesRoutes: { [key: string]: () => {} } | {} = {};

    Object.entries(pages).forEach(([name, tpl]) => {
        const renderedPage = renderTemplate(tpl);
        pagesRoutes['/' + name] = renderedPage;
    });

    return pagesRoutes;
}
