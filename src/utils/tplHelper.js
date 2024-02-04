import Handlebars from 'handlebars';

export function registerTemplate(name, tpl) {
    Handlebars.registerPartial(name, tpl);
}

export function renderTemplate(tpl) {
    const templateFunc = Handlebars.compile(tpl);

    return function renderEl(props) {
        return templateFunc(props);
    };
}

export function handlePartials(components) {
    Object.entries(components).forEach(([name, tpl]) => {
        registerTemplate(name, tpl);
        renderTemplate(tpl);
    });
}

export function handlePages(pages) {
    const pagesRoutes = {};

    Object.entries(pages).forEach(([name, tpl]) => {
        const renderedPage = renderTemplate(tpl);
        pagesRoutes['/' + name] = renderedPage;
    });

    return pagesRoutes;
}
