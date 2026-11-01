import type { Opportunity, OpportunityType } from './opportunity.types';

export interface OpportunityFilters {
  search: string;
  type: OpportunityType | 'All';
  page: number;
  limit: number;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedOpportunitiesResponse {
  data: Opportunity[];
  pagination: PaginationMetadata;
}
