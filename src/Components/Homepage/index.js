import PeopleIcon from '@mui/icons-material/People';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useNavigate } from "react-router-dom";
import './homepage.scss';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid homepage px-0">
      <div className="row background p-0 m-0">
        <div className='row introduction'>
          <div className='col-sm-9 introText'>
            <img src='../../Images/rubus_logo.png' alt='rubus' height='80' width='50' className='d-inline-block align-text-top' />
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
          <div className='col loginRegisterButtons'>
            <div className='row'>
              <button className='btn btn-outline-primary' onClick={() => navigate("/auth")}>Sign Up</button>
              <button className='btn btn-outline-primary' onClick={() => navigate("/auth")}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Homepage;
