import AbstractView from '../../framework/view/abstract-view.js';

function createCostTemplate(cost) {
  return `
  <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
  `;
}

export default class TripInfoCost extends AbstractView{
  #cost = 0;

  constructor({cost}) {
    super();
    this.#cost = cost;
  }

  get template() {
    return createCostTemplate(this.#cost);
  }
}
