import { apiRequest } from '../lib/apiClient';

export async function getSavedOpportunityIds(signal?: AbortSignal): Promise<number[]> {
  const data = await apiRequest<unknown>('/saved-opportunities', {
    signal,
  });

  if (!Array.isArray(data) || !data.every((id) => Number.isInteger(id))) {
    throw new Error('Invalid saved opportunities response.');
  }

  return data as number[];
}

export async function saveOpportunity(opportunityId: number): Promise<void> {
  await apiRequest<void>(`/saved-opportunities/${opportunityId}`, {
    method: 'PUT',
  });
}

export async function unsaveOpportunity(opportunityId: number): Promise<void> {
  await apiRequest<void>(`/saved-opportunities/${opportunityId}`, {
    method: 'DELETE',
  });
}
