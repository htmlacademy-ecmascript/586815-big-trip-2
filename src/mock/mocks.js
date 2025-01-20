import { getRandomArrayElement, getRandomArray, getRandomInteger } from '../utils/common.js';

const currentFilter = 'Everything';

const offersList = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: '2',
        title: 'Order Uber',
        price: 20
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '3',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '4',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '5',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '6',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '7',
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '8',
        title: 'Add breakfast',
        price: 50
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '9',
        title: 'Book tickets',
        price: 40
      },
      {
        id: '15',
        title: 'Lunch in city',
        price: 30
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '10',
        title: 'Add luggage',
        price: 30
      },
      {
        id: '11',
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: '12',
        title: 'Add meal',
        price: 15
      },
      {
        id: '13',
        title: 'Choose seats',
        price: 5
      },
      {
        id: '14',
        title: 'Travel by train',
        price: 40
      }
    ]
  }
];

const destinations = [
  {
    id: '1',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: '2',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Amsterdam parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Amsterdam parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    id: '3',
    description: 'London, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'London',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'London parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'London parliament building'
      }
    ]
  },
  {
    id: '4',
    description: 'Riga, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Riga',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Riga parliament building'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger()}`,
        description: 'Riga parliament building'
      }
    ]
  }
];

const points = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2025-03-10T22:55:56.845Z',
    dateTo: '2025-03-11T11:22:13.375Z',
    destination: getRandomDestination(destinations).id,
    isFavorite: false,
    offers: [
      '1', '2'
    ],
    type: 'taxi'
  },
  {
    id: '2',
    basePrice: 1200,
    dateFrom: '2019-03-10T22:55:56.845Z',
    dateTo: '2019-03-11T11:22:13.375Z',
    destination: getRandomDestination(destinations).id,
    isFavorite: true,
    offers: [
      '11', '13', '14'
    ],
    type: 'flight'
  },
  {
    id: '3',
    basePrice: 1300,
    dateFrom: '2019-03-10T22:55:56.845Z',
    dateTo: '2019-04-11T11:22:13.375Z',
    destination: getRandomDestination(destinations).id,
    isFavorite: false,
    offers: [
      '15'
    ],
    type: 'sightseeing'
  },
  {
    id: '4',
    basePrice: 1400,
    dateFrom: '2019-03-10T22:55:56.845Z',
    dateTo: '2019-04-11T11:22:13.375Z',
    destination: getRandomDestination(destinations).id,
    isFavorite: true,
    offers: [
      '5'
    ],
    type: 'ship'
  },
  {
    id: '5',
    basePrice: 1500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: getRandomDestination(destinations).id,
    isFavorite: false,
    offers: [
      '7'
    ],
    type: 'drive'
  }
];

function getRandomDestination (cityes) {
  const randomDestination = getRandomArrayElement(cityes);
  return {
    id: randomDestination.id,
  };
}

const randomPoints = getRandomArray(points);

export {randomPoints, destinations, offersList, currentFilter };
