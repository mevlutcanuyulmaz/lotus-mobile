import { getExerciseSegments } from '../../services/exercise';

export async function fetchExerciseSegmentsAction(exerciseId: number) {
  return getExerciseSegments(exerciseId);
}
