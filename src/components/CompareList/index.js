import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

const CompareList = ({ repositories, handleRefresh, handleDelete}) =>  (
  <Container>
    { repositories.map(repo => (
      <Repository key={repo.id} vanishing={repo.deleted}>
        <div>
          <i className="fa fa-refresh" onClick={e => handleRefresh(repo.full_name)} />
          <i className="fa fa-remove" onClick={e => handleDelete(repo.id)} />
        </div>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.owner.login}</strong>
          <small>{repo.name}</small>
        </header>
        <ul>
          <li>
            {repo.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repo.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repo.last_commit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))
    }
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    stargazers_count: PropTypes.number,
    fork_issues_count: PropTypes.number,
    open_issues_count: PropTypes.number,
    pushed_at: PropTypes.string,
  })).isRequired,
};

export default CompareList;
