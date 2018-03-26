import { LOAD_CATEGORIES } from '../ducks/index';

export default function categories(state = null, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      let categories = action.categories.map(category => category.name);
      return categories;

    default:
      return state;
  }
}
