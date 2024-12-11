import TripInfoMainContainer from '../view/trip-info/main-container.js';
import TripInfoContainer from '../view/trip-info/container.js';
import TripInfoTitle from '../view/trip-info/title.js';
import TripInfoDates from '../view/trip-info/dates.js';
import TripInfoCost from '../view/trip-info/cost.js';
import { RenderPosition, render } from '../render.js';

export default class TripInfoPresentor {
  mainContainerComponent = new TripInfoMainContainer();
  containerComponent = new TripInfoContainer();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.mainContainerComponent, this.container, RenderPosition.AFTERBEGIN);
    render (this.containerComponent, this.mainContainerComponent.getElement());
    render (new TripInfoTitle(), this.containerComponent.getElement());
    render (new TripInfoDates(), this.containerComponent.getElement());
    render (new TripInfoCost(), this.mainContainerComponent.getElement());
  }
}
