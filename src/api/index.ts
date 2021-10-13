import {Creation} from '../types';
import creations from './mocks/creations.json';

export default {
  creations: {
    getAll: (): Promise<Creation[]> =>
      Promise.resolve(creations.data as Creation[]),
    findById: (id: number): Promise<Creation> => {
      const result = creations.data.find(creation => creation.id === id);
      return Promise.resolve(result as Creation);
    },
  },
};
