import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render } from '../render.js';

const MAX_AMOUNT_POINTS = 3;

export default class TripEventsPresentor {
  eventListComponent = new EventList();
  eventItem = new EventItem();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.eventListComponent, this.container);
    for (let i = 0; i < MAX_AMOUNT_POINTS; i++) {
      render(this.eventItem, this.eventListComponent.getElement());
      const renderingContent = i === 0 ? new EditablePoint() : new EventPoint();
      render(renderingContent, this.eventItem.getElement());
    }
  }
}
