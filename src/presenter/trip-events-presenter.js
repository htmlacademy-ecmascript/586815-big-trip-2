import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render } from '../render.js';

export default class TripEventsPresentor {
  eventListComponent = new EventList();
  eventItem = new EventItem();

  constructor({container, tasksModel}) {
    this.container = container;
    this.tasksModel = tasksModel;
  }

  init() {
    this.eventTasks = [...this.tasksModel.getTasks()];
    render(this.eventListComponent, this.container);
    for (let i = 0; i < this.eventTasks.length; i++) {
      const renderingContent = i === 0 ? new EditablePoint({task: this.eventTasks[i]}) : new EventPoint({task: this.eventTasks[i]});
      render(renderingContent, this.eventListComponent.getElement());
    }
  }
}
