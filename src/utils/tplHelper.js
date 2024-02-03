import Handlebars from 'handlebars';

export function registerTpl(name, tpl) {
    Handlebars.registerPartial(name, tpl);
}

export function renderTpl(tpl) {
    const templateFunc = Handlebars.compile(tpl);

    return function renderEl(props) {
        return templateFunc(props);
    };
}

export function handleTpls(components) {
    Object.entries(components).forEach(([name, tpl]) => {
        registerTpl(name, tpl);
        renderTpl(tpl);
    });
}
