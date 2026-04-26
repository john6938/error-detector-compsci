export type CategoryId = 'accuracy' | 'brevity' | 'clarity' | 'objectivity' | 'formality';

export interface ErrorMatch {
  start: number;
  end: number;
  help: string;
  video: string;
  categoryId: CategoryId;
  subcategoryId: string;
  subcategoryTitle: string;
}
