import interact from 'interactjs';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';

function BoxDraggable({ id, color, width, height, left, top, children, box }) {
  const boxEl = useRef(null);

  const getPosition = useCallback(
    event => {
      // keep the dragged position in the data-x/data-y attributes
      const x = (Number(boxEl.current.getAttribute('data-x')) || 0) + event.dx;
      const y = (Number(boxEl.current.getAttribute('data-y')) || 0) + event.dy;
      return { x, y };
    },
    [boxEl]
  );

  useEffect(() => {
    interact(boxEl.current).draggable({
      autoScroll: true,
      listeners: {
        move: event => {
          const { x, y } = getPosition(event);
          // translate the element
          boxEl.current.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
          // update the posiion attributes
          boxEl.current.setAttribute('data-x', x);
          boxEl.current.setAttribute('data-y', y);
        },
        end(event) {
          const { x, y } = getPosition(event);
          box.move(y, x);
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
