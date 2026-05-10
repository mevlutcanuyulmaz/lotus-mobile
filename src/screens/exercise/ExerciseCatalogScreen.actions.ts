import { getExercises } from '../../services/exercise';

export async function fetchExerciseCatalogAction() {
  return getExercises();
}
