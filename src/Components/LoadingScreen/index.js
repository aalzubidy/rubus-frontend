import './loadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className='container-fixed loadingScreen'>
      <div className='loadingItemDiv'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen;
