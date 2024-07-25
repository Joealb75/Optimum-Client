import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchCurrentUser = async () => {
  const userFromStorage = JSON.parse(localStorage.getItem('Optimum_User'));
  if (userFromStorage && userFromStorage.id) {
    return userFromStorage;
  }
  return {};
};

export const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: Infinity, // How long data stays fresh 
    cacheTime: Infinity, // How long data stays cached 
  });

  const setCurrentUser = (user) => {
    queryClient.setQueryData(['currentUser'], user);
    localStorage.setItem('Optimum_User', JSON.stringify(user));
  };

  return { currentUser, setCurrentUser, isLoading, error };
};

