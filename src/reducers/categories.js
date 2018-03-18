import { LOAD_CATEGORIES } from '../ducks';

export function categories(state = null, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      var categories = action.categories.map(category => category.name);
      return categories;

    default:
      return state;
  }
}