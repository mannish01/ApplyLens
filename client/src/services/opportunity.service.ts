import type { Opportunity } from '../types/opportunity.types';
import { apiRequest } from '../lib/apiClient';

export async function getOpportunities(signal?: AbortSignal): Promise<Opportunity[]> {
  const data = await apiRequest<unknown>('/opportunities', {
    signal,
  });

  if (!Array.isArray(data)) {
    throw new Error('Invalid opportunities response from server.');
  }

  return data as Opportunity[];
}
