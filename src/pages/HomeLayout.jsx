import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <header style={{ marginTop: '2rem' }}>
        <div className='title'>
          <h1>Rceipe DB</h1>
          <div className='title-underline'></div>
        </div>
      </header>
      <main className='page'>
        <Outlet />
      </main>
    </>
  );
};
export default HomeLayout;
