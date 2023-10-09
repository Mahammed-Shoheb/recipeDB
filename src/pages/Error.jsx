import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
  const error = useRouteError();
  if (error.status === 404)
    return (
      <Wrapper>
        <div>
          <h1>page not found</h1>
          <Link to='/' className='btn'>
            back to home
          </Link>
        </div>
      </Wrapper>
    );
  return (
    <Wrapper>
      <h2>there was an error...</h2>;
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  min-height: 100vh;
  text-align: center;
  .btn {
    margin: 2rem auto;
    display: inline-block;
  }
`;
