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

export function handleTemplates(components) {
    Object.entries(components).forEach(([name, tpl]) => {
        registerTemplate(name, tpl);
        renderTemplate(tpl);
    });
}
