import React from 'react';
import { RepositoryListContainer } from '../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
        
      };

      // Add your test code here
      const { getAllByTestId } = render(
				<RepositoryListContainer repositories={repositories} />
      );
      
      const repositoryNames = getAllByTestId('repositoryName');
      const descriptions = getAllByTestId('description');
      const languages = getAllByTestId('language');
      const forksCounts = getAllByTestId('forksCount');
      const starCounts = getAllByTestId('starCount');
      const reviewCounts= getAllByTestId('reviewCount');
      const ratings = getAllByTestId('rating');
      
      repositories.edges.forEach((edge, i) => {
        expect(repositoryNames[i]).toHaveTextContent(edge.node.fullName);
      });
      repositories.edges.forEach((edge, i) => {
        expect(descriptions[i]).toHaveTextContent(edge.node.description);
      });
      repositories.edges.forEach((edge, i) => {
        expect(languages[i]).toHaveTextContent(edge.node.language);
      });
      repositories.edges.forEach((edge, i) => {
        expect(forksCounts[i]).toHaveTextContent(edge.node.forksCount <1000 ? edge.node.forksCount : (edge.node.forksCount/1000).toFixed(1) + "K" );
      });
           repositories.edges.forEach((edge, i) => {
        expect(starCounts[i]).toHaveTextContent(edge.node.stargazersCount<1000 ? edge.node.stargazersCount : (edge.node.stargazersCount/1000).toFixed(1) + "K" );
      });
      repositories.edges.forEach((edge, i) => {
        expect(reviewCounts[i]).toHaveTextContent(edge.node.reviewCount <1000 ? edge.node.reviewCount : (edge.node.reviewCount/1000).toFixed(1) + "K" );
      });
      repositories.edges.forEach((edge, i) => {
        expect(ratings[i]).toHaveTextContent(edge.node.ratingAverage);
      });
    });
  });
});