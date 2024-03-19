import Block, { PropValue, PropsType } from './block.ts';
import store, { StoreEvents } from './store.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export default function connect(
  Component: typeof Block,
  mapStateToProps: (state: IndexedType) => PropsType,
) {
  return class extends Component {
    constructor(tagName: string, props = {}) {
      const stateProps = mapStateToProps(store.getState());

      super(tagName, { ...props, ...stateProps });

      store.on(StoreEvents.Updated, () => {
        const newStateProps = mapStateToProps(store.getState());

        Object.entries(newStateProps).forEach(([key, value]) => {
          this.props[key] = value as PropValue;
        });
      });
    }
  };
}
