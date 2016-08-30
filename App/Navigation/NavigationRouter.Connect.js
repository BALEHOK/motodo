import { connect } from 'react-redux';
import NavigationRouter from './NavigationRouter';

const mapStateToProps = (state) => {
  return {
    date: state.app.date
  };
};

export default connect(mapStateToProps)(NavigationRouter);
