import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import PeopleIcon from '@mui/icons-material/People';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import './homepage.scss';

const Homepage = () => {
  let { userId, accessTokenPayload } = useSessionContext();

  console.log(userId);
  console.log(accessTokenPayload);

  return (
    <div class="container-fluid homepage px-0">
      <div class="row background p-0 m-0">
        <div className='row introduction'>
          <div className='col-sm-8 introText'>
            <div className='row title'>
              <h1>Rubus</h1>
            </div>
            <h4>Search Phase Tool for Systematic Literature Reviews in Software Engineering</h4>
            <div className='row features'>
              <div className='col'>
                <PeopleIcon sx={{ fontSize: 110 }} />
                <h4>Collaborate on SLR Search Phase with Your Team</h4>
              </div>
              <div className='col'>
                <TravelExploreIcon sx={{ fontSize: 110 }} />
                <h4>Unifed Search Interface for Multiple Databases</h4>
              </div>
              <div className='col'>
                <ImportExportIcon sx={{ fontSize: 110 }} />
                <h4>Search, Download, and Upload References Easily</h4>
              </div>
            </div>
          </div>
          <div className='col'>
            sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
