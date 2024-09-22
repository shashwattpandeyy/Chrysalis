import { getDatabase } from '../database/seeds/connection';
import mockData from '../database/seeds/indian_food.json' assert { type: 'json' };
import { every, filter, includes, isEmpty, toLower } from 'lodash-es';

class ItemService {
  constructor() {
    if (ItemService._instance) {
      return ItemService._instance;
    }
    ItemService._instance = this;
    this.database = getDatabase();
  }

  async getOneItem({ id }) {
    return mockData.filter((data) => data.name.toLowerCase() === id.toLowerCase());
  }

  async getItemByQuery(query) {
    const keys = Object.keys(query);

    const data = filter(mockData, (mockdata) => {
      // const arr1 = toLower(mockdata[keys[0]])
      //   .split(',')
      //   .map((word) => word.trim());
      // // const arr2 = toLower(query[keys[0]]._contains)
      //   .split(',')
      //   .map((word) => word.trim());

      const value = toLower(query?.name?._contains);
      console.log(value, mockdata.state);
      return (
        mockdata.name.toLowerCase().includes(value) ||
        String(mockdata.state).toLowerCase().includes(value) ||
        mockdata.ingredients.toLowerCase().includes(value)
      );
      //   arr1.sort();
      // arr2.sort();

      // return JSON.stringify(arr1) === JSON.stringify(arr2);
    });

    return data;
  }

  async getItems(query) {
    if (this.database) {
      // TODO: Get data from database;
    } else {
      console.warn('Getting data from seed data');
      if (!isEmpty(query)) {
        return await this.getItemByQuery(query);
      }

      // console.log(mockData);
      return mockData;
    }
  }
}

export default ItemService;
