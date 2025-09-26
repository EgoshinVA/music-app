import { useId } from 'react';

export const useGetId = (idFromComponentProps?: string): string => {
  const generatedId = useId();

  return idFromComponentProps || generatedId;
};
