import { createSelector } from '@reduxjs/toolkit';

const selectIssues = state => state.issue.issues;
const selectFilters = state => state.filter;
export const selectFilteredIssues = createSelector(
  [selectIssues, selectFilters],
  (issues, filters) => {
    console.log('Filtering issues with filters:', filters);
    return issues.filter(issue => {
      const searchMatch =
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        issue.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        // issue.type.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.status.toLowerCase().includes(filters.search.toLowerCase());
      console.log(
        'Search Match:',
        searchMatch,
        'Issue:',
        issue.title,
        'Filters:',
        filters.search,
      );
      const statusMatch =
        filters.status.length === 0 || filters.status.includes(issue.status);
      const typeMatch =
        filters.type.length === 0 || filters.type.includes(issue.type);
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(issue.category);
      const locationMatch =
        filters.location.length === 0 ||
        filters.location.includes(issue.location);

      return (
        searchMatch &&
        statusMatch &&
        typeMatch &&
        categoryMatch &&
        locationMatch
      );
    });
  },
);
