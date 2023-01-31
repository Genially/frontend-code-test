import { types } from 'mobx-state-tree';
import { TimeTraveller } from 'mst-middlewares';
import uuid from 'uuid/v4';

import getRandomColor from '../utils/getRandomColor';
import BoxModel from './models/Box';

const MainStore = types
  .model('MainStore', {
    boxes: types.array(BoxModel),
    history: types.optional(TimeTraveller, { targetPath: '../boxes' }),
  })
  .actions(self => {
    return {
      addBox(box) {
        self.boxes.push(box);
      },
      removeBox() {
        self.boxes = self.boxes.filter(box => !box.selected);
      },
      changeColor(ev) {
        self.boxes = self.boxes.map(box =>
          box.selected ? { ...box, color: ev.target.value } : box
        );
      },
    };
  })
  .views(self => ({}));

const store = MainStore.create();

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0,
});

store.addBox(box1);

export default store;
