import Handlebars from 'handlebars';

export default function handleTpl(tpl) {
    const compiledTpl = Handlebars.compile(tpl);

    return function renderEl(props) {
        return compiledTpl(props);
    };
}
