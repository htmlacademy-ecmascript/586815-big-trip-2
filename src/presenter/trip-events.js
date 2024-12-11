import EventList from '../view/trip-events/list';
import EventItem from '../view/trip-events/item';
import EventPoint from '../view/trip-events/event-point';
import EditablePoint from '../view/trip-events/edit-event-point';
import { render } from '../render.js';

export default class TripEventsPresentor {
  eventListComponent = new EventList();
  eventItem = new EventItem();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.eventListComponent, this.container);
    for (let i = 0; i < 3; i++) {
      render(this.eventItem, this.eventListComponent.getElement());
      const renderingContent = i === 0 ? new EditablePoint() : new EventPoint();
      render(renderingContent, this.eventItem.getElement());
    }
  }
}
