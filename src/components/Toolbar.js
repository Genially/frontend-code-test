import { observer } from 'mobx-react';
import React from 'react';
import uuid from 'uuid';

import store from '../stores/MainStore';
import BoxModel from '../stores/models/Box';
import getRandomColor from '../utils/getRandomColor';

function Toolbar() {
  const numOfSelected = store.boxes.filter(box => box.selected).length;

  return (
    <div className='toolbar'>
      <button
        onClick={() => {
          store.addBox(
            BoxModel.create({
              id: uuid(),
              color: getRandomColor(),
              left: 0,
              top: 0,
            })
          );
        }}
      >
        Add Box
      </button>
      <button onClick={store.removeBox}>Remove Box</button>
      <input type='color' onChange={store.changeColor} />
      {numOfSelected ? (
        <span>
          Selected{' '}
          {numOfSelected === 1
            ? `${numOfSelected} box`
            : `${numOfSelected} boxes`}
        </span>
      ) : (
        <span>No boxes selected</span>
      )}
      <button disabled={!store.history.canUndo} onClick={store.history.undo}>
        Undo
      </button>
      <button disabled={!store.history.canRedo} onClick={store.history.redo}>
        Redo
      </button>
    </div>
  );
}

export default observer(Toolbar);
