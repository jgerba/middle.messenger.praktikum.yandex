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
