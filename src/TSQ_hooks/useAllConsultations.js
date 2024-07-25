import { useQuery } from '@tanstack/react-query';
import { getAllConsultations } from '../data-services/consultation_data.js';

export const UseAllConsultations = () => {
    return useQuery({
        queryKey: ['allConsultations'],
        queryFn: getAllConsultations
    });
}

