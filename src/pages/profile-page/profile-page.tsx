import { FC, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { useGetMeQuery } from '@/entities/auth';
import { setIsAuthModalOpen } from '@/features/auth/model';
import { Path, useAppDispatch } from '@/shared/lib';

export const ProfilePage: FC = () => {
  const { data: meResponse } = useGetMeQuery();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    meResponse?.userId ? navigate(Path.ProfileID) : dispatch(setIsAuthModalOpen({ isAuthModalOpen: true }));
  }, [meResponse, navigate, dispatch]);

  return <div />;
};
