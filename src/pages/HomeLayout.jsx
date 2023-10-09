import { Outlet, useNavigation } from 'react-router-dom';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <header style={{ marginTop: '2rem' }}>
        <div className='title'>
          <h1>Rceipe DB</h1>
          <div className='title-underline'></div>
        </div>
      </header>
      <main className='page'>
        {isPageLoading ? <div className='loading' /> : <Outlet />}
      </main>
    </>
  );
};
export default HomeLayout;
