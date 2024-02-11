import Handlebars from 'handlebars';

type renderElType = { [key: string]: boolean };
type tplType = { [key: string]: string };

export function registerTemplate(name: string, tpl: string): void {
  Handlebars.registerPartial(name, tpl);
}

export function renderTemplate(tpl: string) {
  const templateFunc = Handlebars.compile(tpl);

  return function renderEl(props: renderElType): string {
    return templateFunc(props);
  };
}

export function handlePartials(components: tplType) {
  Object.entries(components).forEach(([name, tpl]) => {
    registerTemplate(name, tpl);
    renderTemplate(tpl);
  });
}

export function handlePages(pages: tplType) {
  const pagesRoutes: {
        [key: string]: (props: renderElType) => string;
    } = {};

  Object.entries(pages).forEach(([name, tpl]) => {
    const renderedPage = renderTemplate(tpl);
    const routeName: string = `/${name}`;
    pagesRoutes[routeName] = renderedPage;
  });

  return pagesRoutes;
}
