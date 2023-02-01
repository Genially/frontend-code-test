import interact from 'interactjs';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';

import store from '../stores/MainStore';

function BoxDraggable({ id, color, width, height, left, top, children, box }) {
  const boxEl = useRef(null);

  const getPosition = useCallback((event, el) => {
    // keep the dragged position in the data-x/data-y attributes
    const x = (Number(el.getAttribute('data-x')) || 0) + event.dx;
    const y = (Number(el.getAttribute('data-y')) || 0) + event.dy;
    return { x, y };
  }, []);

  useEffect(() => {
    interact(boxEl.current).draggable({
      autoScroll: true,
      listeners: {
        move: event => {
          const { x, y } = getPosition(event, boxEl.current);
          // translate the element
          boxEl.current.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
          // update the posiion attributes
          boxEl.current.setAttribute('data-x', x);
          boxEl.current.setAttribute('data-y', y);
          if (box.selected) {
            document
              .querySelectorAll('[data-selected="true"]')
              .forEach(selectedEl => {
                if (selectedEl !== boxEl.current) {
                  const elPos = getPosition(event, selectedEl);
                  selectedEl.style.transform =
                    'translate(' + elPos.x + 'px, ' + elPos.y + 'px)';
                  // update the posiion attributes
                  selectedEl.setAttribute('data-x', elPos.x);
                  selectedEl.setAttribute('data-y', elPos.y);
                }
              });
          }
        },
        end(event) {
          const { x, y } = getPosition(event, boxEl.current);
          box.move(y, x);
          if (box.selected) {
            document
              .querySelectorAll('[data-selected="true"]')
              .forEach(selectedEl => {
                if (selectedEl !== boxEl.current) {
                  const elPos = getPosition(event, selectedEl);
                  store.boxes
                    .find(b => b.id === selectedEl.id)
                    .move(elPos.y, elPos.x);
                }
              });
          }
        },
      },
    });
    interact(boxEl.current).on('tap', () => box.select());
  }, [box, getPosition]);

  return (
    <div
      draggable
      id={id}
      className='box'
      ref={boxEl}
      data-selected={box.selected}
      data-x={left}
      data-y={top}
      style={{
        backgroundColor: color,
        width: box.selected ? width - 3 : width,
        height: box.selected ? height - 3 : height,
        transform: `translate(${left}px, ${top}px)`,
        border: box.selected ? '3px solid yellow' : '',
      }}
    >
      {children}
    </div>
  );
}
export default observer(BoxDraggable);
