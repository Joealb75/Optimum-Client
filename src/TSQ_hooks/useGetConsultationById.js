import { useQuery } from '@tanstack/react-query';
import { getConsultationById } from '../data-services/consultation_data.js';

export const UseGetConsultationById = (id) => {
  return useQuery({
    queryKey: ['consultationById', id],
    queryFn: () => getConsultationById(id),
    enabled: !!id // only run query if id is defined
  });
}
