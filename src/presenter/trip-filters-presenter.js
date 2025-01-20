import {render, replace, remove} from '../framework/render.js';
import TripFilters from '../view/trip-filters-view.js';
import { filter } from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class TripFiltersPresenter {
  #container = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;

  constructor({container, filterModel, eventsModel}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventsModel.events;
    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](events).length
    }));
  }

  init() {
    // render(new TripFilters({filters: this.#filters}), this.#container);

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new TripFilters({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
