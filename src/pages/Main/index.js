import React, { Component } from 'react';
import moment from 'moment';
import ReactTimeout from 'react-timeout';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  componentDidMount = (e) => {
    if (localStorage.getItem('repositories')) {
      this.setState({ repositories: [...JSON.parse(localStorage.getItem('repositories'))] });
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false,
      }, () => {
        localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  delete = (repositories) => {
    repositories = repositories.filter(repo => !repo.deleted);
    this.setState({ repositories });
    localStorage.setItem('repositories',JSON.stringify(repositories));
  }

  handleDelete = async (id) => {
    const repositories = this.state.repositories.map((repo) => {
      if (repo.id === id) {repo.deleted = true};

      return repo;
    });
    this.setState({ repositories });
    this.props.setTimeout(() => this.delete(repositories), 1000);
  };

  handleRefresh = async (full_name) => {

    const { data: repository } = await api.get(`/repos/${full_name}`);

    repository.last_commit = moment(repository.pushed_at).fromNow();

    const repositories = this.state.repositories.map(repo => ((repo.id === repository.id) ? repository : repo));

    this.setState({
      repositoryInput: '',
      repositories,
      repositoryError: false,
    }, () => {
      localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
    });
  }

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repository"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{ this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>
        <CompareList repositories={this.state.repositories} handleRefresh={this.handleRefresh} handleDelete={this.handleDelete} />
      </Container>
    );
  }
}

export default ReactTimeout(Main);
