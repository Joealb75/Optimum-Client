import { useQuery } from '@tanstack/react-query';
import { getOfficeUserByUserID } from '../data-services/user_data.js';

export const UseGetOfficeUserById = (currentUser) => {

  return useQuery({
    queryKey: ['officeUserById', currentUser?.id],
    queryFn: () => getOfficeUserByUserID(currentUser),
    enabled: !!currentUser // only run query if currentUser is defined
  });
}
