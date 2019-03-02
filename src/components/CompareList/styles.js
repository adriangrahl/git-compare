import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  transition: ${props => (props.vanishing ? 'all 1s ease' : 0)};
  opacity: ${props => (props.vanishing ? 0 : 1)};

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 30px;

    i {
      width: 25px;
      color: #999;

      &:hover {
        color: unset;
      }
    }
  }

  header {
    padding: 0 30px 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      /* I could also use (2n-1)*/
      &:nth-child(odd) {
        background: #f5f5f5;
      }
    }
  }
`;
